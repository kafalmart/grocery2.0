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

      {/* ================= COUPON LIST ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Coupons</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Min Order</th>
              <th>Expiry</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => (
              <tr key={c._id} className="text-center border-t">
                <td className="p-2">{c.code}</td>
                <td>{c.discountType}</td>
                <td>{c.discountValue}</td>
                <td>{c.minOrderAmount}</td>
                <td>
                  {new Date(c.expiryDate).toLocaleDateString()}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
  );
}