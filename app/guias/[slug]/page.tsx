import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialPage } from "@/components/insights/editorial-page";
import { getEditorialByKind, getEditorialContent } from "@/content/editorial";
import { createEditorialMetadata } from "@/lib/editorial-metadata";

type GuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEditorialByKind("guide").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getEditorialContent("guide", slug);
  return content ? createEditorialMetadata(content) : {};
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const content = getEditorialContent("guide", slug);
  if (!content) notFound();

  return <EditorialPage content={content} />;
}
