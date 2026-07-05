import express from "express";

import {
  registerPartner,
  loginPartner,
  getPartnerProfile,
} from "../controllers/partnerAuth.controller.js";

import partnerAuthMiddleware from "../middleware/partnerAuth.middleware.js";

const router = express.Router();

router.post("/register", registerPartner);

router.post("/login", loginPartner);

router.get(
  "/profile",
  partnerAuthMiddleware,
  getPartnerProfile
);

export default router;
