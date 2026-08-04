import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type ProjectContentSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  alternate?: boolean;
};

export function ProjectContentSection({
  id,
  eyebrow,
  title,
  children,
  alternate = false,
}: ProjectContentSectionProps) {
  return (
    <section id={id} className={`${alternate ? "bg-[#101F34]" : "bg-[#0A1628]"} px-6 py-16 sm:py-20`}>
      <Container className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00B4D8]">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>
        </div>
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
}
