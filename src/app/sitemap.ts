import type { MetadataRoute } from "next";
import { listHouses } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticPages = ["/", "/casas", "/experiencias", "/nosotros", "/contacto"];
  const houses = listHouses("es").map((h) => `/casas/${h.path.split("/").pop()}`);
  return [...staticPages, ...houses].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1 : 0.7
  }));
}
