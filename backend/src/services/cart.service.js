import Cart from "../models/Cart.js";
import Food from "../models/Food.js";
import Grocery from "../models/Grocery.js";
export const addToCart = async (userId,
  itemId,
  quantity,
  type,
  portion = "full") => {
  let item;

  if (type === "food") {
    item = await Food.findById(itemId);
  } else {
    item = await Grocery.findById(itemId);
  }

  if (!item) throw new Error("Item not found");

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingItem = cart.items.find((i) => {
  if (type === "food") {
    return (
      i.food?.toString() === itemId &&
      i.portion === portion
    );
  }

  return i.grocery?.toString() === itemId;
});

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      food: type === "food" ? item._id : null,
      grocery: type === "grocery" ? item._id : null,
      quantity,
     price:
  type === "food"
    ? portion === "half"
      ? item.halfPrice
      : item.fullPrice
    : item.price,

portion:
  type === "food"
    ? portion
    : "full",
    });
  }

  await cart.save();
  return cart;
};
export const getCart = async (
  userId
) => {
  const cart = await Cart.findOne({ user: userId }).populate([
   {
    path: "items.food",
    select:
      "name image hasHalf halfPrice fullPrice",
  },
  {
    path: "items.grocery",
    select:
      "name image price",
  },
  { path: "items.grocery", select: "name image price" },
]);
return cart;}

export const updateCartItem = async (userId, itemId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (i) =>
      (i.food && i.food.toString() === itemId) ||
      (i.grocery && i.grocery.toString() === itemId)
  );

  if (!item) throw new Error("Item not found in cart");

  item.quantity = quantity;

  await cart.save();
  return cart;
};

export const removeCartItem = async (userId, itemId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (i) =>
      !(
        (i.food && i.food.toString() === itemId) ||
        (i.grocery && i.grocery.toString() === itemId)
      )
  );

  await cart.save();
  return cart;
};

export const clearCart = async (
  userId
) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  return cart;
};