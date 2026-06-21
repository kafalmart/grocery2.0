import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "kafalmart",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],
    public_id: (req, file) => {
      return (
        Date.now() +
        "-" +
        file.originalname.split(".")[0]
      );
    },
  },
});

const fileFilter = (
  req,
  file,
  cb
) => {
  if (
    file.mimetype.startsWith(
      "image/"
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only images allowed"
      ),
      false
    );
  }
};

export default multer({
  storage,
  fileFilter,
});