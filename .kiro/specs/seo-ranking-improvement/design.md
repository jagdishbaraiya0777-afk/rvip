# Design Document: SEO Ranking Improvement

## Overview

This design covers all technical changes required to move rvipi.com from near-zero visibility on commercial keywords to ranking for the primary target set: play, rvip, game, gaming, real, online, website, games, rewards, earn, money, daily, download, ₹500, welcome, bonus, safe, secure, trusted, disclaimer.

The site already has a solid Next.js App Router foundation with `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD schemas, and four keyword landing pages. The work is additive: new landing pages, new blog posts, metadata updates, structured data additions, internal link strengthening, and sitemap automation. No architectural changes are needed.

---

## Architecture

The existing architecture is unchanged. All changes fit within the current patterns:

```
lib/keyword-landings.ts   ← data source for all keyword landing pages
lib/blog-posts-rvip.ts    ← data source for RVIP-specific blog posts
lib/blog-data.ts          ← aggregates all blog posts, exposes getAllPosts()
lib/seo.ts                ← metadata and schema generators
app/sitemap.ts            ← sitemap generation (to be made data-driven)
components/keyword-landing-page.tsx  ← shared landing page renderer
app/[route]/page.tsx      ← thin page files that pull from data sources
```

### Data Flow

```mermaid
graph TD
    A[lib/keyword-landings.ts] -->|KeywordLanding[]| B[app/sitemap.ts]
    A -->|landing data| C[app/[slug]/page.tsx]
    C -->|landing prop| D[components/keyword-landing-page.tsx]
    D -->|faqSchema| E[Script JSON-LD]
    D -->|breadcrumbSchema| F[Script JSON-LD]
    G[lib/blog-posts-rvip.ts] -->|BlogPost[]| H[lib/blog-data.ts]
    H -->|getAllPosts()| B
    H -->|getPostBySlug()| I[app/blog/[slug]/page.tsx]
    I -->|articleSchema + faqSchema| J[Script JSON-LD]
    I -->|breadcrumbSchema| K[Script JSON-LD]
```

---

## Components and Interfaces

### 1. `lib/keyword-landings.ts` — Extended Data

Add a `lastModified` field to `KeywordLanding` so the sitemap can use real dates instead of `new Date()`:

```typescript
export type KeywordLanding = {
  // ... existing fields ...
  lastModified: string; // ISO date string e.g. "2026-04-10"
};
```

Add four new `KeywordLanding` entries:

| path | keyword | primary targets |
|---|---|---|
| `/rvip-download` | `rvip download` | download, rvip apk download, rvip app download |
| `/rvip-bonus` | `rvip bonus` | welcome bonus, ₹500, bonus |
| `/rvip-earn-money` | `rvip earn money` | earn, money, daily, rewards |
| `/rvip-safe-trusted` | `rvip safe trusted` | safe, secure, trusted |

Each new entry must satisfy:
- `seoTitle` ≤ 60 chars, contains primary keyword
- `seoDescription` 140–160 chars, contains primary keyword + one secondary keyword
- `title` (used as `<h1>`) contains primary keyword exactly once
- `sections` has ≥ 2 entries whose `heading` contains a related secondary keyword
- `intro[0]` first 100 words contain the primary keyword
- Combined body text contains ≥ 5 terms from the primary keyword set
- `faq` has ≥ 3 entries
- `heroAlt` contains the primary keyword
- `lastModified` set to the creation date

The `rvip-safe-trusted` entry must have one section with `bullets` containing ≥ 3 items describing specific safety/security features.

### 2. New Page Files

Four new thin page files following the existing pattern:

```
app/rvip-download/page.tsx
app/rvip-bonus/page.tsx
app/rvip-earn-money/page.tsx
app/rvip-safe-trusted/page.tsx
```

Each follows the exact same pattern as `app/rvip-game/page.tsx`:

```typescript
import type { Metadata } from "next";
import { KeywordLandingPage } from "@/components/keyword-landing-page";
import { keywordLandings } from "@/lib/keyword-landings";
import { createMetadata } from "@/lib/seo";

const landing = keywordLandings.find((item) => item.path === "/rvip-download")!;

export const metadata: Metadata = createMetadata({
  title: landing.seoTitle,
  description: landing.seoDescription,
  path: landing.path,
  image: landing.heroImage,
});

