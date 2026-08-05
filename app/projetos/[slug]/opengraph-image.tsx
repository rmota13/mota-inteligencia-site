import { getProjectBySlug } from "@/content/projects";
import {
  createEditorialOpenGraphImage,
  openGraphImageSize,
} from "@/lib/open-graph-image";

export const alt = "Projeto técnico da Mota Inteligência de Negócio";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return createEditorialOpenGraphImage({
    label: "Projeto",
    title: project?.title ?? "Projeto técnico",
    topics: project?.technologies ?? ["Arquitetura", "Integrações"],
  });
}
