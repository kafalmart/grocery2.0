import express from "express";

import {
  registerPartner,
  loginPartner,
  getPartnerProfile,
  toggleOnlineStatus,
} from "../controllers/partnerAuth.controller.js";

import partnerAuthMiddleware from "../middleware/partnerAuth.middleware.js";

const router = express.Router();

/* =========================
   Register
========================= */
router.post("/register", registerPartner);

/* =========================
   Login
========================= */
router.post("/login", loginPartner);

/* =========================
   Profile
========================= */
router.get(
  "/profile",
  partnerAuthMiddleware,
  getPartnerProfile
);

/* =========================
   Online / Offline
========================= */
router.put(
  "/online",
  partnerAuthMiddleware,
  toggleOnlineStatus
);

export default router;
