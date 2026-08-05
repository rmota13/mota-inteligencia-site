import { getEditorialContent } from "@/content/editorial";
import { editorialKindConfig } from "@/lib/editorial";
import {
  createEditorialOpenGraphImage,
  openGraphImageSize,
} from "@/lib/open-graph-image";

export const alt = "Guia técnico da Mota Inteligência de Negócio";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default async function GuideOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getEditorialContent("guide", slug);

  return createEditorialOpenGraphImage({
    label: editorialKindConfig.guide.label,
    title: content?.title ?? "Guias técnicos",
    topics: content?.topics ?? ["Arquitetura", "Integrações"],
  });
}
