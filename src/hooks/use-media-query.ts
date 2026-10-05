import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query via `useSyncExternalStore` instead of the
 * classic `useState` + `useEffect` pattern. This avoids calling `setState`
 * synchronously inside an effect (flagged by `react-hooks/set-state-in-effect`)
 * and keeps the server snapshot deterministic to prevent hydration mismatches.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
