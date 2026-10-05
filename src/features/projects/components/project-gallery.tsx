"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MediaPlaceholder } from "@/components/common/media-placeholder";

/**
 * A simple thumbnail grid that opens a controlled, keyboard-navigable
 * lightbox (Dialog) with prev/next controls. Uses `MediaPlaceholder`
 * instead of real images until project screenshots are supplied —
 * swap the `MediaPlaceholder` calls for `next/image` once assets land
 * in `/public/projects`.
 */
export function ProjectGallery({
  slug,
  title,
  images,
}: {
  slug: string;
  title: string;
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const goTo = (delta: number) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + delta + images.length) % images.length;
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image + index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {image && !image.endsWith(".svg") ? (
              <Image
                src={
                  image.startsWith("/")
                    ? image
                    : `/${image.replace(/^src\//, "")}`
                }
                alt={`${title} gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <MediaPlaceholder seed={`${slug}-${index}`} />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-300 group-hover:bg-background/30 group-hover:opacity-100">
              <span className="flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur">
                <Expand className="size-4" aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => !open && setActiveIndex(null)}
      >
        <DialogContent className="w-[70vw] max-w-[70vw] sm:max-w-[70vw] border-none bg-transparent p-0 shadow-none ring-0">
          <DialogTitle className="sr-only">
            {title} gallery image {activeIndex !== null ? activeIndex + 1 : 1}
          </DialogTitle>
          {activeIndex !== null && (
            <div className="relative aspect-[16/10] max-h-[85vh] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted">
              {images[activeIndex] && !images[activeIndex].endsWith(".svg") ? (
                <Image
                  src={
                    images[activeIndex].startsWith("/")
                      ? images[activeIndex]
                      : `/${images[activeIndex].replace(/^src\//, "")}`
                  }
                  alt={`${title} gallery image ${activeIndex + 1}`}
                  fill
                  sizes="70vw"
                  className="object-contain"
                />
              ) : (
                <MediaPlaceholder seed={`${slug}-${activeIndex}`} />
              )}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label="Previous image"
                    className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Next image"
                    className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
                  >
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
