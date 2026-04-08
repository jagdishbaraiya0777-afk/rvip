import Image from "next/image";
import Link from "next/link";
import { navigationLinks, siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b12]/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={siteConfig.logoPath}
            alt="RVIP logo"
            width={36}
            height={36}
            className="rounded-full border border-amber-300/40"
            priority
          />
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">RVIP Insider</p>
            <p className="text-xs text-amber-200/80">SEO Guides + Blog</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navigationLinks.map((linkItem) => (
            <Link
              key={linkItem.href}
              href={linkItem.href}
              className="text-sm font-medium text-slate-100/80 transition-colors hover:text-amber-300"
            >
              {linkItem.label}
            </Link>
          ))}
        </div>

        <Link
          href={siteConfig.ctaUrl}
          target="_blank"
          rel="noreferrer"
          className="primary-button px-4 py-2 text-xs md:text-sm"
        >
          Try Now
        </Link>
      </nav>
    </header>
  );
}
