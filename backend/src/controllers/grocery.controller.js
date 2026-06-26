import Grocery from "../models/Grocery.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ================= CLOUDINARY HELPER =================
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "kafalmart",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/* =========================
   🧑‍💼 ADMIN: ADD GROCERY
========================= */
export const createGrocery = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    let image = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      image = result.secure_url;
    }

    const grocery = await Grocery.create({
      name,
      price,
      category,
      stock,
      image,
    });

    res.status(201).json({
      success: true,
      grocery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   📦 GET ALL GROCERY
========================= */
export const getAllGrocery = async (req, res) => {
  try {
    const items = await Grocery.find({
      isActive: true,
    });

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   🧑‍💼 UPDATE GROCERY
========================= */
export const updateGrocery = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      data.image = result.secure_url;
    }

    const updated = await Grocery.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Grocery not found",
      });
    }

    res.json({
      success: true,
      message: "Updated successfully",
      grocery: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   🧑‍💼 DELETE GROCERY
========================= */
export const deleteGrocery = async (req, res) => {
  try {
    const deleted = await Grocery.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Grocery not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};