import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111521]/70 transition-transform hover:-translate-y-1">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">{post.primaryKeyword}</p>
        <h3 className="text-lg font-semibold leading-snug text-white">
          <Link href={`/blog/${post.slug}`} className="hover:text-amber-200">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-7 text-slate-300">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="inline-flex text-sm font-semibold text-amber-300 hover:text-amber-100">
          Read full guide
        </Link>
      </div>
    </article>
  );
}
