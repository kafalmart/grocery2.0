"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import Link from "next/link";

type Food = {
  _id: string;
  name: string;
  description: string;
 hasHalf: boolean;
  halfPrice: number;
  fullPrice: number;
  image?: string;
  type: "veg" | "non-veg";
  category?: {
    _id: string;
    name: string;
  } | string;
};

type Category = {
  _id: string;
  name: string;
};

export default function AdminRestaurantFoods() {
  const { id } = useParams();

  const [foods, setFoods] = useState<Food[]>([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

 const [form, setForm] = useState({
  name: "",
  description: "",

  hasHalf: false,

  halfPrice: "",
  fullPrice: "",

  type: "veg",
  category: "",
});

  // ================= FETCH FOODS =================
  const fetchFoods = async () => {
    try {
      const res = await api.get(`/foods/restaurant/${id}`);
      setFoods(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH CATEGORIES =================
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
      fetchCategories();
      fetchRestaurant();
    }
  }, [id]);

  // ================= RESET FORM =================
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      hasHalf: false,
halfPrice: "",
fullPrice: "",
      type: "veg",
      category: "",
    });
    setImageFile(null);
    setPreview("");
  };

  // ================= ADD / UPDATE FOOD =================
  const saveFood = async () => {
    setLoading(true);

    try {
      const restaurantId = Array.isArray(id) ? id[0] : id;

      if (!restaurantId) {
        alert("Restaurant ID missing");
        return;
      }

      if (!form.name || !form.fullPrice || !form.description || !form.category) {
        alert("All fields required");
        return;
      }

      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("hasHalf", String(form.hasHalf));
formData.append("halfPrice", form.halfPrice);
formData.append("fullPrice", form.fullPrice);
      formData.append("type", form.type);
      formData.append("restaurant", restaurantId);
      formData.append("category", form.category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editId) {
        await api.put(`/foods/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/foods", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setEditId(null);
      setShowModal(false);
      resetForm();
      fetchFoods();
    } catch (err: any) {
      console.log(err?.response?.data || err);
      alert(err?.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT FOOD =================
  const handleEdit = (food: Food) => {
    setEditId(food._id);

    setForm({
      name: food.name,
      description: food.description,
     hasHalf: food.hasHalf,
halfPrice: String(food.halfPrice),
fullPrice: String(food.fullPrice),
      type: food.type,
      category:
        typeof food.category === "object"
          ? food.category._id
          : food.category || "",
    });

    setPreview(food.image || "");
    setShowModal(true);
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
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setEditId(null);
              resetForm();
              setShowModal(true);
            }}
          >
            + Add Food
          </button>
        </div>
      </div>

      {/* FOOD LIST */}
      {foods.length === 0 ? (
        <p className="text-gray-500">No foods found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {foods.map((food) => (
            <div key={food._id} className="bg-white p-4 shadow rounded">

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

              <p className="text-sm text-gray-500 mt-1">
                {food.description}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Category: {typeof food.category === "object"
                  ? food.category.name
                  : "Unassigned"}
              </p>

             {food.hasHalf ? (
  <>
    <p className="font-bold text-green-600">
      Half : ₹{food.halfPrice}
    </p>

    <p className="font-bold text-orange-600">
      Full : ₹{food.fullPrice}
    </p>
  </>
) : (
  <p className="font-bold mt-2">
    ₹{food.fullPrice}
  </p>
)}

              {food.image && (
                <img
                  src={food.image}
                  className="w-full h-40 object-cover rounded mt-3"
                />
              )}

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(food)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
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

            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Food" : "Add Food"}
            </h2>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <select
              className="w-full border p-2 mb-2"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

           <label className="flex items-center gap-2 mb-3">
  <input
    type="checkbox"
    checked={form.hasHalf}
    onChange={(e) =>
      setForm({
        ...form,
        hasHalf: e.target.checked,
      })
    }
  />
  Available in Half
</label>

{form.hasHalf && (
  <input
    type="number"
    className="w-full border p-2 mb-2"
    placeholder="Half Price"
    value={form.halfPrice}
    onChange={(e) =>
      setForm({
        ...form,
        halfPrice: e.target.value,
      })
    }
  />
)}

<input
  type="number"
  className="w-full border p-2 mb-2"
  placeholder="Full Price"
  value={form.fullPrice}
  onChange={(e) =>
    setForm({
      ...form,
      fullPrice: e.target.value,
    })
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
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  resetForm();
                }}
                className="border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={saveFood}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2"
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Food"
                  : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}