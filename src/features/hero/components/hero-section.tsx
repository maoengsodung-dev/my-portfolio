"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { fadeUp, staggerContainer, lineReveal } from "@/lib/motion";
import { AvailabilityBadge } from "@/features/hero/components/availability-badge";
import { HeroBackground } from "@/features/hero/components/hero-background";
import { RoleRotator } from "@/features/hero/components/role-rotator";
import { ScrollCue } from "@/features/hero/components/scroll-cue";
import { Mascot } from "page-mascot";

const headlineLines = [
  { text: "Crafting interfaces" },
  { text: "that feel ", accent: "effortless." },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24"
    >
      <HeroBackground />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <AvailabilityBadge />
          </motion.div>

          <h1 className="text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl md:text-7xl">
            {headlineLines.map((line) => (
              <span key={line.text} className="block overflow-hidden pb-1">
                <motion.span variants={lineReveal} className="block">
                  {line.text}
                  {line.accent && (
                    <span className="font-serif text-[1.05em] italic text-primary">
                      {line.accent}
                    </span>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-lg text-muted-foreground text-pretty"
          >
            I&apos;m {siteConfig.name.split(" ")[0]}, a <RoleRotator /> who
            turns complex problems into fast, accessible, and quietly delightful
            App experiences.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              render={<Link href="#projects" scroll={false} />}
              nativeButton={false}
              size="lg"
              className="group h-12 rounded-full px-6 text-base"
            >
              View my work
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button
              render={<Link href="#contact" scroll={false} />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="group h-12 rounded-full px-6 text-base"
            >
              Get in touch
              <ArrowDownRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
      {/* justify bottom mascot equal height */}
      <div className="absolute  right-50 flex gap-5">
        <Mascot
          directions="/mascots/fox-pixel-directions.webp"
          reactions="/mascots/fox-pixel-reactions.webp"
        />
        <Mascot
          directions="/mascots/fox-paper-directions.webp"
          reactions="/mascots/fox-paper-reactions.webp"
        />
      </div>

      <ScrollCue />
    </section>
  );
}
