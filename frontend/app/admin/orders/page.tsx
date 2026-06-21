"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  Package,
  CreditCard,
  Receipt,
} from "lucide-react";

type Order = {
  _id: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
};

const orderStatusOptions = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const paymentStatusOptions = [
  "pending",
  "submitted",
  "verified",
  "rejected",
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/admin/all");
      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await api.put(`/orders/admin/${id}/status`, {
        status,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      console.log(
        "Order status update failed",
        err
      );
    }
  };

  const updatePaymentStatus = async (
    id: string,
    paymentStatus: string
  ) => {
    try {
      await api.put(
        `/orders/admin/${id}/payment-status`,
        {
          paymentStatus,
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, paymentStatus }
            : order
        )
      );
    } catch (err) {
      console.log(
        "Payment status update failed",
        err
      );
    }
  };

  const getOrderStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "preparing":
        return "bg-purple-100 text-purple-700";

      case "ready":
        return "bg-cyan-100 text-cyan-700";

      case "out_for_delivery":
        return "bg-orange-100 text-orange-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPaymentStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "submitted":
        return "bg-blue-100 text-blue-700";

      case "verified":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white shadow-xl">

        <h1 className="text-3xl font-bold">
          Order Management
        </h1>

        <p className="mt-2 text-green-50">
          Track and manage customer orders
        </p>

      </div>

      <div className="grid gap-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
          >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-3">

                  <div className="rounded-2xl bg-green-100 p-3">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>

                  <div>

                    <h2 className="font-semibold text-slate-900">
                      Order #{order._id.slice(-8)}
                    </h2>

                    <p className="text-sm text-slate-500">
                      Full ID: {order._id}
                    </p>

                  </div>

                </div>

                <div className="mt-5 flex flex-wrap gap-3">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${getOrderStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.replaceAll(
                      "_",
                      " "
                    )}
                  </span>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${getPaymentStatusColor(
                      order.paymentStatus
                    )}`}
                  >
                    Payment:{" "}
                    {order.paymentStatus}
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-5 py-4">

                <Receipt className="h-5 w-5 text-slate-500" />

                <div>

                  <p className="text-sm text-slate-500">
                    Total Amount
                  </p>

                  <p className="text-2xl font-bold text-green-600">
                    ₹{order.totalAmount}
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              <div className="rounded-2xl border border-slate-200 p-4">

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">

                  <Package className="h-4 w-4" />

                  Order Status

                </label>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                >
                  {orderStatusOptions.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status.replaceAll(
                          "_",
                          " "
                        )}
                      </option>
                    )
                  )}
                </select>

              </div>

              <div className="rounded-2xl border border-slate-200 p-4">

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">

                  <CreditCard className="h-4 w-4" />

                  Payment Status

                </label>

                <select
                  value={order.paymentStatus}
                  onChange={(e) =>
                    updatePaymentStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                >
                  {paymentStatusOptions.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>

              </div>

            </div>

          </div>

        ))}

      </div>

      {orders.length === 0 && (
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

          <Package className="mx-auto h-16 w-16 text-slate-300" />

          <h3 className="mt-4 text-xl font-semibold text-slate-700">
            No orders found
          </h3>

          <p className="mt-2 text-slate-500">
            New customer orders will appear here.
          </p>

        </div>
      )}

    </div>
  );
}