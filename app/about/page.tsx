import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBlock } from "@/components/cta-block";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/blog-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About RVIP Insider: Safe, Trusted EEAT Standards",
  description:
    "Learn our mission, editorial process, and how we create safe, trusted, experience-driven VIP game guides with transparent, practical advice.",
  path: "/about",
  image: "/ss2.jpeg",
});

const trustSignals = [
  "Experience-first writing based on real usage workflows and repeatable play routines.",
  "Expertise through structured frameworks: bankroll plans, safety checks, and review cycles.",
  "Authoritative tone grounded in practical context, not exaggerated outcome claims.",
  "Transparent disclosures and legal disclaimers on every high-risk recommendation.",
];

export default async function AboutPage() {
  const featuredPosts = getAllPosts().slice(0, 4);

  return (
    <section className="page-shell pt-10 md:pt-16">
      <Reveal>
        <p className="small-heading">About Us</p>
        <h1 className="mt-2 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
          We build EEAT-compliant content that helps users make better VIP game decisions.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
          Our mission is simple: create practical, trustworthy guidance that balances performance with
          responsibility. We publish content for users who value structure, transparency, and long-term decision
          quality over hype.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="soft-card rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">How We Apply EEAT</h2>
          <div className="mt-5 space-y-5 text-sm leading-7 text-slate-200 md:text-base">
            <p>
              <strong>Experience:</strong> We document real-world usage patterns, including session planning,
              onboarding friction points, and support workflows users actually encounter.
            </p>
            <p>
              <strong>Expertise:</strong> We convert tactical knowledge into repeatable frameworks that readers can
              apply immediately, such as risk-tier game selection and bonus compatibility checks.
            </p>
            <p>
              <strong>Authoritativeness:</strong> Our content uses a confident but evidence-aware voice. We avoid vague
              claims and prioritize structured recommendations with clear boundaries.
            </p>
            <p>
              <strong>Trustworthiness:</strong> We state limitations, link to disclaimers, and avoid guaranteed-profit
              language. Every article is designed to inform, not mislead.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="soft-card rounded-3xl p-3">
          <Image
            src="/ss2.jpeg"
            alt="About RVIP screenshot showing app trust and navigation elements"
            width={800}
            height={900}
            className="h-full w-full rounded-2xl object-cover"
          />
        </Reveal>
      </div>

      <section className="mt-12">
        <Reveal>
          <h2 className="text-2xl font-bold text-white md:text-3xl">Trust Signals We Maintain</h2>
        </Reveal>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {trustSignals.map((signal, index) => (
            <Reveal key={signal} delay={index * 70} className="soft-card rounded-2xl p-5">
              <p className="text-sm leading-7 text-slate-200 md:text-base">{signal}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Reveal className="soft-card rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Editorial Commitments</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-200 md:text-base">
            <li>We separate educational guidance from promotional calls to action.</li>
            <li>We update content when platform flows, terms, or user behavior changes.</li>
            <li>We include internal links so users can verify context before acting.</li>
            <li>
              We encourage readers to review our <Link href="/disclaimer" className="text-amber-300">disclaimer</Link>{" "}
              before making financial decisions.
            </li>
          </ul>
        </Reveal>
      </section>

      <section className="mt-12">
        <Reveal className="soft-card rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Recommended Internal Links</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
            These internal links connect users from trust content to action content, helping both readability and
            crawl efficiency across the site.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Core Navigation</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-100 md:text-base">
                <li>
                  <Link href="/" className="hover:text-amber-200">
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-amber-200">
                    Blog Hub
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-amber-200">
                    Legal Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Top Blog Guides</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-100 md:text-base">
                {featuredPosts.map((post) => (
                  <li key={`about-${post.slug}`}>
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

      <section className="mt-12">
        <CtaBlock
          title="Want to Explore the Latest Guides?"
          body="Visit our blog for actionable playbooks on vip game, vip games, and long-tail user intents with practical, transparent recommendations."
        />
      </section>
    </section>
  );
}
