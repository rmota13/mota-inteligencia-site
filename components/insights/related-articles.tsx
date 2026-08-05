import { ArticleCard } from "@/components/insights/article-card";
import type { Insight } from "@/types/insight";

export function RelatedArticles({ content }: { content: Insight[] }) {
  if (content.length === 0) return null;

  return (
    <section aria-labelledby="related-content-title" className="mt-16 border-t border-white/10 pt-12">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00B4D8]">
        Continuar explorando
      </p>
      <h2 id="related-content-title" className="mt-3 text-3xl font-black text-white">
        Conteúdos relacionados
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {content.map((item) => (
          <ArticleCard key={`${item.kind}-${item.slug}`} content={item} />
        ))}
      </div>
    </section>
  );
}
