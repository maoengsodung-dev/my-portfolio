import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "product-frontend",
    icon: "LayoutGrid",
    title: "Product Frontend Engineering",
    description:
      "End-to-end ownership of complex, data-heavy interfaces — from architecture to pixel-level polish.",
    features: [
      "Next.js / React application architecture",
      "Design system implementation",
      "State management & data fetching strategy",
    ],
  },
  {
    id: "marketing-sites",
    icon: "Rocket",
    title: "High-Performance Marketing Sites",
    description:
      "Fast, animated, conversion-focused sites that score 90+ on Lighthouse without sacrificing motion or polish.",
    features: [
      "Scroll-driven storytelling & micro-interactions",
      "Core Web Vitals optimization",
      "SEO & Open Graph setup",
    ],
  },
  {
    id: "design-systems",
    icon: "Component",
    title: "Design Systems & UI Libraries",
    description:
      "Reusable, accessible component libraries that keep design and engineering in sync as products scale.",
    features: [
      "Token-based theming (light/dark, brand variants)",
      "Documented components in Storybook",
      "Accessibility audits (WCAG AA)",
    ],
  },
  {
    id: "consulting",
    icon: "Compass",
    title: "Technical Consulting & Audits",
    description:
      "A focused audit of your frontend — performance, accessibility, architecture — with a prioritized action plan.",
    features: [
      "Performance & bundle-size audits",
      "Accessibility & UX review",
      "Codebase health assessment",
    ],
  },
];
