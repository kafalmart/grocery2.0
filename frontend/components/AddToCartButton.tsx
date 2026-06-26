"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import api from "@/services/api";

type Props = {
  item: {
    _id: string;
    name: string;

    hasHalf?: boolean;

    halfPrice?: number;
    fullPrice?: number;

    price?: number;

    image?: string;

    type?: "food" | "grocery";
  };
};

export default function AddToCartButton({ item }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
const [portion, setPortion] =
  useState<"half" | "full">("full");
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(
        `/login?redirect=${encodeURIComponent(pathname)}`
      );
      return;
    }

    setIsLoading(true);

    try {
     const payload: any = {
  itemId: item._id,
  quantity: 1,
  type: item.type || "food",
};

if (item.type === "food") {
  payload.portion = portion;
}

await api.post("/cart", payload, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      alert(`${item.name} added to cart`);
    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        router.push(
          `/login?redirect=${encodeURIComponent(pathname)}`
        );
        return;
      }

      alert("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {item.hasHalf && (
  <div className="mb-3 flex gap-2">
    <button
      type="button"
      onClick={() => setPortion("half")}
      className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
        portion === "half"
          ? "bg-green-600 text-white"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      Half ₹{item.halfPrice}
    </button>

    <button
      type="button"
      onClick={() => setPortion("full")}
      className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
        portion === "full"
          ? "bg-green-600 text-white"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      Full ₹{item.fullPrice}
    </button>
  </div>
)}
    
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-green-600 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        "Add To Cart"
      )}
    </button>
    </div>
  );
}