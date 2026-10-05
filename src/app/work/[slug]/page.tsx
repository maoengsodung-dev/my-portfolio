import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { GithubIcon } from "@/components/common/social-icons";
import { ProjectGallery } from "@/features/projects/components/project-gallery";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/config/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const hasRealImage =
    Boolean(project.coverImage) && !project.coverImage.endsWith(".svg");

  const imageSrc = project.coverImage?.startsWith("/")
    ? project.coverImage
    : project.coverImage
      ? `/${project.coverImage.replace(/^src\//, "")}`
      : "";

  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to projects
        </Link>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{project.category}</Badge>
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
            {project.summary}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 border-y border-border/60 py-6 sm:grid-cols-4">
          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              Role
            </p>
            <p className="mt-1 text-sm">{project.role}</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              Year
            </p>
            <p className="mt-1 text-sm">{project.year}</p>
          </div>
          {project.client && (
            <div>
              <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                Client
              </p>
              <p className="mt-1 text-sm">{project.client}</p>
            </div>
          )}
          <div className="flex flex-wrap items-start gap-2">
            {project.liveUrl && (
              <Button
                render={
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
                size="sm"
                className="rounded-full"
              >
                Preview
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Button>
            )}
            {project.repoUrl && (
              <Button
                render={
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" />
                }
                nativeButton={false}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <GithubIcon className="size-3.5" aria-hidden="true" />
                Source
              </Button>
            )}
          </div>
        </div>

        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/60 bg-muted">
          {hasRealImage ? (
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-top"
            />
          ) : (
            <MediaPlaceholder seed={project.slug} label={project.title} />
          )}
        </div>

        <div className="mt-12 max-w-2xl space-y-5 text-muted-foreground text-pretty">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.gallery.length > 0 && (
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium tracking-tight">Gallery</h2>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <span>Preview in Figma</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
            <ProjectGallery
              slug={project.slug}
              title={project.title}
              images={project.gallery}
            />
          </div>
        )}

        <div className="mt-20 flex items-center justify-between border-t border-border/60 pt-8">
          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              Next project
            </p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group mt-1 inline-flex items-center gap-2 text-lg font-medium tracking-tight"
            >
              {nextProject.title}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
