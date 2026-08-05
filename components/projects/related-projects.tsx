import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects";

export function ProjectRelatedProjects({ slugs }: { slugs: string[] }) {
  const relatedProjects = slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  if (relatedProjects.length === 0) return null;

  return (
    <section aria-labelledby="project-related-title" className="bg-[#0A1628] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
          Portfólio conectado
        </p>
        <h2 id="project-related-title" className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Projetos relacionados
        </h2>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {relatedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
