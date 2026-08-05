import { EditorialIndexPage } from "@/components/insights/editorial-index-page";
import { getEditorialByKind } from "@/content/editorial";
import { createEditorialIndexMetadata } from "@/lib/editorial-metadata";

export const metadata = createEditorialIndexMetadata("article");

export default function ArticlesPage() {
  return <EditorialIndexPage kind="article" content={getEditorialByKind("article")} />;
}
