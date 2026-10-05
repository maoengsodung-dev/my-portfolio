"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { BlogCard } from "@/features/blog/components/blog-card";

/**
 * Home-page teaser for the blog: latest 3 posts plus a link to the full
 * archive at `/blog`. Kept lightweight since the full list/detail pages
 * live in their own routes.
 */
export function BlogSection() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <Section id="blog">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Writing"
          title="Notes on building for the web"
          description="Occasional deep-dives into performance, motion, and frontend architecture."
          className="mb-0"
        />
        <Button
          render={<Link href="/blog" />}
          nativeButton={false}
          variant="outline"
          className="group hidden shrink-0 rounded-full sm:inline-flex"
        >
          View all posts
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Button>
      </div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {latestPosts.map((post) => (
          <motion.div key={post.slug} variants={fadeUp}>
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 flex justify-center sm:hidden">
        <Button
          render={<Link href="/blog" />}
          nativeButton={false}
          variant="outline"
          className="rounded-full"
        >
          View all posts
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}
