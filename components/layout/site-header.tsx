import Link from "next/link";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Brand } from "@/components/layout/brand";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

export function SiteHeader() {
  return (
    <header
      className="sticky left-0 top-0 z-50 w-full border-b border-[#00B4D8]/10 bg-[#020D1F]/95 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
      style={{ height: "var(--site-header-height)" }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Link
          href="/#inicio"
          aria-label="Ir para o início"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
        >
          <Brand priority />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center justify-center gap-7 text-[15px] font-semibold text-[#E0E1DD] lg:flex lg:gap-10"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md transition hover:text-[#00B4D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#00B4D8] px-3 py-2 text-xs font-bold text-[#020D1F] transition hover:bg-[#2EC4B6] hover:shadow-[0_12px_35px_rgba(0,180,216,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-4 md:px-5 md:py-2.5 md:text-sm"
          >
            WhatsApp
          </a>
          <MobileNavigation items={primaryNavigation} />
        </div>
      </div>
    </header>
  );
}
