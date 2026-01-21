// app/sitemap.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // ✅ required for output: "export"

const baseUrl = "https://ekasibooks.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/features",
    "/pricing",
    "/download",
    "/support",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
