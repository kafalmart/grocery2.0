import Order from "../models/Order.js";
import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";

export const getDashboardData =
  async () => {
    const totalOrders =
      await Order.countDocuments();

    const pendingOrders =
      await Order.countDocuments({
        status: "pending",
      });

    const confirmedOrders =
      await Order.countDocuments({
        status: "confirmed",
      });

    const deliveredOrders =
      await Order.countDocuments({
        status: "delivered",
      });

    const cancelledOrders =
      await Order.countDocuments({
        status: "cancelled",
      });

    const totalRestaurants =
      await Restaurant.countDocuments();

    const totalFoods =
      await Food.countDocuments();

    const totalUsers =
      await User.countDocuments({
        role: "user",
      });

    const deliveredOrderList =
      await Order.find({
        status: "delivered",
      });

    const totalRevenue =
      deliveredOrderList.reduce(
        (sum, order) =>
          sum + order.totalAmount,
        0
      );

    const recentOrders =
      await Order.find()
        .populate(
          "user",
          "name email phone"
        )
        .sort({
          createdAt: -1,
        })
        .limit(10);

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRestaurants,
      totalFoods,
      totalUsers,
      totalRevenue,
      recentOrders,
    };
  };

export const getAllUsers =
  async () => {
    return await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });
  };

export const getUserById =
  async (userId) => {
    const user = await User.findById(
      userId
    ).select("-password");

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    return user;
  };