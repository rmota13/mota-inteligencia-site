import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { workSteps } from "@/content/home";

export function WorkMethodSection() {
  return (
    <section id="metodo" className="bg-[#0A1628] px-6 py-20 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionHeading eyebrow="Como trabalho" title="Um fluxo contínuo, do diagnóstico à evolução." />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#B9C5CE]">
              Arquitetura e entrega avançam juntas. Cada etapa produz decisões e
              evidências que reduzem o risco da próxima.
            </p>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2">
            {workSteps.map((step, index) => (
              <li key={step.number} className={`relative rounded-2xl border border-white/8 bg-[#122238] p-5 ${index === workSteps.length - 1 ? "sm:col-span-2" : ""}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-black tracking-[0.18em] text-[#00B4D8]">{step.number}</span>
                  {index < workSteps.length - 1 && <ArrowRight aria-hidden="true" size={16} className="text-[#466173]" />}
                </div>
                <h3 className="mt-4 text-lg font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#B9C5CE]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
