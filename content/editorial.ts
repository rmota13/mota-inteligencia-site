import { articles } from "@/content/articles";
import { guides } from "@/content/guides";
import { insights } from "@/content/insights";
import { getEditorialPath } from "@/lib/editorial";
import type { Insight, InsightKind } from "@/types/insight";

export const editorialContent: Insight[] = [
  ...guides,
  ...articles,
  ...insights,
];

export const publishedEditorialContent = editorialContent
  .filter((content) => content.status === "published")
  .sort((a, b) => {
    const dateOrder = b.publishedAt.localeCompare(a.publishedAt);
    return dateOrder || a.title.localeCompare(b.title, "pt-BR");
  });

export function getEditorialByKind(kind: InsightKind) {
  return publishedEditorialContent.filter((content) => content.kind === kind);
}

export function getEditorialContent(kind: InsightKind, slug: string) {
  return publishedEditorialContent.find(
    (content) => content.kind === kind && content.slug === slug,
  );
}

export function getEditorialContentBySlug(slug: string) {
  return publishedEditorialContent.find((content) => content.slug === slug);
}

export function getRelatedEditorialContent(content: Insight) {
  return (content.relatedContentSlugs ?? [])
    .map(getEditorialContentBySlug)
    .filter((item): item is Insight => Boolean(item));
}

// Estrutura estática preparada para uma futura busca local. Nenhuma engine de
// busca ou dependência de indexação é adicionada nesta fase.
export const editorialSearchDocuments = publishedEditorialContent.map(
  (content) => ({
    id: `${content.kind}:${content.slug}`,
    title: content.title,
    description: content.description,
    topics: content.topics,
    path: getEditorialPath(content),
    text: [
      ...content.executiveSummary,
      ...content.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
        ...(section.items ?? []),
      ]),
    ].join(" "),
  }),
);
