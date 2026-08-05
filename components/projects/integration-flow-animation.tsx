"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  CircleCheck,
  Database,
  Layers3,
  Network,
  Radio,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./integration-flow-animation.module.css";

type IntegrationFlowAnimationProps = {
  variant?: "compact" | "detailed";
};

type StageItem = {
  label: string;
  planned?: boolean;
};

type FlowStage = {
  title: string;
  icon: LucideIcon;
  items: StageItem[];
};

type Passage = "success" | "quarantine";

type AnimationFrame =
  | { kind: "stage"; index: number; passage: Passage }
  | { kind: "connector"; index: number; passage: Passage }
  | { kind: "success"; index: number; passage: "success" }
  | { kind: "branch"; index: number; passage: "quarantine" }
  | { kind: "quarantine"; index: number; passage: "quarantine" };

const frameDuration = 1200;

const compactStages: FlowStage[] = [
  {
    title: "Marketplaces",
    icon: Network,
    items: [{ label: "Canais integráveis" }],
  },
  {
    title: "Recebimento",
    icon: Radio,
    items: [{ label: "Webhook e polling" }],
  },
  {
    title: "Orquestração",
    icon: Workflow,
    items: [{ label: "Normaliza e valida" }],
  },
  {
    title: "SAP Business One",
    icon: Database,
    items: [{ label: "Pedido de Venda" }],
  },
  {
    title: "Financeiro e monitoramento",
    icon: Activity,
    items: [{ label: "Ciclo rastreável" }],
  },
];

const detailedStages: FlowStage[] = [
  {
    title: "Canais",
    icon: Network,
    items: [
      { label: "Mercado Livre" },
      { label: "Nuvemshop" },
      { label: "Shopee" },
    ],
  },
  {
    title: "Captura",
    icon: Radio,
    items: [{ label: "Webhook" }, { label: "Polling" }],
  },
  {
    title: "Preparação",
    icon: Layers3,
    items: [{ label: "Normalização" }, { label: "Validação" }],
  },
  {
    title: "Controle",
    icon: Workflow,
    items: [
      { label: "Fila" },
      { label: "Idempotência" },
      { label: "Processamento" },
    ],
  },
  {
    title: "ERP",
    icon: Database,
    items: [{ label: "SAP Business One" }, { label: "Pedido de Venda" }],
  },
  {
    title: "Operação",
    icon: Activity,
    items: [
      { label: "Módulo financeiro" },
      { label: "Observabilidade" },
      { label: "Conciliação · em desenvolvimento", planned: true },
    ],
  },
];

function createTimeline(stageCount: number, quarantineAfter: number) {
  const frames: AnimationFrame[] = [];

  for (let index = 0; index < stageCount; index += 1) {
    frames.push({ kind: "stage", index, passage: "success" });
    if (index < stageCount - 1) {
      frames.push({ kind: "connector", index, passage: "success" });
    }
  }
  frames.push({ kind: "success", index: stageCount - 1, passage: "success" });
  frames.push({ kind: "success", index: stageCount - 1, passage: "success" });

  for (let index = 0; index <= quarantineAfter; index += 1) {
    frames.push({ kind: "stage", index, passage: "quarantine" });
    if (index < quarantineAfter) {
      frames.push({ kind: "connector", index, passage: "quarantine" });
    }
  }
  frames.push({ kind: "branch", index: quarantineAfter, passage: "quarantine" });
  frames.push({ kind: "quarantine", index: quarantineAfter, passage: "quarantine" });
  frames.push({ kind: "quarantine", index: quarantineAfter, passage: "quarantine" });

  return frames;
}

function getStatus(frame: AnimationFrame, reducedMotion: boolean) {
  if (reducedMotion) return "Fluxo completo — animação reduzida";
  if (frame.kind === "success") return "Pedido integrado com sucesso";
  if (frame.kind === "branch") return "Inconsistência identificada — desvio controlado";
  if (frame.kind === "quarantine") return "Pedido preservado para análise e reprocessamento";
  if (frame.passage === "quarantine") return "Segunda passagem — validação de exceção";
  return "Pedido em trânsito entre as camadas";
}

