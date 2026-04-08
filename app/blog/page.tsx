import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/blog-data";
import { getTopKeywords } from "@/lib/keywords";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog: VIP Game, RCIP, and SEO Guides",
  description:
    "Read high-quality long-form blog guides with FAQ schema, practical examples, and internal links for vip game, vip games, and rcip canada topics.",
  path: "/blog",
  image: "/ss2.jpeg",
});

export default async function BlogPage() {
  const [posts, keywords] = await Promise.all([Promise.resolve(getAllPosts()), getTopKeywords(6)]);

  return (
    <section className="page-shell pt-10 md:pt-16">
      <Reveal>
        <p className="small-heading">Blog Library</p>
        <h1 className="mt-2 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
          Long-form guides built for ranking, trust, and conversion.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
          Every article includes a clear structure, practical examples, FAQ answers, internal links, and schema-ready
          formatting for modern SEO performance.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {keywords.map((keywordItem) => (
            <span
              key={keywordItem.keyword}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-100"
            >
              {keywordItem.keyword}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 60}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>

      <section className="mt-12">
        <Reveal className="soft-card rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Internal Navigation Cluster</h2>
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
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-amber-200">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Cornerstone Guides</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-100 md:text-base">
                {posts.slice(0, 4).map((post) => (
                  <li key={`blog-cluster-${post.slug}`}>
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
    </section>
  );
}
