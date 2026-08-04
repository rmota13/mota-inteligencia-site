import { Container } from "@/components/ui/container";
import { ContentIcon } from "@/components/ui/content-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { technologyGroups } from "@/content/home";

export function TechnologiesSection() {
  return (
    <section id="tecnologias" className="bg-[#071426] px-6 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Stack contextualizada"
          title="Tecnologias escolhidas pelo papel que cumprem na arquitetura."
          className="max-w-4xl"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {technologyGroups.map((group) => (
            <article key={group.title} className="rounded-3xl border border-[#00B4D8]/12 bg-[#101F34] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00B4D8]/10 text-[#00B4D8]">
                <ContentIcon name={group.icon} size={24} />
              </div>
              <h3 className="mt-6 text-2xl font-black text-white">{group.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-relaxed text-[#B9C5CE]">{group.description}</p>
              <dl className="mt-6 space-y-4 border-t border-white/8 pt-6">
                {group.items.map((technology) => (
                  <div key={technology.name} className="grid gap-1 sm:grid-cols-[0.8fr_1.2fr] sm:gap-4">
                    <dt className="text-sm font-black text-[#E8EDF1]">{technology.name}</dt>
                    <dd className="text-sm leading-relaxed text-[#91A1AE]">{technology.role}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
