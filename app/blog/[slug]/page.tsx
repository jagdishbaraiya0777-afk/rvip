import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { CtaBlock } from "@/components/cta-block";
import { FaqAccordion } from "@/components/faq-accordion";
import { RelatedPosts } from "@/components/related-posts";
import { Reveal } from "@/components/reveal";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { createArticleSchema, createBlogMetadata, createFaqSchema } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createBlogMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = createArticleSchema(post);
  const faqSchema = createFaqSchema(post);
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const strategicInternalLinks = Array.from(
    new Map(
      [
        { label: "Homepage", href: "/" },
        { label: "About Our Editorial Standards", href: "/about" },
        { label: "Disclaimer and Risk Notes", href: "/disclaimer" },
        { label: "Blog Listing", href: "/blog" },
        { label: "Keyword Page: RVIP game", href: "/rvip-game" },
        { label: "Keyword Page: RVIP app download", href: "/rvip-app-download" },
        { label: "Keyword Page: RVIP APK", href: "/rvip-apk" },
        { label: "Keyword Page: RVIP APK download", href: "/rvip-apk-download" },
        ...post.internalLinks,
        ...relatedPosts.map((relatedPost) => ({
          label: `Related guide: ${relatedPost.title}`,
          href: `/blog/${relatedPost.slug}`,
        })),
      ].map((item) => [item.href, item]),
    ).values(),
  );
  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const updatedDate = new Date(post.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Script
        id={`article-schema-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`faq-schema-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="page-shell pt-10 md:pt-16">
        <Reveal>
          <nav className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-300 md:text-sm">
            <Link href="/" className="hover:text-amber-200">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-amber-200">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-200">{post.primaryKeyword}</span>
          </nav>
          <p className="small-heading">SEO Blog Guide</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300 md:text-sm">
            <span>Primary keyword: {post.primaryKeyword}</span>
            <span>Published: {publishDate}</span>
            <span>Updated: {updatedDate}</span>
          </div>
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#111521]/70 p-2">
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt}
            width={1400}
            height={840}
            priority
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#0f1423]/85 p-6">
          <p className="small-heading">Table of Contents</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-amber-100 md:text-base">
            {post.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="toc-link">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 space-y-5 text-base leading-8 text-slate-200">
          {post.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            For full context, you can also review our{" "}
            <Link href="/about" className="text-amber-300 hover:text-amber-200">
              editorial standards
            </Link>
            ,{" "}
            <Link href="/disclaimer" className="text-amber-300 hover:text-amber-200">
              disclaimer
            </Link>
            , and the complete{" "}
            <Link href="/blog" className="text-amber-300 hover:text-amber-200">
              blog index
            </Link>
            .
          </p>
        </section>

        <section className="mt-10 space-y-8">
          {post.sections.map((section) => (
            <Reveal key={section.id}>
              <section id={section.id} className="soft-card rounded-3xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white md:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-200 md:text-base">
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
              </section>
            </Reveal>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-[#0d1322]/90 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Internal Links for Deeper Reading</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-200 md:text-base">
            {strategicInternalLinks.map((linkItem) => (
              <li key={linkItem.href + linkItem.label}>
                <Link className="text-amber-300 hover:text-amber-200" href={linkItem.href}>
                  {linkItem.label}
                </Link>
              </li>
            ))}
          </ul>
          {post.externalReferences && post.externalReferences.length > 0 ? (
            <>
              <h3 className="mt-8 text-xl font-bold text-white">External References</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-200 md:text-base">
                {post.externalReferences.map((reference) => (
                  <li key={reference.href}>
                    <a
                      className="text-amber-300 hover:text-amber-200"
                      href={reference.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {reference.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>

        <section className="mt-12">
          <Reveal>
            <h2 className="text-2xl font-bold text-white md:text-3xl">FAQ</h2>
          </Reveal>
          <div className="mt-5">
            <FaqAccordion items={post.faq} />
          </div>
        </section>

        <section className="mt-12">
          <CtaBlock title={post.ctaTitle} body={post.ctaBody} />
        </section>

        <RelatedPosts posts={relatedPosts} />
      </article>
    </>
  );
}
