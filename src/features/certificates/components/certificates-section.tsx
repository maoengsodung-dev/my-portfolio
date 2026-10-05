"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/common/section-heading";
import { certificates } from "@/data/certificates";
import { staggerContainer } from "@/lib/motion";
import { CertificateCard } from "@/features/certificates/components/certificate-card";
import { cn } from "@/lib/utils";

export function CertificatesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Track active card by proximity to left scroll boundary
    const cards = el.querySelectorAll<HTMLElement>("[data-certificate-card]");
    if (cards.length > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const diff = Math.abs(card.offsetLeft - el.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-certificate-card]");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    const nextIdx =
      direction === "left"
        ? Math.max(0, activeIndex - 1)
        : Math.min(certificates.length - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftPos.current = scrollContainerRef.current.scrollLeft;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    scrollContainerRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  return (
    <Section id="certificates">
      {/* Section Heading */}
      <SectionHeading
        eyebrow="Credentials & Honors"
        title="Certifications"
        description="Official certificates and professional accreditations earned in mobile app development, artificial intelligence, and technology challenges."
      />

      {/* Horizontal Carousel with Vertically Centered Left & Right Navigation Buttons */}
      <div className="relative group/carousel">
        {/* Left (Back) Button - Vertically Centered */}
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous certificate"
          className={cn(
            "absolute left-1 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30",
            "flex size-11 sm:size-12 items-center justify-center rounded-full",
            "border border-border/80 bg-background/95 text-foreground shadow-xl shadow-black/10 backdrop-blur-md dark:shadow-black/40",
            "transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground active:scale-95",
            "disabled:pointer-events-none disabled:opacity-0",
          )}
        >
          <ChevronLeft className="size-5 sm:size-6" aria-hidden="true" />
        </button>

        {/* Right (Next) Button - Vertically Centered */}
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next certificate"
          className={cn(
            "absolute right-1 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30",
            "flex size-11 sm:size-12 items-center justify-center rounded-full",
            "border border-border/80 bg-background/95 text-foreground shadow-xl shadow-black/10 backdrop-blur-md dark:shadow-black/40",
            "transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground active:scale-95",
            "disabled:pointer-events-none disabled:opacity-0",
          )}
        >
          <ChevronRight className="size-5 sm:size-6" aria-hidden="true" />
        </button>

        {/* Horizontal Scroll Track */}
        <div className="-mx-4 px-4 sm:-mx-6 sm:px-6">
          <motion.div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={checkScroll}
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className={cn(
              "flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              isDragging ? "cursor-grabbing select-none" : "cursor-grab",
            )}
          >
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                data-certificate-card
                className="w-[86vw] max-w-[350px] shrink-0 snap-start sm:w-[380px] lg:w-[410px]"
              >
                <CertificateCard certificate={certificate} className="h-full" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer Navigation Bar: Interactive Progress Indicators */}
      <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          {certificates.map((cert, index) => (
            <button
              key={cert.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Scroll to certificate ${index + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="hidden sm:inline-block text-muted-foreground/70">
            Drag or swipe horizontally
          </span>
          <span className="rounded-md bg-secondary/60 px-2 py-0.5 text-secondary-foreground">
            {activeIndex + 1} / {certificates.length}
          </span>
        </div>
      </div>
    </Section>
  );
}
