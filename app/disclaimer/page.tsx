import type { Metadata } from "next";
import Link from "next/link";
import { CtaBlock } from "@/components/cta-block";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/blog-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Disclaimer: Legal and Transparency Notice",
  description:
    "Read our legal disclaimer, responsible-use policy, and transparency commitments before using VIP game links, offers, or strategy content on this site.",
  path: "/disclaimer",
  image: "/ss3.jpeg",
});

export default function DisclaimerPage() {
  const featuredPosts = getAllPosts().slice(0, 4);

  return (
    <section className="page-shell pt-10 md:pt-16">
      <Reveal>
        <p className="small-heading">Disclaimer</p>
        <h1 className="mt-2 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
          Legal, financial-risk, and transparency notice
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
          This website provides educational and informational content. We do not guarantee outcomes, earnings,
          approvals, or results from any action taken based on our pages or blog posts.
        </p>
      </Reveal>

      <div className="mt-10 space-y-5">
        <Reveal className="soft-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white">1. No Guaranteed Results</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200 md:text-base">
            Any examples, scenarios, or tactical recommendations are for educational purposes only. Real outcomes
            depend on user behavior, platform changes, legal context, and market or policy dynamics.
          </p>
        </Reveal>

        <Reveal delay={50} className="soft-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white">2. Financial Risk and Responsible Use</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200 md:text-base">
            Some activities discussed on this website may involve financial risk. You are solely responsible for your
            decisions, spending, and compliance with local laws. Never use borrowed funds or money required for
            essential living needs.
          </p>
        </Reveal>

        <Reveal delay={90} className="soft-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white">3. Age and Jurisdiction</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200 md:text-base">
            Access to specific services may be restricted by age and region. Users must verify legal eligibility in
            their own jurisdiction before participating in any activity linked from this site.
          </p>
        </Reveal>

        <Reveal delay={120} className="soft-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white">4. Third-Party Links and Availability</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200 md:text-base">
            We may link to third-party websites or platforms for convenience. We do not control third-party terms,
            uptime, security, or policy updates. Always review official terms directly before transacting.
          </p>
        </Reveal>

        <Reveal delay={150} className="soft-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white">5. Content Accuracy and Updates</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200 md:text-base">
            We aim to keep content current, but details can change without notice. Check official sources for final
            confirmation, especially for legal, regulatory, or immigration-related information.
          </p>
        </Reveal>
      </div>

      <section className="mt-12">
        <Reveal className="soft-card rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Internal Reference Links</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
            Review these pages before acting on any strategy or promotion so decisions are informed by full context.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Core Pages</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-100 md:text-base">
                <li>
                  <Link href="/" className="hover:text-amber-200">
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-200">
                    About Our EEAT Method
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-amber-200">
                    Blog Listing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Related Blog Guides</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-100 md:text-base">
                {featuredPosts.map((post) => (
                  <li key={`disclaimer-${post.slug}`}>
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
          title="Proceed With Informed Decisions"
          body="Use our guides as educational input, verify official terms, and act only after reviewing personal risk tolerance and legal eligibility."
        />
      </section>
    </section>
  );
}
