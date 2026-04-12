// Feature: seo-ranking-improvement
import { describe, it, expect } from "vitest";
import { getAllPosts } from "@/lib/blog-data";

const LANDING_PAGE_PATHS = [
  "/rvip-game",
  "/rvip-app-download",
  "/rvip-apk",
  "/rvip-apk-download",
  "/rvip-download",
  "/rvip-bonus",
  "/rvip-earn-money",
  "/rvip-safe-trusted",
];

function containsKeyword(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase());
}

describe("Property 16: blog post keyword in seoTitle, seoDescription, title, and ≥1 heading", () => {
  getAllPosts().forEach((post) => {
    it(`/blog/${post.slug}: keyword in all required fields`, () => {
      expect(containsKeyword(post.seoTitle, post.primaryKeyword)).toBe(true);
      expect(containsKeyword(post.seoDescription, post.primaryKeyword)).toBe(true);
      expect(containsKeyword(post.title, post.primaryKeyword)).toBe(true);
      const headingMatch = post.sections.some((s) =>
        containsKeyword(s.heading, post.primaryKeyword),
      );
      expect(headingMatch).toBe(true);
    });
  });
});

describe("Property 17: blog post faq.length >= 3", () => {
  getAllPosts().forEach((post) => {
    it(`/blog/${post.slug}: faq has ≥3 entries`, () => {
      expect(post.faq.length).toBeGreaterThanOrEqual(3);
    });
  });
});

describe("Property 18: blog post internalLinks has landing page href and /disclaimer href", () => {
  getAllPosts().forEach((post) => {
    it(`/blog/${post.slug}: internalLinks has landing page and /disclaimer`, () => {
      const hasLandingLink = post.internalLinks.some((link) =>
        LANDING_PAGE_PATHS.includes(link.href),
      );
      const hasDisclaimerLink = post.internalLinks.some((link) => link.href === "/disclaimer");
      expect(hasLandingLink).toBe(true);
      expect(hasDisclaimerLink).toBe(true);
    });
  });
});
