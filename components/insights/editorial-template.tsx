import type { Insight } from "@/types/insight";

type EditorialTemplateProps = {
  content: Insight;
  label: string;
};

export function EditorialTemplate({ content, label }: EditorialTemplateProps) {
  return (
    <article className="mx-auto max-w-4xl">
      <header className="border-b border-white/10 pb-10">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#00B4D8]">{label}</p>
        <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-6xl">{content.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-[#C2CCD4]">{content.description}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#91A1AE]">
          <time dateTime={content.publishedAt}>{content.publishedAt}</time>
          <span aria-hidden="true">·</span>
          <span>{content.readingTime}</span>
        </div>
      </header>
      <div className="space-y-6 py-10 text-base leading-8 text-[#D5DCE2] sm:text-lg">
        {content.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
