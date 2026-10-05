import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm tracking-[0.2em] text-primary uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
        This page wandered off.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground text-pretty">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back on track.
      </p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        className="mt-8 rounded-full"
        size="lg"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Button>
    </div>
  );
}
