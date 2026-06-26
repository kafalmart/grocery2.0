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
const CATEGORIES = [
  "All",
  "Vegetables",
  "Fruits",
  "Snacks",
  "Daily Essentials",
  "Kitchen Grocery",
  "Other",
];

const [selectedCategory, setSelectedCategory] = useState("All");
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
  const filteredItems =
  selectedCategory === "All"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-6">
   
      {/* HEADER */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">

        <div className="text-center lg:text-left">

          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-medium text-orange-600">
            If you can't find the item you want you can directly message us at +91 8439051530
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Find Your
            <span className="text-green-600">
              {" "}Daily essensials and Grocery
            </span>
          </h1>

         


        </div>
      </section>
       <div className="max-w-7xl mx-auto mb-8 overflow-x-auto">
  <div className="flex gap-3 pb-2">
    {CATEGORIES.map((category) => (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`whitespace-nowrap rounded-full px-5 py-2 font-medium transition ${
          selectedCategory === category
            ? "bg-green-500 text-white"
            : "bg-white border border-green-200 text-gray-700 hover:bg-green-50"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
</div>

      {/* EMPTY STATE */}
      {filteredItems.length === 0 ? (
        <p className="text-gray-500">No groceries available</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        {filteredItems.map((item) => (
           <div
  key={item._id}
  className="bg-white rounded-2xl border border-green-100 p-4 hover:shadow-lg transition-all duration-300"
>
  <div className="flex flex-col sm:flex-row gap-4">
    {/* IMAGE */}
    <div className="relative h-32 w-full sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
      <img
        src={
          item.image
            ? item.image.startsWith("http")
              ? item.image
              : `http://localhost:5000${item.image}`
            : "https://via.placeholder.com/300"
        }
        alt={item.name}
        className="h-full w-full object-cover"
      />
    </div>

    {/* RIGHT SECTION */}
    <div className="flex flex-1 flex-col justify-between min-w-0">
      {/* TOP */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-slate-900 truncate">
            {item.name}
          </h2>

         
        </div>

        <span className="shrink-0 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-[#F97316]">
         {item.category || "General"}
        </span>
      </div>

      {/* BOTTOM */}
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">
            Stock: {item.stock}
          </p>

          <p className="text-2xl font-bold text-[#F97316]">
            ₹{item.price}
          </p>
        </div>

        <div className="min-w-[140px]">
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
    </div>
  </div>
</div>
          ))}

        </div>
      )}
    </div>
  );
}