import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  id: string;
};

/**
 * Consistent section chrome (max-width, horizontal padding, vertical
 * rhythm) shared by every content section so spacing never drifts
 * between them.
 */
export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-t border-border/40 py-24 sm:py-32",
        className,
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
