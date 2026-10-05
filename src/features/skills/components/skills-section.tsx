"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/common/section-heading";
import { Section } from "@/components/layout/section";
import { skillCategories } from "@/data/skills";
import { staggerContainer } from "@/lib/motion";

import { SkillCard } from "@/features/skills/components/skill-card";

/**
 * Presents the skill set as a curated grid of categories rather than a
 * generic wall of tech-logo icons, keeping the tone premium and
 * editorial rather than a checklist.
 */
export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills & Technologies"
        title="The toolkit behind the craft"
        description="A curated set of languages, frameworks, and practices I reach for to turn ideas into polished, production-ready products."
      />

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category) => (
          <SkillCard key={category.category} category={category} />
        ))}
      </motion.div>
    </Section>
  );
}
