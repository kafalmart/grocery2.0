import * as service from "../services/restaurant.service.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

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
export const createRestaurant = async (req, res) => {
  try {
  let image = null;

if (req.file) {
  const result = await uploadToCloudinary(req.file.buffer);
  image = result.secure_url;
}


    const data = {
      ...req.body,
      image,
       isActive: req.body.isActive === "true",
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
  let image;

if (req.file) {
  const result = await uploadToCloudinary(req.file.buffer);
  image = result.secure_url;
}

  const data = {
    ...req.body,
     isActive: req.body.isActive === "true",
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
export const toggleFeatured = async (req, res) => {
  try {
    const restaurant = await service.getRestaurantById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    restaurant.featured = !restaurant.featured;
    await restaurant.save();

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};