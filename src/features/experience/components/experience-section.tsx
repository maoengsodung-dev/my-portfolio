"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { SectionHeading } from "@/components/common/section-heading";
import { Section } from "@/components/layout/section";
import { experience } from "@/data/experience";
import { ExperienceItem } from "@/features/experience/components/experience-item";
import { staggerContainer } from "@/lib/motion";

/**
 * Vertical timeline of past roles. A background track (`bg-border`) runs
 * the length of the list, with a `bg-primary` progress line that grows in
 * sync with scroll position via `useScroll` + `useTransform`.
 */
export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 65%"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've made an impact"
        description="A timeline of the roles, teams, and projects that shaped how I build for the web."
      />

      <motion.div
        ref={containerRef}
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative"
      >
        <div
          className="absolute top-1 bottom-1 left-1.5 w-px bg-border"
          aria-hidden="true"
        />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute top-1 bottom-1 left-1.5 w-px origin-top bg-primary"
          aria-hidden="true"
        />

        <div className="flex flex-col">
          {experience.map((item, index) => (
            <ExperienceItem
              key={item.id}
              item={item}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
