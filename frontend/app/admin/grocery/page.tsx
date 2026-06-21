"use client";

import { useEffect, useState } from "react";

const API = `${process.env.NEXT_PUBLIC_API_URL}/grocery`;

type Grocery = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
};

export default function GroceryAdminPage() {
  const [items, setItems] = useState<Grocery[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<{
  name: string;
  price: string;
  image: File | null;
  category: string;
  stock: string;
}>({
  name: "",
  price: "",
  image: null,
  category: "",
  stock: "",
});

  /* =========================
     FETCH GROCERIES
  ========================= */
  const fetchGroceries = async () => {
    try {
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, []);

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     CREATE GROCERY
  ========================= */
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("price", form.price);
  formData.append("category", form.category);
  formData.append("stock", form.stock);

  if (form.image instanceof File) {
  formData.append("image", form.image);
}

  try {
    const res = await fetch(`${API}/create`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Grocery added successfully");

      setForm({
        name: "",
        price: "",
        image: null,
        category: "",
        stock: "",
      });

      fetchGroceries();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

  /* =========================
     DELETE GROCERY
  ========================= */
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Deleted successfully");
        fetchGroceries();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Grocery Panel
      </h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Grocery Name"
          className="border p-3 rounded-lg"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="border p-3 rounded-lg"
        />

      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
  if (!e.target.files || e.target.files.length === 0) return;

  setForm({
    ...form,
    image: e.target.files[0],
  });
}}
  className="border p-3 rounded-lg"
/>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-3 rounded-lg"
        />

        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Add Grocery
        </button>
      </form>

      {/* ================= LIST ================= */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-xl shadow"
            >
              {item.image && (
                <img
                  src={item.image}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}

              <h2 className="text-xl font-semibold mt-3">
                {item.name}
              </h2>

              <p className="text-green-600 font-bold">
                ₹{item.price}
              </p>

              <p className="text-sm text-gray-500">
                Category: {item.category}
              </p>

              <p className="text-sm text-gray-500">
                Stock: {item.stock}
              </p>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}