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
router.put("/orders/:id/accept", acceptOrder);

/* =========================
   Picked Up Order
========================= */
router.put("/orders/:id/picked", pickedUpOrder);

/* =========================
   Delivered Order
========================= */
router.put("/orders/:id/delivered", deliveredOrder);

export default router;
