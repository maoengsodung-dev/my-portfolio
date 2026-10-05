"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * The recurring "eyebrow / big title / description" pattern used at the
 * top of every section, kept in one place so typography and spacing
 * never drift between sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "mb-14 max-w-2xl sm:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <motion.p
        variants={fadeUp}
        className="mb-3 font-mono text-xs tracking-[0.2em] text-primary uppercase"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-lg text-muted-foreground text-pretty"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
