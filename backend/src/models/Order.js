import mongoose from "mongoose";

/**
 * Each item in order can be Food OR Grocery
 */
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "items.productModel",
    },

    productModel: {
      type: String,
      required: true,
      enum: ["Food", "Grocery"],
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // ================= USER =================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================= RESTAURANT (OPTIONAL for grocery) =================
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null,
    },

    restaurantName: {
      type: String,
      default: "Grocery Store",
    },

    // ================= CUSTOMER =================
    customerName: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    // ================= ITEMS =================
    items: [orderItemSchema],

    // ================= PRICING =================
    subTotal: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
      default: "",
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // ================= PAYMENT =================
    paymentMethod: {
      type: String,
      enum: ["cod", "prepaid"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "submitted", "verified", "rejected"],
      default: "pending",
    },

    // ================= ORDER STATUS =================
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
deliveryPartner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

acceptedAt: {
  type: Date,
  default: null,
},

deliveredAt: {
  type: Date,
  default: null,
},
const Order = mongoose.model("Order", orderSchema);

export default Order;
