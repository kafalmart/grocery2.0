import Restaurant from "../models/Restaurant.js";

export const createRestaurant = async (data) => {
  return await Restaurant.create(data);
};

export const getAllRestaurants = async () => {
  return await Restaurant.find();
};

export const getRestaurantById = async (id) => {
  return await Restaurant.findById(id);
};

export const updateRestaurant = async (id, data) => {
  return await Restaurant.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteRestaurant = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};