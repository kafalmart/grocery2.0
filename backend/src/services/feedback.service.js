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

export const getFeaturedFeedbacks =
  async () => {
    return await Feedback.find({
      featured: true,
    })
      .populate("user", "name")
      .sort({
        createdAt: -1,
      })
      .limit(3);
  };
export const toggleFeatured = async (id) => {
  const feedback = await Feedback.findById(id);

  if (!feedback) {
    throw new Error("Feedback not found");
  }

  feedback.featured = !feedback.featured;

  await feedback.save();

  return feedback;
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