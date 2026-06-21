import express from "express";
import {
  createCategory,
  getCategoriesByRestaurant,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import upload from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// CREATE (admin only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createCategory
);

// READ (restaurant wise)
router.get("/:restaurantId", authMiddleware, getCategoriesByRestaurant);

// UPDATE (admin only)
router.put("/:id", authMiddleware, adminMiddleware,  upload.single("image"), updateCategory);

// DELETE (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

export default router;