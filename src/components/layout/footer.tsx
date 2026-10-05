import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/common/social-icons";
import { navItems, siteConfig } from "@/config/site";

const socialLinks = [
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "Twitter", href: siteConfig.social.twitter, icon: XIcon },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: InstagramIcon,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-mono text-lg font-medium tracking-tight text-foreground"
            >
              {siteConfig.name}
              <span className="text-primary">.</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground text-pretty">
              {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.email}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Navigate
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      scroll={false}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                More
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#projects"
                    scroll={false}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Case studies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Connect
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
