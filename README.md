# Portfolio — Rangga Wirayuda

A premium, minimalist, dark-mode-first personal portfolio built with the App Router, Base UI–powered shadcn/ui, Framer Motion, and GSAP. Every section — Hero, About, Skills, Projects, Experience, Services, Testimonials, Blog, Contact — is a self-contained feature module with its own data source, so content can be edited without touching layout or animation code.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Table of contents

- [Tech stack](#tech-stack)
- [Features](#features)
- [Project structure](#project-structure)
- [Architecture & key decisions](#architecture--key-decisions)
- [Customizing content](#customizing-content)
- [Scripts](#scripts)
- [Accessibility & performance](#accessibility--performance)
- [Before going live](#before-going-live)
- [Deployment](#deployment)
- [A note on the Next.js version](#a-note-on-the-nextjs-version)

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Server Components/Actions) |
| Language | TypeScript (strict) |
| UI runtime | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config) |
| Component primitives | shadcn/ui on **Base UI** (not Radix — see [notes](#a-note-on-the-nextjs-version)) |
| Animation | Framer Motion (scroll reveals, layout transitions) + GSAP (ambient hero background, animated counters, ScrollTrigger) |
| Smooth scrolling | Lenis, bridged to GSAP's ticker |
| Forms & validation | React Hook Form + Zod, submitted via a Server Action |
| Icons | lucide-react (+ a few hand-rolled SVGs for brand/social logos) |
| Theming | next-themes (dark is the default/primary theme, light is togglable) |
| Toasts | Sonner |
| Deployment target | Vercel |

## Features

- Animated, GSAP-driven hero background with a cursor-following spotlight and live local-time badge
- Sticky glass navbar with a scroll-spy active-section indicator (shared-layout animated pill)
- Smooth scrolling (Lenis) fully synced with GSAP ScrollTrigger for scroll-based animations
- Animated stat counters (About section)
- Filterable project grid with animated layout transitions
- Project detail pages (`/work/[slug]`) with an image gallery lightbox
- Blog list + detail pages (`/blog`, `/blog/[slug]`)
- Contact form with client-side (React Hook Form + Zod) and server-side re-validation via a Server Action, toast feedback, pending states
- Dark/light theme toggle (dark is the default)
- SEO: per-page metadata, Open Graph tags, `sitemap.xml`, `robots.txt`
- Accessible by default: semantic landmarks, focus-visible states, `aria-*` attributes on custom controls, `prefers-reduced-motion` fallbacks for all animation (Lenis, GSAP, and the testimonials marquee all degrade to static/native behavior)
- Route-level loading skeletons and a global not-found page

## Project structure

```
src/
├── app/                          # Routes (App Router)
│   ├── layout.tsx                 # Fonts, metadata, providers, Navbar/Footer/Toaster shell
│   ├── page.tsx                   # Home page — composes every section
│   ├── globals.css                # Tailwind v4 theme tokens, scrollbar/selection styles
│   ├── loading.tsx / not-found.tsx
│   ├── sitemap.ts / robots.ts     # Generated from src/data
│   ├── blog/
│   │   ├── page.tsx                # Full post archive
│   │   └── [slug]/page.tsx         # Post detail (generateStaticParams + generateMetadata)
│   └── work/
│       └── [slug]/page.tsx         # Project detail (gallery, next-project nav)
│
├── features/                     # One folder per homepage section (feature-based structure)
│   ├── hero/       about/       skills/       projects/
│   ├── experience/ services/    testimonials/ blog/
│   └── contact/
│       Each exposes a single named export via its `index.ts` barrel,
│       e.g. `export { HeroSection } from "./components/hero-section"`.
│
├── components/
│   ├── layout/     # Navbar, Footer, Section wrapper, ThemeToggle
│   ├── common/     # Cross-section reusables: SectionHeading, AnimatedCounter,
│   │               # MediaPlaceholder, social-icons
│   ├── providers/  # ThemeProvider, SmoothScrollProvider (Lenis + GSAP bridge)
│   └── ui/         # shadcn/ui primitives (button, card, dialog, form inputs, ...)
│
├── data/            # Typed content: projects, skills, experience, services,
│                     # testimonials, stats, blog — the single source of truth
│                     # consumed by both the UI and sitemap.ts
├── config/site.ts    # Name, role, tagline, nav items, social links, contact info
├── types/index.ts     # Shared domain types (Project, BlogPost, Testimonial, ...)
├── hooks/             # use-active-section, use-media-query, use-is-client
└── lib/               # motion.ts (shared Framer Motion variants), utils.ts (cn)
```

## Architecture & key decisions

**Feature-based, not type-based.** Each homepage section lives in `src/features/<name>/` with its own `components/` folder and a barrel `index.ts`. This keeps section-specific logic (e.g. the project filter, the testimonials marquee) colocated and easy to hand off or delegate independently, while `components/`, `data/`, `types/`, and `config/` hold the genuinely shared/cross-cutting pieces.

**Data lives outside components.** Every section reads from `src/data/*.ts` (typed against `src/types/index.ts`). Editing site content is a data-file change, never a JSX change.

**One shared motion vocabulary.** `src/lib/motion.ts` exports `fadeUp`, `staggerContainer`, and `lineReveal` Framer Motion variants used consistently across every section for scroll-reveal timing. GSAP is reserved for cases Framer Motion isn't a great fit for: the Hero's continuous ambient background loop and the GSAP `ScrollTrigger`-driven `AnimatedCounter`.

**Smooth scroll is centralized.** `src/components/providers/smooth-scroll-provider.tsx` wraps the app in Lenis, bridges its raf loop to GSAP's ticker (so `ScrollTrigger` and Lenis never fight over the scroll position), and includes a `HashScrollSync` helper that makes internal `#anchor` links work correctly both on the home page and when linked to from another route (e.g. a footer link clicked from `/blog`). All internal hash links use `scroll={false}` so Next.js's own hash-scroll behavior doesn't race with Lenis's.

**Scroll-spy is ratio-based, not threshold-filtered.** `src/hooks/use-active-section.ts` tracks every section's intersection ratio continuously and always highlights the current maximum, rather than filtering to only currently-"intersecting" entries against a couple of coarse thresholds — the latter is flaky for any section taller than the viewport. It also re-initializes on every route change since the Navbar lives in the root layout and never unmounts between pages.

**Reduced motion is respected everywhere**, not just via a CSS media query: Lenis, the Hero's GSAP background, and the testimonials marquee all check `prefers-reduced-motion` and fall back to native/static behavior.

## Customizing content

Everything a real deployment needs to change lives in a small number of files:

| What | File |
| --- | --- |
| Name, role, tagline, email, location, social links | `src/config/site.ts` |
| Navbar links | `src/config/site.ts` (`navItems`) |
| Projects | `src/data/projects.ts` |
| Skills & categories | `src/data/skills.ts` |
| Work experience | `src/data/experience.ts` |
| Services offered | `src/data/services.ts` |
| Testimonials | `src/data/testimonials.ts` |
| About-section stats | `src/data/stats.ts` |
| Blog posts | `src/data/blog.ts` |
| Theme colors / radii | `src/app/globals.css` (`@theme inline` + `:root` / `.dark` tokens) |
| Fonts | `src/app/layout.tsx` (`next/font/google` calls) |

Project and blog cover images currently render as generated gradient placeholders (`src/components/common/media-placeholder.tsx`, seeded from the slug) so the site works without any image assets. Once you have real screenshots, drop them in `public/` and swap the `MediaPlaceholder` usages for `next/image`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build (also prerenders all static/SSG routes) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, includes React Hooks rules) |

There's no test runner configured yet. `npx tsc --noEmit` is a fast way to type-check without a full build.

## Accessibility & performance

- All interactive icon-only controls have `aria-label`s; the mobile menu button toggles `aria-expanded`.
- Focus rings are preserved from the shadcn/ui defaults (`focus-visible:ring-*`).
- Form fields use `aria-invalid` / `aria-describedby` wired to their error messages.
- Every animation system has a reduced-motion fallback (see above).
- Images (once added) should use `next/image` for automatic optimization; icons are inlined SVG/`lucide-react` for a small bundle.
- Routes are prerendered where possible (`○ Static` / `● SSG` in the `next build` output) for fast TTFB.

## Before going live

- [ ] Replace placeholder name/email/social links in `src/config/site.ts`, including `siteConfig.url` (used in metadata, sitemap, and Open Graph tags)
- [ ] Replace sample content in `src/data/*.ts` with real projects, experience, testimonials, and posts
- [ ] Swap `MediaPlaceholder` covers for real screenshots via `next/image`
- [ ] Wire `src/features/contact/actions.ts` to a real email provider (Resend, Postmark, etc. — there's a `// TODO` at the send call)
- [ ] Run a Lighthouse pass once real images are in place

## Deployment

The project is a standard Next.js App Router app and deploys to [Vercel](https://vercel.com/new) with zero configuration — connect the repository and Vercel will detect the framework, install dependencies, and run `next build`. Set `siteConfig.url` to your production domain before deploying so metadata, the sitemap, and Open Graph tags resolve correctly.

## A note on the Next.js version

This project targets **Next.js 16**, which introduced several breaking changes relative to older Next.js/shadcn knowledge:

- shadcn/ui here is configured with **Base UI** (`@base-ui/react`), not Radix. Polymorphic components use a `render` prop instead of `asChild` (e.g. `<Button render={<Link href="/foo" />} nativeButton={false}>`) — the `nativeButton={false}` is required whenever `render` points to something other than a real `<button>`.
- `middleware.ts` has been renamed to `proxy.ts` (not currently used in this project).
- `lucide-react` v1 dropped trademarked brand/logo icons (GitHub, LinkedIn, X, Instagram); see `src/components/common/social-icons.tsx` for the small inline-SVG replacements.
- The new ESLint rule `react-hooks/set-state-in-effect` flags the classic `useEffect(() => setState(...), [])` mount-detection pattern; this codebase uses `useSyncExternalStore` instead (`src/hooks/use-is-client.ts`, `src/hooks/use-media-query.ts`).

If you're extending this project, it's worth reading `node_modules/next/dist/docs/` directly rather than relying on general Next.js knowledge, since the installed version may continue to diverge from older conventions.
