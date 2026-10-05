"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMediaQuery } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

/**
 * Keeps GSAP's ScrollTrigger in sync with Lenis' virtual scroll position,
 * and drives Lenis' internal raf loop from GSAP's ticker. This is the
 * canonical way to combine the two libraries: a single rAF loop avoids
 * jitter between GSAP-driven reveals and Lenis-driven smooth scrolling.
 */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", onScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  return null;
}

/**
 * All internal hash links use `scroll={false}` so Next.js never fights
 * Lenis for control of the scroll position (Next's default hash handling
 * uses the native `scrollIntoView()`, which races with Lenis' animated
 * `scrollTo`). This component is the single source of truth for actually
 * performing that scroll instead — covering both same-page anchor clicks
 * (which Lenis' own `anchors` option already animates) and cross-page
 * links such as a footer link clicked from `/blog` that lands on `/#projects`.
 *
 * No manual pixel offset is passed here: Lenis automatically reads each
 * target's CSS `scroll-margin-top` (see the `scroll-mt-24` utility on
 * `Section`) to clear the sticky navbar, so the offset lives in exactly
 * one place instead of being duplicated (and double-applied) in JS.
 */
function HashScrollSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const hash = window.location.hash;
    if (!hash) return;

    // The target section may not have mounted into the DOM yet at the
    // moment this effect first runs (e.g. right after a cross-page
    // navigation, before the new page's client components have
    // committed). Retry on a short interval instead of checking once.
    let attempts = 0;
    const maxAttempts = 30; // ~3s at 100ms intervals

    const interval = window.setInterval(() => {
      attempts += 1;
      const target = document.querySelector(hash);

      if (target) {
        window.clearInterval(interval);
        // Lenis caches the document's scrollable range and only
        // recalculates it via its own resize observer, which may not
        // have caught up yet right after a client-side navigation swaps
        // in much taller content. Force a recalculation so `scrollTo`
        // isn't clamped to the previous (shorter) page's limit.
        lenis.resize();
        lenis.scrollTo(hash);
      } else if (attempts >= maxAttempts) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => window.clearInterval(interval);
    // Re-runs whenever the route changes so cross-page hash links land
    // correctly once the new page's sections have mounted.
  }, [pathname, lenis]);

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Respect accessibility preferences: fall back to native scrolling
  // instead of forcing momentum-based smoothing.
  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: true,
      }}
    >
      <LenisGsapBridge />
      <HashScrollSync />
      {children}
    </ReactLenis>
  );
}
