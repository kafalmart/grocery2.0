import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToCart);

router.get("/", getCart);

router.put(
  "/:itemId",
  updateCartItem
);

router.delete(
  "/:itemId",
  removeCartItem
);

router.delete(
  "/clear",
  clearCart
);

export default router;