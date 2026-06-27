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
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

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

  const selectedCategories = query.category?.split(",") || [];
  const selectedTypes = query.type?.split(",").map((t) => t.toLowerCase()) || [];

  const filteredFoods = foods.filter((food: any) => {
    const categoryId = food.category?._id || food.category;
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(categoryId);

    const foodType = String(food.type || "").toLowerCase();
    const normalizedType =
      foodType === "veg"
        ? "veg"
        : foodType === "non-veg" || foodType === "nonveg"
        ? "non-veg"
        : foodType;

    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(normalizedType);

    return categoryMatch && typeMatch;
  });

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-orange-100 p-12 text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-6 text-4xl">
            🍽️
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Restaurant Not Found</h2>
          <p className="text-slate-500 mt-3 leading-relaxed">
            The restaurant you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-200"
          >
            Browse Restaurants
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30">
      {/* HERO SECTION */}
      <section className="relative">
        <div className="relative h-[360px] md:h-[460px] lg:h-[520px] overflow-hidden">
          <img
           src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 pb-10 md:pb-16">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
                  <UtensilsCrossed size={16} className="text-orange-300" />
                  <span>Premium Dining</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-white/80">Open Now</span>
                </div>

                <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                  {restaurant.name}
                </h1>

                <p className="mt-4 text-white/90 text-base md:text-lg max-w-2xl leading-relaxed">
                  {restaurant.description}
                </p>

                <div className="flex items-center gap-6 mt-6">
                  
                
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING INFO CARD */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="-mt-12 md:-mt-16 relative z-20">
            <div className="bg-white rounded-[28px] shadow-2xl border border-orange-100/80 p-6 md:p-8 backdrop-blur-xl bg-white/95 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</p>
                    <p className="font-medium text-slate-800 mt-0.5">{restaurant.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock3 className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Operating Hours</p>
                    <p className="font-medium text-slate-800 mt-0.5">
                      {restaurant.openTime} - {restaurant.closeTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu Items</p>
                    <p className="font-medium text-slate-800 mt-0.5">{filteredFoods.length} Dishes Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-12">
        {/* Header with filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-5 py-2 rounded-full text-sm font-medium">
              <UtensilsCrossed size={16} />
              Premium Menu
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-4">
              Explore Our <span className="text-orange-500">Dishes</span>
            </h2>
            <p className="text-slate-500 mt-2 flex items-center gap-2">
              <span className="font-semibold text-orange-600">{filteredFoods.length}</span>
              delicious items crafted with care
            </p>
          </div>

          {/* Filter controls */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-white rounded-full border border-slate-200/80 p-1 shadow-sm">
              <Link
                href={{
                  pathname: `/restaurants/${id}`,
                  query: {
                    ...query,
                    type:
                      selectedTypes.includes("veg") && !selectedTypes.includes("non-veg")
                        ? "non-veg"
                        : "veg",
                  },
                }}
                scroll={false}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition"
              >
                <span
                  className={`text-sm font-semibold transition-colors ${
                    selectedTypes.includes("veg") ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  Veg
                </span>

                <div className="relative h-8 w-16 rounded-full bg-slate-200 p-1 cursor-pointer flex items-center">
                  <div
                    className={`h-5 w-5 rounded-full shadow-md transition-all duration-300 ${
                      selectedTypes.includes("veg")
                        ? "translate-x-0 bg-emerald-500"
                        : "translate-x-7 bg-red-500"
                    }`}
                  />
                </div>

                <span
                  className={`text-sm font-semibold transition-colors ${
                    !selectedTypes.includes("veg") ? "text-red-600" : "text-slate-400"
                  }`}
                >
                  Non-Veg
                </span>
              </Link>
            </div>

            <Link
              href={`/restaurants/${id}/category`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-orange-300 hover:text-orange-600 hover:shadow-md transition-all duration-200"
            >
              <Filter size={16} />
              Categories
            </Link>

            {(selectedCategories.length > 0 || selectedTypes.length > 0) && (
              <Link
                href={`/restaurants/${id}`}
                className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
                Clear Filters
              </Link>
            )}
          </div>
        </div>

        {/* Food Grid - Fixed Cards */}
        {filteredFoods.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-16 text-center border border-orange-100/80 shadow-xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-6 text-4xl">
              🍽️
            </div>
            <h3 className="text-2xl font-bold text-slate-800">No Dishes Available</h3>
            <p className="text-slate-500 mt-3 max-w-md mx-auto">
              This restaurant hasn't added any menu items matching your filters yet.
            </p>
            <Link
              href={`/restaurants/${id}`}
              className="inline-block mt-6 text-orange-500 font-medium hover:text-orange-600 transition"
            >
              View all items →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredFoods.map((food: any) => {
              const displayPrice = food.hasHalf ? Number(food.halfPrice) : Number(food.fullPrice);
              const extraAmount = (parseInt(food._id.slice(-2), 16) % 20) + 1;
              const originalPrice = displayPrice + extraAmount;

              return (
                <div
                  key={food._id}
                  className="group bg-white rounded-2xl border border-orange-100/60 overflow-hidden hover:shadow-2xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col">
                    
                    {/* Image Section with Veg/Non-Veg Badge on Right */}
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
                      <img
                        src={
                          food.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}${food.image}`
                            : "/placeholder-food.jpg"
                        }
                        alt={food.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Veg/Non-Veg Badge - Top Right */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg ${
                            food.type === "veg"
                              ? "bg-emerald-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${
                            food.type === "veg" ? "bg-white/80" : "bg-white/80"
                          }`} />
                          {food.type === "veg" ? "Pure Veg" : "Non-Veg"}
                        </span>
                      </div>
                      
                      
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex flex-col gap-3">
                      {/* Food Name */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">
                          {food.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                          {food.description}
                        </p>
                      </div>

                      {/* Pricing and Add to Cart */}
                      <div className="flex items-end justify-between gap-3 mt-1 pt-3 border-t border-slate-100">
                        <div className="flex flex-wrap items-end gap-4">
                          {food.hasHalf ? (
                            <>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                  Half
                                </span>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-lg font-bold text-emerald-600">
                                    ₹{food.halfPrice}
                                  </span>
                                  <span className="text-xs text-slate-400 line-through">
                                    ₹{Math.round(food.halfPrice * 1.2)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="hidden sm:block w-px h-8 bg-slate-200" />
                              
                              <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                  Full
                                </span>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-xl font-bold text-orange-500">
                                    ₹{food.fullPrice}
                                  </span>
                                  <span className="text-xs text-slate-400 line-through">
                                    ₹{Math.round(food.fullPrice * 1.2)}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col">
                              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                Price
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-orange-500">
                                  ₹{food.fullPrice}
                                </span>
                                {originalPrice > food.fullPrice && (
                                  <span className="text-xs text-slate-400 line-through">
                                    ₹{originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="min-w-[120px]">
                          <AddToCartButton
                            item={{
                              _id: food._id,
                              name: food.name,
                              image: food.image,
                              type: "food",
                              hasHalf: food.hasHalf,
                              halfPrice: food.halfPrice,
                              fullPrice: food.fullPrice,
                            }}
                          />
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
