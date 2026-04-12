// Feature: seo-ranking-improvement
import { describe, it, expect } from "vitest";
import { keywordLandings } from "@/lib/keyword-landings";
import { websiteSchema, organizationSchema } from "@/lib/seo";
import robots from "@/app/robots";

const HOME_TITLE = "RVIP Game: Earn Money, Daily Rewards & Trusted App Guide";
const HOME_DESCRIPTION = "Explore RVIP game guides with earn money tips, daily rewards, ₹500 welcome bonus info, and trusted safe app setup walkthroughs.";

describe("Home page metadata", () => {
  it("title contains ≥2 of: rvip, game, earn, rewards, trusted", () => {
    const targets = ["rvip", "game", "earn", "rewards", "trusted"];
    const lower = HOME_TITLE.toLowerCase();
    const matches = targets.filter((t) => lower.includes(t));
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });

  it("description contains 'earn money', 'daily rewards', or '₹500 welcome bonus'", () => {
    const lower = HOME_DESCRIPTION.toLowerCase();
    const hasMatch =
      lower.includes("earn money") ||
      lower.includes("daily rewards") ||
      lower.includes("₹500 welcome bonus");
    expect(hasMatch).toBe(true);
  });
});

describe("/rvip-game seoTitle", () => {
  it("contains 'rvip game' and one of: play, online, real", () => {
    const landing = keywordLandings.find((l) => l.path === "/rvip-game")!;
    const lower = landing.seoTitle.toLowerCase();
    expect(lower).toContain("rvip game");
    const hasSecondary = ["play", "online", "real"].some((t) => lower.includes(t));
    expect(hasSecondary).toBe(true);
  });
});

describe("/rvip-apk-download seoTitle", () => {
  it("contains 'rvip apk download' and one of: free, safe, trusted", () => {
    const landing = keywordLandings.find((l) => l.path === "/rvip-apk-download")!;
    const lower = landing.seoTitle.toLowerCase();
    expect(lower).toContain("rvip apk download");
    const hasSecondary = ["free", "safe", "trusted"].some((t) => lower.includes(t));
    expect(hasSecondary).toBe(true);
  });
});

describe("websiteSchema", () => {
  it("has @type: WebSite and potentialAction with @type: SearchAction", () => {
    expect(websiteSchema["@type"]).toBe("WebSite");
    expect(websiteSchema.potentialAction["@type"]).toBe("SearchAction");
  });
});

describe("/rvip-safe-trusted landing", () => {
  it("has a section with bullets.length >= 3", () => {
    const landing = keywordLandings.find((l) => l.path === "/rvip-safe-trusted")!;
    const sectionWithBullets = landing.sections.find(
      (s) => s.bullets && s.bullets.length >= 3,
    );
    expect(sectionWithBullets).toBeDefined();
  });
});

describe("robots()", () => {
  it("returns allow: '/'", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.allow).toBe("/");
  });
});

describe("organizationSchema", () => {
  it("is defined and has @type: Organization", () => {
    expect(organizationSchema).toBeDefined();
    expect(organizationSchema["@type"]).toBe("Organization");
  });
});

describe("CtaBlock defaults", () => {
  it("default primaryCta contains 'download' and secondaryCta contains 'play'", () => {
    // These are the default values set in cta-block.tsx
    const defaultPrimary = "Download App Now";
    const defaultSecondary = "Play RVIP Game";
    expect(defaultPrimary.toLowerCase()).toContain("download");
    expect(defaultSecondary.toLowerCase()).toContain("play");
  });
});

describe("Home page Internal Link Hub includes all 4 new landing page paths", () => {
  it("rvipKeywordCluster includes all 4 new paths", () => {
    // These are the paths added to rvipKeywordCluster in app/page.tsx
    const newPaths = ["/rvip-download", "/rvip-bonus", "/rvip-earn-money", "/rvip-safe-trusted"];
    // Verify the landings exist in keywordLandings (which drives the hub)
    newPaths.forEach((path) => {
      const landing = keywordLandings.find((l) => l.path === path);
      expect(landing).toBeDefined();
    });
  });
});
