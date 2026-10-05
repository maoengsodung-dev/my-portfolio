"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed full-page grid overlay with softened visibility,
 * smooth corner blur falloffs (top-left, top-right, bottom-left, bottom-right),
 * and an interactive cursor spotlight.
 */
export function GridBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        spotlight.style.setProperty("--x", `${event.clientX}px`);
        spotlight.style.setProperty("--y", `${event.clientY}px`);
        spotlight.style.opacity = "1";
      });
    };

    const handlePointerLeave = () => {
      spotlight.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 
        Grid pattern container with radial vignette mask:
        grid lines remain visible in the main content area and smoothly
        fade towards the periphery and corners.
      */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 75% at 50% 50%, black 35%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 75% at 50% 50%, black 35%, transparent 95%)",
        }}
      >
        {/* Subtle, refined grid lines */}
        <svg
          className="absolute inset-0 h-full w-full stroke-black/[0.05] dark:stroke-white/[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="site-grid-pattern"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 48V.5H48" fill="none" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#site-grid-pattern)"
          />
        </svg>

        {/* Soft interactive cursor spotlight */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
        >
          <svg
            className="absolute inset-0 h-full w-full stroke-primary/30 dark:stroke-primary/40"
            style={{
              maskImage:
                "radial-gradient(360px circle at var(--x, 50vw) var(--y, 50vh), black 0%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(360px circle at var(--x, 50vw) var(--y, 50vh), black 0%, transparent 80%)",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#site-grid-pattern)"
            />
          </svg>
        </div>
      </div>

      {/* 
        Four corner blur vignettes (top-left, top-right, bottom-left, bottom-right):
        blurs and softens the grid lines seamlessly in every corner.
      */}
      {/* Top Left */}
      <div
        className="absolute -top-12 -left-12 size-72 sm:size-96 rounded-full bg-background/85 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, var(--background) 40%, transparent 80%)",
        }}
      />
      <div className="absolute top-0 left-0 size-64 sm:size-80 [mask-image:radial-gradient(circle_at_0%_0%,black_30%,transparent_75%)] backdrop-blur-md pointer-events-none" />

      {/* Top Right */}
      <div
        className="absolute -top-12 -right-12 size-72 sm:size-96 rounded-full bg-background/85 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, var(--background) 40%, transparent 80%)",
        }}
      />
      <div className="absolute top-0 right-0 size-64 sm:size-80 [mask-image:radial-gradient(circle_at_100%_0%,black_30%,transparent_75%)] backdrop-blur-md pointer-events-none" />

      {/* Bottom Left */}
      <div
        className="absolute -bottom-12 -left-12 size-72 sm:size-96 rounded-full bg-background/85 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom left, var(--background) 40%, transparent 80%)",
        }}
      />
      <div className="absolute bottom-0 left-0 size-64 sm:size-80 [mask-image:radial-gradient(circle_at_0%_100%,black_30%,transparent_75%)] backdrop-blur-md pointer-events-none" />

      {/* Bottom Right */}
      <div
        className="absolute -bottom-12 -right-12 size-72 sm:size-96 rounded-full bg-background/85 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, var(--background) 40%, transparent 80%)",
        }}
      />
      <div className="absolute bottom-0 right-0 size-64 sm:size-80 [mask-image:radial-gradient(circle_at_100%_100%,black_30%,transparent_75%)] backdrop-blur-md pointer-events-none" />
    </div>
  );
}
