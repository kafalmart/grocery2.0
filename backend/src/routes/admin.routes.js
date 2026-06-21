import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
  getDashboard,
  getUsers,
  getUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(
  authMiddleware,
  adminMiddleware
);

router.get(
  "/dashboard",
  getDashboard
);

router.get(
  "/users",
  getUsers
);

router.get(
  "/users/:id",
  getUser
);

export default router;