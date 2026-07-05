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

// Delivery Partner Routes
import partnerRoutes from "./partner.routes.js";
import partnerAuthRoutes from "./partnerAuth.routes.js";

const router = express.Router();

/* =========================
   AUTH
========================= */
router.use("/auth", authRoutes);

/* =========================
   RESTAURANT
========================= */
router.use("/restaurants", restaurantRoutes);

/* =========================
   ADMIN
========================= */
router.use("/admin", adminRoutes);

/* =========================
   FOOD
========================= */
router.use("/foods", foodRoutes);

/* =========================
   CART
========================= */
router.use("/cart", cartRoutes);

/* =========================
   ORDERS
========================= */
router.use("/orders", orderRoutes);

/* =========================
   DELIVERY PARTNER LOGIN
========================= */
router.use("/partner-auth", partnerAuthRoutes);

/* =========================
   DELIVERY PARTNER ORDERS
========================= */
router.use("/partner", partnerRoutes);

/* =========================
   BANNER
========================= */
router.use("/banner", bannerRoutes);

/* =========================
   CATEGORY
========================= */
router.use("/categories", categoryRoutes);

/* =========================
   COUPONS
========================= */
router.use("/coupons", couponRoutes);

/* =========================
   GROCERY
========================= */
router.use("/grocery", groceryRoutes);

/* =========================
   FEEDBACK
========================= */
router.use("/feedback", feedbackRoutes);

export default router;
