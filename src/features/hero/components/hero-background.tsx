"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Purely decorative backdrop: two blurred gradient orbs drifting on an
 * infinite GSAP loop, a film-grain layer for tactility, and a cursor-following
 * spotlight for glassmorphism depth.
 * Everything here is `aria-hidden` and skipped for reduced-motion users.
 */
export function HeroBackground() {
  const orbOneRef = useRef<HTMLDivElement>(null);
  const orbTwoRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.to(orbOneRef.current, {
        x: 60,
        y: 40,
        scale: 1.08,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(orbTwoRef.current, {
        x: -50,
        y: -30,
        scale: 1.12,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !spotlight) return;

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = container.getBoundingClientRect();
        spotlight.style.setProperty("--x", `${event.clientX - bounds.left}px`);
        spotlight.style.setProperty("--y", `${event.clientY - bounds.top}px`);
        spotlight.style.opacity = "1";
      });
    };

    const handlePointerLeave = () => {
      spotlight.style.opacity = "0";
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 -z-10 overflow-hidden bg-transparent"
    >
      {/* Ambient gradient orbs */}
      <div
        ref={orbOneRef}
        className="absolute top-[-10%] left-[8%] size-[32rem] rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        ref={orbTwoRef}
        className="absolute right-[5%] bottom-[-15%] size-[36rem] rounded-full bg-sky-500/10 blur-[130px]"
      />

      {/* Cursor-follow spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--foreground) 6%, transparent), transparent 70%)",
        }}
      />

      {/* Film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>
    </div>
  );
}
