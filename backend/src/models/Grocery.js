import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Vegetables",
        "Fruits",
        "Snacks",
        "Daily Essentials",
        "Kitchen Grocery",
        "Other",
      ],
      default: "Other",
    },

    stock: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Grocery", grocerySchema);