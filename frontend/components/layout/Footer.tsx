import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl  flex items-center justify-center text-xl">
                <img src="/logo.jpg" alt="logo" />
              </div>

              <h2 className="text-2xl font-black">
                KafalMart

              </h2>
            </div>

            <p className="mt-5 text-gray-400 leading-relaxed">
              Order delicious food and Groceries
              and get it delivered fresh and fast to your doorstep.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://www.instagram.com/officialkafalmart/"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
              >
                <FaXTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link
                href="/"
                className="hover:text-orange-500 transition"
              >
                Home
              </Link>

              <Link
                href="/restaurants"
                className="hover:text-orange-500 transition"
              >
                Restaurants
              </Link>

              <Link
                href="/grocery"
                className="hover:text-orange-500 transition"
              >
                Groceries
              </Link>

              <Link
                href="/cart"
                className="hover:text-orange-500 transition"
              >
                Cart
              </Link>

              <Link
                href="/profile"
                className="hover:text-orange-500 transition"
              >
                Profile
              </Link>
            </div>
          </div>

      

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Contact Us
            </h3>

            <div className="flex flex-col gap-4 text-gray-400">

              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="text-orange-500 mt-1 shrink-0"
                />
                <span>+91 8439051530</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="text-orange-500 mt-1 shrink-0"
                />
                <span>order.kafalmart@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-orange-500 mt-1 shrink-0"
                />
                <span>
                  Pithoragarh, Uttarakhand, India
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 KafalMart. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">

            

            <Link
            href="/terms"
            className="text-slate-500 hover:text-green-600"
          >
            Terms & Conditions
          </Link>

            <Link
              href="/policy"
              className="text-slate-500 hover:text-green-600"
            >
              Refund Policy
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}