"use client";

import {
  Check,
  Cloud,
  Compass,
  Component,
  Database,
  LayoutGrid,
  Palette,
  Rocket,
  Server,
  Settings,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/common/section-heading";
import { Section } from "@/components/layout/section";
import { services } from "@/data/services";
import { fadeUp, staggerContainer } from "@/lib/motion";

function FigmaIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

const icons: Record<
  string,
  LucideIcon | React.ComponentType<React.ComponentProps<"svg">>
> = {
  Smartphone,
  Cloud,
  Figma: FigmaIcon,
  Settings,
  Palette,
  Wrench,
  Server,
  Database,
  LayoutGrid,
  Rocket,
  Component,
  Compass,
  Sparkles,
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
          const Icon = icons[service.icon] ?? Sparkles;

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
