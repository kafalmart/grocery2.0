import express from "express";
import {
  getGallery,
  addGalleryImage,
  deleteGalleryImage,
} from "../controllers/gallery.controller.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getGallery);

router.post(
  "/upload",
  upload.single("image"),
  addGalleryImage
);

router.delete(
  "/:id",
  deleteGalleryImage
);

export default router;
