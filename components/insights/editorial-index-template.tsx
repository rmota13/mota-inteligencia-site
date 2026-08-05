import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import { ArticleCard } from "@/components/insights/article-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { editorialKindConfig } from "@/lib/editorial";
import type { Insight, InsightKind } from "@/types/insight";

type EditorialIndexTemplateProps = {
  kind: InsightKind;
  content: Insight[];
};

const titles: Record<InsightKind, string> = {
  article: "Análises para decisões técnicas com contexto.",
  guide: "Guias para estruturar integrações que precisam operar.",
  insight: "Aprendizados técnicos, decisões e problemas reais.",
};

export function EditorialIndexTemplate({ kind, content }: EditorialIndexTemplateProps) {
  const config = editorialKindConfig[kind];
  const otherKinds = (Object.keys(editorialKindConfig) as InsightKind[]).filter(
    (item) => item !== kind,
  );

  return (
    <main className="min-h-screen bg-[#0A1628] text-white">
      <section className="relative overflow-hidden bg-[#071426] px-6 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(0,180,216,0.13),transparent_31%)]" />
        <Container className="relative">
          <Breadcrumbs
            items={[{ label: "Início", href: "/" }, { label: config.pluralLabel }]}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00B4D8]">
                Biblioteca técnica
              </p>
              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.04] tracking-[-0.035em] sm:text-6xl">
                {titles[kind]}
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed text-[#C2CCD4] sm:text-xl">
                {config.description}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-[#B9C5CE]">
              <BookOpenText aria-hidden="true" size={21} className="text-[#2EC4B6]" />
              <span>{content.length} {content.length === 1 ? "conteúdo publicado" : "conteúdos publicados"}</span>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="editorial-list-title" className="px-6 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
                Conteúdo publicado
              </p>
              <h2 id="editorial-list-title" className="mt-3 text-3xl font-black text-white sm:text-4xl">
                {config.pluralLabel}
              </h2>
            </div>
            <nav aria-label="Outras áreas editoriais" className="flex flex-wrap gap-3">
              {otherKinds.map((otherKind) => {
                const other = editorialKindConfig[otherKind];
                return (
                  <Link
                    key={otherKind}
                    href={other.path}
                    className="inline-flex items-center gap-2 rounded-full border border-[#00B4D8]/25 px-4 py-2 text-sm font-black text-[#D5DCE2] transition hover:border-[#00B4D8] hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
                  >
                    {other.pluralLabel}
                    <ArrowRight aria-hidden="true" size={15} />
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.map((item) => (
              <ArticleCard key={`${item.kind}-${item.slug}`} content={item} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
