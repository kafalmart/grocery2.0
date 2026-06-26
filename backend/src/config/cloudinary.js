import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Safer log (don't expose secrets)
console.log("✅ Cloudinary Configured", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  apiKeyExists: !!process.env.CLOUDINARY_API_KEY,
  apiSecretExists: !!process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;