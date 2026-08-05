import { EditorialIndexPage } from "@/components/insights/editorial-index-page";
import { getEditorialByKind } from "@/content/editorial";
import { createEditorialIndexMetadata } from "@/lib/editorial-metadata";

export const metadata = createEditorialIndexMetadata("insight");

export default function InsightsPage() {
  return <EditorialIndexPage kind="insight" content={getEditorialByKind("insight")} />;
}
