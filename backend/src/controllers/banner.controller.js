import Banner from "../models/banner.js";

// Get Banner
export const getBanner =
  async (req, res) => {
    try {
      const banner =
        await Banner.findOne();

      res.json({
        success: true,
        data: banner,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Create/Update Banner
export const updateBanner =
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Please upload an image",
          });
      }

      const image = `/uploads/${req.file.filename}`;

      let banner =
        await Banner.findOne();

      if (!banner) {
        banner =
          await Banner.create({
            image,
          });
      } else {
        banner.image = image;
        await banner.save();
      }

      res.json({
        success: true,
        message:
          "Banner updated successfully",
        data: banner,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };