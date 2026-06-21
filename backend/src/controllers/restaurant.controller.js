import * as service from "../services/restaurant.service.js";

export const createRestaurant = async (req, res) => {
  try {
    const image = req.file
  ? req.file.path
  : null;


    const data = {
      ...req.body,
      image,
    };

    const restaurant =
      await service.createRestaurant(data);

    res.status(201).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRestaurants = async (req, res) => {
  const data = await service.getAllRestaurants();
  res.json({ success: true, data });
};

export const getRestaurant = async (req, res) => {
  const data = await service.getRestaurantById(
    req.params.id
  );
  res.json({ success: true, data });
};

export const updateRestaurant = async (req, res) => {
  const image = req.file
  ? req.file.path
  : undefined;

  const data = {
    ...req.body,
  };

  if (image) data.image = image;

  const updated = await service.updateRestaurant(
    req.params.id,
    data
  );

  res.json({ success: true, data: updated });
};

export const deleteRestaurant = async (req, res) => {
  await service.deleteRestaurant(req.params.id);

  res.json({
    success: true,
    message: "Deleted successfully",
  });
};