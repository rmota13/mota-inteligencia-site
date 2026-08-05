import { EditorialTemplate } from "@/components/insights/editorial-template";
import type { Insight } from "@/types/insight";

export function ArticleTemplate({ article }: { article: Insight }) {
  return <EditorialTemplate content={article} />;
}
