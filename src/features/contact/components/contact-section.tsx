"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/common/section-heading";
import {
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
  XIcon,
} from "@/components/common/social-icons";
import { siteConfig } from "@/config/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ContactForm } from "@/features/contact/components/contact-form";

const socialLinks = [
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "Telegram", href: siteConfig.social.telegram, icon: TelegramIcon },
  { label: "Twitter", href: siteConfig.social.twitter, icon: XIcon },
];

export function ContactSection() {
  return (
    <Section id="contact">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something worth using."
            description="Have a project in mind, or just want to talk shop? My inbox is always open."
            className="mb-10"
          />

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-3 text-foreground"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="size-4" aria-hidden="true" />
              </span>
              <span className="text-base underline-offset-4 group-hover:underline">
                {siteConfig.email}
              </span>
            </a>

            <div className="flex items-center gap-3 text-foreground">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              <span className="text-base">{siteConfig.location}</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  );
}
