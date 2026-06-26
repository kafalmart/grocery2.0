import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true,
},

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

   hasHalf: {
  type: Boolean,
  default: false,
},

halfPrice: {
  type: Number,
  default: 0,
  min: 0,
},

fullPrice: {
  type: Number,
  required: true,
  min: 0,
},

    type: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;