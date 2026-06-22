"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const linkClass = (path: string) =>
    pathname === path
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500";

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="h-16 md:h-20 flex items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="w-12 h-10  flex items-center justify-center text-white text-lg font-bold">
                <img src="/logo.jpg" alt="logo" className="rounded-4xl" />
              </div>

              <h1 className="text-lg sm:text-2xl font-black">
                KafalMart
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">

              <Link
                href="/"
                className={linkClass("/")}
              >
                Home
              </Link>

              <Link
                href="/restaurants"
                className={linkClass("/restaurants")}
              >
                Restaurants
              </Link>

              <Link
                href="/grocery"
                className={linkClass("/grocery")}
              >
                Grocery
              </Link>


              <Link
                href="/cart"
                className={`${linkClass(
                  "/cart"
                )} flex items-center gap-2`}
              >
                <ShoppingCart size={18} />
                Cart
              </Link>

              {isLoggedIn && (
                <Link
                  href="/profile"
                  className={linkClass("/profile")}
                >
                  Profile
                </Link>
              )}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-3 border rounded-xl hover:bg-red-50 text-red-500 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-3 rounded-xl hover:bg-orange-50 transition"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Button */}
            {/* Mobile Actions */}
<div className="md:hidden flex items-center gap-2">
  <Link
    href="/cart"
    className="relative p-2 rounded-lg hover:bg-gray-100 transition"
  >
    <ShoppingCart size={24} />
  </Link>

  <button
    onClick={() => setMobileOpen(!mobileOpen)}
    className="p-2 rounded-lg hover:bg-gray-100 transition"
  >
    {mobileOpen ? (
      <X size={28} />
    ) : (
      <Menu size={28} />
    )}
  </button>
</div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white border-t shadow-lg z-40">
          <div className="flex flex-col p-4">

            <Link
              href="/"
              onClick={closeMenu}
              className="py-4 border-b"
            >
              Home
            </Link>

            <Link
              href="/restaurants"
              onClick={closeMenu}
              className="py-4 border-b"
            >
              Restaurants
            </Link>

            <Link
              href="/cart"
              onClick={closeMenu}
              className="py-4 border-b flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Cart
            </Link>

            {isLoggedIn && (
              <Link
                href="/profile"
                onClick={closeMenu}
                className="py-4 border-b flex items-center gap-2"
              >
                <User size={18} />
                Profile
              </Link>
            )}

            <div className="pt-4">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full py-3 rounded-xl border text-red-500"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">

                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="w-full py-3 border rounded-xl text-center"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="w-full py-3 bg-orange-500 text-white rounded-xl text-center"
                  >
                    Sign Up
                  </Link>

                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}