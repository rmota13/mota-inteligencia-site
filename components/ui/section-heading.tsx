type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  className = "max-w-4xl",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-sm font-black uppercase tracking-[0.3em] text-[#00B4D8]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black md:text-5xl">{title}</h2>
    </div>
  );
}
