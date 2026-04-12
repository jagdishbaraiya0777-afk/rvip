# Implementation Plan: SEO Ranking Improvement

## Overview

Additive changes to an existing Next.js App Router site. No architectural changes. Work proceeds in layers: data → components → pages → tests. Each task builds on the previous and ends with everything wired together.

## Tasks

- [x] 1. Add `lastModified` field to `KeywordLanding` type and update existing entries
  - Add `lastModified: string` to the `KeywordLanding` type in `lib/keyword-landings.ts`
  - Add a `lastModified` ISO date string to each of the 4 existing landing entries (`/rvip-game`, `/rvip-app-download`, `/rvip-apk`, `/rvip-apk-download`)
  - _Requirements: 10.5_

- [x] 2. Add 4 new keyword landing entries to `lib/keyword-landings.ts`
  - [x] 2.1 Add `/rvip-download` entry (keyword: `rvip download`, targets: download, rvip apk download, rvip app download)
    - `seoTitle` ≤ 60 chars containing "rvip download"
    - `seoDescription` 140–160 chars containing "rvip download" + one secondary keyword
    - `title` (`<h1>`) contains "rvip download" exactly once
    - `intro[0]` first 100 words contain "rvip download"
    - ≥ 2 section headings contain a secondary keyword from the target cluster
    - Combined body text contains ≥ 5 terms from the primary keyword set
    - `faq` has ≥ 3 entries
    - `heroAlt` contains "rvip download"
    - `heroImage` set to an existing screenshot (e.g. `/ss2.jpeg`)
    - `lastModified` set to creation date
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 7.3_

  - [x] 2.2 Add `/rvip-bonus` entry (keyword: `rvip bonus`, targets: welcome bonus, ₹500, bonus)
    - Same structural constraints as 2.1 applied to "rvip bonus"
    - Body text must include "₹500" or "500 rupees" and "welcome bonus"
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 7.3_

  - [x] 2.3 Add `/rvip-earn-money` entry (keyword: `rvip earn money`, targets: earn, money, daily, rewards)
    - Same structural constraints as 2.1 applied to "rvip earn money"
    - Body text must include "earn", "money", "daily", "rewards"
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 7.3_

  - [x] 2.4 Add `/rvip-safe-trusted` entry (keyword: `rvip safe trusted`, targets: safe, secure, trusted)
    - Same structural constraints as 2.1 applied to "rvip safe trusted"
    - Must include a section with `bullets` array of ≥ 3 items describing specific safety/security features
    - Body text must include "safe", "secure", "trusted"
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 7.3, 9.2_

- [x] 3. Create 4 new keyword landing page files
  - Create `app/rvip-download/page.tsx` following the exact pattern of `app/rvip-game/page.tsx`
  - Create `app/rvip-bonus/page.tsx` following the same pattern
  - Create `app/rvip-earn-money/page.tsx` following the same pattern
  - Create `app/rvip-safe-trusted/page.tsx` following the same pattern
  - Each file: imports `KeywordLandingPage`, `keywordLandings`, `createMetadata`; finds its landing by path; exports `metadata` and a default page component
  - _Requirements: 1.1_

- [x] 4. Update `components/keyword-landing-page.tsx` with structural additions
  - [x] 4.1 Add breadcrumb JSON-LD schema
    - Import `absoluteUrl` from `@/lib/site-config`
    - Build a `BreadcrumbList` schema with 2 items: Home (`absoluteUrl("/")`) and the landing page (`absoluteUrl(landing.path)`)
    - Emit it as a `<Script>` tag with `id={breadcrumb-schema-${landing.keyword.replace(/\s+/g, "-")}}`
    - _Requirements: 3.2_

  - [x] 4.2 Add trust notice block above the FAQ section
    - Render a visible `<section>` containing text with "safe" or "trusted" and a `<Link href="/disclaimer">` with anchor text "Disclaimer"
    - _Requirements: 2.3, 9.1_

  - [x] 4.3 Extend internal links section with keyword-rich anchors
    - Add a link to `/rvip-download` with anchor text "Download RVIP App"
    - Add a link to `/rvip-safe-trusted` with anchor text "RVIP Safe & Trusted Guide"
    - This gives every landing page ≥ 3 internal links with keyword-rich anchor text (existing "Back to Home" + "Open Blog Hub" + these two new ones)
    - _Requirements: 4.1, 4.5_

  - [x] 4.4 Update `CtaBlock` usage to use descriptive CTA text
    - Pass `primaryCta` and `secondaryCta` props (once `CtaBlock` is updated in task 5) with values containing "download" or "play"
    - _Requirements: 9.3_

