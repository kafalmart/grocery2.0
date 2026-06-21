import * as foodService from "../services/food.service.js";

// ================= CREATE FOOD =================
export const createFood = async (req, res) => {
  try {
    const food = await foodService.createFood(req.body, req.file);

    res.status(201).json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET FOOD BY ID =================
export const getFoodById = async (req, res) => {
  try {
    const food = await foodService.getFoodById(req.params.id);

    res.json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET RESTAURANT MENU =================
export const getRestaurantMenu = async (req, res) => {
  try {
    const foods = await foodService.getRestaurantMenu(
      req.params.restaurantId
    );

    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE FOOD =================
export const updateFood = async (req, res) => {
  try {
    const food = await foodService.updateFood(
      req.params.id,
      req.body,
      req.file
    );

    res.json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE FOOD =================
export const deleteFood = async (req, res) => {
  try {
    await foodService.deleteFood(req.params.id);

    res.json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};