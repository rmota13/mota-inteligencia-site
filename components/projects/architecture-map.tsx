import { ArrowDown, ArrowRight, CircleCheck, Database, Radio } from "lucide-react";

type ArchitectureMapProps = {
  compact?: boolean;
};

const sources = ["Mercado Livre", "Nuvemshop", "Shopee"];
const platform = ["Orquestração", "Serviços de domínio", "Fila e persistência"];
const destinations = ["SAP Business One", "Ciclo financeiro", "Observabilidade"];

function FlowColumn({
  eyebrow,
  items,
}: {
  eyebrow: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071827]/80 p-4">
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#72D7E9]">
        {eyebrow}
      </p>
      <div className="space-y-2.5">
        {items.map((item, index) => (
          <div key={item}>
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-[#10283B] px-3 py-2.5 text-xs font-bold text-white sm:text-sm">
              {eyebrow === "Entrada" && <Radio aria-hidden="true" size={14} className="text-[#00B4D8]" />}
              {eyebrow === "Plataforma" && <Database aria-hidden="true" size={14} className="text-[#2EC4B6]" />}
              {eyebrow === "Operação" && <CircleCheck aria-hidden="true" size={14} className="text-[#2EC4B6]" />}
              <span>{item}</span>
            </div>
            {index < items.length - 1 && eyebrow === "Plataforma" && (
              <ArrowDown aria-hidden="true" size={14} className="mx-auto my-1 text-[#00B4D8]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureMap({ compact = false }: ArchitectureMapProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[#00B4D8]/25 bg-[#0D1B2A]/95 shadow-[0_30px_90px_rgba(0,0,0,0.35)] ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#00B4D8]/15 blur-3xl" />
      <div className="relative mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00B4D8]">
            Integration control plane
          </p>
          <p className="mt-1 text-sm font-bold text-white">Fluxo empresarial rastreável</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4B6]/25 bg-[#2EC4B6]/10 px-3 py-1.5 text-[11px] font-bold text-[#73E0D4]">
          <span className="h-2 w-2 rounded-full bg-[#2EC4B6]" />
          Arquitetura ativa
        </span>
      </div>

      <div className="relative grid gap-3 lg:grid-cols-[1fr_auto_1.08fr_auto_1fr] lg:items-center">
        <FlowColumn eyebrow="Entrada" items={sources} />
        <ArrowRight aria-hidden="true" className="mx-auto hidden text-[#00B4D8] lg:block" size={22} />
        <div className="rounded-2xl border border-[#2EC4B6]/30 bg-[#0B2634] p-1 shadow-[0_0_35px_rgba(46,196,182,0.08)]">
          <FlowColumn eyebrow="Plataforma" items={platform} />
        </div>
        <ArrowRight aria-hidden="true" className="mx-auto hidden text-[#00B4D8] lg:block" size={22} />
        <FlowColumn eyebrow="Operação" items={destinations} />
      </div>

      {!compact && (
        <div className="relative mt-4 grid gap-2 text-center text-[11px] font-semibold text-[#A9CFD7] sm:grid-cols-3">
          <span className="rounded-lg bg-white/[0.04] px-3 py-2">Idempotência</span>
          <span className="rounded-lg bg-white/[0.04] px-3 py-2">Retry e quarentena</span>
          <span className="rounded-lg bg-white/[0.04] px-3 py-2">Correlation ID</span>
        </div>
      )}
    </div>
  );
}
