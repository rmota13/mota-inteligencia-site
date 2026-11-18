import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArchitectureMap } from "@/components/projects/architecture-map";
import { ContentIcon } from "@/components/ui/content-icon";
import { getProjectCategory } from "@/content/projects";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const preserveCoverIdentity = project.showCoverInHero;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#00B4D8]/15 bg-[#122238] transition duration-300 hover:-translate-y-1.5 hover:border-[#00B4D8]/55 hover:shadow-[0_24px_70px_rgba(0,180,216,0.10)] focus-within:border-[#00B4D8]">
      <div className="relative aspect-video overflow-hidden bg-[#071827]">
        {project.featured ? (
          <div className="absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 p-3 xl:h-[180%] xl:w-[180%] xl:scale-[0.555]">
            <ArchitectureMap compact />
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.gallery[0]?.alt ?? project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={`object-cover opacity-90 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none ${
              preserveCoverIdentity ? "origin-top object-top" : "object-center"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#122238] via-[#122238]/5 to-transparent" />
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-5 sm:p-6" : "p-6"}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00B4D8]/10 text-[#00B4D8]">
            <ContentIcon name={project.icon} size={22} />
          </div>
          <ArrowUpRight aria-hidden="true" className="text-[#00B4D8] transition group-hover:translate-x-1 group-hover:-translate-y-1" size={21} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-full border border-[#00B4D8]/20 bg-[#00B4D8]/7 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.13em] text-[#72D7E9]"
            >
              {getProjectCategory(category)?.label}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-xl font-black leading-tight text-white sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-[#C2CCD4]">
          {project.summary}
        </p>
        <p className="mt-5 text-xs font-bold leading-relaxed text-[#73E0D4]">
          {project.stackLabel}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white">
          Ver projeto <ArrowUpRight aria-hidden="true" size={16} />
        </span>
      </div>

      <Link
        href={`/projetos/${project.slug}`}
        data-analytics-event="projects_click"
        data-analytics-category="project_card"
        data-analytics-label={project.slug}
        className="absolute inset-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:ring-inset"
        aria-label={`Conhecer o projeto ${project.title}`}
      />
    </article>
  );
}
