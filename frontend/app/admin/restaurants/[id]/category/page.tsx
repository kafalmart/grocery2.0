"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";

type Category = {
  _id: string;
  name: string;
  image?: string;
};

export default function AdminCategories() {
  const { id } = useParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
const [preview, setPreview] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/categories/${id}`);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) fetchCategories();
  }, [id]);

  const addCategory = async () => {
    try {
      setLoading(true);

    const formData = new FormData();
formData.append("name", name);
formData.append("restaurant", String(id));

if (imageFile) {
  formData.append("image", imageFile);
}

await api.post("/categories", formData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

    setName("");
setImageFile(null);
setPreview("");
setShowModal(false);
fetchCategories();

      alert("Category added ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to add category ❌");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (catId: string) => {
    try {
      await api.delete(`/categories/${catId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          📁 Categories
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {/* LIST */}
      {categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((c) => (
           <div
  key={c._id}
  className="bg-white p-4 rounded shadow"
>
  {c.image && (
  <img
    src={c.image}
    alt={c.name}
    className="w-full h-32 object-cover rounded mb-3"
  />
)}

  <div className="flex justify-between items-center">
    <p className="font-bold">{c.name}</p>

    <button
      onClick={() => deleteCategory(c._id)}
      className="text-red-500"
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
              Add Category
            </h2>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          <label className="block mb-3">
  <span className="block text-sm font-medium mb-2">
    Category Image
  </span>

  <input
    type="file"
    accept="image/*"
    className="w-full rounded-lg border border-gray-300 p-2 cursor-pointer"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }}
  />
</label>

{preview && (
  <img
    src={preview}
    alt="Preview"
    className="w-full h-40 object-cover rounded mb-3"
  />
)}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="border px-3 py-2"
              >
                Cancel
              </button>

              <button
                onClick={addCategory}
                disabled={loading}
                className="bg-black text-white px-3 py-2"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
