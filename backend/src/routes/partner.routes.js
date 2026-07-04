import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  getAvailableOrders,
  acceptOrder,
  pickedUpOrder,
  deliveredOrder,
} from "../controllers/partner.controller.js";

const router = express.Router();

router.use(authMiddleware);

// Get all orders ready for delivery
router.get("/orders", getAvailableOrders);

// Accept an order
router.put("/:id/accept", acceptOrder);

// Mark picked up
router.put("/:id/picked", pickedUpOrder);

// Mark delivered
router.put("/:id/delivered", deliveredOrder);

export default router;
