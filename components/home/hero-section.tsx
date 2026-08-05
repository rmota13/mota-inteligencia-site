import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ArchitectureMap } from "@/components/projects/architecture-map";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#071426]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(0,180,216,0.12),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(46,196,182,0.08),transparent_28%)]" />
      <Container className="relative grid min-h-[calc(100vh-var(--site-header-height))] items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-8 lg:py-20 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-12">
        <div className="relative z-10 min-w-0">
          <p className="inline-flex w-fit max-w-full whitespace-normal rounded-full border border-[#00B4D8]/30 bg-[#00B4D8]/8 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#72D7E9] sm:text-sm lg:max-w-max lg:whitespace-nowrap lg:px-3 lg:tracking-[0.1em]">
            Arquitetura · Integrações · Automação · Dados
          </p>

          <h1 className="mt-7 max-w-3xl text-[clamp(2.25rem,4vw,3.65rem)] font-black leading-[1.04] tracking-[-0.04em] text-white">
            Arquitetura de Integrações, Automação e Dados para empresas que querem{" "}
            <span className="text-[#00B4D8]">escalar.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#C7D1D9] sm:text-lg lg:text-xl">
            Projetamos soluções que conectam ERP, APIs, Marketplaces, Microsoft 365,
            Dados e Inteligência Artificial para eliminar processos manuais, reduzir
            riscos e aumentar eficiência operacional.
          </p>

          <ul className="mt-8 grid gap-3 text-sm font-semibold text-[#E0E1DD] sm:grid-cols-2">
            {[
              "Diagnóstico até observabilidade",
              "SAP Business One como especialidade",
              "Engenharia própria e verificável",
              "Integrações preparadas para evoluir",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <CheckCircle2 aria-hidden="true" size={17} className="shrink-0 text-[#2EC4B6]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projetos/sap-commerce-integration-platform"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00B4D8] px-6 py-4 text-center font-black text-[#020D1F] transition hover:bg-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Conhecer a plataforma
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              href="/projetos"
              className="inline-flex items-center justify-center rounded-xl border border-[#00B4D8]/35 px-6 py-4 text-center font-black text-[#E0E1DD] transition hover:border-[#00B4D8] hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
            >
              Explorar projetos
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
