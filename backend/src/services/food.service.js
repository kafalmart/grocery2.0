import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";
import Category from "../models/Category.js";
// helper (VERY IMPORTANT)
const getBaseUrl = () => process.env.BASE_URL || "https://grocery-0byj.onrender.com";

export const createFood = async (data, file) => {
  const restaurant = await Restaurant.findById(data.restaurant);

  if (!restaurant) throw new Error("Restaurant not found");
  if (!data.category) {
    throw new Error("Category is required");
  }

  let imageUrl = "";

  if (file) {
  imageUrl = `/uploads/${file.filename}`;
}

   const food = await Food.create({
    name: data.name,
    description: data.description,
    price: data.price,
    type: data.type,
    restaurant: data.restaurant,
    category: data.category,
    image: imageUrl,
  });

  return food;
};

export const getFoodById = async (id) => {
 const food = await Food.findById(id)
  .populate("restaurant", "name")
  .populate("category", "name");
  if (!food) throw new Error("Food not found");
  return food;
};

export const getRestaurantMenu = async (restaurantId) => {
  return await Food.find({
    restaurant: restaurantId,
    isAvailable: true,
  }).populate("category", "name image").sort({ createdAt: -1 });
};

export const updateFood = async (id, data, file) => {
  const food = await Food.findById(id);
  if (!food) throw new Error("Food not found");

 if (file) {
  data.image = `/uploads/${file.filename}`;
}

  Object.assign(food, data);
  await food.save();

  return food;
};

export const deleteFood = async (id) => {
  const food = await Food.findByIdAndDelete(id);
  if (!food) throw new Error("Food not found");
  return food;
};
