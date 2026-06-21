import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus
} from "../controllers/order.controller.js";

const router = express.Router();

router.use(authMiddleware);

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

router.post("/", createOrder);

router.get("/", getMyOrders);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/all",
  adminMiddleware,
  getAllOrders
);

router.put(
  "/admin/:id/status",
  adminMiddleware,
  updateOrderStatus
);

/*
|--------------------------------------------------------------------------
| Single Order Route (Keep Last)
|--------------------------------------------------------------------------
*/

router.get("/:id", getOrderById);

router.put(
  "/admin/:id/payment-status",
  adminMiddleware,
  updatePaymentStatus
);
export default router;