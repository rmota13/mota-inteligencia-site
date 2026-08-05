import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects";

export function RelatedProjects({ slugs }: { slugs: string[] }) {
  const relatedProjects = slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  if (relatedProjects.length === 0) return null;

  return (
    <section aria-labelledby="related-projects-title" className="mt-16 border-t border-white/10 pt-12">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
        Aplicação prática
      </p>
      <h2 id="related-projects-title" className="mt-3 text-3xl font-black text-white">
        Projetos relacionados
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {relatedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} compact />
        ))}
      </div>
    </section>
  );
}
