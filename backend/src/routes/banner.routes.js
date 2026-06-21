import express from "express";
import {
  getBanner,
  updateBanner,
} from "../controllers/banner.controller.js";
import upload from "../middleware/upload.middleware.js";
const router = express.Router();

router.get("/", getBanner);
router.put(
  "/",
  upload.single("image"),
  updateBanner
);

export default router;