import type { Project } from "@/types";

/**
 * Placeholder content. Swap `coverImage`/`gallery` for real screenshots in
 * `/public/projects/*` and point `next/image` at them directly — the
 * `MediaPlaceholder` component used for now is a drop-in you can remove
 * once real assets exist.
 */
export const projects: Project[] = [
  // UX UI Project
  {
    slug: "transport",
    title: "Travel & Transport",
    summary:
      "A modern travel and public transit mobile experience designed in Figma with an interactive design system and journey booking flows.",
    description: [
      "Travel & Transport is a comprehensive mobile experience for commuters and regional travelers navigating buses, trains, and transit networks. Crafted from scratch in Figma with an accessible, high-contrast visual design system.",
      "The product features multi-modal route planning, live seat reservation, interactive schedule timelines, integrated KHQR payment flows, and digital ticketing with QR validation.",
      "Built with a scalable Figma component architecture including design tokens, typography scales, touch-optimized ergonomics, and full prototype interactions.",
    ],
    category: "UI/UX",
    tags: ["Figma", "UI/UX Design", "Mobile App", "Design System"],
    role: "UX/UI Designer",
    year: "2026",
    client: "Travel & Transport",
    liveUrl:
      "https://www.figma.com/design/SVoErnj5NUztQa61NObWBN/Travel---Transport?node-id=0-1&t=Fx1miHCZe1Q6FzlR-1",
    coverImage: "/images/transport.png",
    gallery: ["/images/ux1.png", "/images/ux2.png", "/images/ux3.png"],
    featured: true,
  },
  {
    slug: "find-hospital",
    title: "Find Hospital",
    summary:
      "A mobile healthcare discovery and emergency response platform designed in Figma, featuring instant SOS alerts, interactive hospital maps, and certified facility verification.",
    description: [
      "Find Hospital is a modern healthcare and emergency services mobile app designed to help users quickly discover nearby hospitals, clinics, and pharmacies in Phnom Penh and regional Cambodia. Designed entirely in Figma with an emphasis on clarity, accessibility, and high-urgency ergonomics.",
      "The interface features a prominent one-swipe Emergency SOS system that instantly notifies trusted contacts and broadcasts live geolocation to emergency responders. Users can explore accredited healthcare facilities with an interactive map, filter by specialty (National Hospitals, Dental, Eye care, 24/7 emergency rooms), and view real-time operating hours and distance calculations.",
      "To establish strong user trust, the design incorporates a rigorous hospital verification flow for official licenses and Ministry of Health representative IDs, supported by a scalable design system with clean card layouts, bottom-sheet interactions, and an accessible dual-accent color palette.",
    ],
    category: "UI/UX",
    tags: [
      "Figma",
      "UI/UX Design",
      "Mobile App",
      "Healthcare",
      "Design System",
    ],
    role: "UX/UI Designer",
    year: "MIS Challenge 2026",
    client: "Find Hospital",
    liveUrl:
      "https://www.figma.com/design/0y2LMSue64SypjTS3b6bxf/Find-Hospital?node-id=5-3&t=H4sg4EVVORTN48So-1",
    coverImage: "/images/cover.png",
    gallery: ["/images/ui1.png", "/images/ui2.png", "/images/ui3.png"],
    featured: true,
  },
  {
    slug: "food-delivery",
    title: "Food Delivery",
    summary:
      "A modern food ordering and grocery delivery mobile application designed in Figma, featuring local Cambodian payment gateways, live order tracking, and dynamic mart integration.",
    description: [
      "Food Delivery is an end-to-end mobile food ordering and grocery delivery experience crafted in Figma, tailored for urban foodies and busy commuters in Phnom Penh. It unifies restaurant takeout and neighborhood mart shopping into a single intuitive app.",
      "The application features location-aware restaurant discovery, promotion carousels, categorized menu browsing (Rice, Fast Food, Drinks, Fresh Veggies), and detailed storefronts for partner merchants such as Vin Mart. The checkout experience is optimized for local payment convenience with direct integration for ABA Bank, ACLEDA Bank, and cash on delivery.",
      "Designed with tactile micro-interactions, ergonomic bottom navigation, and a modern warm-orange visual identity, the UI is built upon an atomic Figma design system with reusable components, responsive auto-layouts, and accessible typographic hierarchies.",
    ],
    category: "UI/UX",
    tags: [
      "Figma",
      "UI/UX Design",
      "Mobile App",
      "Food Delivery",
      "Design System",
    ],
    role: "UX/UI Designer",
    year: "2025",
    client: "Food Delivery",
    liveUrl:
      "https://www.figma.com/design/L9yaIAY5PGW4OwjYrX9A5q/Food-delivery?node-id=472-1927&t=NCgRDlAzJWnq0eXM-1",
    coverImage: "/images/fcover.png",
    gallery: [
      "/images/f1.png",
      "/images/f2.png",
      "/images/f3.png",
      "/images/f4.png",
    ],
    featured: true,
  },
  {
    slug: "hotel-booking",
    title: "Hotel & House Rental",
    summary:
      "A premier hospitality and long-term accommodation booking mobile app designed in Figma, featuring immersive room tours, digital QR check-in, and direct host communications.",
    description: [
      "Hotel & House Rental (Home Cam) is an all-in-one mobile booking platform crafted in Figma for travelers, expats, and renters seeking boutique hotel suites and residential apartments across Phnom Penh, Cambodia.",
      "The application provides end-to-end trip planning with neighborhood discovery (Tonle Bassac, Doun Penh), high-resolution gallery showcases, and detailed amenity filters (gym, pool, high-speed WiFi). Guests can communicate directly with property owners via real-time in-app voice calling and messaging.",
      "The checkout flow offers secure card management, seamless local payment processing, and instant paperless check-in via digital QR E-Receipts. Designed with a distinct rose-crimson aesthetic, fluid bottom navigation, and a comprehensive Figma design system.",
    ],
    category: "UI/UX",
    tags: [
      "Figma",
      "UI/UX Design",
      "Mobile App",
      "Hospitality",
      "Design System",
    ],
    role: "UX/UI Designer",
    year: "2025",
    client: "Home Cam",
    liveUrl:
      "https://www.figma.com/design/7BhycjxE1sxjm3Ly4RtyML/Booking-Hotel-and-rent-house?node-id=32-69&t=aVg9aNZ3NAuLAeqD-1",
    coverImage: "/images/hcover.png",
    gallery: [
      "/images/h1.png",
      "/images/h2.png",
      "/images/h3.png",
      "/images/h4.png",
    ],
    featured: true,
  },

  // Mobile App Project

  {
    slug: "transport-mobile-app",
    title: "Travel & Transport Mobile App Frontend",
    summary:
      "I reconstructed the Transport and Travel mobile application using Flutter, enhancing functionality and user experience through advanced state management, and a pixel-perfect frontend.",
    description: [
      "Travel & Transport Mobile App is a mobile application for booking transportation and travel services.",
      "The application features a user-friendly interface for booking transportation and travel services.",
      "My role was to reconstruct and enhance this application by developing a robust Flutter frontend, implementing advanced state management with GetX, and integrating it with Firebase services for data persistence and user authentication.",
      "I focused on delivering a pixel-perfect, high-fidelity user interface that matches the original application's complete functionality while ensuring optimal performance and scalability.",
    ],
    category: "Mobile App",
    tags: ["Flutter", "dart", "GetX State Management"],
    role: "Mobile App Developer",
    year: "2025",
    client: "Travel & Transport",
    repoUrl:
      "https://github.com/maoengsodung-dev/travel-transportation-frontend",
    coverImage: "/images/transport.png",
    gallery: [
      "/images/transport.png",
      "/images/ux1.png",
      "/images/ux2.png",
      "/images/ux3.png",
    ],
    featured: true,
  },

  // Web Frontend Project

  // Backend Project
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const projectCategories = [
  "All",
  "Mobile App",
  "UI/UX",
  "Web",
  "Dashboard",
] as const;
