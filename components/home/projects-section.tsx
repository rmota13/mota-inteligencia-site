import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";

export function ProjectsSection() {
  const selectedProjects = projects.filter((project) => !project.featured).slice(0, 4);

  return (
    <section id="projetos" className="bg-[#0A1628] px-6 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Projetos selecionados"
            title="Engenharia aplicada a problemas empresariais reais."
            className="max-w-3xl"
          />
          <Link
            href="/projetos"
            className="inline-flex w-fit items-center gap-2 font-black text-[#00B4D8] transition hover:text-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
          >
            Ver todos os projetos
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#B9C5CE] md:text-lg">
          Cada projeto parte de um contexto operacional, combina diferentes camadas
          de tecnologia e documenta o papel desempenhado, a solução e os resultados
          qualitativos observados.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {selectedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