export default function RvipDownloadPage() {
  return <KeywordLandingPage landing={landing} />;
}
```

### 3. `components/keyword-landing-page.tsx` — Structural Additions

Three additions to the shared renderer:

**a) Breadcrumb schema** — emit a `BreadcrumbList` JSON-LD block alongside the existing FAQ schema:

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: landing.title, item: absoluteUrl(landing.path) },
  ],
};
```

**b) Trust notice** — a visible block above the FAQ section containing "safe" or "trusted" text and a `<Link href="/disclaimer">` element. This satisfies Requirements 2.3 and 9.1 in one place.

**c) Disclaimer link in intro** — the trust notice replaces the need to embed disclaimer links in every landing's data; the component handles it structurally.

**d) Internal links section** — the component already renders "Back to Home" and "Open Blog Hub" links. Extend to also link to `/rvip-download` (keyword-rich anchor: "Download RVIP App") and `/rvip-safe-trusted` (anchor: "RVIP Safe & Trusted Guide"), giving every landing page ≥ 3 internal links with keyword-rich anchor text.

### 4. `lib/seo.ts` — New Schema Generators

Add two new exported functions:

```typescript
// Breadcrumb schema for blog posts (3-level: Home → Blog → Post)
export function createBlogBreadcrumbSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };
}

// WebSite schema with SearchAction for the home page
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${absoluteUrl("/blog")}?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
```

### 5. `app/blog/[slug]/page.tsx` — Breadcrumb Schema

Import and emit `createBlogBreadcrumbSchema` alongside the existing article and FAQ schemas:

```typescript
import { createArticleSchema, createBlogBreadcrumbSchema, createBlogMetadata, createFaqSchema } from "@/lib/seo";
// ...
const breadcrumbSchema = createBlogBreadcrumbSchema(post);
// Add a Script tag for breadcrumbSchema
```

### 6. `app/page.tsx` — Home Page Updates

- Add `websiteSchema` Script tag
- Update `metadata` to include "earn money", "daily rewards", or "₹500 welcome bonus" in description
- Update `metadata` title to include ≥ 2 of: "rvip", "game", "earn", "rewards", "trusted"
- Add visible text containing "earn", "rewards", "daily", "trusted", "safe", and "₹500" in the body (the features/steps sections are the natural place)
- Add links to all 4 new keyword landing pages in the "Internal Link Hub" section

### 7. Existing Page Metadata Updates

| Page | Title change | Description change |
|---|---|---|
| `app/page.tsx` | Include "rvip", "earn", "rewards" | Include "earn money" or "₹500 welcome bonus" |
| `app/rvip-game/page.tsx` | Include "rvip game" + one of "play", "online", "real" | (via landing data update) |
| `app/rvip-apk-download/page.tsx` | Include "rvip apk download" + one of "free", "safe", "trusted" | (via landing data update) |
| `app/about/page.tsx` | Include "trusted" and "safe" | Include "trusted" and "safe" |
| `app/disclaimer/page.tsx` | Already contains "disclaimer" | Ensure "safe", "trusted", "responsible" in body |

These are achieved by updating the `seoTitle`/`seoDescription` fields in `lib/keyword-landings.ts` for landing pages, and updating `createMetadata()` call arguments in the page files for static pages.

### 8. `components/cta-block.tsx` — Descriptive CTA Text

The `CtaBlock` component currently hardcodes "Get Started Now" and "Access Here". Change to accept an optional `primaryCta` and `secondaryCta` prop, defaulting to "Download App Now" and "Play RVIP Game":

```typescript
type CtaBlockProps = {
  title: string;
  body: string;
  primaryCta?: string;   // default: "Download App Now"
  secondaryCta?: string; // default: "Play RVIP Game"
};
```

This ensures every CTA contains "download" or "play" as required by Requirement 9.3.

### 9. `components/site-footer.tsx` — Disclaimer Link

The footer already links to `/disclaimer` via `navigationLinks`. Verify the anchor text reads "Disclaimer" or "Legal Disclaimer". Currently `navigationLinks` in `lib/site-config.ts` has `{ href: "/disclaimer", label: "Disclaimer" }` — this already satisfies Requirement 4.4. No change needed.

### 10. `app/sitemap.ts` — Data-Driven Generation

Refactor to derive keyword landing page routes from `keywordLandings` instead of hardcoding them. This makes Requirement 10.2 automatic:

