import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
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

const title = "Projetos de arquitetura, integração, automação e dados";
const description =
  "Projetos empresariais de Rodrigo Mota envolvendo SAP Business One, APIs, automação, dados, infraestrutura e aplicações.";

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

      <section aria-labelledby="categorias-title" className="bg-[#101F34] px-6 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">Organização</p>
          <h2 id="categorias-title" className="mt-4 text-3xl font-black text-white sm:text-4xl">Explorar por categoria</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projectCategories.map((category) => {
              const categoryProjects = projects.filter((project) => project.categories.includes(category.slug));
              return (
                <article key={category.slug} className="rounded-2xl border border-white/8 bg-[#0A1628] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-white">{category.label}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#9DADB9]">{category.description}</p>
                    </div>
                    <span className="rounded-full bg-[#00B4D8]/10 px-3 py-1 text-xs font-black text-[#72D7E9]">{categoryProjects.length}</span>
                  </div>
                  <ul className="mt-5 space-y-2 border-t border-white/8 pt-5">
                    {categoryProjects.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/projetos/${project.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#C7D1D9] transition hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
                        >
                          <ArrowRight aria-hidden="true" size={14} className="text-[#2EC4B6]" />
                          {project.shortTitle ?? project.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="todos-projetos" aria-labelledby="todos-projetos-title" className="bg-[#0A1628] px-6 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">Portfólio</p>
          <h2 id="todos-projetos-title" className="mt-4 text-3xl font-black text-white sm:text-4xl">Todos os projetos</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
