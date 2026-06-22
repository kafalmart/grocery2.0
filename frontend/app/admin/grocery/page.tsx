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
    <div className="min-h-screen bg-slate-50">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14">
    {/* HEADER */}
    <div className="mb-10">
     

      <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4">
        Grocery Management
      </h1>

      <p className="text-slate-500 mt-2">
        Add, manage and delete grocery items
      </p>
    </div>

    {/* ================= FORM ================= */}
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-green-100 p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Grocery Name"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
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
        className="w-full rounded-xl border border-slate-200 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-green-600 hover:file:bg-green-100"
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
      />

      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        type="number"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
      />

      <button
        type="submit"
        className="md:col-span-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700 hover:shadow-lg"
      >
        Add Grocery
      </button>
    </form>

    {/* ================= LIST ================= */}
    {loading ? (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">Loading...</p>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl border border-green-100 p-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* IMAGE */}
              <div className="relative h-32 w-full sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* RIGHT SECTION */}
              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-slate-900 truncate">
                      {item.name}
                    </h2>

                    
                  </div>

                  <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                    {item.category || "General"}
                  </span>
                </div>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      Stock: {item.stock}
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
}