import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "smooth-scroll-without-jank",
    title: "Building Smooth Scroll Without the Jank",
    excerpt:
      "How to pair Lenis with GSAP ScrollTrigger without fighting two competing render loops.",
    date: "2025-11-02",
    readingTime: "6 min read",
    tags: ["Performance", "GSAP", "Animation"],
    coverImage: "/blog/smooth-scroll.svg",
    content: [
      "Smooth-scroll libraries and scroll-triggered animation libraries both want to own the scroll position — and that's exactly where most implementations start to jank.",
      "The fix is to pick one source of truth. Lenis intercepts wheel and touch input and computes a virtual scroll position; GSAP's ScrollTrigger should simply read that position instead of listening to the native scroll event.",
      "In practice: disable Lenis' internal rAF loop, drive it from GSAP's ticker instead, and forward Lenis' scroll event to `ScrollTrigger.update()`. One loop, one source of truth, zero fighting.",
      "The last piece is respecting `prefers-reduced-motion`. Smooth scrolling is a nice-to-have, not a requirement — always ship a native-scroll fallback.",
    ],
  },
  {
    slug: "designing-for-dark-mode-first",
    title: "Designing for Dark Mode First",
    excerpt:
      "Why treating dark mode as the primary theme — not an afterthought — changes your entire color system.",
    date: "2025-09-18",
    readingTime: "5 min read",
    tags: ["Design Systems", "Accessibility"],
    coverImage: "/blog/dark-mode.svg",
    content: [
      "Most design systems start in light mode and bolt on a dark theme later. The result is usually low-contrast text and shadows that do nothing on a black background.",
      "Starting dark-first forces better decisions early: shadows become subtle borders and glows, surfaces get real elevation via layered opacity, and contrast is checked against WCAG AA from day one instead of retrofitted.",
      "The light theme, when you do build it, tends to be better too — because your token system was never allowed to rely on tricks that only work on white.",
    ],
  },
  {
    slug: "server-actions-in-practice",
    title: "Server Actions in Practice: A Contact Form Case Study",
    excerpt:
      "A walkthrough of building a fully validated, progressively-enhanced contact form with Server Actions.",
    date: "2025-07-04",
    readingTime: "7 min read",
    tags: ["Next.js", "Forms", "TypeScript"],
    coverImage: "/blog/server-actions.svg",
    content: [
      "Server Actions collapse what used to be an API route, a fetch call, and a loading state into a single function — but the ergonomics only shine once validation and error states are handled properly.",
      "Validating on the server with Zod is non-negotiable: client validation is a UX nicety, not a security boundary. Every Server Action should re-validate its inputs.",
      "Pairing `useActionState` for structured error state with `useFormStatus` for pending UI gives you a form that works even before JavaScript finishes loading — true progressive enhancement.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
