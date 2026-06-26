import Banner from "../models/banner.js";
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

// ================= GET BANNER =================
export const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne();

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CREATE / UPDATE BANNER =================
export const updateBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    const image = result.secure_url;

    let banner = await Banner.findOne();

    if (!banner) {
      banner = await Banner.create({
        image,
      });
    } else {
      banner.image = image;
      await banner.save();
    }

    res.json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};