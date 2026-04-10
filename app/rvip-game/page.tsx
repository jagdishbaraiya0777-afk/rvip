import type { Metadata } from "next";
import { KeywordLandingPage } from "@/components/keyword-landing-page";
import { keywordLandings } from "@/lib/keyword-landings";
import { createMetadata } from "@/lib/seo";

const landing = keywordLandings.find((item) => item.path === "/rvip-game")!;

export const metadata: Metadata = createMetadata({
  title: landing.seoTitle,
  description: landing.seoDescription,
  path: landing.path,
  image: landing.heroImage,
});

export default function RvipGamePage() {
  return <KeywordLandingPage landing={landing} />;
}
