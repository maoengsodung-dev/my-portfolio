"use client";

import {
  Check,
  Compass,
  Component,
  LayoutGrid,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/common/section-heading";
import { Section } from "@/components/layout/section";
import { services } from "@/data/services";
import { fadeUp, staggerContainer } from "@/lib/motion";

const icons: Record<string, LucideIcon> = {
  LayoutGrid,
  Rocket,
  Component,
  Compass,
};

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="What I can help you build"
        description="From early-stage prototypes to production-grade platforms — focused engineering for teams that care about the details."
      />

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {services.map((service) => {
          const Icon = icons[service.icon];

          return (
            <motion.div
              key={service.id}
              variants={fadeUp}
              className="rounded-3xl border border-border/60 bg-card p-8 text-card-foreground transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {Icon && <Icon className="size-5" aria-hidden="true" />}
              </div>

              <h3 className="mt-6 text-xl font-medium tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 text-muted-foreground text-pretty">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
