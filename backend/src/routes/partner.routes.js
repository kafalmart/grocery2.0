import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getAvailableOrders,
  acceptOrder,
  pickedUpOrder,
  outForDeliveryOrder,
  deliveredOrder,
} from "../controllers/partner.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/orders", getAvailableOrders);

router.put("/:id/accept", acceptOrder);

router.put("/:id/picked", pickedUpOrder);

router.put("/:id/out-for-delivery", outForDeliveryOrder);

router.put("/:id/delivered", deliveredOrder);

export default router;
