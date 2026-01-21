import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Deploy as a normal Next.js app on Vercel (enables Route Handlers / API)
  // output: "export",

  // ✅ Optional: remove trailing slash so routes are /pricing not /pricing/
  // (cleaner URLs + fewer redirect edge cases)
  trailingSlash: false,

  // ✅ Use Next Image optimization on Vercel
  // (remove unoptimized; Vercel handles image optimization well)
  images: {},

  reactStrictMode: true,
};

export default nextConfig;
