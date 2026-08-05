import type { Insight, InsightKind } from "@/types/insight";

export const editorialKindConfig: Record<
  InsightKind,
  {
    label: string;
    pluralLabel: string;
    path: "/artigos" | "/guias" | "/insights";
    description: string;
  }
> = {
  article: {
    label: "Artigo técnico",
    pluralLabel: "Artigos",
    path: "/artigos",
    description:
      "Análises aprofundadas sobre arquitetura, integração, automação e operação de sistemas empresariais.",
  },
  guide: {
    label: "Guia",
    pluralLabel: "Guias",
    path: "/guias",
    description:
      "Conteúdo evergreen para estruturar integrações e automações corporativas com responsabilidades claras.",
  },
  insight: {
    label: "Insight",
    pluralLabel: "Insights",
    path: "/insights",
    description:
      "Notas técnicas sobre aprendizados, decisões arquiteturais e problemas encontrados em projetos reais.",
  },
};

export function getEditorialPath(content: Pick<Insight, "kind" | "slug">) {
  return `${editorialKindConfig[content.kind].path}/${content.slug}`;
}

export function getReadingTimeMinutes(content: Insight) {
  const text = [
    content.title,
    content.description,
    ...content.executiveSummary,
    ...content.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.items ?? []),
    ]),
    ...(content.faq?.flatMap((item) => [item.question, item.answer]) ?? []),
  ].join(" ");
  const wordCount = text.trim().split(/\s+/u).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 200));
}

export function getReadingTimeLabel(content: Insight) {
  const minutes = getReadingTimeMinutes(content);
  return `${minutes} min de leitura`;
}

export function formatEditorialDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
