import Image from "next/image";
import { ArrowUpRight, UserRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { professionalCapabilities } from "@/content/home";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  return (
    <section id="sobre" className="bg-[#101F34] px-6 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[32px] border border-[#00B4D8]/20 bg-[#071426] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-9">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#00B4D8]/10 blur-3xl" />
          <div className="relative flex items-center gap-5">
            <Image
              src="/linkedin-rodrigo.png"
              alt="Rodrigo Mota"
              width={112}
              height={112}
              sizes="112px"
              className="h-24 w-24 rounded-2xl border-2 border-[#00B4D8]/35 object-cover shadow-[0_0_30px_rgba(0,180,216,0.15)] sm:h-28 sm:w-28"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
                Perfil profissional
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">Rodrigo Mota</h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#B9C5CE]">
                Arquitetura · Integrações · Automação · Dados
              </p>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-2 gap-3">
            {["Projetos técnicos", "Arquitetura", "Integrações", "Engenharia aplicada"].map((item) => (
              <span key={item} className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-3 text-xs font-bold text-[#D5DCE2]">
                {item}
              </span>
            ))}
          </div>

          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#0B72D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <UserRound aria-hidden="true" size={18} />
            Ver perfil no LinkedIn
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">
            Engenharia orientada ao negócio
          </p>
          <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
            Traduzir processos complexos em sistemas que as empresas conseguem operar.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-[#C2CCD4] sm:text-lg">
            <p>
              A Mota Inteligência de Negócio reúne experiência técnica e entendimento
              operacional para projetar plataformas empresariais, integrações e
              automações que atravessam diferentes áreas e sistemas.
            </p>
            <p>
              BI faz parte dessa competência, mas não a limita. O trabalho conecta
              arquitetura, APIs, ERP, dados, infraestrutura e observabilidade para
              acompanhar a solução durante todo o ciclo de vida.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {professionalCapabilities.map((capability) => (
              <li key={capability} className="rounded-xl border border-[#00B4D8]/10 bg-[#0A1628] px-4 py-3 text-sm font-bold text-[#D5DCE2]">
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
