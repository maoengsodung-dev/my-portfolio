import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "aurora-labs",
    role: "UX UI Engineer",
    company: "Aurora Labs",
    period: "2024 — Present",
    location: "Remote",
    type: " ",
    summary:
      "Leading the frontend team to ship a new design system and dashboard for Aurora Labs' core product.",
    highlights: [
      "Built a design system with reusable components and documentation for internal and external use",
    ],
  },
  {
    id: "nimbus",
    role: "Mobile App Developer",
    company: "Nimbus",
    period: "2022 — 2024",
    location: "",
    type: "Full-time",
    summary:
      "Owned the visual page-builder product end to end, from architecture to shipping.",
    highlights: [
      "Designed an undo-safe canvas engine powering a real-time drag-and-drop builder",
      "Built a CRDT-backed collaboration layer supporting live multi-user editing",
      "Reduced builder-to-production markup drift to zero by unifying render paths",
    ],
  },
  {
    id: "orbit-health",
    role: "Frontend Engineer",
    company: "Orbit Health",
    period: "2021 — 2022",
    location: "Remote",
    type: "Contract",
    summary: "Redesigned patient-facing intake flows for clarity and trust.",
    highlights: [
      "Cut intake form drop-off from 41% to 12% through UX research and rebuild",
      "Implemented full keyboard and screen-reader support across core flows",
    ],
  },
  {
    id: "freelance",
    role: "Freelance Frontend Developer",
    company: "Independent",
    period: "2019 — 2021",
    location: "Bandung, Indonesia",
    type: "Freelance",
    summary:
      "Delivered marketing sites, storefronts, and internal tools for 15+ clients.",
    highlights: [
      "Shipped a shared component library reused across 6 storefront brands",
      "Consistently delivered projects ahead of schedule with zero missed handoffs",
    ],
  },
];
