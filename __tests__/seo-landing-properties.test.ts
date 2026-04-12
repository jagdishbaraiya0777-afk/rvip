// Feature: seo-ranking-improvement
import { describe, it, expect } from "vitest";
import { keywordLandings } from "@/lib/keyword-landings";
import { getAllPosts } from "@/lib/blog-data";

const PRIMARY_KEYWORD_SET = [
  "play", "rvip", "game", "gaming", "real", "online", "website", "games",
  "rewards", "earn", "money", "daily", "download", "₹500", "welcome", "bonus",
  "safe", "secure", "trusted", "disclaimer",
];

function containsKeyword(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase());
}

function countKeywordSetTerms(text: string): number {
  const lower = text.toLowerCase();
  return PRIMARY_KEYWORD_SET.filter((term) => lower.includes(term.toLowerCase())).length;
}

function first100Words(text: string): string {
  return text.split(/\s+/).slice(0, 100).join(" ");
}

describe("Property 1: seoTitle ≤ 60 chars and contains keyword", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: seoTitle length and keyword`, () => {
      expect(landing.seoTitle.length).toBeLessThanOrEqual(60);
      expect(containsKeyword(landing.seoTitle, landing.keyword)).toBe(true);
    });
  });
});

describe("Property 2: seoDescription 140–160 chars and contains keyword", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: seoDescription length and keyword`, () => {
      expect(landing.seoDescription.length).toBeGreaterThanOrEqual(140);
      expect(landing.seoDescription.length).toBeLessThanOrEqual(160);
      expect(containsKeyword(landing.seoDescription, landing.keyword)).toBe(true);
    });
  });
});

describe("Property 3: title contains primary keyword", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: title contains keyword`, () => {
      expect(containsKeyword(landing.title, landing.keyword)).toBe(true);
    });
  });
});

describe("Property 4: at least 2 section headings contain a keyword-set term", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: ≥2 headings contain keyword-set term`, () => {
      const matchingHeadings = landing.sections.filter((section) =>
        PRIMARY_KEYWORD_SET.some((term) =>
          section.heading.toLowerCase().includes(term.toLowerCase()),
        ),
      );
      expect(matchingHeadings.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe("Property 6: first 100 words of intro[0] contain primary keyword", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: intro[0] first 100 words contain keyword`, () => {
      const first100 = first100Words(landing.intro[0]);
      expect(containsKeyword(first100, landing.keyword)).toBe(true);
    });
  });
});

describe("Property 7: combined body text contains ≥5 keyword-set terms", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: body text has ≥5 keyword-set terms`, () => {
      const bodyText = [
        ...landing.intro,
        ...landing.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
      ].join(" ");
      expect(countKeywordSetTerms(bodyText)).toBeGreaterThanOrEqual(5);
    });
  });
});

describe("Property 8: faq.length >= 3 on every landing page", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: faq has ≥3 entries`, () => {
      expect(landing.faq.length).toBeGreaterThanOrEqual(3);
    });
  });
});

describe("Property 11: no duplicate FAQ questions across all landing pages", () => {
  it("all FAQ questions are unique across landing pages", () => {
    const allQuestions = keywordLandings.flatMap((landing) =>
      landing.faq.map((f) => f.question.toLowerCase().trim()),
    );
    const uniqueQuestions = new Set(allQuestions);
    expect(uniqueQuestions.size).toBe(allQuestions.length);
  });
});

describe("Property 12: no duplicate page titles", () => {
  it("all landing page titles are unique", () => {
    const allTitles = keywordLandings.map((landing) => landing.title.toLowerCase().trim());
    const uniqueTitles = new Set(allTitles);
    expect(uniqueTitles.size).toBe(allTitles.length);
  });

  it("all blog post titles are unique", () => {
    const allTitles = getAllPosts().map((post) => post.title.toLowerCase().trim());
    const uniqueTitles = new Set(allTitles);
    expect(uniqueTitles.size).toBe(allTitles.length);
  });
});

describe("Property 15: heroAlt non-empty and contains primary keyword", () => {
  keywordLandings.forEach((landing) => {
    it(`${landing.path}: heroAlt contains keyword`, () => {
      expect(landing.heroAlt.length).toBeGreaterThan(0);
      expect(containsKeyword(landing.heroAlt, landing.keyword)).toBe(true);
    });
  });
});
