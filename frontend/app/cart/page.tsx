"use client";

import { useEffect, useState } from "react";
import {
  getCart,
  updateCart,
  removeFromCart,
} from "@/services/cart.service";
import { createOrder } from "@/services/order.service";
import Link from "next/link";

type CartItem = {
  food?: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  } | null;

  grocery?: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  } | null;

  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<"cod" | "prepaid">("cod");

  const [notes, setNotes] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  // ---------------- FETCH CART ----------------
  const fetchCart = async () => {
    try {
      const data = await getCart();

      const validItems = (data.items || []).filter(
        (item: CartItem) =>
          item.food !== null || item.grocery !== null
      );

      setCart(validItems);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ---------------- UPDATE ----------------
  const handleUpdate = async (id: string, qty: number) => {
    if (qty < 1) return;
    await updateCart(id, qty);
    fetchCart();
  };

  // ---------------- REMOVE ----------------
  const handleRemove = async (id: string) => {
    await removeFromCart(id);
    fetchCart();
  };

  // ---------------- TOTAL (FIXED) ----------------
  const total = cart.reduce((acc, item) => {
    const product = item.food || item.grocery;
    return acc + (product?.price ?? 0) * item.quantity;
  }, 0);

  const deliveryFee = total > 500 ? 0 : 40;
  const grandTotal = total + deliveryFee;

  // ---------------- PLACE ORDER ----------------
  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address");
      return;
    }

    if (!acceptedPolicy) {
      alert("Please accept policy");
      return;
    }

    setProcessing(true);

    try {
      const order = await createOrder({
        address,
        notes,
        paymentMethod,
      });

      const proceed = window.confirm(
        "Your order has been placed successfully.\n\nProceed to WhatsApp?"
      );

      setCart([]);

      if (proceed && order?.whatsappUrl) {
        window.location.href = order.whatsappUrl;
        return;
      }

      window.location.href = "/orders";
    } catch (err: any) {
      console.error("ORDER ERROR:", err?.response?.data);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to place order"
      );
    } finally {
      setProcessing(false);
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl flex justify-between"
                >
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- EMPTY CART ----------------
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-5xl">
            🛒
          </div>

          <h2 className="text-3xl font-bold mt-6">
            Your Cart is Empty
          </h2>

          <p className="text-slate-500 mt-3">
            Add delicious meals and groceries to get started.
          </p>

          <Link
            href="/restaurants"
            className="inline-block mt-6 bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- MAIN UI (UNCHANGED) ----------------
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* HERO */}
      <section className="bg-[#020625] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition"
          >
            ← Continue Shopping
          </Link>

          <div className="mt-6">
            <span className="inline-flex px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
              Checkout
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold">
              Your Cart
            </h1>

            <p className="mt-3 text-slate-400 text-lg">
              {cart.length} item(s) ready for delivery
            </p>
          </div>

        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* CART ITEMS */}
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="p-6 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900">
                  Cart Items
                </h2>
              </div>

              <div className="divide-y divide-slate-100">

                {cart.map((item) => {
                  const product = item.food || item.grocery;
                  if (!product) return null;

                  return (
                    <div
                      key={product._id}
                      className="p-5 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                        {product.image && (
                          <img
                            src={
                              product.image.startsWith("http")
                                ? product.image
                                : `https://grocery-0byj.onrender.com${product.image}`
                            }
                            alt={product.name}
                            className="w-full sm:w-28 h-44 sm:h-28 rounded-2xl object-cover"
                          />
                        )}

                        <div className="flex-1">

                          <h3 className="text-lg font-semibold text-slate-900">
                            {product.name}
                          </h3>

                          <p className="text-green-600 font-bold text-lg mt-1">
                            ₹{product.price}
                          </p>

                          <p className="text-slate-500 text-sm mt-1">
                            Total ₹{product.price * item.quantity}
                          </p>

                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-4">

                          <div className="flex items-center bg-slate-100 rounded-2xl overflow-hidden">

                            <button
                              onClick={() =>
                                handleUpdate(product._id, item.quantity - 1)
                              }
                              className="w-10 h-10 hover:bg-green-100 transition"
                            >
                              −
                            </button>

                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleUpdate(product._id, item.quantity + 1)
                              }
                              className="w-10 h-10 hover:bg-green-100 transition"
                            >
                              +
                            </button>

                          </div>

                          <button
                            onClick={() => handleRemove(product._id)}
                            className="text-red-500 text-sm font-medium hover:text-red-700"
                          >
                            Remove
                          </button>

                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 lg:sticky lg:top-24">

              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-slate-600 mb-4">
                <span className="font-semibold text-lg">Total</span>
                <span className="text-3xl font-bold text-green-600">
                  ₹{total}
                </span>
              </div>

              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full delivery address"
                className="w-full border border-slate-200 rounded-2xl p-4 mb-4"
              />

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special instructions"
                className="w-full border border-slate-200 rounded-2xl p-4 mb-4"
              />

              <label className="flex gap-2 text-sm mb-4">
                <input
                  type="checkbox"
                  checked={acceptedPolicy}
                  onChange={(e) =>
                    setAcceptedPolicy(e.target.checked)
                  }
                />
                I agree to policy
              </label>

              <button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold"
              >
                {processing
                  ? "Placing Order..."
                  : `Place Order • ₹${grandTotal}`}
              </button>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}