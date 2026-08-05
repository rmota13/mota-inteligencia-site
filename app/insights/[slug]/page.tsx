import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialPage } from "@/components/insights/editorial-page";
import { getEditorialByKind, getEditorialContent } from "@/content/editorial";
import { createEditorialMetadata } from "@/lib/editorial-metadata";

type InsightPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEditorialByKind("insight").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getEditorialContent("insight", slug);
  return content ? createEditorialMetadata(content) : {};
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const content = getEditorialContent("insight", slug);
  if (!content) notFound();

  return <EditorialPage content={content} />;
}
