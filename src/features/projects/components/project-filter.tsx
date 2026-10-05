"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function ProjectFilter({
  categories,
  active,
  onChange,
  className,
}: {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className={cn(
        "flex flex-row flex-nowrap items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              "relative shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
