import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {},
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/downloads/:path*",
        destination:
          "http://ekasibooks.co.za.www31.cpt3.host-h.net/downloads/:path*",
      },
    ];
  },
};

export default nextConfig;
