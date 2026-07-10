import { getIO } from "../socket.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import { generateWhatsappMessage } from "../utils/generateWhatsappMessage.js";
import Coupon from "../models/Coupan.js";

export const createOrder = async (userId, data) => {
  const cart = await Cart.findOne({ user: userId })
    .populate({
      path: "items.food",
      populate: { path: "restaurant" },
    })
    .populate("items.grocery"); // ✅ IMPORTANT FIX

  if (!cart) {
    throw new Error("Cart not found");
  }

  // keep valid items only
  cart.items = cart.items.filter(
    (item) => item.food || item.grocery
  );

  if (cart.items.length === 0) {
    throw new Error("Cart is empty. Some items no longer exist.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // ================= TOTAL =================
  const cartSubTotal = cart.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
}, 0);

  // ================= COUPON =================
  let couponCode = "";
  let discountAmount = 0;

  if (data.couponCode) {
    const coupon = await Coupon.findOne({
      code: data.couponCode.toUpperCase(),
      isActive: true,
    });

    if (!coupon) throw new Error("Invalid coupon code");
    if (new Date() > coupon.expiryDate)
      throw new Error("Coupon expired");

    if (cartSubTotal < coupon.minOrderAmount)
      throw new Error(
        `Minimum order amount is ₹${coupon.minOrderAmount}`
      );

    couponCode = coupon.code;

    if (coupon.discountType === "percentage") {
      discountAmount =
        (cartSubTotal * coupon.discountValue) / 100;

      if (coupon.maxDiscount > 0 && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }
  }

  // ================= GROUP ITEMS =================
  const groupedItems = {
    food: {},
    grocery: [],
  };

  cart.items.forEach((item) => {
    if (item.food && item.food.restaurant) {
      const restaurantId = item.food.restaurant._id.toString();

      if (!groupedItems.food[restaurantId]) {
        groupedItems.food[restaurantId] = {
          restaurant: item.food.restaurant,
          items: [],
        };
      }

      groupedItems.food[restaurantId].items.push(item);
    } else if (item.grocery) {
      groupedItems.grocery.push(item);
    }
  });

  const orders = [];

  // ================= FOOD ORDERS =================
  for (const restaurantId in groupedItems.food) {
    const group = groupedItems.food[restaurantId];

    const items = group.items.map((item) => ({
      product: item.food._id,
      productModel: "Food",
      name: item.food.name,
     price: item.price,
      quantity: item.quantity,
    }));

    const subTotal = group.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
);

    const restaurantDiscount =
      cartSubTotal > 0
        ? (subTotal / cartSubTotal) * discountAmount
        : 0;

    const totalAmount =
      subTotal - restaurantDiscount;

    const order = await Order.create({
      user: userId,
      restaurant: group.restaurant._id,
      restaurantName: group.restaurant.name,
      customerName: user.name,
      customerPhone: user.phone,
      items,
      subTotal,
      couponCode,
      discountAmount: restaurantDiscount,
      totalAmount,
      address: data.address,
      notes: data.notes,
      paymentMethod: data.paymentMethod || "cod",
    });
    io.emit("new-order", order);

    orders.push(order);

    getIO().emit("new-order", order);
  }

  // ================= GROCERY ORDER =================
  if (groupedItems.grocery.length > 0) {
    const items = groupedItems.grocery.map((item) => ({
      product: item.grocery._id,
      productModel: "Grocery",
      name: item.grocery.name,
     price: item.price,
      quantity: item.quantity,
    }));

   const subTotal = groupedItems.grocery.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
);

    const order = await Order.create({
      user: userId,
      restaurant: null,
      restaurantName: "Grocery Store",
      customerName: user.name,
      customerPhone: user.phone,
      items,
      subTotal,
      couponCode,
      discountAmount: 0,
      totalAmount: subTotal,
      address: data.address,
      notes: data.notes,
      paymentMethod: data.paymentMethod || "cod",
    });

    orders.push(order);
  }

  // ================= WHATSAPP =================
  const message = generateWhatsappMessage(orders);

  const whatsappUrl = `https://wa.me/${
    process.env.ADMIN_WHATSAPP_NUMBER
  }?text=${encodeURIComponent(message)}`;

  // ================= CLEAR CART =================
  cart.items = [];
  await cart.save();

  return {
    orders,
    whatsappUrl,
  };
};

// ================= OTHER FUNCTIONS =================

export const getMyOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({
    createdAt: -1,
  });
};

export const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  return order;
};

export const getAllOrders = async () => {
  return await Order.find()
    .populate("user", "name email phone")
    .sort({ createdAt: -1 });
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  order.status = status;
  await order.save();

  return order;
};
