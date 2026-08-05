import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/config/site";

export function AuthorCard() {
  return (
    <aside
      aria-labelledby="author-card-title"
      className="rounded-2xl border border-white/10 bg-[#101F34] p-5"
    >
      <div className="flex items-center gap-4">
        <Image
          src="/linkedin-rodrigo.png"
          alt="Retrato profissional de Rodrigo Mota"
          width={64}
          height={64}
          sizes="64px"
          className="h-16 w-16 shrink-0 rounded-full border border-[#00B4D8]/30 object-cover"
        />
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#00B4D8]">
            Autor
          </p>
          <h2 id="author-card-title" className="mt-1 font-black text-white">
            Rodrigo Mota
          </h2>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#B9C5CE]">
        Arquitetura, integrações, automação e dados aplicados a operações
        empresariais.
      </p>
      <a
        href={siteConfig.linkedinUrl}
        target="_blank"
        rel="noreferrer"
        data-analytics-event="linkedin_click"
        data-analytics-category="editorial"
        data-analytics-label="author_card"
        className="mt-5 inline-flex items-center gap-2 rounded-md text-sm font-black text-[#72D7E9] transition hover:text-[#2EC4B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
      >
        <LinkedInIcon aria-hidden="true" size={16} />
        LinkedIn
        <ArrowUpRight aria-hidden="true" size={14} />
      </a>
      <Link
        href="/projetos/sap-commerce-integration-platform"
        data-analytics-event="projects_click"
        data-analytics-category="editorial_author"
        data-analytics-label="sap-commerce-integration-platform"
        className="mt-3 flex w-fit items-center gap-2 rounded-md text-sm font-black text-[#C8D3DB] transition hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
      >
        Projeto em destaque
        <ArrowRight aria-hidden="true" size={14} />
      </Link>
    </aside>
  );
}
