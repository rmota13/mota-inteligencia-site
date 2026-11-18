import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContentIcon } from "@/components/ui/content-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutions } from "@/content/home";
import { siteConfig } from "@/config/site";

export function SolutionsSection() {
  return (
    <section id="solucoes" className="bg-[#122238] px-6 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Soluções"
          title="Tecnologia aplicada a problemas que custam tempo, controle e capacidade de crescer."
          className="max-w-4xl"
        />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#B9C5CE] md:text-lg">
          A contratação começa pelo problema. A tecnologia entra depois, combinando
          integração, automação, dados, BI e IA conforme a realidade da operação.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {solutions.map((item) => (
            <article key={item.title} className="group rounded-3xl border border-white/8 bg-[#0A1628] p-6 transition hover:border-[#00B4D8]/40">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00B4D8]/10 text-[#00B4D8]">
                  <ContentIcon name={item.icon} size={22} />
                </div>
                <ArrowUpRight aria-hidden="true" size={18} className="text-[#526777] transition group-hover:text-[#00B4D8]" />
              </div>
              <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B9C5CE]">{item.description}</p>
              <p className="mt-5 border-t border-white/8 pt-4 text-sm font-bold leading-relaxed text-[#73E0D4]">
                {item.outcome}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            data-analytics-event="contact_click"
            data-analytics-category="solutions"
            data-analytics-label="solution_assessment"
            className="inline-flex items-center gap-2 rounded-xl border border-[#00B4D8]/35 px-5 py-3.5 text-sm font-black text-[#E0E1DD] transition hover:border-[#00B4D8] hover:text-[#00B4D8]"
          >
            Conversar sobre um problema da sua operação
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
      </Container>
    </section>
  );
}
