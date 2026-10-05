/**
 * Central, typed source of truth for site-wide content.
 * Keeping this separate from components means copy changes,
 * nav structure, and social links never require touching UI code.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Maoeng Sodung",
  role: "Mobile App Developer",
  tagline:
    "I design and build interfaces that feel effortless, fast, and human.",
  description:
    "Portfolio of a Mobile App Developer specializing in high-performance, accessible, and beautifully animated APP experiences.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://maoengsodung.com",
  avatar: "/images/Sodung_Maoeng_500x500.png",
  location: "Phnom Penh, Cambodia",
  timeZone: "Asia/Jakarta",
  email: "maoengsodung@gmail.com",
  availableForWork: true,
  social: {
    github: "https://github.com/maoengsodong",
    linkedin: "https://linkedin.com/",
    telegram: "https://t.me/MAOENGSODUNG",
    twitter: "https://x.com/",
    instagram: "https://instagram.com/",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Project", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];
