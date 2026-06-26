import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "kafalmart",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
export const createFood = async (data, file) => {
  const restaurant = await Restaurant.findById(data.restaurant);

  if (!restaurant) throw new Error("Restaurant not found");
  if (!data.category) {
    throw new Error("Category is required");
  }

  let imageUrl = "";

if (file) {
  const result = await uploadToCloudinary(file.buffer);
  imageUrl = result.secure_url;
}

   const food = await Food.create({
    name: data.name,
    description: data.description,
    hasHalf: data.hasHalf === "true",

halfPrice:
  data.hasHalf === "true"
    ? Number(data.halfPrice)
    : 0,

fullPrice: Number(data.fullPrice),
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
  const result = await uploadToCloudinary(file.buffer);
  data.image = result.secure_url;
}

  data.hasHalf = data.hasHalf === "true";

  // Convert string values to numbers
  data.fullPrice = Number(data.fullPrice);

  if (data.hasHalf) {
    data.halfPrice = Number(data.halfPrice);
  } else {
    data.halfPrice = 0;
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
