import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { blogPosts } from "@/data/blog";
import { BlogCard } from "@/features/blog/components/blog-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on frontend architecture, performance, and motion design.",
};

export default function BlogIndexPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>

        <div className="mt-8 max-w-2xl">
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-primary uppercase">
            Writing
          </p>
          <h1 className="text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
            Notes on building for the web
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Occasional deep-dives into performance, motion, and frontend
            architecture — the things I wish someone had written down for
            me.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