- [x] 5. Update `components/cta-block.tsx` to accept optional CTA label props
  - Add optional `primaryCta?: string` and `secondaryCta?: string` to `CtaBlockProps`
  - Default `primaryCta` to `"Download App Now"` and `secondaryCta` to `"Play RVIP Game"`
  - Replace hardcoded button text with the prop values
  - _Requirements: 9.3_

- [x] 6. Add new schema generators to `lib/seo.ts`
  - Add `createBlogBreadcrumbSchema(post: BlogPost)` — returns a 3-level `BreadcrumbList` (Home → Blog → Post)
  - Add `websiteSchema` constant — `@type: "WebSite"` with `potentialAction` of `@type: "SearchAction"` targeting the blog index
  - Export both
  - _Requirements: 3.3, 3.4_

- [x] 7. Emit breadcrumb schema on blog post pages (`app/blog/[slug]/page.tsx`)
  - Import `createBlogBreadcrumbSchema` from `@/lib/seo`
  - Call it with the resolved `post` object
  - Add a `<Script>` tag for the breadcrumb schema alongside the existing article and FAQ schema scripts
  - _Requirements: 3.3_

- [x] 8. Update home page (`app/page.tsx`)
  - [x] 8.1 Add `websiteSchema` Script tag
    - Import `websiteSchema` from `@/lib/seo`
    - Emit it as a `<Script id="website-schema">` tag in the JSX return
    - _Requirements: 3.4_

  - [x] 8.2 Update `metadata` title and description
    - Title must include ≥ 2 of: "rvip", "game", "earn", "rewards", "trusted"
    - Description must include "earn money", "daily rewards", or "₹500 welcome bonus"
    - _Requirements: 6.1, 6.2_

  - [x] 8.3 Add target keywords to visible body text
    - Ensure "earn", "rewards", "daily", "trusted", "safe", and "₹500" each appear at least once in the rendered body (features array or steps section are natural locations)
    - _Requirements: 2.4, 2.5_

  - [x] 8.4 Add links to all 4 new landing pages in the Internal Link Hub section
    - Add `/rvip-download`, `/rvip-bonus`, `/rvip-earn-money`, `/rvip-safe-trusted` to the Core Pages list with keyword-rich anchor text
    - _Requirements: 4.2_

- [x] 9. Update existing page metadata and landing data
  - [x] 9.1 Update `/rvip-game` landing entry in `lib/keyword-landings.ts`
    - Ensure `seoTitle` contains "rvip game" and at least one of: "play", "online", "real"
    - _Requirements: 6.3_

  - [x] 9.2 Update `/rvip-apk-download` landing entry in `lib/keyword-landings.ts`
    - Ensure `seoTitle` contains "rvip apk download" and at least one of: "free", "safe", "trusted"
    - _Requirements: 6.4_

  - [x] 9.3 Update `app/about/page.tsx` metadata
    - Ensure `createMetadata()` call produces a title and description that include "trusted" and "safe"
    - _Requirements: 6.5_

  - [x] 9.4 Update `app/disclaimer/page.tsx`
    - Ensure the `<h1>` contains "disclaimer"
    - Ensure body text includes "safe", "trusted", and "responsible"
    - _Requirements: 9.5_

