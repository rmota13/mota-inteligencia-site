import { ArticleCard } from "@/components/insights/article-card";
import { publishedEditorialContent } from "@/content/editorial";

export function RelatedEditorial({ projectSlug }: { projectSlug: string }) {
  const content = publishedEditorialContent
    .filter((item) => item.relatedProjectSlugs.includes(projectSlug))
    .slice(0, 3);

  if (content.length === 0) return null;

  return (
    <section aria-labelledby="project-editorial-title" className="bg-[#071426] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
          Aprofundamento
        </p>
        <h2 id="project-editorial-title" className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Conteúdo técnico relacionado
        </h2>
        <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.map((item) => (
            <ArticleCard key={`${item.kind}-${item.slug}`} content={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
