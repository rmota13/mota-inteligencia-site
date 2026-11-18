import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { ArchitectureMap } from "@/components/projects/architecture-map";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#071426]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(0,180,216,0.12),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(46,196,182,0.08),transparent_28%)]" />
      <Container className="relative grid min-h-[calc(100vh-var(--site-header-height))] items-center gap-10 px-4 py-10 sm:px-6 sm:py-12 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-8 xl:py-10 2xl:gap-12 2xl:py-12">
        <div className="relative z-10 min-w-0">
          <p className="inline-flex w-fit max-w-full whitespace-normal rounded-full border border-[#00B4D8]/30 bg-[#00B4D8]/8 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#72D7E9] sm:text-sm lg:max-w-max lg:whitespace-nowrap lg:px-3 lg:tracking-[0.1em]">
            Integrações · Automação · Dados & BI · IA
          </p>

          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,3.4vw,3.35rem)] font-black leading-[1.04] tracking-[-0.04em] text-white">
            Conectamos sistemas, automatizamos processos e transformamos dados em{" "}
            <span className="text-[#00B4D8]">decisões.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#C7D1D9] sm:text-lg xl:text-[1.15rem]">
            Soluções sob medida para empresas que precisam reduzir trabalho manual,
            integrar a operação, ganhar confiabilidade nos dados e aplicar IA com
            propósito de negócio.
          </p>

          <ul className="mt-6 grid gap-3 text-sm font-semibold text-[#E0E1DD] sm:grid-cols-2">
            {[
              "Integrações e automações sob medida",
              "BI, qualidade e confiabilidade de dados",
              "IA aplicada com contexto e governança",
              "Sustentação e evolução recorrente",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <CheckCircle2 aria-hidden="true" size={17} className="shrink-0 text-[#2EC4B6]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-start">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="contact_click"
              data-analytics-category="hero"
              data-analytics-label="solution_assessment"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#00B4D8] px-5 py-4 text-center font-black text-[#020D1F] transition hover:bg-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Quero avaliar uma solução
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <Link
              href="/projetos"
              className="inline-flex items-center justify-center rounded-xl border border-[#00B4D8]/35 px-5 py-4 text-center font-black text-[#E0E1DD] transition hover:border-[#00B4D8] hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
            >
              Ver projetos entregues
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full min-w-0 max-w-[44rem] justify-self-center">
          <ArchitectureMap />
        </div>
      </Container>
    </section>
  );
}
