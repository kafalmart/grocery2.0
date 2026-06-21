import express from "express";
import upload from "../middleware/upload.middleware.js";

import {
  createFood,
  getFoodById,
  getRestaurantMenu,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// ================= PUBLIC ROUTES =================

router.get("/restaurant/:restaurantId", getRestaurantMenu);
router.get("/:id", getFoodById);

// ================= ADMIN ROUTES =================

// CREATE FOOD (WITH IMAGE)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),   // ✅ IMPORTANT KEY
  createFood
);

// UPDATE FOOD (WITH IMAGE)
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),   // ✅ IMPORTANT KEY
  updateFood
);

// DELETE FOOD
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteFood
);

export default router;