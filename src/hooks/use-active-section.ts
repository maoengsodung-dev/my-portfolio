"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Fine-grained thresholds so the observer reports frequent ratio updates
 * instead of only firing at a couple of coarse cutoffs (which made the
 * indicator flaky for sections taller than the viewport). */
const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

/**
 * Tracks which section id is currently most visible in the viewport
 * using IntersectionObserver. Rather than only reacting to the entries
 * included in a single callback batch (which only contains sections
 * whose state just *changed*, not every observed section), this keeps a
 * running map of every section's last-known intersection ratio and picks
 * the overall maximum. That avoids flakiness when a section is taller
 * than the observation band and its own ratio hovers right at a single
 * threshold boundary.
 *
 * Because this is used by the Navbar, which lives in the root layout and
 * therefore never unmounts between routes, it also re-initializes on
 * every pathname change and retries for a short window: the target
 * sections may not exist at all (e.g. on `/blog`) or may not have
 * mounted into the DOM yet at the exact moment a client-side navigation
 * lands back on `/`.
 */
export function useActiveSection(sectionIds: string[]) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let interval: number | null = null;
    let attempts = 0;
    const maxAttempts = 30; // ~3s at 100ms intervals

    const trySetup = () => {
      attempts += 1;

      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (elements.length === 0) {
        if (attempts >= maxAttempts) {
          // None of the tracked sections exist on this route (e.g. a
          // blog/project detail page) — clear any stale indicator left
          // over from the previous page instead of leaving it stuck.
          setActiveId(null);
          if (interval !== null) window.clearInterval(interval);
        }
        return;
      }

      if (interval !== null) {
        window.clearInterval(interval);
        interval = null;
      }

      const ratios = new Map<string, number>();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(
              entry.target.id,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          }

          let bestId: string | null = null;
          let bestRatio = 0;
          for (const [id, ratio] of ratios) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          }

          if (bestId) setActiveId(bestId);
        },
        {
          // A band roughly matching "just below the sticky nav" down to
          // the vertical middle of the viewport.
          rootMargin: "-15% 0px -55% 0px",
          threshold: THRESHOLDS,
        },
      );

      elements.forEach((el) => observer?.observe(el));
    };

    trySetup();
    if (!observer) {
      interval = window.setInterval(trySetup, 100);
    }

    return () => {
      observer?.disconnect();
      if (interval !== null) window.clearInterval(interval);
    };
  }, [sectionIds, pathname]);

  return activeId;
}
