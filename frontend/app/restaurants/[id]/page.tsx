import {
  getRestaurantById,
  getRestaurantFoods,
} from "@/services/restaurant.service";

import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import {
  MapPin,
  Clock3,
  UtensilsCrossed,
  Star,
} from "lucide-react";
import { Leaf, Drumstick } from "lucide-react";
type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    category?: string;
    type?: string;
  }>;
};

export default async function RestaurantDetail({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
const query = await searchParams;

  const data = await getRestaurantById(id);
  const foodsData = await getRestaurantFoods(id);

  const restaurant = data?.data;
  const foods = foodsData?.data || [];
const selectedCategories =
  query.category?.split(",") || [];

const selectedTypes =
  query.type?.split(",").map((t) => t.toLowerCase()) || [];

const filteredFoods = foods.filter((food: any) => {
  const categoryId =
    food.category?._id || food.category;

  const categoryMatch =
    selectedCategories.length === 0 ||
    selectedCategories.includes(categoryId);

  const foodType = String(
    food.type || ""
  ).toLowerCase();

const normalizedType =
  foodType === "veg"
    ? "veg"
    : foodType === "non-veg" || foodType === "nonveg"
    ? "non-veg"
    : foodType;

  const typeMatch =
    selectedTypes.length === 0 ||
    selectedTypes.includes(normalizedType);

  return categoryMatch && typeMatch;
});
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F1] px-6">
        <div className="bg-white rounded-[32px] shadow-xl border border-orange-100 p-10 text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-5">
            🍽️
          </div>

          <h2 className="text-2xl font-bold text-[#2B2B2B]">
            Restaurant Not Found
          </h2>

          <p className="text-[#7D7D7D] mt-2">
            The restaurant you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
          <img
            src={`https://grocery-0byj.onrender.com${restaurant.image}`}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 pb-8 md:pb-12">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 bg-[#F97316]/90 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
                  <UtensilsCrossed size={16} />
                  Restaurant
                </span>

                <h1 className="mt-5 text-4xl md:text-6xl font-bold text-white leading-tight">
                  {restaurant.name}
                </h1>

                <p className="mt-4 mb-8 text-white/90 text-base md:text-lg max-w-2xl">
                  {restaurant.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING INFO CARD */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="-mt-10 md:-mt-14 relative z-20">
            <div className="bg-white rounded-[28px] shadow-2xl border border-orange-100 p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <MapPin className="text-[#F97316]" size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Location
                    </p>

                    <p className="font-medium text-[#2B2B2B]">
                      {restaurant.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <Clock3 className="text-[#F97316]" size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Opening Hours
                    </p>

                    <p className="font-medium text-[#2B2B2B]">
                      {restaurant.openTime} - {restaurant.closeTime}
                    </p>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </section>










      {/* MENU */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex bg-orange-100 text-[#F97316] px-4 py-2 rounded-full text-sm font-medium">
              Food Menu
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#2B2B2B] mt-4">
              Explore Our Dishes
            </h2>

            <p className="text-gray-500 mt-2">
              {filteredFoods.length} delicious items available
            </p>
          </div>
        </div>
<div className="flex justify-end mb-8">
  <div className="flex items-center gap-4 flex-wrap">

  <Link
  href={{
    pathname: `/restaurants/${id}`,
    query: {
      ...query,
      type:
        selectedTypes.includes("veg") &&
        !selectedTypes.includes("non-veg")
          ? "non-veg"
          : "veg",
    },
  }}
  scroll={false}
  className="inline-flex items-center gap-2"
>
  <span
    className={`text-sm font-medium transition-colors ${
      selectedTypes.includes("veg")
        ? "text-green-700"
        : "text-slate-500"
    }`}
  >
    Veg
  </span>

  <div className="relative h-6 w-12 rounded-full bg-slate-200 p-0.5">
    <div
      className={`h-full w-1/2 rounded-full shadow-sm transition-all duration-300 ${
        selectedTypes.includes("veg")
          ? "translate-x-0 bg-green-700"
          : "translate-x-full bg-red-700"
      }`}
    />
  </div>

  <span
    className={`text-sm font-medium transition-colors ${
      !selectedTypes.includes("veg")
        ? "text-red-700"
        : "text-slate-500"
    }`}
  >
    Non-Veg
  </span>
</Link>

    <Link
  href={`/restaurants/${id}/category`}
  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:border-[#F97316] hover:text-[#F97316] transition"
>
  Browse Categories
</Link>

  </div>
</div>


        {filteredFoods.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-orange-100 shadow-lg">
            

            <h3 className="text-2xl font-bold text-[#2B2B2B]">
              No Food Available
            </h3>

            <p className="text-gray-500 mt-2">
              This restaurant hasn't added menu items yet.
            </p>
          </div>
        ) : (
         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
  {filteredFoods.map((food: any) => {
    const extraAmount =
      (parseInt(food._id.slice(-2), 16) % 20) + 1;

    const originalPrice =
      Number(food.price) + extraAmount;

return (
  <div
    key={food._id}
    className="bg-white rounded-2xl border border-orange-100 p-4 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex flex-col sm:flex-row gap-4">
      {/* IMAGE */}
      <div className="relative h-32 w-full sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <img
          src={
            food.image
              ? `https://grocery-0byj.onrender.com${food.image}`
              : "/placeholder-food.jpg"
          }
          alt={food.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        {/* TOP */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-slate-900 truncate">
              {food.name}
            </h3>

            <p className="mt-2 text-sm text-slate-500 line-clamp-2">
              {food.description}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              food.type === "veg"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {food.type === "veg" ? "Veg" : "Non Veg"}
          </span>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400 line-through">
              MRP. ₹{originalPrice}
            </p>

            <p className="text-2xl font-bold text-[#F97316]">
              ₹{food.price}
            </p>
          </div>

          <div className="min-w-[140px]">
            <AddToCartButton item={{ ...food, type: "food" }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
  })}
</div>
        )}
      </section>









    </div>
  );
}