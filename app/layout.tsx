import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Sora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "RVIP Insider | VIP Game SEO Guides",
    template: "%s | RVIP Insider",
  },
  description:
    "Actionable VIP game guides, trust-first play strategies, and SEO-focused blog content designed for better decisions and faster learning.",
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.jpeg", type: "image/jpeg" },
    ],
    apple: [{ url: "/logo.jpeg", type: "image/jpeg" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    "vip game",
    "vip games",
    "rvip games",
    "rvip game",
    "rvip apk",
    "rvip game app",
    "rvip apk download",
    "rvip app download",
    "vip game online",
    "vip online gaming",
    "game vip online",
    "rcip canada",
    "rural community immigration pilot",
  ],
  authors: [{ name: siteConfig.authorName }],
  creator: siteConfig.authorName,
  publisher: siteConfig.organizationName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "RVIP Insider | VIP Game SEO Guides",
    description:
      "Expert-backed VIP game guides, practical strategy content, and high-quality blog resources built for trust, clarity, and conversion.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.defaultOgImage,
        alt: "RVIP game app screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RVIP Insider | VIP Game SEO Guides",
    description:
      "Use trusted VIP game guides and practical blog playbooks to make smarter, safer, and faster decisions.",
    images: [siteConfig.defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteHeader />
        <main className="flex min-h-[70vh] flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
