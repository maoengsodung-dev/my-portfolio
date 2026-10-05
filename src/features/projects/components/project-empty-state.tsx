"use client";

import { motion } from "framer-motion";
import { FolderSearch } from "lucide-react";

type ProjectEmptyStateProps = {
  category?: string;
};

export function ProjectEmptyState({ category }: ProjectEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 flex w-full items-center justify-center rounded-3xl border border-border/50 bg-card/20 p-6 sm:p-10 md:p-14"
    >
      <div className="relative flex w-full max-w-xl flex-col items-center justify-center rounded-3xl border border-border/80 bg-card p-8 text-center shadow-md sm:p-12 dark:border-border/60 dark:bg-card">
        {/* Top Counter Badge */}
        <span className="inline-flex items-center justify-center rounded-full bg-muted/80 px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground">
          0 / 0
        </span>

        {/* Icon in Rounded Container */}
        <div className="mt-6 flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-muted/40 text-foreground shadow-xs sm:size-16">
          <FolderSearch
            className="size-6 text-foreground/80 sm:size-7"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          It will be coming soon.
        </h3>

        {/* Description */}
        <p className="mt-3.5 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
          There are currently no products available under this section. New
          products will be coming soon. Stay tuned for upcoming additions.
        </p>

        {/* Subtle Indicator Dots */}
        <div
          className="mt-8 flex items-center justify-center gap-1.5"
          aria-hidden="true"
        >
          <span className="size-2 rounded-full bg-primary/80" />
          <span className="size-2 rounded-full bg-muted-foreground/25" />
          <span className="size-2 rounded-full bg-muted-foreground/25" />
        </div>
      </div>
    </motion.div>
  );
}