- [x] 10. Refactor `app/sitemap.ts` to be data-driven
  - Import `keywordLandings` from `@/lib/keyword-landings`
  - Replace the 4 hardcoded landing page entries with a `keywordLandings.map(...)` block using `landing.lastModified` for `lastModified`
  - Set home page: `priority: 1.0`, `changeFrequency: "daily"`, `lastModified: new Date("2026-04-10")`
  - Set blog index: `priority: 0.85`, `changeFrequency: "weekly"`
  - Set landing pages: `priority: 0.9`, `changeFrequency: "weekly"`
  - Set blog posts: `priority: 0.8`, `lastModified: new Date(post.updatedAt)` (verify already done)
  - Set about/disclaimer: fixed dates, `priority: 0.7` / `0.6`, `changeFrequency: "monthly"`
  - _Requirements: 1.6, 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 11. Add 4 new blog posts to `lib/blog-posts-rvip.ts`
  - [x] 11.1 Add `rvip-login-guide` post (primaryKeyword: `rvip login`)
    - `seoTitle`, `seoDescription`, `title`, and ≥ 1 `sections[].heading` contain "rvip login"
    - `faq.length >= 3` with ≥ 1 question containing "rvip login"
    - `internalLinks` contains ≥ 1 entry pointing to a keyword landing page path and ≥ 1 entry with `href: "/disclaimer"`
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 11.2 Add `rvip-registration-complete-guide` post (primaryKeyword: `rvip registration`)
    - Same structural constraints as 11.1 applied to "rvip registration"
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 11.3 Add `rvip-features-and-games` post (primaryKeyword: `rvip features`)
    - Same structural constraints as 11.1 applied to "rvip features"
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 11.4 Add `rvip-common-issues-and-solutions` post (primaryKeyword: `rvip common issues`)
    - Same structural constraints as 11.1 applied to "rvip common issues"
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 12. Checkpoint — verify build passes
  - Run `next build` (or `npm run build`) and confirm zero TypeScript/build errors
  - Ensure all 4 new landing pages and 4 new blog posts are included in the build output
  - Ask the user if any questions arise before proceeding to tests

