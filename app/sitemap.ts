import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-data";
import { keywordLandings } from "@/lib/keyword-landings";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-04-10"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/disclaimer"),
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date("2026-04-10"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const landingRoutes: MetadataRoute.Sitemap = keywordLandings.map((landing) => ({
    url: absoluteUrl(landing.path),
    lastModified: new Date(landing.lastModified),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
    images: [absoluteUrl(post.heroImage)],
  }));

  return [...staticRoutes, ...landingRoutes, ...postRoutes];
}
