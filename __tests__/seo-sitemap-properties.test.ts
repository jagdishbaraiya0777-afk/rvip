// Feature: seo-ranking-improvement
import { describe, it, expect } from "vitest";
import { keywordLandings } from "@/lib/keyword-landings";
import { getAllPosts } from "@/lib/blog-data";
import sitemap from "@/app/sitemap";
import { absoluteUrl } from "@/lib/site-config";

describe("Property 5: sitemap includes all landing pages with correct metadata", () => {
  const sitemapEntries = sitemap();

  keywordLandings.forEach((landing) => {
    it(`${landing.path}: sitemap entry has correct changeFrequency and priority`, () => {
      const entry = sitemapEntries.find((e) => e.url === absoluteUrl(landing.path));
      expect(entry).toBeDefined();
      expect(entry?.changeFrequency).toBe("weekly");
      expect(entry?.priority).toBeGreaterThanOrEqual(0.88);
    });
  });
});

describe("Property 14: sitemap has no duplicate URLs", () => {
  it("all sitemap URLs are unique", () => {
    const sitemapEntries = sitemap();
    const urls = sitemapEntries.map((e) => e.url);
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});

describe("Property 19: sitemap includes all blog posts", () => {
  const sitemapEntries = sitemap();

  getAllPosts().forEach((post) => {
    it(`/blog/${post.slug}: sitemap entry exists`, () => {
      const entry = sitemapEntries.find((e) => e.url === absoluteUrl(`/blog/${post.slug}`));
      expect(entry).toBeDefined();
    });
  });
});

describe("Property 20: blog post sitemap entries use actual updatedAt dates", () => {
  const sitemapEntries = sitemap();

  getAllPosts().forEach((post) => {
    it(`/blog/${post.slug}: lastModified equals new Date(post.updatedAt)`, () => {
      const entry = sitemapEntries.find((e) => e.url === absoluteUrl(`/blog/${post.slug}`));
      expect(entry).toBeDefined();
      const expectedDate = new Date(post.updatedAt);
      expect(entry?.lastModified?.toString()).toBe(expectedDate.toString());
    });
  });
});
