"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import portraitImg from "@/assets/images/Sodung Maoeng.png";
import { siteConfig } from "@/config/site";
import { fadeUp } from "@/lib/motion";

export function AboutPortrait() {
  return (
    <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-md">
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-muted to-muted/40 shadow-2xl shadow-black/20">
        {/* Soft background glows */}
        <div className="absolute top-1/3 left-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 bottom-0 size-40 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />

        {/* Profile Image */}
        <Image
          src={portraitImg}
          alt={siteConfig.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
          placeholder="blur"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle gradient vignette overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />

        {/* Decorative inner frame */}
        <div className="pointer-events-none absolute inset-5 rounded-2xl border border-white/20 dark:border-white/10" />

        {/* Corner accents */}
        <div className="pointer-events-none absolute top-8 left-8 size-8 rounded-tl-2xl border-t border-l border-primary/50" />
        <div className="pointer-events-none absolute right-8 bottom-8 size-8 rounded-br-2xl border-r border-b border-primary/50" />
      </div>

      {/* Floating location badge */}
      <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/60 bg-card/90 px-4 py-2 text-sm text-card-foreground shadow-lg backdrop-blur-md">
        <MapPin className="size-3.5 text-primary" aria-hidden="true" />
        <span className="whitespace-nowrap">
          Based in {siteConfig.location}
        </span>
      </div>
    </motion.div>
  );
}
