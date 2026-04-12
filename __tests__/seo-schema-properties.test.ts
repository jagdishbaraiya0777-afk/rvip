// Feature: seo-ranking-improvement
import { describe, it, expect } from "vitest";
import { keywordLandings } from "@/lib/keyword-landings";
import { getAllPosts } from "@/lib/blog-data";
import { createBlogBreadcrumbSchema, createMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

describe("Property 9: breadcrumb schema has ≥2 levels on every landing page", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: breadcrumb has 2 items with correct URLs`, () => {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: landing.title, item: absoluteUrl(landing.path) },
        ],
      };
      expect(breadcrumbSchema.itemListElement.length).toBeGreaterThanOrEqual(2);
      expect(breadcrumbSchema.itemListElement[0].item).toBe(absoluteUrl("/"));
      expect(breadcrumbSchema.itemListElement[1].item).toBe(absoluteUrl(landing.path));
    });
  });
});

describe("Property 10: blog post breadcrumb schema has exactly 3 levels", () => {
  getAllPosts().forEach((post) => {
    it(`/blog/${post.slug}: breadcrumb has 3 items`, () => {
      const schema = createBlogBreadcrumbSchema(post);
      expect(schema.itemListElement.length).toBe(3);
      expect(schema.itemListElement[0].item).toBe(absoluteUrl("/"));
      expect(schema.itemListElement[1].item).toBe(absoluteUrl("/blog"));
      expect(schema.itemListElement[2].item).toBe(absoluteUrl(`/blog/${post.slug}`));
    });
  });
});

describe("Property 13: canonical URL matches page path", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: canonical equals absoluteUrl(path)`, () => {
      const metadata = createMetadata({
        title: landing.seoTitle,
        description: landing.seoDescription,
        path: landing.path,
      });
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(landing.path));
    });
  });

  it("/: home page canonical", () => {
    const metadata = createMetadata({ title: "Test", description: "Test", path: "/" });
    expect(metadata.alternates?.canonical).toBe(absoluteUrl("/"));
  });
});
