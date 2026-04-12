# Requirements Document

## Introduction

The RVIP Insider website (rvipi.com) is a Next.js gaming/rewards platform guide site targeting users searching for the RVIP app — a mobile gaming platform offering rewards, daily earnings, and a ₹500 welcome bonus. Google Search Console data shows the site currently receives impressions almost exclusively for the branded query "rvipi" (9 impressions, position 1) with zero visibility on the primary commercial keywords: play, rvip, game, gaming, real, online, website, games, rewards, earn, money, daily, download, ₹500, welcome, bonus, safe, secure, trusted, disclaimer.

The site already has a solid technical foundation: Next.js App Router, structured metadata via `lib/seo.ts`, a sitemap, robots.txt, JSON-LD schemas, and keyword landing pages. The gap is in content depth, on-page keyword targeting, structured data coverage, page-level authority signals, and the absence of pages targeting high-intent transactional queries (download, bonus, earn, rewards, ₹500).

This feature covers all changes required to rank on the primary keyword set and close the gap against competitors who rank for: game, rvip, login, download, free, complete, guide, registration, user, information, features, register, common issues, safe.

---

## Glossary

- **SEO_System**: The collection of Next.js pages, metadata, structured data, internal links, and content that Google crawls and indexes for rvipi.com.
- **Keyword_Landing_Page**: A dedicated Next.js route (`/[slug]/page.tsx`) built around a single primary keyword cluster, following the existing `KeywordLanding` type in `lib/keyword-landings.ts`.
- **Primary_Keyword**: One of the target keywords listed in `public/keywords.csv` or the user-specified set: play, rvip, game, gaming, real, online, website, games, rewards, earn, money, daily, download, ₹500, welcome, bonus, safe, secure, trusted, disclaimer.
- **Metadata_Generator**: The `createMetadata()` function in `lib/seo.ts` that produces Next.js `Metadata` objects.
- **Structured_Data**: JSON-LD blocks embedded via Next.js `<Script>` tags, following schema.org vocabulary.
- **Internal_Link_Graph**: The network of `<Link>` elements connecting pages within rvipi.com.
- **Sitemap**: The `app/sitemap.ts` file that generates `/sitemap.xml` for Googlebot.
- **GSC**: Google Search Console — the source of impression, click, CTR, and position data in the `gsc/` folder.
- **EEAT**: Experience, Expertise, Authoritativeness, Trustworthiness — Google's quality framework.
- **FAQ_Schema**: A `FAQPage` JSON-LD block that enables rich results in Google Search.
- **Breadcrumb_Schema**: A `BreadcrumbList` JSON-LD block that enables breadcrumb rich results.
- **Blog_Post**: A content entry defined by the `BlogPost` type in `lib/blog-data.ts`.
- **CTA**: Call-to-action element linking to the official RVIP invite URL.

---

## Requirements

### Requirement 1: Keyword-Targeted Landing Pages for High-Intent Queries

**User Story:** As a user searching for "rvip download", "rvip bonus", "rvip earn money", or "rvip rewards", I want to find a dedicated, informative page on rvipi.com, so that I can get the information I need and access the app.

#### Acceptance Criteria

1. THE SEO_System SHALL include a dedicated Keyword_Landing_Page for each of the following keyword clusters: `rvip-download` (targeting: download, rvip apk download, rvip app download), `rvip-bonus` (targeting: welcome bonus, ₹500, bonus), `rvip-earn-money` (targeting: earn, money, daily, rewards), and `rvip-safe-trusted` (targeting: safe, secure, trusted).
2. WHEN a Keyword_Landing_Page is rendered, THE Metadata_Generator SHALL produce a `<title>` tag that contains the primary keyword of that page within the first 60 characters.
3. WHEN a Keyword_Landing_Page is rendered, THE Metadata_Generator SHALL produce a `<meta name="description">` tag between 140 and 160 characters that includes the primary keyword and a secondary keyword.
4. WHEN a Keyword_Landing_Page is rendered, THE SEO_System SHALL render an `<h1>` element that contains the primary keyword exactly once.
5. WHEN a Keyword_Landing_Page is rendered, THE SEO_System SHALL render at least two `<h2>` elements that each contain a related secondary keyword.
6. THE SEO_System SHALL add each new Keyword_Landing_Page URL to `app/sitemap.ts` with `changeFrequency: "weekly"` and `priority` of 0.88 or higher.

---

### Requirement 2: On-Page Keyword Density and Semantic Coverage

**User Story:** As a site owner, I want every page to naturally use the primary and secondary keywords throughout the body content, so that Google understands the topical relevance of each page.

#### Acceptance Criteria

