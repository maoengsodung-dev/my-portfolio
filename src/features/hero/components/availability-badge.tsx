"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: siteConfig.timeZone,
});

/**
 * Small authenticity signal: a live local time ticking every minute plus
 * an availability dot. Cheap to compute, but it quietly communicates
 * "there's a real person behind this" better than static copy does.
 */
export function AvailabilityBadge() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(timeFormatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 py-1 pr-4 pl-1.5 font-mono text-xs text-muted-foreground">
      <span className="relative flex size-2">
        {siteConfig.availableForWork && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
        )}
        <span
          className={
            siteConfig.availableForWork
              ? "relative inline-flex size-2 rounded-full bg-emerald-400"
              : "relative inline-flex size-2 rounded-full bg-muted-foreground"
          }
        />
      </span>
      <span>
        {siteConfig.availableForWork ? "Open to new work" : "Currently booked"}
      </span>
      <span aria-hidden="true" className="text-border">
        /
      </span>
      <span suppressHydrationWarning>
        {siteConfig.location} · {time ?? "--:--"}
      </span>
    </div>
  );
}