```typescript
import { keywordLandings } from "@/lib/keyword-landings";

// Replace hardcoded landing routes with:
const landingRoutes: MetadataRoute.Sitemap = keywordLandings.map((landing) => ({
  url: absoluteUrl(landing.path),
  lastModified: new Date(landing.lastModified),
  changeFrequency: "weekly",
  priority: 0.9,
}));
```

Also update:
- Home page: `priority: 1.0`, `changeFrequency: "daily"`, `lastModified: new Date("2026-04-10")`
- Blog index: `priority: 0.85`, `changeFrequency: "weekly"`
- Blog posts: `priority: 0.8`, `lastModified: new Date(post.updatedAt)` (already done)
- About/Disclaimer: `priority: 0.7` / `0.6`, `changeFrequency: "monthly"`, use fixed dates

### 11. New Blog Posts in `lib/blog-posts-rvip.ts`

Add four new `BlogPost` entries:

| slug | primaryKeyword | target cluster |
|---|---|---|
| `rvip-login-guide` | `rvip login` | login, guide |
| `rvip-registration-complete-guide` | `rvip registration` | registration, complete guide |
| `rvip-features-and-games` | `rvip features` | features, games |
| `rvip-common-issues-and-solutions` | `rvip common issues` | common issues, solutions |

Each post must satisfy:
- `seoTitle`, `seoDescription`, `title`, and ≥ 1 `sections[].heading` contain `primaryKeyword`
- `faq.length >= 3` with ≥ 1 question containing the primary keyword
- `internalLinks` contains ≥ 1 entry pointing to a keyword landing page path and ≥ 1 entry pointing to `/disclaimer`

---

## Data Models

### Updated `KeywordLanding` type

```typescript
export type KeywordLanding = {
  path: string;
  keyword: string;
  title: string;          // used as <h1>
  seoTitle: string;       // ≤ 60 chars, contains keyword
  seoDescription: string; // 140–160 chars, contains keyword
  heroImage: string;
  heroAlt: string;        // contains keyword
  intro: string[];        // intro[0] first 100 words contain keyword
  sections: KeywordSection[]; // ≥ 2 headings contain secondary keywords
  faq: KeywordFaq[];      // ≥ 3 entries
  lastModified: string;   // ISO date string, new field
};
```

### `BlogPost` type (unchanged)

The existing `BlogPost` type in `lib/blog-data.ts` already supports all required fields. No type changes needed.

### Sitemap entry shape (unchanged)

The `MetadataRoute.Sitemap` type from Next.js is used as-is. The `lastModified` field accepts `string | Date`.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Title contains keyword within 60 characters

*For any* `KeywordLanding` in `keywordLandings`, the `seoTitle` field must contain `landing.keyword` (case-insensitive) and its length must be ≤ 60 characters.

**Validates: Requirements 1.2**

---

### Property 2: Meta description length and keyword inclusion

*For any* `KeywordLanding` in `keywordLandings`, the `seoDescription` field must have length between 140 and 160 characters (inclusive) and must contain `landing.keyword` (case-insensitive).

**Validates: Requirements 1.3**

---

### Property 3: H1 contains primary keyword

*For any* `KeywordLanding` in `keywordLandings`, the `title` field (rendered as `<h1>`) must contain `landing.keyword` (case-insensitive) at least once.

**Validates: Requirements 1.4**

---

### Property 4: At least two H2s contain secondary keywords

*For any* `KeywordLanding` in `keywordLandings`, at least 2 entries in `landing.sections` must have a `heading` that contains at least one word from the primary keyword set (case-insensitive).

**Validates: Requirements 1.5**

---

### Property 5: Sitemap includes all landing pages with correct metadata

*For any* `KeywordLanding` in `keywordLandings`, the output of `sitemap()` must contain an entry whose `url` equals `absoluteUrl(landing.path)`, with `changeFrequency: "weekly"` and `priority >= 0.88`.

**Validates: Requirements 1.6, 10.2, 10.3, 10.4**

---

### Property 6: Primary keyword appears in first 100 words of intro

*For any* `KeywordLanding` in `keywordLandings`, the first 100 words of `landing.intro[0]` must contain `landing.keyword` (case-insensitive).

**Validates: Requirements 2.1**

---

### Property 7: Body text contains at least 5 semantically related terms

