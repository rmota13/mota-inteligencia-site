import { ArrowDown, ArrowRight, CircleCheck, Database, Radio } from "lucide-react";

type ArchitectureMapProps = {
  compact?: boolean;
};

const institutionalFlow = {
  sources: ["ERP", "CRM", "E-commerce", "Planilhas / APIs"],
  platform: ["Integração", "Automação", "Dados", "IA"],
  destinations: ["Operação", "BI", "Alertas", "Sistemas"],
};

const commerceFlow = {
  sources: ["Mercado Livre", "Nuvemshop", "Shopee"],
  platform: ["Orquestração", "Serviços de domínio", "Fila e persistência"],
  destinations: ["SAP Business One", "Ciclo financeiro", "Observabilidade"],
};

function FlowColumn({
  eyebrow,
  items,
  compact = false,
  emphasized = false,
}: {
  eyebrow: string;
  items: string[];
  compact?: boolean;
  emphasized?: boolean;
}) {
  return (
    <div
      data-architecture-column={eyebrow}
      className={`flex h-full min-w-0 flex-col rounded-2xl border ${
        emphasized
          ? "border-[#2EC4B6]/30 bg-[#0B2634] shadow-[0_0_35px_rgba(46,196,182,0.08)]"
          : "border-white/10 bg-[#071827]/80"
      } ${compact ? "p-2" : "p-4"}`}
    >
      <p className="mb-3 shrink-0 text-[10px] font-black uppercase tracking-[0.2em] text-[#72D7E9]">
        {eyebrow}
      </p>
      <div className={`grid flex-1 auto-rows-fr ${compact ? "gap-2" : "gap-3"}`}>
        {items.map((item, index) => (
          <div key={item} className="relative flex min-h-0">
            <div
              data-architecture-card={item}
              className={`grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center rounded-xl border border-white/8 bg-[#10283B] font-bold leading-snug text-white ${
                compact
                  ? "min-h-11 gap-1.5 px-2 py-2 text-xs"
                  : "min-h-14 gap-2.5 px-3 py-2 text-xs sm:text-sm"
              }`}
            >
              {eyebrow === "Entradas" && <Radio aria-hidden="true" size={14} className="shrink-0 text-[#00B4D8]" />}
              {eyebrow === "Plataforma" && <Database aria-hidden="true" size={14} className="shrink-0 text-[#2EC4B6]" />}
              {eyebrow === "Saídas" && <CircleCheck aria-hidden="true" size={14} className="shrink-0 text-[#2EC4B6]" />}
              <span
                data-architecture-item={item}
                className="min-w-0 max-w-full whitespace-normal break-normal text-left hyphens-none [overflow-wrap:normal]"
              >
                {item}
              </span>
            </div>
            {index < items.length - 1 && eyebrow === "Plataforma" && (
              <ArrowDown
                aria-hidden="true"
                size={compact ? 12 : 14}
                className="pointer-events-none absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#0B2634] text-[#00B4D8]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureMap({ compact = false }: ArchitectureMapProps) {
  const flow = compact ? commerceFlow : institutionalFlow;

  return (
    <div
      className={`@container relative overflow-hidden rounded-[28px] border border-[#00B4D8]/25 bg-[#0D1B2A]/95 shadow-[0_30px_90px_rgba(0,0,0,0.35)] ${
        compact ? "p-3" : "w-full min-w-0 p-5 sm:p-6 lg:p-4 xl:p-6"
      }`}
      data-architecture-map={compact ? "commerce" : "institutional"}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#00B4D8]/15 blur-3xl" />
      <div className="relative mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 @min-[28rem]:flex-row @min-[28rem]:items-center @min-[28rem]:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00B4D8]">
            Integration control plane
          </p>
          <p className="mt-1 text-sm font-bold text-white">Fluxo empresarial rastreável</p>
        </div>
        <span className="inline-flex shrink-0 self-start items-center gap-2 rounded-full border border-[#2EC4B6]/25 bg-[#2EC4B6]/10 px-3 py-1.5 text-[11px] font-bold text-[#73E0D4] @min-[28rem]:self-auto">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#2EC4B6]" />
          Arquitetura ativa
        </span>
      </div>

      <div
        className={`relative grid gap-3 ${
          compact
            ? "grid-cols-[minmax(0,1fr)_auto_minmax(0,1.08fr)_auto_minmax(0,1fr)] items-center gap-2"
            : "@min-[36rem]:grid-cols-[minmax(0,1fr)_1rem_minmax(0,1fr)_1rem_minmax(0,1fr)] @min-[36rem]:items-stretch @min-[36rem]:gap-2"
        }`}
      >
        <FlowColumn eyebrow="Entradas" items={flow.sources} compact={compact} />
        <ArrowRight
          aria-hidden="true"
          className={`mx-auto shrink-0 text-[#00B4D8] ${compact ? "block" : "hidden @min-[36rem]:block"}`}
          size={compact ? 18 : 16}
        />
        <FlowColumn eyebrow="Plataforma" items={flow.platform} compact={compact} emphasized />
        <ArrowRight
          aria-hidden="true"
          className={`mx-auto shrink-0 text-[#00B4D8] ${compact ? "block" : "hidden @min-[36rem]:block"}`}
          size={compact ? 18 : 16}
        />
        <FlowColumn eyebrow="Saídas" items={flow.destinations} compact={compact} />
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
