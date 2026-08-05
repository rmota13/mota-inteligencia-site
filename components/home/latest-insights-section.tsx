import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/insights/article-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { publishedEditorialContent } from "@/content/editorial";

export function LatestInsightsSection() {
  const latestContent = publishedEditorialContent.slice(0, 3);
  if (latestContent.length === 0) return null;

  return (
    <section id="insights" className="bg-[#101F34] px-6 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Conteúdo técnico"
            title="Arquitetura explicada a partir de decisões verificáveis."
            className="max-w-3xl"
          />
          <Link
            href="/insights"
            className="inline-flex w-fit items-center gap-2 font-black text-[#00B4D8] transition hover:text-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
          >
            Explorar insights
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#B9C5CE] md:text-lg">
          Guias, artigos e notas técnicas conectados aos projetos públicos, com
          fontes explícitas e estados preservados.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestContent.map((content) => (
            <ArticleCard key={`${content.kind}-${content.slug}`} content={content} />
          ))}
        </div>
      </Container>
    </section>
  );
}
