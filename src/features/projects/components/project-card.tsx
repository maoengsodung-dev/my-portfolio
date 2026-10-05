"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const hasRealImage =
    Boolean(project.coverImage) && !project.coverImage.endsWith(".svg");

  const imageSrc = project.coverImage?.startsWith("/")
    ? project.coverImage
    : project.coverImage
      ? `/${project.coverImage.replace(/^src\//, "")}`
      : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block overflow-hidden rounded-3xl border border-border/60 bg-card transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-muted">
          {hasRealImage ? (
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="size-full transition-transform duration-500 group-hover:scale-105">
              <MediaPlaceholder seed={project.slug} label={project.category} />
            </div>
          )}
          <div className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-medium tracking-tight">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            {project.summary}
          </p>
          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            {(project.liveUrl || project.repoUrl) && (
              <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-medium text-primary group-hover:underline">
                {project.liveUrl ? "Preview" : "Source"}{" "}
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
