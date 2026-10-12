import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "mobile-app-development",
    icon: "Smartphone",
    title: "Mobile App Development",
    description:
      "Building responsive, user-friendly mobile applications with Flutter, reusable UI components, and maintainable architecture.",
    features: [
      "Flutter & Dart application development",
      "State management with GetX and Riverpod",
      "Responsive layouts and reusable widgets",
    ],
  },
  {
    id: "api-backend-integration",
    icon: "Cloud",
    title: "API & Backend Integration",
    description:
      "Connecting mobile applications to reliable backend services through REST APIs, Firebase, and secure data-handling workflows.",
    features: [
      "Laravel REST API integration with Dio and http",
      "Firebase Authentication, Firestore, and FCM",
      "JSON parsing, token authentication, and error handling",
    ],
  },
  {
    id: "ui-ux-design",
    icon: "Figma",
    title: "UI/UX Design & Prototyping",
    description:
      "Turning ideas into intuitive mobile experiences through user flows, wireframes, interactive prototypes, and thoughtful interface design.",
    features: [
      "Figma wireframes and interactive prototypes",
      "User flows and mobile interface design",
      "Usability, accessibility, and visual consistency",
    ],
  },
  {
    id: "app-maintenance",
    icon: "Settings",
    title: "App Optimization & Maintenance",
    description:
      "Improving existing mobile applications through debugging, code refactoring, UI refinement, and practical development improvements.",
    features: [
      "Debugging and troubleshooting",
      "Code organization and maintainability improvements",
      "Responsive UI refinement and API error handling",
    ],
  },
];
