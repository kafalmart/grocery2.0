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

  async redirects() {
    return [
      {
        source: "/adminpanel",
        destination: "https://epicurean-command.vercel.app",
        permanent: false,
      },
      {
        source: "/adminpanel/:path*",
        destination: "https://epicurean-command.vercel.app/:path*",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://slategray-narwhal-323627.hostingersite.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
