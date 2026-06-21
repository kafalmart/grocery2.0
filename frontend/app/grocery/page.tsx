"use client";

import { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton"; // ✅ IMPORTANT FIX

const API = `${process.env.NEXT_PUBLIC_API_URL}/grocery`;

type Grocery = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
};

export default function GroceryPage() {
  const [items, setItems] = useState<Grocery[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH GROCERY ================= */
  const fetchGroceries = async () => {
    try {
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.log("Error fetching groceries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading groceries...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">
        🛒 Grocery Store
      </h1>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <p className="text-gray-500">No groceries available</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              {/* IMAGE */}
              <img
                src={
                  item.image
                    ? item.image.startsWith("http")
                      ? item.image
                      : `http://localhost:5000${item.image}`
                    : "https://via.placeholder.com/300"
                }
                className="h-40 w-full object-cover"
              />

              {/* DETAILS */}
              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {item.name}
                </h2>

                <p className="text-green-600 font-bold mt-1">
                  ₹{item.price}
                </p>

                <p className="text-sm text-gray-500">
                  {item.category || "General"}
                </p>

                <p className="text-sm text-gray-400">
                  Stock: {item.stock}
                </p>

                {/* BUTTON (FIXED) */}
                <AddToCartButton
                  item={{
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    type: "grocery",
                  }}
                />

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}