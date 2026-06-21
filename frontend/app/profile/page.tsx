"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/auth.service";
import { getMyOrders } from "@/services/order.service";
import Link from "next/link";

type User = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  joinedAt?: string;
};

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  createdAt: string;
  paymentMethod?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("orders");

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, ordersData] = await Promise.all([
          getProfile(),
          getMyOrders(),
        ]);

        setUser(profileRes.data);
        setOrders(ordersData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusEmoji = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "confirmed":
        return "✅";
      case "preparing":
        return "🍳";
      case "delivered":
        return "🚚";
      case "cancelled":
        return "❌";
      default:
        return "📦";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-xl mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">User not found</h2>
          <p className="text-gray-500 mb-6">Please login to view your profile</p>
          <Link href="/login" className="inline-block bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-[#FAFAFA] py-8 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-400">
          My Account
        </span>

        <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-gray-500 text-lg">
          Manage your profile and track all your food orders.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
            activeTab === "orders"
              ? "bg-orange-300 text-white shadow-lg"
              : "bg-white border border-gray-200 text-gray-400 hover:border-orange-300"
          }`}
        >
          🧾 Orders
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
            activeTab === "profile"
              ? "bg-orange-300 text-white shadow-lg"
              : "bg-white border border-gray-200 text-gray-400 hover:border-orange-300"
          }`}
        >
          👤 Profile
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-xl">

          {/* Hero */}
          <div className="bg-gray-500 px-8 py-10 text-white">

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-4xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold">
                  {user.name}
                </h2>

                <p className="text-orange-100 mt-2">
                  Member since{" "}
                  {user.joinedAt
                    ? new Date(user.joinedAt).getFullYear()
                    : "2024"}
                </p>
              </div>

            </div>

          </div>

          {/* Details */}
          <div className="p-8">

            <div className="grid md:grid-cols-2 gap-5">

              <div className="rounded-3xl bg-orange-50 p-5 border border-orange-100">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Email Address
                </p>

                <p className="font-semibold text-gray-800 break-all">
                  {user.email}
                </p>
              </div>

              <div className="rounded-3xl bg-orange-50 p-5 border border-orange-100">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Phone Number
                </p>

                <p className="font-semibold text-gray-800">
                  {user.phone || "Not Provided"}
                </p>
              </div>

            </div>

            <button className="mt-8 w-full rounded-2xl bg-orange-400 py-4 font-semibold text-white transition hover:bg-orange-500">
              Edit Profile
            </button>

          </div>

        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-6">

          {orders.length === 0 ? (
            <div className="rounded-[32px] bg-white border border-gray-100 shadow-xl p-14 text-center">

              <div className="text-7xl mb-5">
                🍽️
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                No Orders Yet
              </h3>

              <p className="mt-3 text-gray-500">
                Explore restaurants and place your first order.
              </p>

              <Link
                href="/restaurants"
                className="inline-flex mt-7 bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-400 transition"
              >
                Browse Restaurants
              </Link>

            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all"
              >

                {/* Top */}
                <div className="bg-orange-50 px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Order ID
                    </p>

                    <p className="font-semibold text-gray-900">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Date
                    </p>

                    <p className="text-gray-700">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusEmoji(order.status)}{" "}
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>

                </div>

                {/* Items */}
                <div className="p-6">

                  <div className="space-y-3">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <div className="text-gray-700">
                          {item.name}
                          <span className="ml-2 text-gray-400">
                            × {item.quantity}
                          </span>
                        </div>

                        <div className="font-semibold text-gray-900">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.items.length > 3 && (
                    <p className="mt-3 text-sm text-gray-400">
                      + {order.items.length - 3} more items
                    </p>
                  )}

                  <div className="mt-6 border-t border-gray-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        Total Amount
                      </p>

                      <p className="text-3xl font-bold text-orange-500">
                        ₹{order.totalAmount}
                      </p>
                    </div>

                    {order.status !== "cancelled" &&
                      order.status !== "delivered" && (
                        <span className="bg-orange-100 text-orange-400 px-4 py-2 rounded-full text-sm font-medium">
                          🚚 Preparing Soon
                        </span>
                      )}

                  </div>

                </div>

              </div>
            ))
          )}

          {orders.length > 0 && (
            <div className="text-center pt-4">
              <p className="text-gray-400">
                Showing {orders.length} order
                {orders.length > 1 ? "s" : ""}
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  </div>
);
}