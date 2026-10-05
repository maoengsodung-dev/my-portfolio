import type { Variants } from "framer-motion";

/** Shared easing curve for a premium, decelerated feel across the site. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Stagger wrapper for groups of children that should reveal in sequence. */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Simple fade + rise-in, used for paragraphs, badges, and CTAs. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Masked line reveal for large headline typography. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.8, ease: easeOut },
  },
};