*For any* `KeywordLanding` in `keywordLandings`, the combined text of all `intro` paragraphs and all `sections[].paragraphs` must contain at least 5 distinct terms from the primary keyword set.

**Validates: Requirements 2.2**

---

### Property 8: FAQ schema has at least 3 entries on every landing page

*For any* `KeywordLanding` in `keywordLandings`, `landing.faq.length` must be ≥ 3.

**Validates: Requirements 3.1**

---

### Property 9: Breadcrumb schema has at least 2 levels on every landing page

*For any* `KeywordLanding` in `keywordLandings`, the breadcrumb schema generated for that page must have `itemListElement.length >= 2`, with position 1 being the home URL and position 2 being `absoluteUrl(landing.path)`.

**Validates: Requirements 3.2**

---

### Property 10: Blog post breadcrumb schema has exactly 3 levels

*For any* `BlogPost` in `getAllPosts()`, the output of `createBlogBreadcrumbSchema(post)` must have `itemListElement.length === 3`, with positions Home, Blog, and the post's URL.

**Validates: Requirements 3.3**

---

### Property 11: No duplicate FAQ questions across all pages

*For any* two distinct pages (landing pages + blog posts), no FAQ question string should appear identically in both pages' FAQ arrays.

**Validates: Requirements 3.5**

---

### Property 12: No duplicate page titles

*For any* two distinct pages, their title strings must not be identical.

**Validates: Requirements 6.6**

---

### Property 13: Canonical URL matches page path

*For any* page path `p`, `createMetadata({ path: p, ... }).alternates.canonical` must equal `absoluteUrl(p)`.

**Validates: Requirements 8.1**

---

### Property 14: Sitemap has no duplicate URLs

*For any* execution of `sitemap()`, all `url` values in the returned array must be unique (no two entries share the same URL string).

**Validates: Requirements 8.4**

---

### Property 15: Hero image alt text contains primary keyword

*For any* `KeywordLanding` in `keywordLandings`, `landing.heroAlt` must be non-empty and contain `landing.keyword` (case-insensitive).

**Validates: Requirements 7.1, 7.3**

---

### Property 16: Blog post keyword appears in title, description, h1, and at least one h2

*For any* `BlogPost` in `getAllPosts()`, the `seoTitle`, `seoDescription`, `title`, and at least one `sections[].heading` must each contain `post.primaryKeyword` (case-insensitive).

**Validates: Requirements 5.2**

---

### Property 17: Blog post FAQ has at least 3 entries

*For any* `BlogPost` in `getAllPosts()`, `post.faq.length` must be ≥ 3.

**Validates: Requirements 5.3**

---

### Property 18: Blog post internal links include a landing page and disclaimer

*For any* `BlogPost` in `getAllPosts()`, `post.internalLinks` must contain at least one entry with `href` pointing to a keyword landing page path (not `/`, `/blog`, `/about`, `/disclaimer`) and at least one entry with `href === "/disclaimer"`.

**Validates: Requirements 4.3, 5.4**

---

### Property 19: Sitemap includes all blog posts

*For any* `BlogPost` returned by `getAllPosts()`, the output of `sitemap()` must contain an entry whose `url` equals `absoluteUrl("/blog/" + post.slug)`.

**Validates: Requirements 10.1**

---

### Property 20: Blog post sitemap entries use actual updatedAt dates

*For any* `BlogPost` returned by `getAllPosts()`, the corresponding sitemap entry's `lastModified` must equal `new Date(post.updatedAt)`, not a runtime `new Date()`.

**Validates: Requirements 10.5**

---

## Error Handling

**Missing landing data** — page files use a non-null assertion (`!`) after `.find()`. If a path is missing from `keywordLandings`, this throws at build time, which is the correct behavior (fail fast, not silently serve a broken page).

**Missing blog post** — `app/blog/[slug]/page.tsx` already calls `notFound()` when `getPostBySlug()` returns undefined. No change needed.

**Sitemap generation** — `sitemap()` is a pure synchronous function. If `keywordLandings` or `getAllPosts()` returns an empty array, the sitemap will simply omit those entries. No runtime error, but the smoke test will catch missing entries.

**Schema serialization** — JSON-LD blocks are serialized with `JSON.stringify`. All schema objects use plain string/number values, so serialization cannot fail.

**Duplicate FAQ questions** — enforced by the Property 11 test at development time. No runtime guard is needed since content is static.

