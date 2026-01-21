// app/robots.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // ✅ required for output: "export"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://ekasibooks.co.za/sitemap.xml",
  };
}
