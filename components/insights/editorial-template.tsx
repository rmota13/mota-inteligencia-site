import { ArrowUpRight, Check, FileText } from "lucide-react";
import { AuthorCard } from "@/components/insights/author-card";
import { EditorialCta } from "@/components/insights/editorial-cta";
import { ReadingTime } from "@/components/insights/reading-time";
import { RelatedArticles } from "@/components/insights/related-articles";
import { RelatedProjects } from "@/components/insights/related-projects";
import { ShareButtons } from "@/components/insights/share-buttons";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getRelatedEditorialContent } from "@/content/editorial";
import {
  editorialKindConfig,
  formatEditorialDate,
  getEditorialPath,
} from "@/lib/editorial";
import type { Insight } from "@/types/insight";

type EditorialTemplateProps = {
  content: Insight;
};

export function EditorialTemplate({ content }: EditorialTemplateProps) {
  const config = editorialKindConfig[content.kind];
  const path = getEditorialPath(content);
  const canonicalUrl = `${siteConfig.url}${path}`;
  const relatedContent = getRelatedEditorialContent(content);

  return (
    <main className="min-h-screen bg-[#0A1628] text-white">
      <header className="relative overflow-hidden bg-[#071426] px-6 py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(0,180,216,0.14),transparent_31%),radial-gradient(circle_at_12%_92%,rgba(46,196,182,0.07),transparent_24%)]" />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: config.pluralLabel, href: config.path },
              { label: content.title },
            ]}
          />
          <div className="mt-10 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#00B4D8]/25 bg-[#00B4D8]/8 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#72D7E9]">
                {config.label}
              </span>
              {content.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs font-bold text-[#9BAAB5]"
                >
                  {topic}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              {content.title}
            </h1>
            <p className="mt-7 max-w-4xl text-base leading-relaxed text-[#C2CCD4] sm:text-xl">
              {content.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#91A1AE]">
              <time dateTime={content.publishedAt}>
                Publicado em {formatEditorialDate(content.publishedAt)}
              </time>
              <ReadingTime content={content} />
              <span>Por Rodrigo Mota</span>
            </div>
          </div>
        </Container>
      </header>

      <Container className="px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <article aria-labelledby="editorial-content-title" className="min-w-0">
            <h2 id="editorial-content-title" className="sr-only">
              Conteúdo de {content.title}
            </h2>

            <section
              aria-labelledby="executive-summary-title"
              className="rounded-3xl border border-[#00B4D8]/18 bg-[#101F34] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <FileText aria-hidden="true" size={22} className="text-[#00B4D8]" />
                <h2 id="executive-summary-title" className="text-xl font-black text-white">
                  Resumo executivo
                </h2>
              </div>
              <ul className="mt-6 space-y-4">
                {content.executiveSummary.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-[#D5DCE2] sm:text-base">
                    <Check aria-hidden="true" size={17} className="mt-1 shrink-0 text-[#2EC4B6]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-12 space-y-14">
              {content.sections.map((section) => (
                <section key={section.id} aria-labelledby={section.id} className="scroll-mt-36">
                  <h2
                    id={section.id}
                    className="text-3xl font-black leading-tight text-white sm:text-4xl"
                  >
                    {section.title}
                  </h2>
                  <div className="mt-6 space-y-5 text-base leading-8 text-[#CDD6DD] sm:text-lg sm:leading-9">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.items && (
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 rounded-2xl border border-white/8 bg-[#101F34] p-4 text-sm leading-relaxed text-[#C2CCD4]"
                        >
                          <Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-[#2EC4B6]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {content.faq && content.faq.length > 0 && (
              <section aria-labelledby="faq-title" className="mt-16 border-t border-white/10 pt-12">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
                  Perguntas frequentes
                </p>
                <h2 id="faq-title" className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Respostas diretas
                </h2>
                <div className="mt-8 space-y-3">
                  {content.faq.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-2xl border border-white/9 bg-[#101F34] p-5 open:border-[#00B4D8]/30"
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
              </section>
            )}

            <section aria-labelledby="sources-title" className="mt-16 border-t border-white/10 pt-12">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
                Rastreabilidade editorial
              </p>
              <h2 id="sources-title" className="mt-3 text-3xl font-black text-white">
                Fontes públicas consultadas
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#AEBBC5]">
                As afirmações de arquitetura, estado e resultados qualitativos foram
                limitadas às fontes públicas sanitizadas abaixo. Nenhuma métrica ou
                informação operacional privada foi acrescentada.
              </p>
              <ul className="mt-7 space-y-3">
                {content.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      data-analytics-event="source_open"
                      data-analytics-category={content.kind}
                      data-analytics-label={source.label}
                      className="inline-flex items-start gap-2 rounded-md text-sm font-bold leading-relaxed text-[#72D7E9] transition hover:text-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
                    >
                      {source.label}
                      <ArrowUpRight aria-hidden="true" size={14} className="mt-0.5 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <span
              aria-hidden="true"
              data-editorial-complete={content.slug}
              data-editorial-kind={content.kind}
              className="block h-px w-full"
            />

            <RelatedProjects slugs={content.relatedProjectSlugs} />
            <RelatedArticles content={relatedContent} />
            <EditorialCta />
          </article>

          <div className="space-y-5 lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)]">
            <nav
              aria-labelledby="on-this-page-title"
              className="rounded-2xl border border-white/10 bg-[#101F34] p-5"
            >
              <h2 id="on-this-page-title" className="text-sm font-black text-white">
                Neste conteúdo
              </h2>
              <ol className="mt-4 space-y-3 border-l border-white/10 pl-4">
                {content.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-xs font-semibold leading-relaxed text-[#AEBBC5] transition hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <AuthorCard />
            <ShareButtons title={content.title} url={canonicalUrl} />
          </div>
        </div>
      </Container>
    </main>
  );
}
