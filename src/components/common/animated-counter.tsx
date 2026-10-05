"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Counts up to `value` once the element scrolls into view. Uses GSAP
 * tweening a plain object (not React state) so the animation runs at
 * 60fps without triggering re-renders on every frame.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const counter = { current: 0 };
    const tween = gsap.to(counter, {
      current: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(counter.current)}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix, duration]);

  return (
    <span ref={elementRef} aria-label={`${value}${suffix}`}>
      0{suffix}
    </span>
  );
}
