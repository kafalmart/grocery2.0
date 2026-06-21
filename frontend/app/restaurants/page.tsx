import Link from "next/link";
import { getRestaurants } from "@/services/restaurant.service";
import {
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";

type Restaurant = {
  _id: string;
  name: string;
  description: string;
  address: string;
  openTime: string;
  closeTime: string;
  image: string;
};

export default async function RestaurantsPage() {
  const response = await getRestaurants();

  const restaurants: Restaurant[] =
    response?.data ?? [];

  return (
    <div className="min-h-screen bg-[#FFFDF9]">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">

        <div className="text-center lg:text-left">

          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-medium text-orange-600">
            🍽️ Discover Amazing Food
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Find Your
            <span className="text-orange-500">
              {" "}Favorite Restaurant
            </span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl">
            Explore top-rated restaurants, discover delicious meals,
            and enjoy food delivered straight to your doorstep.
          </p>

          <div className="mt-6 inline-flex items-center bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
            <span className="text-orange-500 font-bold text-lg">
              {restaurants.length}
            </span>

            <span className="ml-2 text-gray-600">
              Restaurants Available
            </span>
          </div>

        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {restaurants.length === 0 ? (

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">

            <div className="text-6xl mb-4">
              🍽️
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              No Restaurants Available
            </h2>

            <p className="mt-2 text-gray-500">
              Restaurants will appear here once added.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {restaurants.map((restaurant) => (

              <Link
                key={restaurant._id}
                href={`/restaurants/${restaurant._id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden">

                  <img
                    src={`https://grocery-0byj.onrender.com${restaurant.image}`}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  

                </div>

                {/* Content */}
                <div className="p-6">

                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition">
                    {restaurant.name}
                  </h2>

                  <p className="mt-3 text-gray-500 line-clamp-2">
                    {restaurant.description}
                  </p>

                  <div className="mt-5 space-y-3">

                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin
                        size={16}
                        className="text-orange-500 shrink-0"
                      />
                      <span className="truncate">
                        {restaurant.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock3
                        size={16}
                        className="text-orange-500 shrink-0"
                      />
                      <span>
                        {restaurant.openTime} - {restaurant.closeTime}
                      </span>
                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition">

                      View Menu

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}