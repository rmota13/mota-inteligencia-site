import { EditorialIndexTemplate } from "@/components/insights/editorial-index-template";
import { siteConfig } from "@/config/site";
import { editorialKindConfig } from "@/lib/editorial";
import {
  createBreadcrumbStructuredData,
  createEditorialListStructuredData,
  createWebPageStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";
import type { Insight, InsightKind } from "@/types/insight";

export function EditorialIndexPage({
  kind,
  content,
}: {
  kind: InsightKind;
  content: Insight[];
}) {
  const config = editorialKindConfig[kind];
  const breadcrumb = createBreadcrumbStructuredData([
    { name: "Início", url: siteConfig.url },
    { name: config.pluralLabel, url: `${siteConfig.url}${config.path}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(
            createWebPageStructuredData({
              path: config.path,
              name: config.pluralLabel,
              description: config.description,
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
          __html: serializeStructuredData(createEditorialListStructuredData(content)),
        }}
      />
      <EditorialIndexTemplate kind={kind} content={content} />
    </>
  );
}
