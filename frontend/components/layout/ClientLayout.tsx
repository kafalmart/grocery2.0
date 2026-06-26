"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Topbar from "@/components/layout/Topbar";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/login" ||
    pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />
      }

      <main className="min-h-screen">
        {children}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}