"use client";

import { Search, ArrowRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) return;

    router.push(
      `/restaurants?search=${encodeURIComponent(search)}`
    );
  };

  return (
    <section className="bg-[#fafafa] py-4 sm:py-6 lg:py-8">
      <div className="max-w-fit mx-auto px-4 sm:px-5">


       <div className="inline-flex items-center mb-3 gap-2 rounded-full bg-orange-50 px-4 py-2 border border-orange-100">
  <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />

  <span className="text-sm sm:text-base text-gray-700">
    ( Pithoragarh city ) Only
    
  </span>
</div>


<div className="relative overflow-hidden rounded-2xl lg:rounded-[32px] bg-black">

          {/* Background Image */}
         <img
  src="/hero.png"
  alt="Food"
  className="absolute inset-0 w-full h-full object-cover"
/>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Content */}
         <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center min-h-[550px] px-6 sm:px-8 lg:px-14 py-12">

  {/* Left Content */}
  <div className="max-w-xl text-center lg:text-left">

    <span className="inline-flex items-center rounded-full bg-orange-500/20 border border-orange-400/30 px-4 py-2 text-xs sm:text-sm font-medium text-orange-300">
      GOOD FOOD, GREAT MOOD
    </span>

    <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
      Delicious Food & Groceries
      <span className="block text-orange-500">
        Delivered To You
      </span>
    </h1>

    <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed">
      Order from your home and
      get fresh meals and groceries delivered fast to your doorstep in Pithoragarh.
      
    </p>

    

      

    {/* CTA */}
    <div className="mt-8 flex gap-4 justify-center lg:justify-start">
      <button
        onClick={() => router.push("/restaurants")}
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
      >
        Explore Restaurants
        <ArrowRight size={18} />
      </button>
       <button
        onClick={() => router.push("/grocery")}
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition"
      >
        Explore Groceries
        <ArrowRight size={18} />
      </button>
    </div>

  </div>

  {/* Right Side Empty on Desktop */}
  <div className="hidden lg:block" />
</div>

          {/* Slider Dots */}
          
        </div>
      </div>
    </section>
  );
}