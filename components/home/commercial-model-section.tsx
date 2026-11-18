import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

const engagementModels = [
  {
    title: "Diagnóstico & Projeto",
    description:
      "Para problemas com escopo definido: entender o processo, desenhar a solução e estabelecer um plano de implementação.",
    items: ["Levantamento do processo", "Arquitetura e escopo", "Projeto com entregáveis claros"],
  },
  {
    title: "Implantação & Evolução",
    description:
      "Para construir ou modernizar integrações, automações, produtos de dados e aplicações que precisam entrar em operação.",
    items: ["Implementação incremental", "Testes e ativação controlada", "Documentação e transferência de conhecimento"],
  },
  {
    title: "Sustentação recorrente",
    description:
      "Para empresas que precisam manter soluções críticas acompanhadas e evoluindo depois do go-live.",
    items: ["Monitoramento e diagnóstico", "Correções e melhorias contínuas", "Capacidade recorrente e prioridades acordadas"],
  },
];

export function CommercialModelSection() {
  return (
    <section id="contratacao" className="bg-[#0A1628] px-6 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Como contratar"
          title="Do projeto pontual à sustentação recorrente."
          className="max-w-4xl"
        />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#B9C5CE] md:text-lg">
          O modelo de trabalho acompanha a maturidade da necessidade. É possível começar
          por um diagnóstico, avançar para a implementação e manter uma rotina de
          sustentação e evolução quando a operação exigir continuidade.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {engagementModels.map((model) => (
            <article key={model.title} className="rounded-3xl border border-white/8 bg-[#101F34] p-6">
              <h3 className="text-xl font-black text-white">{model.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B9C5CE]">{model.description}</p>
              <ul className="mt-6 space-y-3">
                {model.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm font-semibold text-[#D5DCE2]">
                    <CheckCircle2 aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-[#2EC4B6]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-[#00B4D8]/20 bg-[#122238] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <p className="font-black text-white">Não sabe ainda qual modelo faz sentido?</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B9C5CE]">
              Começamos pelo contexto do problema e pela criticidade da operação. A proposta
              comercial vem depois do diagnóstico inicial.
            </p>
          </div>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            data-analytics-event="contact_click"
            data-analytics-category="commercial_model"
            data-analytics-label="whatsapp"
            className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#00B4D8] px-5 py-3.5 text-sm font-black text-[#020D1F] transition hover:bg-[#2EC4B6] sm:mt-0"
          >
            Falar sobre minha necessidade
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
      </Container>
    </section>
  );
}
