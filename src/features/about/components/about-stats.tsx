"use client";

import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/common/animated-counter";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { stats } from "@/data/stats";

/**
 * Compact grid of stat cards, each counting up via AnimatedCounter once
 * scrolled into view.
 */
export function AboutStats() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          className="rounded-2xl border border-border/60 bg-muted/30 p-5"
        >
          <p className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
