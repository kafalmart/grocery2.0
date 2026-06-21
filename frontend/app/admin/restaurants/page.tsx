"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";

type Restaurant = {
  _id: string;
  name: string;
  description: string;
  address: string;
  openTime: string;
  closeTime: string;
  image?: string;
  featured?: boolean;
};


export default function AdminRestaurants() {
  const [editRestaurant, setEditRestaurant] =
    useState<Restaurant | null>(null);
  
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    address: "",
    openTime: "",
    closeTime: "",
  });
  
  const [editImage, setEditImage] =
    useState<File | null>(null);
  
  const [editPreview, setEditPreview] =
    useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    openTime: "",
    closeTime: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await api.get("/restaurants");

      // ✅ SAFE HANDLING (backend returns { success, data })
      setRestaurants(res?.data?.data || []);
    } catch (err) {
      console.log("Fetch error:", err);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };
const [deleteId, setDeleteId] = useState<string | null>(null);
  useEffect(() => {
    fetchData();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= CREATE =================
  const createRestaurant = async () => {
    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("address", form.address);
      formData.append("openTime", form.openTime);
      formData.append("closeTime", form.closeTime);

      if (imageFile) {
        formData.append("image", imageFile); // MUST MATCH backend multer field
      }

      await api.post("/restaurants", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // reset
      setShowModal(false);
      setForm({
        name: "",
        description: "",
        address: "",
        openTime: "",
        closeTime: "",
      });
      setImageFile(null);
      setPreview("");

      await fetchData();
    } catch (err) {
      console.log("Create error:", err);
      alert("Failed to create restaurant");
    } finally {
      setSubmitting(false);
    }
  };


  const updateRestaurant = async () => {
  if (!editRestaurant) return;

  try {
    setSubmitting(true);

    const formData = new FormData();

    formData.append("name", editForm.name);
    formData.append(
      "description",
      editForm.description
    );
    formData.append(
      "address",
      editForm.address
    );
    formData.append(
      "openTime",
      editForm.openTime
    );
    formData.append(
      "closeTime",
      editForm.closeTime
    );

    if (editImage) {
      formData.append("image", editImage);
    }

    await api.put(
      `/restaurants/${editRestaurant._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    setEditRestaurant(null);
    setEditImage(null);
    setEditPreview("");

    fetchData();
  } catch (err) {
    console.log(err);
    alert("Failed to update restaurant");
  } finally {
    setSubmitting(false);
  }
};
const toggleFeatured = async (id: string) => {
  try {
    const res = await api.patch(
      `/restaurants/${id}/featured`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const updated = res.data.data;

    // update UI instantly
    setRestaurants((prev) =>
      prev.map((r) =>
        r._id === id ? updated : r
      )
    );
  } catch (err) {
    console.log("Toggle featured error:", err);
  }
};
  // ================= DELETE =================
  const deleteRestaurant = async (id: string) => {
    try {
      await api.delete(`/restaurants/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

 return (
  <div className="min-h-screen bg-slate-50 p-8">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Restaurants
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all restaurant listings and menus
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-medium shadow-lg transition"
        >
          + Add Restaurant
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm">
            Total Restaurants
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {restaurants.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm">
            Active Listings
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {restaurants.length}
          </h2>
        </div>

        {/* <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm">
            Admin Panel
          </p>

          <h2 className="text-3xl font-bold mt-2">
            🍽️
          </h2>
        </div> */}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 bg-white rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
          <div className="text-6xl mb-4">
            🍽️
          </div>

          <h2 className="text-2xl font-bold">
            No Restaurants Found
          </h2>

          <p className="text-slate-500 mt-2">
            Start by adding your first restaurant.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
             <div className="h-52 bg-slate-100 relative">
                {r.image ? (
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🍽️
                  </div>
                )}
                 {r.featured && (
    <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
      Featured
    </span>
  )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-bold text-xl text-slate-900">
                  {r.name}
                </h2>

                <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                  {r.description}
                </p>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-slate-600">
                    📍 {r.address}
                  </p>

                  <p className="text-sm text-slate-600">
                    🕒 {r.openTime} - {r.closeTime}
                  </p>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
  onClick={() => toggleFeatured(r._id)}
  className={`px-4 py-3 rounded-xl border transition font-medium
    ${
      r.featured
        ? "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
    }`}
>
  {r.featured ? "★ Featured" : "☆ Feature"}
</button>
  <Link
    href={`/admin/restaurants/${r._id}/foods`}
    className="flex-1 text-center bg-black text-white py-3 rounded-xl hover:bg-slate-800 transition"
  >
    Menu
  </Link>

  <button
    onClick={() => {
      setEditRestaurant(r);

      setEditForm({
        name: r.name,
        description: r.description,
        address: r.address,
        openTime: r.openTime,
        closeTime: r.closeTime,
      });

     setEditPreview(r.image || "")
    }}
    className="px-4 py-3 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 transition font-medium"
  >
    Edit
  </button>

  <button
    onClick={() => setDeleteId(r._id)}
    className="px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition font-medium"
  >
    Delete
  </button>
</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Add Restaurant
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Restaurant Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="openTime"
                  placeholder="Opening Time"
                  value={form.openTime}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <input
                  name="closeTime"
                  placeholder="Closing Time"
                  value={form.closeTime}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                className="w-full border border-slate-200 rounded-xl p-3"
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
                  alt=""
                  className="w-full h-56 object-cover rounded-2xl"
                />
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl border border-slate-200"
                >
                  Cancel
                </button>

                <button
                  onClick={createRestaurant}
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Restaurant"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
    {editRestaurant && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Edit Restaurant
        </h2>

        <button
          onClick={() =>
            setEditRestaurant(null)
          }
          className="text-slate-400 hover:text-black"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">

        <input
          value={editForm.name}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              name: e.target.value,
            })
          }
          placeholder="Restaurant Name"
          className="w-full border rounded-xl p-3"
        />

        <input
          value={editForm.description}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              description:
                e.target.value,
            })
          }
          placeholder="Description"
          className="w-full border rounded-xl p-3"
        />

        <input
          value={editForm.address}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              address:
                e.target.value,
            })
          }
          placeholder="Address"
          className="w-full border rounded-xl p-3"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            value={editForm.openTime}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                openTime:
                  e.target.value,
              })
            }
            placeholder="Open Time"
            className="border rounded-xl p-3"
          />

          <input
            value={editForm.closeTime}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                closeTime:
                  e.target.value,
              })
            }
            placeholder="Close Time"
            className="border rounded-xl p-3"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (file) {
              setEditImage(file);
              setEditPreview(
                URL.createObjectURL(file)
              );
            }
          }}
          className="w-full border rounded-xl p-3"
        />

        {editPreview && (
          <img
            src={editPreview}
            alt=""
            className="w-full h-56 rounded-2xl object-cover"
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={() =>
              setEditRestaurant(null)
            }
            className="px-6 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={updateRestaurant}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
          >
            Update Restaurant
          </button>
        </div>

      </div>
    </div>
  </div>
)}
    {deleteId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">

      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M5.07 19H18.93C20.54 19 21.55 17.26 20.75 15.87L13.82 3.87C13.02 2.48 10.98 2.48 10.18 3.87L3.25 15.87C2.45 17.26 3.46 19 5.07 19z"
          />
        </svg>
      </div>

      <h3 className="text-center text-xl font-bold text-gray-900">
        Delete Restaurant?
      </h3>

      <p className="mt-2 text-center text-gray-500">
        This action cannot be undone. The restaurant and all associated data may be removed permanently.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setDeleteId(null)}
          className="flex-1 rounded-xl border border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await deleteRestaurant(deleteId);
            setDeleteId(null);
          }}
          className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-700 transition"
        >
          Yes, Delete
        </button>
      </div>

    </div>
    
  </div>
)}
  </div>
);
}