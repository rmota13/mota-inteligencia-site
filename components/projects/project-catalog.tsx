"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import type {
  Project,
  ProjectCategory,
  ProjectCategoryDefinition,
} from "@/types/project";

type ProjectCatalogProps = {
  projects: Project[];
  categories: ProjectCategoryDefinition[];
};

type ActiveCategory = ProjectCategory | "all";

export function ProjectCatalog({ projects, categories }: ProjectCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const selectedCategory = categories.find((category) => category.slug === activeCategory);
  const visibleProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(activeCategory));

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar projetos por categoria">
        <button
          type="button"
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className={`rounded-full border px-4 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] ${
            activeCategory === "all"
              ? "border-[#00B4D8] bg-[#00B4D8] text-[#020D1F]"
              : "border-white/12 bg-white/[0.035] text-[#D5DCE2] hover:border-[#00B4D8]/55 hover:text-white"
          }`}
        >
          Todos <span aria-hidden="true">({projects.length})</span>
        </button>

        {categories.map((category) => {
          const count = projects.filter((project) => project.categories.includes(category.slug)).length;
          const selected = activeCategory === category.slug;

          return (
            <button
              key={category.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveCategory(category.slug)}
              className={`rounded-full border px-4 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] ${
                selected
                  ? "border-[#00B4D8] bg-[#00B4D8] text-[#020D1F]"
                  : "border-white/12 bg-white/[0.035] text-[#D5DCE2] hover:border-[#00B4D8]/55 hover:text-white"
              }`}
            >
              {category.label} <span aria-hidden="true">({count})</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 min-h-6 text-sm leading-relaxed text-[#9DADB9]" aria-live="polite">
        {selectedCategory?.description ?? "Todos os projetos públicos e sanitizados do portfólio."}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} compact />
        ))}
      </div>
    </div>
  );
}
