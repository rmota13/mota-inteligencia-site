import { Container } from "@/components/ui/container";
import { ContentIcon } from "@/components/ui/content-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { ecosystems } from "@/content/home";

export function EcosystemsSection() {
  return (
    <section className="bg-[#101F34] px-6 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Ecossistemas integráveis"
          title="Sistemas diferentes, uma operação conectada."
          className="max-w-3xl"
        />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#B9C5CE] md:text-lg">
          A plataforma certa reduz a distância entre o evento que acontece em um
          canal e a ação que precisa ocorrer no ERP, no financeiro ou na equipe.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 md:grid-cols-2 xl:grid-cols-4">
          {ecosystems.map((ecosystem) => (
            <article key={ecosystem.title} className="bg-[#0A1628] p-7">
              <ContentIcon name={ecosystem.icon} size={27} className="text-[#00B4D8]" />
              <h3 className="mt-5 text-xl font-black text-white">{ecosystem.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-relaxed text-[#B9C5CE]">
                {ecosystem.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-white/8 pt-5 text-sm font-semibold text-[#73E0D4]">
                {ecosystem.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
