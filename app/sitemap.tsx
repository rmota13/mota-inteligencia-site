import { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { publishedEditorialContent } from "@/content/editorial";
import { siteConfig } from "@/config/site";
import { editorialKindConfig, getEditorialPath } from "@/lib/editorial";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projetos`,
      lastModified: new Date("2026-08-03"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projetos/${project.slug}`,
      lastModified: new Date(project.updatedAt ?? "2026-08-03"),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.9 : 0.7,
    })),
    ...(["insight", "guide", "article"] as const).map((kind) => ({
      url: `${siteConfig.url}${editorialKindConfig[kind].path}`,
      lastModified: new Date("2026-08-04"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...publishedEditorialContent.map((content) => ({
      url: `${siteConfig.url}${getEditorialPath(content)}`,
      lastModified: new Date(content.updatedAt ?? content.publishedAt),
      changeFrequency: "monthly" as const,
      priority: content.kind === "guide" ? 0.8 : 0.7,
    })),
  ];
}
