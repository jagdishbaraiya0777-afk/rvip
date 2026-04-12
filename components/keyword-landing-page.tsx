import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { CtaBlock } from "@/components/cta-block";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import type { KeywordLanding } from "@/lib/keyword-landings";
import { absoluteUrl } from "@/lib/site-config";

export function KeywordLandingPage({ landing }: { landing: KeywordLanding }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faq.map((faqItem) => ({
      "@type": "Question",
      name: faqItem.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqItem.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: landing.title, item: absoluteUrl(landing.path) },
    ],
  };

  return (
    <>
      <Script
        id={`faq-schema-${landing.keyword.replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`breadcrumb-schema-${landing.keyword.replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="page-shell pt-10 md:pt-16">
        <Reveal>
          <p className="small-heading">Keyword Landing</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {landing.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
            Target keyword: <span className="font-semibold text-amber-300">{landing.keyword}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/" className="secondary-button">
              Back to Home
            </Link>
            <Link href="/blog" className="secondary-button">
              Open Blog Hub
            </Link>
            <Link href="/rvip-download" className="secondary-button">
              Download RVIP App
            </Link>
            <Link href="/rvip-safe-trusted" className="secondary-button">
              RVIP Safe &amp; Trusted Guide
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#101726]/70 p-2">
          <Image
            src={landing.heroImage}
            alt={landing.heroAlt}
            width={1400}
            height={800}
            className="h-auto w-full rounded-2xl object-cover"
            priority
          />
        </div>

        <section className="mt-8 space-y-4 text-sm leading-8 text-slate-200 md:text-base">
          {landing.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="mt-10 space-y-6">
          {landing.sections.map((section) => (
            <Reveal key={section.heading} className="soft-card rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{section.heading}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-200 md:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-100 md:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/20 bg-[#0f1423]/85 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Trust Notice</p>
          <p className="mt-2 text-sm leading-7 text-slate-200 md:text-base">
            This content is for educational purposes only. RVIP is a safe and trusted platform when used
            responsibly. Always review our{" "}
            <Link href="/disclaimer" className="text-amber-300 hover:text-amber-200">
              Disclaimer
            </Link>{" "}
            before making any financial decisions.
          </p>
        </section>

        <section className="mt-12">
          <Reveal>
            <h2 className="text-2xl font-bold text-white md:text-3xl">FAQ</h2>
          </Reveal>
          <div className="mt-5">
            <FaqAccordion items={landing.faq} />
          </div>
        </section>

        <section className="mt-12">
          <CtaBlock
            title={`Ready to explore ${landing.keyword} with a safer framework?`}
            body="Use verified access paths, keep clear session limits, and follow transparent risk-aware guidance before scaling activity."
            primaryCta="Download App Now"
            secondaryCta="Play RVIP Game"
          />
        </section>
      </section>
    </>
  );
}
