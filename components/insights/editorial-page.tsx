import { ArticleTemplate } from "@/components/insights/article-template";
import { GuideTemplate } from "@/components/insights/guide-template";
import { InsightTemplate } from "@/components/insights/insight-template";
import { siteConfig } from "@/config/site";
import { editorialKindConfig, getEditorialPath } from "@/lib/editorial";
import {
  createBreadcrumbStructuredData,
  createEditorialStructuredData,
  createFaqStructuredData,
  createWebPageStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";
import type { Insight } from "@/types/insight";

export function EditorialPage({ content }: { content: Insight }) {
  const config = editorialKindConfig[content.kind];
  const path = getEditorialPath(content);
  const description = content.seo?.description ?? content.description;
  const faqStructuredData = createFaqStructuredData(content);
  const breadcrumb = createBreadcrumbStructuredData([
    { name: "Início", url: siteConfig.url },
    { name: config.pluralLabel, url: `${siteConfig.url}${config.path}` },
    { name: content.title, url: `${siteConfig.url}${path}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(
            createWebPageStructuredData({
              path,
              name: content.title,
              description,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(createEditorialStructuredData(content)),
        }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(faqStructuredData),
          }}
        />
      )}
      {content.kind === "article" ? (
        <ArticleTemplate article={content} />
      ) : content.kind === "guide" ? (
        <GuideTemplate guide={content} />
      ) : (
        <InsightTemplate insight={content} />
      )}
    </>
  );
}
