import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { siteConfig } from "@/config/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — ${siteConfig.name}`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to writing
        </Link>

        <div className="mt-8">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>

        <div className="relative mt-10 aspect-[16/8] w-full overflow-hidden rounded-3xl border border-border/60">
          <MediaPlaceholder seed={post.slug} label={post.tags[0]} />
        </div>

        <div className="mt-12 max-w-none space-y-5 text-muted-foreground text-pretty">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
