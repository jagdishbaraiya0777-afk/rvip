export const siteConfig = {
  name: "RVIP Insider",
  title: "RVIP Insider | VIP Game Guides & Blog",
  description:
    "Expert-backed VIP game guides, responsible play tips, and practical walk-throughs to help you play smarter, safer, and faster on mobile.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.rvipi.com").replace(/\/$/, ""),
  ctaUrl: "https://invite.rvip.one/?code=8P1QJCS",
  authorName: "RVIP Editorial Team",
  organizationName: "RVIP Insider",
  logoPath: "/logo.jpeg",
  defaultOgImage: "/ss1.jpeg",
};

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export function absoluteUrl(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
