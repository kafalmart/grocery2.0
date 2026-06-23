"use client";

import { useEffect, useState } from "react";

const API = `${process.env.NEXT_PUBLIC_API_URL}/coupons`;
export default function CouponAdminPage() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscount: "",
    expiryDate: "",
  });

  /* =========================
     FETCH ALL COUPONS
  ========================= */
  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     CREATE COUPON
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Coupon created!");
        setForm({
          code: "",
          discountType: "percentage",
          discountValue: "",
          minOrderAmount: "",
          maxDiscount: "",
          expiryDate: "",
        });
        fetchCoupons();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
     DELETE COUPON
  ========================= */
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Coupon deleted");
        fetchCoupons();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Coupon Panel</h1>

      {/* ================= CREATE FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-8 grid grid-cols-2 gap-4"
      >
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Coupon Code"
          className="border p-2 rounded"
        />

        <select
          name="discountType"
          value={form.discountType}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>

        <input
          name="discountValue"
          value={form.discountValue}
          onChange={handleChange}
          placeholder="Discount Value"
          type="number"
          className="border p-2 rounded"
        />

        <input
          name="minOrderAmount"
          value={form.minOrderAmount}
          onChange={handleChange}
          placeholder="Min Order Amount"
          type="number"
          className="border p-2 rounded"
        />

        <input
          name="maxDiscount"
          value={form.maxDiscount}
          onChange={handleChange}
          placeholder="Max Discount"
          type="number"
          className="border p-2 rounded"
        />

        <input
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          type="date"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white p-2 rounded"
        >
          Create Coupon
        </button>
      </form>


  <div className="md:hidden space-y-4">
        {coupons.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{c.code}</h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  c.discountType === "percentage"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {c.discountType}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>
                <strong>Value:</strong> {c.discountValue}
              </p>

              <p>
                <strong>Min Order:</strong> ₹{c.minOrderAmount}
              </p>

              <p>
                <strong>Expiry:</strong>{" "}
                {new Date(c.expiryDate).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => handleDelete(c._id)}
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
            >
              Delete Coupon
            </button>
          </div>
        ))}
      </div>

      {/* ================= COUPON LIST ================= */}
      <div className="hidden md:block bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          All Coupons
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Value</th>
                <th className="p-3 text-left">Min Order</th>
                <th className="p-3 text-left">Expiry</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr
                  key={c._id}
                  className="border-b last:border-0"
                >
                  <td className="p-3 font-medium">
                    {c.code}
                  </td>

                  <td className="p-3">
                    {c.discountType}
                  </td>

                  <td className="p-3">
                    {c.discountValue}
                  </td>

                  <td className="p-3">
                    ₹{c.minOrderAmount}
                  </td>

                  <td className="p-3">
                    {new Date(c.expiryDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}