import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type CtaBlockProps = {
  title: string;
  body: string;
  primaryCta?: string;
  secondaryCta?: string;
};

export function CtaBlock({ title, body, primaryCta = "Download App Now", secondaryCta = "Play RVIP Game" }: CtaBlockProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/20 via-[#1d1724] to-[#0d1018] p-8 md:p-10">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl" />
      <h3 className="max-w-2xl text-2xl font-bold leading-tight text-white md:text-3xl">{title}</h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-100/90 md:text-base">{body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="primary-button" href={siteConfig.ctaUrl} target="_blank" rel="noreferrer">
          {primaryCta}
        </Link>
        <Link className="secondary-button" href={siteConfig.ctaUrl} target="_blank" rel="noreferrer">
          {secondaryCta}
        </Link>
      </div>
    </section>
  );
}
