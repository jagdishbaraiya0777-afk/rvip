import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { CtaBlock } from "@/components/cta-block";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { ScreenshotsCarousel } from "@/components/screenshots-carousel";
import { getAllPosts } from "@/lib/blog-data";
import { getTopKeywords } from "@/lib/keywords";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "VIP Game Guide Hub: Trusted Reviews & Blog",
  description:
    "Explore vip game, rvip games, rvip game app, and rvip apk guides with transparent trust signals, FAQs, and practical step-by-step playbooks.",
  path: "/",
  image: "/ss1.jpeg",
});

const homeFaq = [
  {
    question: "What is VIP Game and how do I start safely?",
    answer:
      "VIP Game is a mobile gaming platform with multiple play formats and promotional offers. Start with a verified link, a small session budget, and written stop-loss limits. This keeps your first sessions controlled while you learn how the app behaves.",
  },
  {
    question: "Are VIP games suitable for complete beginners?",
    answer:
      "Yes, if you use a process-first approach. Pick low-variance formats first, avoid oversized deposits, and review each session. Beginners generally improve faster when they prioritize consistency over short-term excitement.",
  },
  {
    question: "How can I check whether game vip online links are authentic?",
    answer:
      "Use the official saved URL, compare spelling closely, and avoid random links from unknown chats. If the domain or referral path looks different, do not sign in until you confirm from a trusted source.",
  },
  {
    question: "Does this site provide guaranteed winning claims?",
    answer:
      "No. We provide educational, experience-based guidance focused on decision quality, risk control, and transparency. We avoid exaggerated claims and encourage responsible play decisions at every stage.",
  },
];

const steps = [
  {
    title: "Choose Verified Access",
    body: "Use the official invite link and keep one saved entry point to avoid fake clones.",
  },
  {
    title: "Set Session Boundaries",
    body: "Define budget, session duration, and stop-loss rules before you place any play.",
  },
  {
    title: "Review and Improve",
    body: "Track outcomes, note mistakes, and adjust one variable at a time for stable progress.",
  },
];

const features = [
  "Mobile-first UI designed for fast navigation and low friction.",
  "Transparent trust framework: risk notes, disclaimers, and clear editorial policy.",
  "Practical playbooks for vip game online, rvip game app, rvip apk, and related queries.",
  "Internal guide network with interlinked blog posts for deeper topical authority.",
];

const rvipKeywordCluster = ["rvip games", "rvip game", "rvip apk", "rvip game app"];

