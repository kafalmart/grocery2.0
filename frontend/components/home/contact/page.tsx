import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Contact() {
  return (
    <section className="py-16 md:py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="relative overflow-hidden rounded-[32px]">

          {/* Background Image */}
          <img
            src="/contact.png"
            alt="Food Delivery"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Content */}
          <div className="relative z-10 px-8 py-14 md:px-16 md:py-20">

            <div className="max-w-3xl">

              <span className="text-orange-400 font-semibold uppercase tracking-wider">
                Order Today
              </span>

              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
                Delicious Food and Groceries Delivered
                <span className="block text-orange-500">
                  Straight To Your Door
                </span>
              </h2>

              <p className="mt-5 text-gray-300 text-base md:text-lg">
                Browse restaurants or groceries, explore menus,
                and place your order instantly through WhatsApp.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <Link
                  href="/restaurants"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
                >
                  Explore Restaurants
                  <ArrowRight size={18} />
                </Link>

                

              </div>

            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                <Phone className="text-orange-400" />
                <p className="mt-3 text-white font-medium">
                  +91 8439051530
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                <Mail className="text-orange-400" />
                <p className="mt-3 text-white font-medium break-all">
                  order.kafalmart@gmail.com
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                <MapPin className="text-orange-400" />
                <p className="mt-3 text-white font-medium">
                  Pithoragarh, Uttarakhand
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}