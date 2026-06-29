import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  createFeedback,
  getAllFeedbacks,
  getMyFeedbacks,
   toggleFeatured,
  getFeaturedFeedbacks,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.get(
  "/featured",
  getFeaturedFeedbacks
);


router.post(
  "/:orderId",
  authMiddleware,
  createFeedback
);
router.patch(
  "/:id/featured",
  authMiddleware,
  adminMiddleware,
  toggleFeatured
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllFeedbacks
);
router.get(
  "/my",
  authMiddleware,
  getMyFeedbacks
);



export default router;