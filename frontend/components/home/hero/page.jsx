"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/restaurants?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="bg-[#fafafa] py-6 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-2xl lg:rounded-[32px] bg-black w-full">

          {/* Background Image */}
          <img
            src="/hero.png"
            alt="Food"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] px-5 sm:px-10 lg:px-14 py-10 sm:py-14">

            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">

              {/* Badge */}
              <span className="inline-flex items-center rounded-full bg-orange-500/20 border border-orange-400/30 px-4 py-2 text-xs sm:text-sm font-medium text-orange-300">
                GOOD FOOD, GREAT MOOD
              </span>

              {/* Heading */}
              <h1 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Delicious Food & Groceries
                <span className="block text-orange-500">
                  Delivered To You
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                Order from your home and get fresh meals and groceries delivered fast
                to your doorstep in Pithoragarh.
              </p>

              {/* CTA BUTTONS */}
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

                <button
                  onClick={() => router.push("/restaurants")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition"
                >
                  Explore Restaurants
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => router.push("/grocery")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition border border-white/20"
                >
                  Explore Groceries
                  <ArrowRight size={18} />
                </button>

              </div>
            </div>

            {/* RIGHT SIDE (visual space only on desktop) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}