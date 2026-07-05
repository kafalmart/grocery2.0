import express from "express";

import {
  loginPartner,
  getPartnerProfile,
} from "../controllers/partnerAuth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Login
router.post("/login", loginPartner);

// Profile
router.get(
  "/profile",
  authMiddleware,
  getPartnerProfile
);

export default router;
