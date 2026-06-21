import express from "express";
import {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} from "../controllers/coupon.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
const router = express.Router();

// ADMIN
router.post("/create", createCoupon);
router.get("/all", getAllCoupons);
router.put("/:id", updateCoupon);
router.delete("/:id", deleteCoupon);

// USER
router.post("/apply", applyCoupon);

export default router;