export function IntegrationFlowAnimation({
  variant = "compact",
}: IntegrationFlowAnimationProps) {
  const shellRef = useRef<HTMLElement>(null);
  const descriptionId = useId();
  const stages = variant === "detailed" ? detailedStages : compactStages;
  const quarantineAfter = 2;
  const timeline = createTimeline(stages.length, quarantineAfter);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const element = shellRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || reducedMotion) return;

    const interval = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % timeline.length);
    }, frameDuration);

    return () => window.clearInterval(interval);
  }, [isVisible, reducedMotion, timeline.length]);

  const animatedFrame = timeline[frameIndex] ?? timeline[0];
  const frame: AnimationFrame = reducedMotion
    ? { kind: "success", index: stages.length - 1, passage: "success" }
    : animatedFrame;
  const status = getStatus(frame, reducedMotion);
  const isSuccess = frame.kind === "success";
  const isException = frame.passage === "quarantine";
  const title =
    variant === "detailed"
      ? "A jornada de um pedido pela plataforma"
      : "Da venda digital à operação financeira";
  const description =
    variant === "detailed"
      ? "O pedido chega por webhook ou polling a partir de Mercado Livre, Nuvemshop ou Shopee. A plataforma normaliza e valida os dados, controla fila e idempotência, processa o Pedido de Venda no SAP Business One e acompanha o módulo financeiro com observabilidade. Inconsistências seguem para quarentena; a conciliação está em desenvolvimento."
      : "O pedido parte dos marketplaces, é recebido e orquestrado, chega ao SAP Business One e segue para o ciclo financeiro e o monitoramento. Se houver inconsistência na validação, o fluxo desvia o pedido para quarentena sem perder a rastreabilidade.";

  return (
    <section
      ref={shellRef}
      id={variant === "detailed" ? "fluxo-integracao" : undefined}
      data-variant={variant}
      className={`${styles.shell} ${!isVisible ? styles.paused : ""}`}
      aria-describedby={descriptionId}
    >
      <p id={descriptionId} className="sr-only">
        {description}
      </p>

      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            {variant === "detailed" ? "Arquitetura de integração" : "Fluxo animado"}
          </p>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div
          aria-hidden="true"
          className={`${styles.status} ${isSuccess ? styles.statusSuccess : ""} ${
            isException ? styles.statusException : ""
          }`}
        >
          <span className={styles.statusDot} />
          <span>{status}</span>
        </div>
      </div>

      <div aria-hidden="true">
        <div
          className={`${styles.sequence} ${
            variant === "detailed" ? styles.sequenceDetailed : styles.sequenceCompact
          }`}
        >
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = frame.kind === "stage" && frame.index === index;

            return (
              <div key={stage.title} className="contents">
                <article
                  className={`${styles.stage} ${isActive ? styles.stageActive : ""} ${
                    isSuccess ? styles.stageComplete : ""
                  }`}
                >
                  <span className={styles.stageNumber}>Etapa {index + 1}</span>
                  <span className={styles.stageIcon}>
                    {isSuccess ? (
                      <CircleCheck aria-hidden="true" size={17} />
                    ) : (
                      <Icon aria-hidden="true" size={17} />
                    )}
                  </span>
                  <h4 className={styles.stageTitle}>{stage.title}</h4>
                  <ul className={styles.stageItems}>
                    {stage.items.map((item) => (
                      <li
                        key={item.label}
                        className={`${styles.stageItem} ${
                          item.planned ? styles.stageItemPlanned : ""
                        }`}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </article>

                {index < stages.length - 1 && (
                  <div
                    className={`${styles.connector} ${
                      frame.kind === "connector" && frame.index === index
                        ? styles.connectorActive
                        : ""
                    }`}
                  >
                    <span className={styles.orderToken} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.exceptionLane}>
          <span className={styles.branchLabel}>Desvio de validação</span>
          <span
            className={`${styles.branchTrack} ${
              frame.kind === "branch" ? styles.branchActive : ""
            }`}
          >
            <span className={styles.orderToken} />
          </span>
          <div
            className={`${styles.exceptionCard} ${
              frame.kind === "quarantine" ? styles.exceptionActive : ""
            }`}
          >
            <span className={styles.exceptionIcon}>
              <ShieldCheck aria-hidden="true" size={17} />
            </span>
            <span>
              <span className={styles.exceptionTitle}>Quarentena</span>
              <span className={styles.exceptionText}>
                Exceção isolada para análise e reprocessamento seguro.
              </span>
            </span>
          </div>
        </div>
      </div>

      <p className={styles.caption}>
        Fluxo institucional simplificado, sem dados internos. O percurso alterna uma
        conclusão bem-sucedida e um desvio controlado para quarentena.
      </p>

      {variant === "compact" && (
        <Link
          href="/projetos/sap-commerce-integration-platform"
          className={styles.cta}
        >
          Entender a arquitetura completa
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      )}
    </section>
  );
}
