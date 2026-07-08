import Order from "../models/Order.js";

/* =========================
   Available Orders
========================= */
export const getAvailableOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: "ready",
      deliveryPartner: null,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   Current Partner Orders
========================= */
export const getMyCurrentOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      deliveryPartner: req.user._id,
      status: {
        $in: ["out_for_delivery", "accepted", "ready"],
      },
    }).sort({ acceptedAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   Order Details
========================= */
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   Accept Order
========================= */
export const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.deliveryPartner) {
      return res.status(400).json({
        success: false,
        message: "Order already accepted",
      });
    }

    order.deliveryPartner = req.user._id;
    order.status = "out_for_delivery";
    order.acceptedAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order accepted successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   Picked Up Order
========================= */
export const pickedUpOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "out_for_delivery";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order picked up successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   Delivered Order
========================= */
export const deliveredOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "delivered";
    order.deliveredAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order delivered successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
