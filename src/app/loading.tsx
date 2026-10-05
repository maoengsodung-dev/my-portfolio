export default function Loading() {
  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4">
      <span className="relative flex size-10">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
        <span className="relative inline-flex size-10 items-center justify-center rounded-full border border-primary/40">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
        </span>
      </span>
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Loading
      </p>
    </div>
  );
}
