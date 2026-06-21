"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import Link from "next/link";

type Food = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  type: "veg" | "non-veg";
  category?: {
    _id: string;
    name: string;
  } | string;
  
};

export default function AdminRestaurantFoods() {
  const { id } = useParams();
  
  const [foods, setFoods] = useState<Food[]>([]);
  const [restaurantName, setRestaurantName] = useState("");
const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
  name: "",
  description: "",
  price: "",
  type: "veg",
  category: "",
});

  // ================= FETCH FOODS =================
  const fetchFoods = async () => {
    try {
      const res = await api.get(`/foods/restaurant/${id}`);
      setFoods(res.data.data);
    } catch (err) {
      console.log("Error fetching foods:", err);
    }
  };
  const fetchCategories = async () => {
  try {
    const res = await api.get(`/categories/${id}`);
    setCategories(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

  // ================= FETCH RESTAURANT =================
  const fetchRestaurant = async () => {
    try {
      const res = await api.get(`/restaurants/${id}`);
      setRestaurantName(res.data.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFoods();
      fetchRestaurant();
      fetchCategories();
    }
  }, [id]);

  // ================= ADD FOOD =================
  const addFood = async () => {
    setLoading(true);

    try {
      
      const restaurantId = Array.isArray(id) ? id[0] : id;

if (!restaurantId) {
  alert("Restaurant ID not found");
  return;
}
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("price", form.price);
      formData.append("type", form.type);
      
formData.append("restaurant", restaurantId);
formData.append("category", form.category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.post("/foods", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // reset form
     setForm({
  name: "",
  description: "",
  price: "",
  type: "veg",
  category: "",
});

      setImageFile(null);
      setPreview("");

      setShowModal(false);

      fetchFoods();

      alert("Food added successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to add food ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE FOOD =================
  const deleteFood = async (foodId: string) => {
    try {
      await api.delete(`/foods/${foodId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchFoods();
    } catch (err) {
      console.log(err);
      alert("Failed to delete food");
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    🍔 {restaurantName} Menu
  </h1>

  <div className="flex gap-3">
    <Link
      href={`/admin/restaurants/${id}/category`}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      + Categories
    </Link>

    <button
      onClick={() => setShowModal(true)}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      + Add Food
    </button>
  </div>
</div>

      {/* FOODS LIST */}
      {foods.length === 0 ? (
        <p className="text-gray-500">No foods found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {foods.map((food) => (
            <div key={food._id} className="bg-white p-4 rounded shadow">

              <div className="flex justify-between">
                <h2 className="font-bold">{food.name}</h2>

                <span className={`text-xs px-2 py-1 rounded ${
                  food.type === "veg"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {food.type}
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-1">
                {food.description}
              </p>
              <p className="text-sm text-gray-400 mt-1">
  Category: {typeof food.category === "object"
    ? food.category.name
    : "Unassigned"}
</p>

              <p className="font-bold mt-2">
                ₹{food.price}
              </p>

              {/* IMAGE FIXED */}
              {food.image && (
                <img
                  src={
                    food.image.startsWith("http")
                      ? food.image
                      : `https://grocery-0byj.onrender.com/${food.image.replace(/^\/+/, "")}`
                  }
                  className="w-full h-40 object-cover rounded mt-3"
                />
              )}

              <div className="flex gap-2 mt-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button
                  onClick={() => deleteFood(food._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[400px]">

            <h2 className="text-xl font-bold mb-4">Add Food</h2>

            <input
              placeholder="Name"
              className="w-full border p-2 mb-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            <select
  className="w-full border p-2 mb-2"
  value={form.category}
  onChange={(e) =>
    setForm({ ...form, category: e.target.value })
  }
>
  <option value="">Select Category</option>

  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>

            <input
              placeholder="Description"
              className="w-full border p-2 mb-2"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              className="w-full border p-2 mb-2"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <select
              className="w-full border p-2 mb-2"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>

            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 mb-2"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            {preview && (
              <img
                src={preview}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>

              <button
                onClick={addFood}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2"
              >
                {loading ? "Adding..." : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}