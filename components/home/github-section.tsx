import Link from "next/link";
import { ArrowUpRight, Code2, GitBranch } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function GithubSection() {
  return (
    <section id="github" className="bg-[#071426] px-6 py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#0D1B2A] p-7 sm:p-10 lg:p-12">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#00B4D8]/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#020D1F]">
                <GitHubIcon aria-hidden="true" size={29} className="shrink-0" />
              </div>
              <p className="mt-7 text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">
                Portfólio técnico público
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
                Engenharia que pode ser examinada.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#B9C5CE]">
                O GitHub reúne documentação sanitizada de projetos, decisões
                arquiteturais, fluxos e roadmaps. Nenhuma métrica é carregada por API
                nesta fase.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-[#071426] p-6 sm:col-span-2">
                <GitBranch aria-hidden="true" size={22} className="text-[#2EC4B6]" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#73E0D4]">Projeto principal</p>
                <h3 className="mt-2 text-xl font-black text-white">SAP Commerce Integration Platform</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#AEBBC5]">
                  Arquitetura, decisões, segurança, observabilidade e roadmap em uma
                  versão pública e sanitizada.
                </p>
                <Link
                  href="/projetos/sap-commerce-integration-platform"
                  data-analytics-event="projects_click"
                  data-analytics-category="home_github"
                  data-analytics-label="sap-commerce-integration-platform"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#00B4D8] hover:text-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
                >
                  Ler o case <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              </div>

              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-analytics-event="github_click"
                data-analytics-category="home"
                data-analytics-label="profile"
                className="group rounded-2xl border border-white/8 bg-[#071426] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[#00B4D8]/50 hover:bg-[#0A1B2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2A] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <GitHubIcon aria-hidden="true" size={22} className="shrink-0 text-[#00B4D8]" />
                <span className="mt-4 block font-black text-white">Perfil no GitHub</span>
                <span className="mt-2 block text-sm leading-relaxed text-[#AEBBC5]">Código e documentação pública de Rodrigo Mota.</span>
              </a>
              <Link
                href="/projetos"
                data-analytics-event="projects_click"
                data-analytics-category="home_github"
                data-analytics-label="all_projects"
                className="group rounded-2xl border border-white/8 bg-[#071426] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[#00B4D8]/50 hover:bg-[#0A1B2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B2A] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <Code2 aria-hidden="true" size={22} className="text-[#00B4D8]" />
                <span className="mt-4 block font-black text-white">Projetos públicos</span>
                <span className="mt-2 block text-sm leading-relaxed text-[#AEBBC5]">Contexto, arquitetura, papel e evolução das soluções.</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
