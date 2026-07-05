import express from "express";
import partnerAuthMiddleware from "../middleware/partnerAuth.middleware.js";

import {
  getAvailableOrders,
  acceptOrder,
  pickedUpOrder,
  deliveredOrder,
} from "../controllers/partner.controller.js";

const router = express.Router();

/* =========================
   Partner Authentication
========================= */
router.use(partnerAuthMiddleware);

/* =========================
   Available Orders
========================= */
router.get("/orders", getAvailableOrders);

/* =========================
   Accept Order
========================= */
router.put("/:id/accept", acceptOrder);

/* =========================
   Picked Up
========================= */
router.put("/:id/picked", pickedUpOrder);

/* =========================
   Delivered
========================= */
router.put("/:id/delivered", deliveredOrder);

export default router;
