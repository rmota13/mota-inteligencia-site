import { EditorialIndexPage } from "@/components/insights/editorial-index-page";
import { getEditorialByKind } from "@/content/editorial";
import { createEditorialIndexMetadata } from "@/lib/editorial-metadata";

export const metadata = createEditorialIndexMetadata("guide");

export default function GuidesPage() {
  return <EditorialIndexPage kind="guide" content={getEditorialByKind("guide")} />;
}
