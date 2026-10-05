"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Wraps next-themes so class-based dark mode works with Tailwind v4's
 * `@custom-variant dark`. Dark is the primary/default brand theme, but
 * light remains available and is persisted once a visitor toggles it.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
