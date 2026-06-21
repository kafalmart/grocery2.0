import * as orderService from "../services/order.service.js";
import Order from "../models/Order.js";
export const createOrder =
  async (req, res) => {
    try {
      const result =
        await orderService.createOrder(
          req.user._id,
          req.body
        );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getMyOrders =
  async (req, res) => {
    try {
      const orders =
        await orderService.getMyOrders(
          req.user._id
        );

      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getOrderById =
  async (req, res) => {
    try {
      const order =
        await orderService.getOrderById(
          req.params.id
        );

      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };
export const updatePaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = req.body.paymentStatus;

    await order.save();

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
  
export const getAllOrders =
  async (req, res) => {
    try {
      const orders =
        await orderService.getAllOrders();

      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await orderService.updateOrderStatus(
          req.params.id,
          req.body.status
        );

      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };