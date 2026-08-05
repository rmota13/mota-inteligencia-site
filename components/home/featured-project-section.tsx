import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { IntegrationFlowAnimation } from "@/components/projects/integration-flow-animation";
import { ProjectStatus } from "@/components/projects/project-status";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { getFeaturedProject } from "@/content/projects";

export function FeaturedProjectSection() {
  const project = getFeaturedProject();
  if (!project) return null;

  return (
    <section id="projeto-principal" className="bg-[#020D1F] px-6 py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">
              Projeto principal
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl">
              {project.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#C7D1D9]">{project.summary}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.phases?.map((phase) => (
                <div key={phase.title} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] pr-3">
                  <ProjectStatus status={phase.status} />
                  <span className="text-xs font-bold text-[#D5DCE2]">{phase.title}</span>
                </div>
              ))}
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {project.engineeringDecisions?.slice(0, 4).map((decision) => (
                <li key={decision} className="flex gap-2.5 text-sm leading-relaxed text-[#B9C5CE]">
                  <Check aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-[#2EC4B6]" />
                  {decision}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/projetos/${project.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00B4D8] px-6 py-4 font-black text-[#020D1F] transition duration-200 hover:-translate-y-0.5 hover:bg-[#2EC4B6] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#020D1F] motion-reduce:transform-none motion-reduce:transition-none"
              >
                Explorar o case completo
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00B4D8]/35 px-6 py-4 font-black text-[#E0E1DD] transition duration-200 hover:-translate-y-0.5 hover:border-[#00B4D8] hover:text-[#00B4D8] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020D1F] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <GitHubIcon aria-hidden="true" size={18} className="shrink-0" />
                  Ver repositório
                </a>
              )}
            </div>
          </div>

          <div>
            <IntegrationFlowAnimation />
            <p className="mt-4 text-center text-xs leading-relaxed text-[#8293A1]">
              Visão institucional simplificada. A documentação pública não expõe
              credenciais, endpoints, dados corporativos ou regras proprietárias.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
