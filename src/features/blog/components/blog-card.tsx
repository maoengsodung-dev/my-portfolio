import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="size-full transition-transform duration-500 group-hover:scale-105">
          <MediaPlaceholder seed={post.slug} label={post.tags[0]} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 text-lg font-medium tracking-tight text-balance">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">
          {post.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Read
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