export default async function HomePage() {
  const [topKeywords, posts] = await Promise.all([getTopKeywords(8), Promise.resolve(getAllPosts())]);

  const primaryKeyword = topKeywords[0]?.keyword || "vip game";
  const secondaryKeywords = topKeywords.slice(1, 5).map((keyword) => keyword.keyword);

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      <section className="page-shell pt-10 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hero-enter space-y-6">
            <p className="small-heading">EEAT-Optimized VIP Game Resource</p>
            <div className="soft-card mx-auto w-full max-w-[220px] overflow-hidden rounded-3xl p-5 lg:hidden">
              <Image
                src="/logo.jpeg"
                alt="Official RVIP logo"
                width={420}
                height={420}
                className="mx-auto w-full rounded-full border border-amber-300/40 object-cover"
                priority
              />
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
              {primaryKeyword} strategies, trust signals, and conversion-ready guides
            </h1>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={siteConfig.ctaUrl} target="_blank" rel="noreferrer" className="primary-button">
                Download App
              </Link>
              <Link href="/blog" className="secondary-button hidden sm:inline-flex">
                Read Expert Blog Guides
              </Link>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
              We combine experience-based usage patterns, transparent risk notes, and practical execution
              frameworks to help you use {primaryKeyword} and related vip games paths with better confidence.
            </p>
            <ul className="flex flex-wrap gap-2 text-xs text-slate-200 md:text-sm">
              {secondaryKeywords.map((keyword) => (
                <li
                  key={keyword}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 tracking-wide"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-enter relative hidden lg:block">
            <div className="soft-card overflow-hidden rounded-3xl p-8">
              <Image
                src="/logo.jpeg"
                alt="Official RVIP logo"
                width={760}
                height={760}
                className="mx-auto w-full max-w-sm rounded-full border border-amber-300/40 object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-amber-300/30 bg-black/55 px-4 py-3 text-xs text-amber-100 backdrop-blur md:text-sm">
              Official RVIP branding with transparent call-to-action flow
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell mt-16 grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <Reveal key={feature} delay={index * 70} className="soft-card rounded-2xl p-5">
            <p className="text-sm leading-7 text-slate-100 md:text-base">{feature}</p>
          </Reveal>
        ))}
      </section>

      <section className="page-shell mt-16">
        <Reveal className="soft-card rounded-3xl p-6 md:p-8">
          <p className="small-heading">RVIP Keyword Focus</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            RVIP games, RVIP game, RVIP APK, and RVIP game app resource center
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
            We publish dedicated EEAT content for these RVIP keyword clusters with setup guides, safety checklists,
            transparent risk notes, and internal links to related pages so users and crawlers can follow a clear topic
            path.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {rvipKeywordCluster.map((keyword) => (
              <li
                key={keyword}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs tracking-wide text-slate-100 md:text-sm"
              >
                {keyword}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="page-shell mt-16">
        <Reveal>
          <div className="mb-6">
            <p className="small-heading">Screenshots</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Real app views for {primaryKeyword} onboarding and gameplay
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal className="sm:col-span-2">
            <ScreenshotsCarousel
              slides={[
                {
                  src: "/ss1.jpeg",
                  alt: `${primaryKeyword} screenshot 1 showing gameplay and UI controls`,
                },
                {
                  src: "/ss2.jpeg",
                  alt: `${primaryKeyword} screenshot 2 showing rewards and game categories`,
                },
                {
                  src: "/ss3.jpeg",
                  alt: `${primaryKeyword} screenshot 3 showing account and wallet screens`,
                },
                {
                  src: "/ss4.jpeg",
                  alt: `${primaryKeyword} screenshot 4 showing game controls and play history`,
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="page-shell mt-16">
        <Reveal>
          <p className="small-heading">How It Works</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">A simple 3-step activation flow</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 80} className="soft-card rounded-2xl p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-200">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell mt-16">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="small-heading">Latest Blog Posts</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                SEO-rich guides covering VIP game and long-tail intent
              </h2>
            </div>
            <Link href="/blog" className="secondary-button hidden md:inline-flex">
              View all posts
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} delay={index * 80} className="soft-card rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">{post.primaryKeyword}</p>
              <h3 className="mt-2 text-xl font-bold text-white">
                <Link href={`/blog/${post.slug}`} className="hover:text-amber-200">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-200">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-amber-300">
                Read guide
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell mt-16">
        <Reveal className="soft-card rounded-3xl p-6 md:p-8">
          <p className="small-heading">Internal Link Hub</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Explore every core page and topical guide cluster
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
            Use these links to navigate between trust pages, legal notes, and deep-dive guides. This helps users
            compare context before taking action and improves crawl depth across the full SEO structure.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Core Pages</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-100 md:text-base">
                <li>
                  <Link href="/about" className="hover:text-amber-200">
                    About: editorial standards and EEAT approach
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-amber-200">
                    Disclaimer: legal, risk, and transparency notes
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-amber-200">
                    Blog index: all long-form SEO guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Popular Guides</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-100 md:text-base">
                {posts.slice(0, 4).map((post) => (
                  <li key={`hub-${post.slug}`}>
                    <Link href={`/blog/${post.slug}`} className="hover:text-amber-200">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="page-shell mt-16">
        <Reveal>
          <p className="small-heading">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Frequently asked questions about {primaryKeyword}
          </h2>
        </Reveal>
        <div className="mt-6">
          <FaqAccordion items={homeFaq} />
        </div>
      </section>

      <section className="page-shell mt-16">
        <CtaBlock
          title="Ready to Access VIP Game With a Trust-First Setup?"
          body="Start with the official invite link, use a controlled first session, and apply our practical guides to improve decision quality over time."
        />
      </section>
    </>
  );
}
