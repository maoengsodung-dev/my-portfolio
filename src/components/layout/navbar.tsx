"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { navItems, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.href.split("#")[1]);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500",
        isScrolled ? "pt-3" : "pt-0",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-500 sm:px-6",
          isScrolled
            ? "rounded-full border border-border/60 bg-background/70 py-2.5 pl-5 pr-2.5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
            : "border border-transparent bg-transparent py-5",
        )}
      >
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm"
        >
          {siteConfig.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
          <span className="text-muted-foreground">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = activeId === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                scroll={false}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-muted"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            render={<Link href="/#contact" scroll={false} />}
            nativeButton={false}
            size="sm"
            className="hidden rounded-full md:inline-flex"
          >
            Let&apos;s talk
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-4 mt-2 flex flex-col gap-1 rounded-3xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll={false}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-base text-foreground/90 transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Button
              render={
                <Link
                  href="/#contact"
                  scroll={false}
                  onClick={() => setIsMenuOpen(false)}
                />
              }
              nativeButton={false}
              className="mt-1 rounded-2xl"
            >
              Let&apos;s talk
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
