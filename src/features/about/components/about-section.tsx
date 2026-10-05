"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Accessibility, ArrowUpRight, Gauge, Sparkles } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { AboutPortrait } from "@/features/about/components/about-portrait";
import { AboutStats } from "@/features/about/components/about-stats";

const values = [
  {
    icon: Sparkles,
    title: "Quality over shortcuts",
    description:
      "I focus on clean architecture, reusable components, and maintainable code.",
  },
  {
    icon: Gauge,
    title: "Performance as a feature",
    description:
      "I aim for responsive interfaces, efficient data handling, and smooth user experiences.",
  },
  {
    icon: Gauge,
    title: "Design meets engineering",
    description:
      "I turn Figma designs and product requirements into practical, polished mobile interfaces.",
  },
  {
    icon: Accessibility,
    title: "Always learning.",
    description:
      "I continuously explore new tools, frameworks, and development practices to improve as a mobile developer.",
  },
];

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About me"
        title="The engineer behind the pixels"
        description="A closer look at how I think, what I value, and the craft I bring to every project."
      />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        <AboutPortrait />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col"
        >
          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground text-pretty"
          >
            I&apos;m {siteConfig.name}, a{" "}
            <span className="font-serif text-foreground italic">
              {siteConfig.role}
            </span>{" "}
            focused on building clean, intuitive, and reliable mobile
            experiences. I work at the intersection of engineering and design
            turning ideas and requirements into interfaces that feel natural,
            responsive, and easy to use.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-muted-foreground text-pretty"
          >
            My primary focus is cross-platform mobile development with Flutter,
            while also working with React Native, Laravel, Firebase, and REST
            APIs. I care about the details that make an application feel
            polished smooth interactions, consistent layouts, responsive UI,
            clear navigation, and performance.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-muted-foreground text-pretty"
          >
            I believe great mobile applications are built through a combination
            of solid engineering and thoughtful design. Whether I&apos;m implementing
            a feature, connecting an API, managing application state, or
            refining a UI from Figma, I aim to create products that are
            maintainable, scalable, and enjoyable to use.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-8 flex flex-col gap-4">
            {values.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{title}.</span>{" "}
                  {description}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10">
            <Button
              render={<Link href="#contact" scroll={false} />}
              nativeButton={false}
              size="lg"
              className="group h-12 rounded-full px-6 text-base"
            >
              Let&apos;s work together
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-16">
        <AboutStats />
      </div>
    </Section>
  );
}
