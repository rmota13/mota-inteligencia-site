import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function ContactSection() {
  return (
    <section id="contato" className="bg-[#0A1628] px-6 py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] border border-[#00B4D8]/25 bg-[#122238] px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#00B4D8]/12 blur-3xl" />
          <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">
                Próximo desafio
              </p>
              <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-white sm:text-5xl">
                Sua operação precisa conectar sistemas, reduzir etapas manuais ou ganhar rastreabilidade?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#B9C5CE] sm:text-lg">
                A conversa começa pelo processo e pelo contexto técnico. A partir daí,
                é possível avaliar arquitetura, riscos e um caminho de implementação.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                data-analytics-event="contact_click"
                data-analytics-category="home"
                data-analytics-label="whatsapp"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00B4D8] px-6 py-4 font-black text-[#020D1F] transition hover:bg-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircle aria-hidden="true" size={18} />
                Falar no WhatsApp
                <ArrowRight aria-hidden="true" size={17} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                data-analytics-event="contact_click"
                data-analytics-category="home"
                data-analytics-label="email"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00B4D8]/35 px-6 py-4 font-black text-[#E0E1DD] transition hover:border-[#00B4D8] hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
              >
                <Mail aria-hidden="true" size={18} />
                Enviar e-mail
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
