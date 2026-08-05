import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReadingTime } from "@/components/insights/reading-time";
import {
  editorialKindConfig,
  formatEditorialDate,
  getEditorialPath,
} from "@/lib/editorial";
import type { Insight } from "@/types/insight";

export function ArticleCard({ content }: { content: Insight }) {
  const config = editorialKindConfig[content.kind];
  const path = getEditorialPath(content);

  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-white/9 bg-[#101F34] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#00B4D8]/45 hover:shadow-[0_22px_60px_rgba(0,180,216,0.08)] focus-within:border-[#00B4D8] motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#72D7E9]">
          {config.label}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          size={20}
          className="text-[#00B4D8] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
        />
      </div>
      <h2 className="mt-5 text-2xl font-black leading-tight text-white">
        {content.title}
      </h2>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[#B9C5CE]">
        {content.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/8 pt-5 text-xs text-[#91A1AE]">
        <time dateTime={content.publishedAt}>
          {formatEditorialDate(content.publishedAt)}
        </time>
        <ReadingTime content={content} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {content.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-[#00B4D8]/8 px-3 py-1.5 text-[11px] font-bold text-[#BEEBF2]"
          >
            {topic}
          </span>
        ))}
      </div>
      <Link
        href={path}
        data-analytics-event="editorial_open"
        data-analytics-category={content.kind}
        data-analytics-label={content.slug}
        aria-label={`Ler ${config.label.toLocaleLowerCase("pt-BR")}: ${content.title}`}
        className="absolute inset-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:ring-inset"
      />
    </article>
  );
}
