"use client";

import Image from "next/image";
import {
  Award,
  BadgeCheck,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

import type { Certificate } from "@/types";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CertificateCardProps = {
  certificate: Certificate;
  className?: string;
};

export function CertificateCard({ certificate, className }: CertificateCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card text-card-foreground transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
        className
      )}
    >
      <div>
        {/* Certificate PDF Thumbnail Preview */}
        {certificate.previewImage && (
          <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-border/40 bg-muted/30">
            <Image
              src={certificate.previewImage}
              alt={certificate.title}
              fill
              className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Hover overlay with Quick Action buttons */}
            {certificate.pdfUrl && (
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <a
                  href={certificate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
                >
                  <FileText className="size-3.5" aria-hidden="true" />
                  <span>Open PDF</span>
                </a>
                {/* <a
                  href={certificate.pdfUrl}
                  download
                  className="inline-flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
                  title="Download Certificate PDF"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">Download PDF</span>
                </a> */}
              </div>
            )}
          </div>
        )}

        <div className="p-6 sm:p-7">
          {/* Top metadata bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <Award className="size-5" aria-hidden="true" />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              <span>Verified</span>
            </div>
          </div>

          {/* Title & Issuer */}
          <h3 className="mt-5 text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
            {certificate.title}
          </h3>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-medium text-primary/90">
              {certificate.issuer}
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3" aria-hidden="true" />
              {certificate.issueDate}
            </span>
            {certificate.hours && (
              <>
                <span className="text-muted-foreground/50">•</span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" aria-hidden="true" />
                  {certificate.hours}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground text-pretty">
            {certificate.description}
          </p>

          {/* Skill Pills */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {certificate.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-border/50 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Credential ID, Verification & PDF link */}
      <div className="flex items-center justify-between border-t border-border/40 px-6 py-4 text-xs sm:px-7">
        {certificate.credentialId ? (
          <span className="font-mono text-muted-foreground">
            {certificate.credentialId}
          </span>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3">
          {certificate.pdfUrl && (
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText className="size-3.5" aria-hidden="true" />
              <span>PDF</span>
            </a>
          )}

          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:underline"
            >
              <span>Verify</span>
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