- [x] 13. Set up Vitest and write property tests
  - [x] 13.1 Install and configure Vitest
    - Add `vitest` and `@vitejs/plugin-react` (or `vitest` with Next.js config) as dev dependencies
    - Create `vitest.config.ts` (or `vitest.config.mjs`) at the project root with path alias `@` pointing to the project root
    - Add a `"test": "vitest --run"` script to `package.json`
    - _Requirements: (test infrastructure)_

  - [x]* 13.2 Write property tests for `KeywordLanding` data invariants (Properties 1–9, 11–12, 14–15)
    - Create `__tests__/seo-landing-properties.test.ts`
    - Add file header: `// Feature: seo-ranking-improvement`
    - **Property 1**: `keywordLandings.forEach` — `seoTitle.length <= 60` and `seoTitle` contains `landing.keyword` (case-insensitive) — **Validates: Requirements 1.2**
    - **Property 2**: `keywordLandings.forEach` — `seoDescription.length` between 140–160 and contains `landing.keyword` — **Validates: Requirements 1.3**
    - **Property 3**: `keywordLandings.forEach` — `title` contains `landing.keyword` — **Validates: Requirements 1.4**
    - **Property 4**: `keywordLandings.forEach` — ≥ 2 section headings contain a keyword-set term — **Validates: Requirements 1.5**
    - **Property 6**: `keywordLandings.forEach` — first 100 words of `intro[0]` contain `landing.keyword` — **Validates: Requirements 2.1**
    - **Property 7**: `keywordLandings.forEach` — combined body text contains ≥ 5 distinct keyword-set terms — **Validates: Requirements 2.2**
    - **Property 8**: `keywordLandings.forEach` — `faq.length >= 3` — **Validates: Requirements 3.1**
    - **Property 11**: All pages combined — no duplicate FAQ question strings — **Validates: Requirements 3.5**
    - **Property 12**: All pages combined — no duplicate title strings — **Validates: Requirements 6.6**
    - **Property 15**: `keywordLandings.forEach` — `heroAlt` non-empty and contains `landing.keyword` — **Validates: Requirements 7.1, 7.3**

  - [x]* 13.3 Write property tests for schema generators (Properties 9–10, 13)
    - Create `__tests__/seo-schema-properties.test.ts`
    - Add file header: `// Feature: seo-ranking-improvement`
    - **Property 9**: `keywordLandings.forEach` — breadcrumb schema from `KeywordLandingPage` has `itemListElement.length >= 2`, position 1 = home URL, position 2 = `absoluteUrl(landing.path)` — **Validates: Requirements 3.2**
    - **Property 10**: `getAllPosts().forEach` — `createBlogBreadcrumbSchema(post).itemListElement.length === 3` with correct Home/Blog/Post URLs — **Validates: Requirements 3.3**
    - **Property 13**: All page paths — `createMetadata({ path: p, ... }).alternates.canonical` equals `absoluteUrl(p)` — **Validates: Requirements 8.1**

  - [x]* 13.4 Write property tests for sitemap (Properties 5, 14, 19–20)
    - Create `__tests__/seo-sitemap-properties.test.ts`
    - Add file header: `// Feature: seo-ranking-improvement`
    - **Property 5**: `keywordLandings.forEach` — `sitemap()` output contains entry with `url === absoluteUrl(landing.path)`, `changeFrequency: "weekly"`, `priority >= 0.88` — **Validates: Requirements 1.6, 10.2, 10.3, 10.4**
    - **Property 14**: `sitemap()` output — all `url` values are unique — **Validates: Requirements 8.4**
    - **Property 19**: `getAllPosts().forEach` — `sitemap()` contains entry with `url === absoluteUrl("/blog/" + post.slug)` — **Validates: Requirements 10.1**
    - **Property 20**: `getAllPosts().forEach` — sitemap entry `lastModified` equals `new Date(post.updatedAt)` — **Validates: Requirements 10.5**

  - [x]* 13.5 Write property tests for blog post data invariants (Properties 16–18)
    - Create `__tests__/seo-blog-properties.test.ts`
    - Add file header: `// Feature: seo-ranking-improvement`
    - **Property 16**: `getAllPosts().forEach` — `seoTitle`, `seoDescription`, `title`, and ≥ 1 `sections[].heading` each contain `post.primaryKeyword` (case-insensitive) — **Validates: Requirements 5.2**
    - **Property 17**: `getAllPosts().forEach` — `faq.length >= 3` — **Validates: Requirements 5.3**
    - **Property 18**: `getAllPosts().forEach` — `internalLinks` has ≥ 1 landing page href and ≥ 1 `href === "/disclaimer"` — **Validates: Requirements 4.3, 5.4**

  - [x]* 13.6 Write unit tests for single-page and component requirements
    - Create `__tests__/seo-unit.test.ts`
    - Add file header: `// Feature: seo-ranking-improvement`
    - Home page metadata title contains ≥ 2 of: "rvip", "game", "earn", "rewards", "trusted" — **Validates: Requirements 6.1**
    - Home page metadata description contains "earn money", "daily rewards", or "₹500 welcome bonus" — **Validates: Requirements 6.2**
    - `/rvip-game` `seoTitle` contains "rvip game" and one of "play", "online", "real" — **Validates: Requirements 6.3**
    - `/rvip-apk-download` `seoTitle` contains "rvip apk download" and one of "free", "safe", "trusted" — **Validates: Requirements 6.4**
    - `websiteSchema` has `@type: "WebSite"` and `potentialAction["@type"] === "SearchAction"` — **Validates: Requirements 3.4**
    - `rvip-safe-trusted` landing has a section with `bullets.length >= 3` — **Validates: Requirements 9.2**
    - `robots()` returns `allow: "/"` — **Validates: Requirements 8.3**
    - `organizationSchema` is defined and has `@type: "Organization"` — **Validates: Requirements 9.4**
    - `CtaBlock` default `primaryCta` contains "download" and default `secondaryCta` contains "play" — **Validates: Requirements 9.3**
    - Home page `rvipKeywordCluster` or Internal Link Hub includes all 4 new landing page paths — **Validates: Requirements 4.2**

- [x] 14. Final checkpoint — run tests and confirm all pass
  - Run `npm run test` and confirm all property and unit tests pass
  - Fix any data or logic issues surfaced by the tests
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- All 20 correctness properties from the design map to test sub-tasks in task 13
- The sitemap refactor in task 10 makes requirement 10.2 automatic for all future landing pages
- No new npm runtime dependencies are needed; Vitest is the only new dev dependency
