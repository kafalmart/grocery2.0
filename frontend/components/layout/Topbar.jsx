"use client";

import { MapPin, Clock3 } from "lucide-react";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-orange-200 bg-orange-50">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
        <MapPin className="h-4 w-4 text-orange-600 shrink-0" />

        <span className="text-sm font-medium text-gray-700">
          Serving only in <span className="font-semibold">Pithoragarh City</span>
        </span>

        <span className="hidden sm:inline text-gray-400">•</span>

        <Clock3 className="hidden sm:block h-4 w-4 text-orange-600" />

        <span className="hidden sm:inline text-sm font-medium text-gray-700">
          Open Daily: <span className="font-semibold">8:00 AM – 10:00 PM</span>
        </span>
      </div>
    </div>
  );
}