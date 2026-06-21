'use client';

import Link from "next/link";
import { useState } from "react";

type Restaurant = {
  _id: string;
  name: string;
  description: string;
  image: string;
};

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export default function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      key={restaurant._id}
      href={`/restaurants/${restaurant._id}`}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={!imageError && restaurant.image ? `https://grocery-0byj.onrender.com${restaurant.image}` : "/api/placeholder/400/300"}
          alt={restaurant.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick View */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Details →
          </span>
        </div>

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
            {index === 0 ? "🔥 Most Popular" : index === 1 ? "⭐ Featured" : "🍜 Hot"}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-lg">
            <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-xs font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
          {restaurant.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Open until 11 PM</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Available</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">• Delivery • Pickup</span>
            <span className="text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300 inline-block">
              Order Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}