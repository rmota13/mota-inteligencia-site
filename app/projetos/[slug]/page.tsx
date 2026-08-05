import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { IntegrationFlowAnimation } from "@/components/projects/integration-flow-animation";
import { ProjectContentSection } from "@/components/projects/project-content-section";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { RelatedEditorial } from "@/components/projects/related-editorial";
import { ProjectRelatedProjects } from "@/components/projects/related-projects";
import { ProjectStatus } from "@/components/projects/project-status";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import {
  getProjectBySlug,
  getProjectCategory,
  projects,
} from "@/content/projects";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbStructuredData,
  createFaqStructuredData,
  createProjectStructuredData,
  createWebPageStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = project.seo?.title ?? project.title;
  const description = project.seo?.description ?? project.summary;
  const path = `/projetos/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: project.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      type: "article",
      modifiedTime: project.updatedAt,
      images: [
        {
          url: project.seo?.image ?? `${path}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.seo?.image ?? `${path}/opengraph-image`],
    },
  };
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-2xl border border-white/8 bg-[#071426] p-4 text-sm leading-relaxed text-[#C2CCD4]">
          <Check aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-[#2EC4B6]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const path = `/projetos/${project.slug}`;
  const description = project.seo?.description ?? project.summary;
  const breadcrumb = createBreadcrumbStructuredData([
    { name: "Início", url: siteConfig.url },
    { name: "Projetos", url: `${siteConfig.url}/projetos` },
    { name: project.title, url: `${siteConfig.url}${path}` },
  ]);
  const faqStructuredData = createFaqStructuredData(project);

  return (
    <main className="min-h-screen bg-[#0A1628] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(
            createWebPageStructuredData({ path, name: project.title, description }),
          ),
        }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(faqStructuredData),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(createProjectStructuredData(project)),
        }}
      />

      <section className="relative overflow-hidden bg-[#071426] px-6 py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(0,180,216,0.14),transparent_32%),radial-gradient(circle_at_10%_90%,rgba(46,196,182,0.08),transparent_25%)]" />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Projetos", href: "/projetos" },
              { label: project.shortTitle ?? project.title },
            ]}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {project.status && <ProjectStatus status={project.status} />}
                {project.categories.map((category) => (
                  <span key={category} className="text-xs font-black uppercase tracking-[0.16em] text-[#72D7E9]">
                    {getProjectCategory(category)?.label}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-7 max-w-4xl text-base leading-relaxed text-[#C2CCD4] sm:text-xl">
                {project.summary}
              </p>
              <p className="mt-6 max-w-4xl text-sm font-bold leading-relaxed text-[#73E0D4]">
                {project.stackLabel}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-stretch">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="github_click"
                  data-analytics-category="project"
                  data-analytics-label={project.slug}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 font-black text-[#020D1F] transition duration-200 hover:-translate-y-0.5 hover:bg-[#DCE8ED] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071426] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <GitHubIcon aria-hidden="true" size={18} className="shrink-0" />
                  Repositório público
                  <ExternalLink aria-hidden="true" size={15} />
                </a>
              )}
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                data-analytics-event="linkedin_click"
                data-analytics-category="project"
                data-analytics-label={project.slug}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0A66C2]/55 px-5 py-4 font-black text-[#DCEBFA] transition hover:border-[#0A66C2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
              >
                <LinkedInIcon aria-hidden="true" size={17} />
                Perfil no LinkedIn
                <ExternalLink aria-hidden="true" size={15} />
              </a>
              <Link
                href="/projetos"
                data-analytics-event="projects_click"
                data-analytics-category="project"
                data-analytics-label="all_projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00B4D8]/35 px-5 py-4 font-black text-[#E0E1DD] transition hover:border-[#00B4D8] hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
              >
                <ArrowLeft aria-hidden="true" size={17} />
                Todos os projetos
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ProjectContentSection eyebrow="Resumo executivo" title="A solução em perspectiva">
        <div className="space-y-5 text-base leading-relaxed text-[#C7D1D9] sm:text-lg">
          <p>{project.description ?? project.solution ?? project.summary}</p>
          {project.businessRelevance && <p>{project.businessRelevance}</p>}
          {project.role && (
            <div className="mt-7 rounded-2xl border border-[#00B4D8]/15 bg-[#101F34] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00B4D8]">Papel desempenhado</p>
              <p className="mt-3 text-sm leading-relaxed text-[#D5DCE2] sm:text-base">{project.role}</p>
            </div>
          )}
        </div>
      </ProjectContentSection>

      {project.problem && (
        <ProjectContentSection eyebrow="Problema" title="O que precisava mudar" alternate>
          <p className="text-base leading-relaxed text-[#C7D1D9] sm:text-lg">{project.problem}</p>
        </ProjectContentSection>
      )}

      {project.context && (
        <ProjectContentSection eyebrow="Contexto" title="Onde a arquitetura se aplica">
          <p className="text-base leading-relaxed text-[#C7D1D9] sm:text-lg">{project.context}</p>
        </ProjectContentSection>
      )}

      {project.architecture && (
        <ProjectContentSection eyebrow="Arquitetura" title="Componentes com responsabilidades claras" alternate={!project.context}>
          <p className="text-base leading-relaxed text-[#C7D1D9] sm:text-lg">{project.architecture}</p>
          {project.featured && (
            <div className="mt-8">
              <IntegrationFlowAnimation variant="detailed" />
            </div>
          )}
          {project.architectureLayers && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.architectureLayers.map((layer) => (
                <article key={layer.title} className="rounded-2xl border border-white/8 bg-[#071426] p-5">
                  <h3 className="font-black text-white">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#AEBBC5]">{layer.description}</p>
                </article>
              ))}
            </div>
          )}
        </ProjectContentSection>
      )}

      {project.flow && project.flow.length > 0 && (
        <ProjectContentSection eyebrow="Fluxo" title="Do evento ao registro no ERP">
          <ol className="space-y-3">
            {project.flow.map((step, index) => (
              <li key={step} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/8 bg-[#101F34] p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00B4D8] text-xs font-black text-[#020D1F]">{index + 1}</span>
                <p className="pt-1 text-sm leading-relaxed text-[#D5DCE2] sm:text-base">{step}</p>
              </li>
            ))}
          </ol>
        </ProjectContentSection>
      )}

      <ProjectContentSection eyebrow="Tecnologias" title="Stack com função definida" alternate>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((technology) => (
            <span key={technology} className="rounded-full border border-[#00B4D8]/20 bg-[#00B4D8]/7 px-4 py-2.5 text-sm font-bold text-[#D5F2F7]">
              {technology}
            </span>
          ))}
        </div>
      </ProjectContentSection>

      {project.phases && project.phases.length > 0 && (
        <ProjectContentSection eyebrow="Fases" title="Entrega progressiva e verificável">
          <div className="grid gap-5 lg:grid-cols-3">
            {project.phases.map((phase) => (
              <article key={phase.title} className="rounded-2xl border border-white/8 bg-[#101F34] p-6">
                <ProjectStatus status={phase.status} />
                <h3 className="mt-5 text-xl font-black text-white">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#AEBBC5]">{phase.summary}</p>
                <ul className="mt-5 space-y-2 border-t border-white/8 pt-5 text-sm text-[#D5DCE2]">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-[#2EC4B6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </ProjectContentSection>
      )}

      {(project.engineeringDecisions || project.security) && (
        <ProjectContentSection eyebrow="Engenharia" title="Decisões para reduzir risco" alternate>
          {project.engineeringDecisions && <TextList items={project.engineeringDecisions} />}
          {project.security && (
            <div className="mt-8 rounded-2xl border border-[#2EC4B6]/18 bg-[#071426] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck aria-hidden="true" size={22} className="text-[#2EC4B6]" />
                <h3 className="text-lg font-black text-white">Segurança e sanitização</h3>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.security.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-[#B9C5CE]">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </ProjectContentSection>
      )}

      {project.observability && (
        <ProjectContentSection eyebrow="Observabilidade" title="Cada execução precisa responder o que aconteceu">
          <TextList items={project.observability} />
        </ProjectContentSection>
      )}

      {project.results && project.results.length > 0 && (
        <ProjectContentSection eyebrow="Resultados" title="Impactos qualitativos documentados" alternate>
          <TextList items={project.results} />
        </ProjectContentSection>
      )}

      {project.limitations && project.limitations.length > 0 && (
        <ProjectContentSection eyebrow="Limitações" title="O que esta publicação não afirma">
          <TextList items={project.limitations} />
        </ProjectContentSection>
      )}

      {project.gallery.length > 0 && (
        <ProjectContentSection eyebrow="Galeria" title="Interfaces e fluxos do projeto">
          <ProjectGallery assets={project.gallery} />
        </ProjectContentSection>
      )}

      {project.roadmap && project.roadmap.length > 0 && (
        <ProjectContentSection eyebrow="Roadmap" title="Próximas evoluções" alternate>
          <ol className="space-y-3">
            {project.roadmap.map((item, index) => (
              <li key={item} className="flex gap-4 rounded-2xl border border-white/8 bg-[#071426] p-5">
                <span className="font-black text-[#00B4D8]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-relaxed text-[#D5DCE2] sm:text-base">{item}</span>
              </li>
            ))}
          </ol>
        </ProjectContentSection>
      )}

      {project.faq && project.faq.length > 0 && (
        <ProjectContentSection eyebrow="Perguntas frequentes" title="Respostas sobre a arquitetura">
          <div className="space-y-3">
            {project.faq.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-white/9 bg-[#101F34] p-5 open:border-[#00B4D8]/30"
              >
                <summary className="cursor-pointer pr-5 font-black text-white marker:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-[#C2CCD4] sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </ProjectContentSection>
      )}

      {project.repositoryUrl && (
        <section className="bg-[#071426] px-6 py-16 sm:py-20">
          <Container>
            <div className="rounded-[32px] border border-white/10 bg-[#101F34] p-7 sm:p-10">
              <GitHubIcon aria-hidden="true" size={28} className="text-[#00B4D8]" />
              <h2 className="mt-5 text-3xl font-black text-white">Documentação pública no GitHub</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#B9C5CE]">
                Consulte arquitetura, fluxos, decisões, segurança, observabilidade e roadmap na versão pública e sanitizada do projeto.
              </p>
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                data-analytics-event="github_click"
                data-analytics-category="project"
                data-analytics-label={`${project.slug}_documentation`}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-black text-[#020D1F] transition duration-200 hover:-translate-y-0.5 hover:bg-[#DCE8ED] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101F34] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <GitHubIcon aria-hidden="true" size={17} className="shrink-0" />
                Abrir repositório
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            </div>
          </Container>
        </section>
      )}

      <RelatedEditorial projectSlug={project.slug} />

      {project.relatedProjectSlugs && (
        <ProjectRelatedProjects slugs={project.relatedProjectSlugs} />
      )}

      <section className="bg-[#0A1628] px-6 py-16 sm:py-20">
        <Container>
          <div className="rounded-[32px] border border-[#00B4D8]/20 bg-[#122238] p-7 sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">Próximo passo</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl">
                Existe um fluxo semelhante na sua operação?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#B9C5CE]">
                Vamos avaliar o processo, os sistemas envolvidos e os riscos antes de definir a arquitetura.
              </p>
            </div>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="contact_click"
              data-analytics-category="project"
              data-analytics-label={`${project.slug}_whatsapp`}
              className="mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#00B4D8] px-6 py-4 font-black text-[#020D1F] transition hover:bg-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:mt-0"
            >
              Conversar sobre o projeto
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
