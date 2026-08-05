import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function EditorialCta() {
  return (
    <section className="mt-16 rounded-[30px] border border-[#00B4D8]/20 bg-[#122238] p-7 sm:p-10">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
        Conversa técnica
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white">
        Existe um processo semelhante na sua operação?
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#B9C5CE]">
        O ponto de partida é entender sistemas, fronteiras e riscos antes de
        escolher a implementação.
      </p>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        data-analytics-event="contact_click"
        data-analytics-category="editorial"
        data-analytics-label="whatsapp_editorial"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#00B4D8] px-5 py-3.5 font-black text-[#020D1F] transition hover:bg-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <MessageCircle aria-hidden="true" size={18} />
        Conversar sobre o contexto
        <ArrowRight aria-hidden="true" size={17} />
      </a>
    </section>
  );
}
