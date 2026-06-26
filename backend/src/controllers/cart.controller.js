import * as cartService from "../services/cart.service.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId,
  quantity,
  type,
  portion,} = req.body;

    const cart = await cartService.addToCart(
      req.user._id,
      itemId,
      quantity,
      type,
       portion
    );

    res.status(201).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (
  req,
  res
) => {
  try {
    const cart =
      await cartService.getCart(
        req.user._id
      );

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await cartService.updateCartItem(
      req.user._id,
      itemId,
      req.body.quantity
    );

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await cartService.removeCartItem(
      req.user._id,
      itemId
    );

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearCart = async (
  req,
  res
) => {
  try {
    await cartService.clearCart(
      req.user._id
    );

    res.json({
      success: true,
      message:
        "Cart cleared successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};