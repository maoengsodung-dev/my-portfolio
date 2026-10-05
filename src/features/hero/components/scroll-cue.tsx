"use client";

import { motion } from "framer-motion";

/**
 * A minimal scroll affordance: a slim pill with a dot travelling down it
 * on loop. Communicates "there's more below" without competing with the
 * headline for attention.
 */
export function ScrollCue() {
  return (
    <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
      <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        Scroll
      </span>
      <span className="relative h-10 w-6 rounded-full border border-border/70">
        <motion.span
          className="absolute top-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-foreground"
          animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </div>
  );
}
