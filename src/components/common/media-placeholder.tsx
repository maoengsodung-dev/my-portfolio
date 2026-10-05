import { cn } from "@/lib/utils";

/**
 * Deterministic gradient cover used until real project/blog screenshots
 * are available. Swap this for a `next/image` once assets exist in
 * `/public` — the seeded hue keeps each card visually distinct without
 * needing a designer-supplied placeholder for every entry.
 */
function hueFromSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function MediaPlaceholder({
  seed,
  label,
  className,
}: {
  seed: string;
  label?: string;
  className?: string;
}) {
  const hue = hueFromSeed(seed);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 20% 0%, oklch(0.32 0.09 ${hue}) 0%, oklch(0.14 0.02 ${hue}) 60%), radial-gradient(80% 80% at 100% 100%, oklch(0.28 0.08 ${(hue + 60) % 360}) 0%, transparent 60%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 14px)",
        }}
      />
      {label && (
        <span className="relative font-mono text-xs tracking-wide text-white/70 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
