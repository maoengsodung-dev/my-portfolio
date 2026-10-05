"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const roles = [
  "Mobile App Developer",
  "Backend Dev",
  "UI Engineer",
  "Creative Developer",
];

/**
 * Cycles through role labels with a vertical slide/blur transition.
 * A lightweight micro-interaction that keeps the hero feeling alive
 * without stealing attention from the headline.
 */
export function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-grid h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap text-foreground"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
