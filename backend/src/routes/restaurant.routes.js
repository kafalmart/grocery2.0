import express from "express";
import upload from "../middleware/upload.middleware.js";

import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  toggleFeatured
} from "../controllers/restaurant.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Public
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);

// Admin
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createRestaurant
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateRestaurant
);
router.patch(
  "/:id/featured",
  authMiddleware,
  adminMiddleware,
  toggleFeatured
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteRestaurant
);

export default router;