import express from "express";

import {
  loginPartner,
  getPartnerProfile,
} from "../controllers/partnerAuth.controller.js";

import partnerAuthMiddleware from "../middleware/partnerAuth.middleware.js";

const router = express.Router();

/* =========================
   Partner Login
========================= */
router.post("/login", loginPartner);

/* =========================
   Partner Profile
========================= */
router.get(
  "/profile",
  partnerAuthMiddleware,
  getPartnerProfile
);

export default router;
