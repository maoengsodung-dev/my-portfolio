"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ExperienceItem as ExperienceItemType } from "@/types";

type ExperienceItemProps = {
  item: ExperienceItemType;
  isLast?: boolean;
};

/** A single entry in the experience timeline: role, company, and highlights. */
export function ExperienceItem({ item, isLast }: ExperienceItemProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn("relative pb-12 pl-10 sm:pb-16 sm:pl-14", isLast && "pb-0")}
    >
      <span
        className="absolute top-1.5 left-0 flex size-3 items-center justify-center rounded-full bg-primary ring-4 ring-background"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
          {item.role}
        </h3>
        <Badge variant="secondary">{item.type}</Badge>
      </div>

      <p className="mt-1 text-base text-primary">{item.company}</p>

      <p className="mt-3 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
        {item.period} · {item.location}
      </p>

      <p className="mt-4 max-w-2xl text-muted-foreground text-pretty">
        {item.summary}
      </p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {item.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5">
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground text-pretty">
              {highlight}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
