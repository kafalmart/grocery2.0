import Grocery from "../models/Grocery.js";

/* =========================
   🧑‍💼 ADMIN: ADD GROCERY
========================= */
export const createGrocery = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

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
   📦 GET ALL GROCERY (USER)
========================= */
export const getAllGrocery = async (req, res) => {
  try {
    const items = await Grocery.find({ isActive: true });

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
    const updated = await Grocery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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
    const deleted = await Grocery.findByIdAndDelete(req.params.id);

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