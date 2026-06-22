import Feedback from "../models/Feedback.js";
import Order from "../models/Order.js";

export const createFeedback = async (
  userId,
  orderId,
  data
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const alreadyExists =
    await Feedback.findOne({
      order: orderId,
    });

  if (alreadyExists) {
    throw new Error(
      "Feedback already submitted"
    );
  }

  return await Feedback.create({
    order: orderId,
    user: userId,
    rating: data.rating,
    comment: data.comment,
  });
};

export const getAllFeedbacks =
  async () => {
    return await Feedback.find()
      .populate("user", "name email")
      .populate({
        path: "order",
        populate: {
          path: "restaurant",
          select: "name",
        },
      })
      .sort({
        createdAt: -1,
      });
  };
  export const getMyFeedbacks = async (userId) => {
  return await Feedback.find({
    user: userId,
  })
    .populate("order")
    .sort({
      createdAt: -1,
    });
};