---

## Testing Strategy

This feature involves static content data and pure functions (metadata generators, schema builders, sitemap generator). Property-based testing is appropriate for the data-driven invariants. Example-based tests cover single-page checks.

### Testing library

Use **Vitest** (already the standard for Next.js TypeScript projects; check `package.json` to confirm). No additional dependencies needed for the property tests since the input space is the finite, enumerable set of `keywordLandings` and `getAllPosts()` — we iterate over all of them rather than generating random inputs.

> Note: Because the "inputs" are a finite enumerable set (all landing pages, all blog posts), the properties above are verified exhaustively rather than via random generation. This is equivalent to property-based testing over the actual data set and is more appropriate than a PBT library for this domain.

### Unit tests — example-based

Cover single-page requirements that cannot be expressed as universal properties:

- Home page metadata title contains ≥ 2 of: "rvip", "game", "earn", "rewards", "trusted" (Req 6.1)
- Home page metadata description contains "earn money", "daily rewards", or "₹500 welcome bonus" (Req 6.2)
- `/rvip-game` metadata title contains "rvip game" and one of "play", "online", "real" (Req 6.3)
- `/rvip-apk-download` metadata title contains "rvip apk download" and one of "free", "safe", "trusted" (Req 6.4)
- `/about` metadata title and description contain "trusted" and "safe" (Req 6.5)
- Home page body text contains "earn", "rewards", "daily", "trusted", "safe", "₹500" (Req 2.4, 2.5)
- `websiteSchema` has `@type: "WebSite"` and `potentialAction` with `@type: "SearchAction"` (Req 3.4)
- `rvip-safe-trusted` landing has a section with `bullets.length >= 3` (Req 9.2)
- Footer renders a link to `/disclaimer` with anchor text "Disclaimer" (Req 4.4)
- `robots()` returns `allow: "/"` (Req 8.3)
- `organizationSchema` is present in layout (Req 9.4)
- Disclaimer page h1 contains "disclaimer" (Req 9.5)
- CTA button text contains "download" or "play" (Req 9.3)
- Home page links to all 4 new landing page paths (Req 4.2)
- Existing landing pages (`/rvip-game`, `/rvip-apk`, `/rvip-apk-download`, `/rvip-app-download`) each link to `/rvip-download` (Req 4.5)

### Property tests — exhaustive over data set

Each property listed in the Correctness Properties section maps to one test that iterates over all relevant data entries:

| Property | Test description |
|---|---|
| P1 | `keywordLandings.forEach` — seoTitle ≤ 60 chars and contains keyword |
| P2 | `keywordLandings.forEach` — seoDescription 140–160 chars and contains keyword |
| P3 | `keywordLandings.forEach` — title contains keyword |
| P4 | `keywordLandings.forEach` — ≥ 2 section headings contain a keyword-set term |
| P5 | `keywordLandings.forEach` — sitemap() entry has correct changeFrequency and priority |
| P6 | `keywordLandings.forEach` — intro[0] first 100 words contain keyword |
| P7 | `keywordLandings.forEach` — combined body text contains ≥ 5 keyword-set terms |
| P8 | `keywordLandings.forEach` — faq.length >= 3 |
| P9 | `keywordLandings.forEach` — breadcrumb schema has 2 items |
| P10 | `getAllPosts().forEach` — blog breadcrumb schema has 3 items |
| P11 | All pages combined — no duplicate FAQ question strings |
| P12 | All pages combined — no duplicate title strings |
| P13 | All page paths — createMetadata canonical equals absoluteUrl(path) |
| P14 | sitemap() output — all URLs unique |
| P15 | `keywordLandings.forEach` — heroAlt non-empty and contains keyword |
| P16 | `getAllPosts().forEach` — keyword in seoTitle, seoDescription, title, ≥1 heading |
| P17 | `getAllPosts().forEach` — faq.length >= 3 |
| P18 | `getAllPosts().forEach` — internalLinks has landing page href and /disclaimer href |
| P19 | `getAllPosts().forEach` — sitemap() contains blog post URL |
| P20 | `getAllPosts().forEach` — sitemap entry lastModified equals new Date(post.updatedAt) |

### Tag format

Each test file should include a comment at the top:

```typescript
// Feature: seo-ranking-improvement
// Property N: <property_text>
```
