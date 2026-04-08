import { PostCard } from "@/components/post-card";
import type { BlogPost } from "@/lib/blog-data";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-2xl font-bold text-white">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
