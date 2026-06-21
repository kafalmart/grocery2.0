import Link from "next/link";
import { Clock } from "lucide-react";
import { getRestaurants } from "@/services/restaurant.service";

export default async function FeaturedProducts() {
  const data = await getRestaurants();
  const restaurants = data?.data || [];

  // Optional: featured first
  const sortedRestaurants = [...restaurants].sort(
    (a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  return (
    <section className="py-12 md:py-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular Restaurants
            </h2>

            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Discover the best restaurants near you
            </p>
          </div>

          <Link
            href="/restaurants"
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            View All
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {sortedRestaurants.slice(0, 4).map((restaurant: any) => (
            <Link
              key={restaurant._id}
              href={`/restaurants/${restaurant._id}`}
              className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Image */}
              <div className="relative overflow-hidden h-56 bg-gray-100">

                {restaurant.image ? (
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="h-56 w-full flex items-center justify-center text-5xl">
                    🍽️
                  </div>
                )}

                {/* Featured Badge */}
                {restaurant.featured && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">

                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                  {restaurant.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                  {restaurant.description || "No description available"}
                </p>

                {/* Time */}
                <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
                  <Clock size={15} />
                  <span>
                    {restaurant.openTime && restaurant.closeTime
                      ? `${restaurant.openTime} - ${restaurant.closeTime}`
                      : "Timing not available"}
                  </span>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">

                  <span className="text-sm text-gray-500 truncate">
                    {restaurant.address || "Address not available"}
                  </span>

                  <span className="text-orange-500 font-semibold text-sm">
                    View Menu
                  </span>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}