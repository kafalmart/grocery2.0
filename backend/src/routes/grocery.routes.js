import express from "express";
import upload from "../middleware/upload.middleware.js";
import {
  createGrocery,
  getAllGrocery,
  updateGrocery,
  deleteGrocery,
} from "../controllers/grocery.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

/* ADMIN */
router.post(
  "/create",
  
  upload.single("image"),
  createGrocery
);
router.put("/:id",  upload.single("image"), updateGrocery);


router.delete(
  "/:id",
  
  deleteGrocery
);
/* USER */
router.get("/all", getAllGrocery);

export default router;