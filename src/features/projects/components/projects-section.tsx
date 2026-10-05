"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/common/section-heading";
import { projectCategories, projects } from "@/data/projects";
import { staggerContainer } from "@/lib/motion";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectEmptyState } from "@/features/projects/components/project-empty-state";
import { ProjectFilter } from "@/features/projects/components/project-filter";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <Section id="projects">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Selected work"
          description="A mix of products, dashboards, and marketing sites — each solving a real, specific problem."
          className="mb-0 max-w-xl"
        />
        <ProjectFilter
          categories={projectCategories}
          active={activeCategory}
          onChange={setActiveCategory}
          className="shrink-0"
        />
      </div>

      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeCategory}
            layout
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 16 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        ) : (
          <ProjectEmptyState key={`empty-${activeCategory}`} category={activeCategory} />
        )}
      </AnimatePresence>
    </Section>
  );
}
