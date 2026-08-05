import { getEditorialContent } from "@/content/editorial";
import { editorialKindConfig } from "@/lib/editorial";
import {
  createEditorialOpenGraphImage,
  openGraphImageSize,
} from "@/lib/open-graph-image";

export const alt = "Artigo técnico da Mota Inteligência de Negócio";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getEditorialContent("article", slug);

  return createEditorialOpenGraphImage({
    label: editorialKindConfig.article.label,
    title: content?.title ?? "Artigos técnicos",
    topics: content?.topics ?? ["Arquitetura", "Integrações"],
  });
}
