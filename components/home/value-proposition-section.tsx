import { Container } from "@/components/ui/container";
import { ContentIcon } from "@/components/ui/content-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { valuePillars } from "@/content/home";

export function ValuePropositionSection() {
  return (
    <section className="bg-[#0A1628] px-6 py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Capacidade de engenharia"
            title="Do processo fragmentado a uma plataforma que pode ser operada e evoluída."
          />
          <p className="max-w-2xl text-base leading-relaxed text-[#B9C5CE] lg:justify-self-end lg:text-lg">
            A tecnologia é consequência de uma arquitetura que conecta regras de
            negócio, sistemas e operação. O objetivo não é apenas colocar um fluxo no
            ar, mas criar uma base confiável para o próximo ciclo de crescimento.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {valuePillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-white/8 bg-[#122238] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00B4D8]/10 text-[#00B4D8]">
                <ContentIcon name={pillar.icon} size={24} />
              </div>
              <h3 className="mt-6 text-xl font-black text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B9C5CE]">{pillar.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
