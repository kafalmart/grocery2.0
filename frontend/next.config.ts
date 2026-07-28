import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://slategray-narwhal-323627.hostingersite.com/api/:path*",
      },
      {
        source: "/adminpanel",
        destination: "https://epicurean-command.vercel.app",
      },
      {
        source: "/adminpanel/:path*",
        destination: "https://epicurean-command.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
