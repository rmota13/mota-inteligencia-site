import { EditorialTemplate } from "@/components/insights/editorial-template";
import type { Insight } from "@/types/insight";

export function InsightTemplate({ insight }: { insight: Insight }) {
  return <EditorialTemplate content={insight} />;
}
