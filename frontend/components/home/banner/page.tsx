"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

type DiscountBannerProps = {
  image?: string;
};

export default function DiscountBanner({
  image = "/banner.png",
}: DiscountBannerProps) {
  const [banner, setBanner] =
    useState(image);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await api.get(
          "/banner"
        );

        if (res.data.data?.image) {
          const backendUrl =
            process.env.NEXT_PUBLIC_API_URL?.replace(
              "/api",
              ""
            );

          setBanner(
            `${backendUrl}${res.data.data.image}`
          );
        }
      } catch (error) {
        console.error(
          "Error fetching banner:",
          error
        );
      }
    };

    fetchBanner();
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden rounded-[32px] shadow-lg border border-orange-100 bg-white">
          <img
            src={banner}
            alt="Discount Banner"
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}