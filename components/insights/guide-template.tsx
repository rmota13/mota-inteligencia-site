import { EditorialTemplate } from "@/components/insights/editorial-template";
import type { Insight } from "@/types/insight";

export function GuideTemplate({ guide }: { guide: Insight }) {
  return <EditorialTemplate content={guide} />;
}