1. WHEN a Keyword_Landing_Page is rendered, THE SEO_System SHALL include the primary keyword in the first 100 words of visible body text.
2. WHEN a Keyword_Landing_Page is rendered, THE SEO_System SHALL include at least 5 semantically related terms from the Primary_Keyword set within the page body (e.g., a download page must also mention "safe", "trusted", "rvip", "app", "free").
3. THE SEO_System SHALL include the keyword "disclaimer" with a hyperlink to `/disclaimer` on every Keyword_Landing_Page.
4. WHEN the home page (`app/page.tsx`) is rendered, THE SEO_System SHALL include the keywords "earn", "rewards", "daily", "trusted", and "safe" at least once each in visible body text.
5. WHEN the home page is rendered, THE SEO_System SHALL include the keyword "₹500" or "500 rupees" in visible body text at least once to target the welcome bonus query.

---

### Requirement 3: Structured Data (JSON-LD) Coverage

**User Story:** As a site owner, I want rich results (FAQ dropdowns, breadcrumbs) to appear in Google Search for my pages, so that my click-through rate improves even before my ranking position improves.

#### Acceptance Criteria

1. WHEN any Keyword_Landing_Page is rendered, THE SEO_System SHALL embed a `FAQ_Schema` JSON-LD block containing at least 3 question-answer pairs relevant to the page's primary keyword.
2. WHEN any Keyword_Landing_Page is rendered, THE SEO_System SHALL embed a `Breadcrumb_Schema` JSON-LD block with at least two levels: Home → [Page Name].
3. WHEN any Blog_Post page is rendered, THE SEO_System SHALL embed a `Breadcrumb_Schema` JSON-LD block with three levels: Home → Blog → [Post Title].
4. WHEN the home page is rendered, THE SEO_System SHALL embed a `WebSite` JSON-LD block with a `SearchAction` property pointing to the site's search capability or the blog index.
5. THE SEO_System SHALL ensure no two pages on the same domain emit duplicate `@type: "FAQPage"` blocks with identical question text.

---

### Requirement 4: Internal Link Graph Strengthening

**User Story:** As a site owner, I want every page to link to related pages using keyword-rich anchor text, so that Google can discover all pages and understand the topical relationships between them.

#### Acceptance Criteria

1. WHEN any Keyword_Landing_Page is rendered, THE SEO_System SHALL include at least 3 internal `<Link>` elements pointing to other pages on rvipi.com, using anchor text that contains a Primary_Keyword.
2. WHEN the home page is rendered, THE SEO_System SHALL include a visible link to each new Keyword_Landing_Page using anchor text that contains the page's primary keyword.
3. WHEN any Blog_Post page is rendered, THE SEO_System SHALL include at least 2 internal `<Link>` elements pointing to Keyword_Landing_Pages (not just the home page or blog index).
4. THE SEO_System SHALL ensure that the `/disclaimer` page is linked from the footer on every page, using the anchor text "Disclaimer" or "Legal Disclaimer".
5. WHEN the `/rvip-game`, `/rvip-apk`, `/rvip-apk-download`, and `/rvip-app-download` pages are rendered, THE SEO_System SHALL each include a link to the new `rvip-download` Keyword_Landing_Page using keyword-rich anchor text.

---

### Requirement 5: Blog Content Targeting Competitor and Primary Keywords

**User Story:** As a site owner, I want new blog posts that directly target the competitor keyword gaps (login, registration, features, common issues, guide, free), so that I can capture search traffic that competitors currently own.

#### Acceptance Criteria

1. THE SEO_System SHALL include at least 4 new Blog_Post entries in `lib/blog-posts-rvip.ts` or `lib/blog-data.ts`, each targeting one of the following primary keyword clusters: (a) "rvip login guide", (b) "rvip registration complete guide", (c) "rvip features and games", (d) "rvip common issues and solutions".
2. WHEN a new Blog_Post is rendered, THE SEO_System SHALL include the primary keyword in the `<title>`, `<meta description>`, `<h1>`, and at least one `<h2>`.
3. WHEN a new Blog_Post is rendered, THE SEO_System SHALL include a `FAQ_Schema` block with at least 3 questions that use the primary keyword or a close variant.
4. WHEN a new Blog_Post is rendered, THE SEO_System SHALL include at least one internal link to a Keyword_Landing_Page and at least one internal link to the `/disclaimer` page.
5. THE SEO_System SHALL add each new Blog_Post URL to `app/sitemap.ts` automatically via the existing `getAllPosts()` mapping (no manual sitemap entry required).

---

### Requirement 6: Page Title and Meta Description Optimization for Existing Pages

**User Story:** As a site owner, I want the existing pages to have titles and descriptions that include the primary keywords I am not yet ranking for, so that Google associates those terms with my existing content immediately.

#### Acceptance Criteria

