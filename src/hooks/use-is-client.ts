import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns `true` only after the component has mounted on the client.
 * Used to defer rendering of client-only state (e.g. resolved theme)
 * without triggering a synchronous `setState` inside an effect.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
