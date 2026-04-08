import Link from "next/link";
import { navigationLinks, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#080a11]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-2 max-w-lg text-sm leading-7 text-slate-300">
            We publish practical, transparent guides for VIP game users and SEO-focused educational content.
            We do not promise guaranteed outcomes, and we encourage responsible, informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Pages</p>
            <ul className="mt-3 space-y-2">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <Link className="text-sm text-slate-300 hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Actions</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href={siteConfig.ctaUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
                  Get Started Now
                </Link>
              </li>
              <li>
                <Link href={siteConfig.ctaUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
                  Access Here
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400 md:px-6">
        Copyright {new Date().getFullYear()} {siteConfig.name}. Play responsibly. 18+ only where applicable.
      </div>
    </footer>
  );
}
