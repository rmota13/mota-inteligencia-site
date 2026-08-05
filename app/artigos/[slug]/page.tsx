import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialPage } from "@/components/insights/editorial-page";
import { getEditorialByKind, getEditorialContent } from "@/content/editorial";
import { createEditorialMetadata } from "@/lib/editorial-metadata";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEditorialByKind("article").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getEditorialContent("article", slug);
  return content ? createEditorialMetadata(content) : {};
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const content = getEditorialContent("article", slug);
  if (!content) notFound();

  return <EditorialPage content={content} />;
}
