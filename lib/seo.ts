import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import type { BlogPost } from "@/lib/blog-data";

export function createMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = image || siteConfig.defaultOgImage;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: absoluteUrl(ogImage),
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export function createBlogMetadata(post: BlogPost): Metadata {
  const canonical = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords, ...post.longTailKeywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: absoluteUrl(post.heroImage),
          alt: post.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [absoluteUrl(post.heroImage)],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.organizationName,
  url: siteConfig.url,
  logo: absoluteUrl(siteConfig.logoPath),
  sameAs: [siteConfig.ctaUrl],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: siteConfig.url,
      availableLanguage: ["English"],
    },
  ],
};

export function createArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    author: {
      "@type": "Organization",
      name: siteConfig.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organizationName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logoPath),
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(post.heroImage),
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
  };
}

export function createFaqSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((faqItem) => ({
      "@type": "Question",
      name: faqItem.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqItem.answer,
      },
    })),
  };
}

export function createBlogBreadcrumbSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${absoluteUrl("/blog")}?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
