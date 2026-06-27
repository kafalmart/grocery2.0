"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Leaf, Drumstick } from "lucide-react";
import {
  getRestaurantById,
  getRestaurantFoods,
} from "@/services/restaurant.service";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "https://grocery-0byj.onrender.com";

type Category = {
  id: string;
  name: string;
   image?: string | null;
};

export default function CategoryPage() {
  const router = useRouter();
  const { id } = useParams();

  const [restaurantName, setRestaurantName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const restaurantRes = await getRestaurantById(id as string);

        setRestaurantName(
          restaurantRes?.data?.name || ""
        );

        const foodsRes =
          await getRestaurantFoods(
            id as string
          );

        const foods =
          foodsRes?.data || [];

        console.log("Foods:", foods);

        const uniqueCategories =
          Array.from(
            new Map(
              foods
                .filter(
                  (food: any) =>
                    food.category
                )
                .map((food: any) => [
                  food.category?._id ||
                    food.category,
                  {
                    id:
                      food.category?._id ||
                      food.category,
                    name:
                      food.category?.name ||
                      "Others",
                    image:
                      food.category
                        ?.image || "",
                  },
                ])
            ).values()
          ) as Category[];

        console.log(
          "Categories:",
          uniqueCategories
        );

        setCategories(
          uniqueCategories
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  const toggleCategory = (
    categoryId: string
  ) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter(
              (item) =>
                item !== categoryId
            )
          : [
              ...prev,
              categoryId,
            ]
    );
  };

  const toggleType = (
    type: string
  ) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter(
            (item) =>
              item !== type
          )
        : [...prev, type]
    );
  };

  const applyFilters = () => {
    const params =
      new URLSearchParams();

    if (
      selectedCategories.length > 0
    ) {
      params.set(
        "category",
        selectedCategories.join(",")
      );
    }

    if (selectedTypes.length > 0) {
      params.set(
        "type",
        selectedTypes.join(",")
      );
    }

    router.push(
      `/restaurants/${id}?${params.toString()}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
        <div className="flex items-center gap-4 px-4 py-4 max-w-7xl mx-auto">
          <button
            onClick={() =>
              router.push(
                `/restaurants/${id}`
              )
            }
            className="w-11 h-11 rounded-full border flex items-center justify-center bg-white shadow-sm"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="font-bold text-xl">
              Cuisines & Dishes
            </h1>

            <p className="text-sm text-slate-500">
              {restaurantName}
            </p>
          </div>
        </div>
      </div>

      {/* FOOD TYPE */}
      <div className="px-4 pt-6 max-w-7xl mx-auto">
            

        {/* CATEGORIES */}
        <h2 className="text-2xl font-bold mb-6">
          Cuisines & Dishes
        </h2>

        {categories.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
            <p className="text-slate-500">
              No categories found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pb-32">
            {categories.map(
              (category) => {
                const active =
                  selectedCategories.includes(
                    category.id
                  );

                const imageUrl = category.image
  ? category.image.startsWith("http")
    ? category.image
    : `${BASE_URL}${category.image.startsWith("/") ? "" : "/"}${category.image}`
  : "https://via.placeholder.com/300";

                return (
                <button
  key={category.id}
  onClick={() => toggleCategory(category.id)}
  className={`relative h-28 w-full overflow-hidden rounded-[28px] transition-all duration-300 ${
    active
      ? "ring-4 ring-orange-500 shadow-2xl scale-[1.03]"
      : "bg-white shadow-md hover:shadow-xl hover:-translate-y-1"
  }`}
>
  {/* IMAGE */}
 <div className="relative h-full w-full">
  <img
    src={imageUrl}
    alt={category.name}
    className="h-full w-full object-cover"
    onError={(e) => {
      e.currentTarget.src = "https://via.placeholder.com/300";
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
</div>

  {/* NAME */}

  {/* BADGE */}
  {active && (
    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
      Selected
    </div>
  )}
  <div className="absolute bottom-3 left-3 right-3">
    <h3 className="text-white text-sm md:text-lg font-bold text-left">
      {category.name}
    </h3>
  </div>
</button>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t p-4">
        <div className="max-w-7xl mx-auto flex gap-3">
          <button
            onClick={() => {
              setSelectedCategories(
                []
              );
              setSelectedTypes(
                []
              );
            }}
            className="flex-1 py-4 rounded-2xl border border-slate-300 font-semibold bg-white"
          >
            Clear
          </button>

          <button
            onClick={
              applyFilters
            }
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