1. WHEN the home page is rendered, THE Metadata_Generator SHALL produce a `<title>` that includes at least two of the following: "rvip", "game", "earn", "rewards", "trusted".
2. WHEN the home page is rendered, THE Metadata_Generator SHALL produce a `<meta description>` that includes "earn money", "daily rewards", or "₹500 welcome bonus".
3. WHEN the `/rvip-game` page is rendered, THE Metadata_Generator SHALL produce a `<title>` that includes "rvip game" and at least one of: "play", "online", "real".
4. WHEN the `/rvip-apk-download` page is rendered, THE Metadata_Generator SHALL produce a `<title>` that includes "rvip apk download" and at least one of: "free", "safe", "trusted".
5. WHEN the `/about` page is rendered, THE Metadata_Generator SHALL produce a `<title>` and `<meta description>` that include "trusted" and "safe" to reinforce EEAT signals.
6. THE SEO_System SHALL ensure no two pages share an identical `<title>` tag value.

---

### Requirement 7: Image Alt Text and Core Web Vitals Signals

**User Story:** As a site owner, I want all images to have descriptive, keyword-rich alt text and to load efficiently, so that Google Image Search and Core Web Vitals scores support my ranking.

#### Acceptance Criteria

1. WHEN any page is rendered, THE SEO_System SHALL ensure every `<img>` element (including those rendered via `next/image`) has a non-empty `alt` attribute that contains at least one Primary_Keyword relevant to the page.
2. WHEN the home page hero image is rendered, THE SEO_System SHALL set the `alt` attribute to include "rvip" and at least one of: "game", "app", "download".
3. WHEN any screenshot image (`/ss1.jpeg` through `/ss4.jpeg`) is rendered on a Keyword_Landing_Page, THE SEO_System SHALL set the `alt` attribute to include the page's primary keyword.
4. THE SEO_System SHALL set `priority={true}` on the largest above-the-fold image on each page to enable LCP optimization via Next.js image preloading.

---

### Requirement 8: Canonical URL and Duplicate Content Prevention

**User Story:** As a site owner, I want every page to declare its canonical URL and avoid duplicate content signals, so that Google consolidates ranking signals to the correct URL.

#### Acceptance Criteria

1. WHEN any page is rendered, THE Metadata_Generator SHALL emit an `<link rel="canonical">` tag whose `href` matches the page's absolute URL as defined by `absoluteUrl()` in `lib/site-config.ts`.
2. IF two Keyword_Landing_Pages target overlapping keyword clusters, THEN THE SEO_System SHALL ensure each page's canonical URL points to itself (self-referencing canonical), not to the other page.
3. THE SEO_System SHALL ensure the `app/robots.ts` file allows crawling of all Keyword_Landing_Pages and Blog_Post URLs.
4. WHEN the sitemap is generated, THE SEO_System SHALL include exactly one entry per unique URL with no duplicate `<url>` elements.

---

### Requirement 9: Trust and EEAT Signals on High-Intent Pages

**User Story:** As a user evaluating whether to download the RVIP app, I want to see clear trust signals (safety notes, disclaimer links, transparent claims) on every page, so that I feel confident clicking the download CTA.

#### Acceptance Criteria

1. WHEN any Keyword_Landing_Page is rendered, THE SEO_System SHALL display a visible trust notice that includes the words "safe" or "trusted" and a link to `/disclaimer`.
2. WHEN the `rvip-safe-trusted` Keyword_Landing_Page is rendered, THE SEO_System SHALL include a dedicated section with at least 3 bullet points describing specific safety or security features of the RVIP app.
3. WHEN any page with a CTA button is rendered, THE SEO_System SHALL render the CTA button with descriptive text that includes the word "download" or "play" rather than generic text like "Click here".
4. THE SEO_System SHALL include the `organizationSchema` JSON-LD block (already defined in `lib/seo.ts`) on every page via the root layout, which is already implemented in `app/layout.tsx`.
5. WHEN the `/disclaimer` page is rendered, THE SEO_System SHALL include an `<h1>` that contains the word "disclaimer" and body text that includes "safe", "trusted", and "responsible".

---

### Requirement 10: Sitemap and Crawl Efficiency

**User Story:** As a site owner, I want Googlebot to discover and crawl all pages efficiently, so that new content is indexed quickly and ranking improvements happen faster.

#### Acceptance Criteria

1. WHEN the sitemap is generated, THE Sitemap SHALL include all static routes (home, about, disclaimer, blog index, all Keyword_Landing_Pages) and all dynamic blog post routes.
2. WHEN a new Keyword_Landing_Page is added to `lib/keyword-landings.ts`, THE Sitemap SHALL automatically include its URL without requiring a manual edit to `app/sitemap.ts`.
3. THE SEO_System SHALL set `changeFrequency: "daily"` for the home page and `changeFrequency: "weekly"` for all Keyword_Landing_Pages and Blog_Post pages in the sitemap.
4. THE SEO_System SHALL set `priority: 1.0` for the home page, `priority: 0.9` for primary Keyword_Landing_Pages, `priority: 0.85` for the blog index, and `priority: 0.8` for individual Blog_Post pages.
5. WHEN the sitemap is generated, THE Sitemap SHALL include `lastModified` dates that reflect the actual last-updated date of each page's content, not always `new Date()`.
