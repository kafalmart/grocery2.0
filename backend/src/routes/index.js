import express from "express";

import authRoutes from "./auth.routes.js";
import restaurantRoutes from "./restaurant.routes.js";
import foodRoutes from "./food.routes.js";
import cartRoutes from "./cart.routes.js";
import orderRoutes from "./order.routes.js";
import adminRoutes from "./admin.routes.js";
import bannerRoutes from "./banner.routes.js";
import categoryRoutes from "./category.routes.js";
import couponRoutes from "./coupon.routes.js";
import groceryRoutes from "./grocery.routes.js";
import feedbackRoutes from "./feedback.routes.js";
const router = express.Router();

router.use("/auth", authRoutes);

router.use(
  "/restaurants",
  restaurantRoutes
);
router.use(
  "/admin",
  adminRoutes
);
router.use("/foods", foodRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/banner", bannerRoutes);
router.use("/categories", categoryRoutes);
router.use("/coupons", couponRoutes);
router.use("/grocery", groceryRoutes);
router.use("/feedback", feedbackRoutes);
export default router;