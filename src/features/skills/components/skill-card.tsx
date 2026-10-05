"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/motion";
import type { SkillCategory } from "@/types";

type SkillCardProps = {
  category: SkillCategory;
};

/**
 * A single skill category card. Extracted so the grid layout and the
 * card's own hover choreography stay easy to reason about separately.
 */
export function SkillCard({ category }: SkillCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative">
        <h3 className="text-lg font-medium tracking-tight text-card-foreground">
          {category.category}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          {category.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="font-normal">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
