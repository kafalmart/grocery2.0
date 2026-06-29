import * as feedbackService from "../services/feedback.service.js";

export const createFeedback =
  async (req, res) => {
    try {
      const feedback =
        await feedbackService.createFeedback(
          req.user.id,
          req.params.orderId,
          req.body
        );

      res.status(201).json({
        success: true,
        data: feedback,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getAllFeedbacks =
  async (req, res) => {
    try {
      const feedbacks =
        await feedbackService.getAllFeedbacks();

      res.json({
        success: true,
        data: feedbacks,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const toggleFeatured = async (req, res) => {
  try {
    const feedback =
      await feedbackService.toggleFeatured(
        req.params.id
      );

    res.json({
      success: true,
      data: feedback,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
export const getFeaturedFeedbacks = async (
  req,
  res
) => {
  try {
    const data =
      await feedbackService.getFeaturedFeedbacks();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
  export const getMyFeedbacks = async (
  req,
  res
) => {
  try {
    const feedbacks =
      await feedbackService.getMyFeedbacks(
        req.user.id
      );

    res.json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};