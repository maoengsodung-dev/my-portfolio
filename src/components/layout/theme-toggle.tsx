"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIsClient } from "@/hooks/use-is-client";

/**
 * A single icon button that swaps Sun/Moon with a short rotate + fade
 * transition. Mounted state guards against hydration mismatches, since
 * the resolved theme is only known on the client.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsClient();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative overflow-hidden rounded-full"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Moon className="size-4" aria-hidden="true" />
            ) : (
              <Sun className="size-4" aria-hidden="true" />
            )}
          </motion.span>
        ) : (
          <span className="size-4" />
        )}
      </AnimatePresence>
    </Button>
  );
}
