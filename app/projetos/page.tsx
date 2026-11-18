import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";
import { ProjectCatalog } from "@/components/projects/project-catalog";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { projectCategories, projects } from "@/content/projects";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbStructuredData,
  createProjectListStructuredData,
  createWebPageStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";

const title = "Projetos de integrações, automação, dados, BI e IA aplicada";
const description =
  "Portfólio técnico de integrações, automação, Business Intelligence, IA aplicada e confiabilidade de dados, com contexto, arquitetura e papel desempenhado.";

export const metadata: Metadata = {
  title: "Projetos",
  description,
  alternates: { canonical: "/projetos" },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/projetos`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  const breadcrumb = createBreadcrumbStructuredData([
    { name: "Início", url: siteConfig.url },
    { name: "Projetos", url: `${siteConfig.url}/projetos` },
  ]);

  return (
    <main className="min-h-screen bg-[#0A1628] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(
            createWebPageStructuredData({ path: "/projetos", name: title, description }),
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
          __html: serializeStructuredData(createProjectListStructuredData(projects)),
        }}
      />

      <section className="relative overflow-hidden bg-[#071426] px-6 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(0,180,216,0.12),transparent_30%)]" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Projetos" }]} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_0.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">Portfólio técnico</p>
              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.04] tracking-[-0.035em] sm:text-6xl">
                Projetos construídos para conectar tecnologia e operação.
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed text-[#C2CCD4] sm:text-xl">
                Projetos organizados por capacidade, com contexto, papel desempenhado,
                arquitetura, tecnologias, estado atual e próximos passos quando
                publicamente documentados.
              </p>
            </div>
            <div className="flex items-center gap-3 lg:justify-end">
              <FolderKanban aria-hidden="true" size={22} className="text-[#2EC4B6]" />
              <span className="text-sm font-bold text-[#B9C5CE]">{projects.length} projetos documentados</span>
            </div>
          </div>
        </Container>
      </section>

      <section id="todos-projetos" aria-labelledby="todos-projetos-title" className="bg-[#101F34] px-6 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">Portfólio</p>
          <h2 id="todos-projetos-title" className="mt-4 text-3xl font-black text-white sm:text-4xl">
            Explore por capacidade
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#B9C5CE]">
            Use os filtros para encontrar cases relacionados ao problema ou à capacidade técnica que deseja avaliar.
          </p>
          <ProjectCatalog projects={projects} categories={projectCategories} />
        </Container>
      </section>
    </main>
  );
}
