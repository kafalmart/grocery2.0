import Category from "../models/Category.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name, restaurant } = req.body;
    let imageUrl = "";

if (req.file) {
  imageUrl = req.file ? req.file.path : "";
}
    const category = await Category.create({
  name,
  restaurant,
  image: imageUrl,
});

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
category.name = name || category.name;

if (req.file) {
  category.image = req.file.path;
}

await category.save();

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL CATEGORIES BY RESTAURANT
export const getCategoriesByRestaurant = async (req, res) => {
  try {
    const categories = await Category.find({
      restaurant: req.params.restaurantId,
    });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};