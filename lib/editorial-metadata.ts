import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { editorialKindConfig, getEditorialPath } from "@/lib/editorial";
import type { Insight, InsightKind } from "@/types/insight";

export function createEditorialMetadata(content: Insight): Metadata {
  const title = content.seo?.title ?? content.title;
  const description = content.seo?.description ?? content.description;
  const path = getEditorialPath(content);
  const image = content.seo?.image ?? `${path}/opengraph-image`;

  return {
    title,
    description,
    keywords: content.topics,
    authors: [{ name: "Rodrigo Mota", url: siteConfig.linkedinUrl }],
    alternates: { canonical: path },
    robots: content.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      locale: "pt_BR",
      type: "article",
      publishedTime: content.publishedAt,
      modifiedTime: content.updatedAt ?? content.publishedAt,
      authors: ["Rodrigo Mota"],
      tags: content.topics,
      images: [{ url: image, width: 1200, height: 630, alt: content.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function createEditorialIndexMetadata(kind: InsightKind): Metadata {
  const config = editorialKindConfig[kind];

  return {
    title: config.pluralLabel,
    description: config.description,
    alternates: { canonical: config.path },
    openGraph: {
      title: `${config.pluralLabel} | ${siteConfig.name}`,
      description: config.description,
      url: `${siteConfig.url}${config.path}`,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${config.pluralLabel} da Mota Inteligência de Negócio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.pluralLabel} | ${siteConfig.name}`,
      description: config.description,
      images: ["/opengraph-image"],
    },
  };
}
