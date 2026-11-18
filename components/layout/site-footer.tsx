import { Brand } from "@/components/layout/brand";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#00B4D8]/10 bg-[#020D1F] px-6 py-12 text-white md:py-14">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Brand footer />
          <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-[#E0E1DD]">
            Integrações, automação, dados, BI e IA para empresas que precisam operar com mais controle e capacidade de evolução.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-white">Menu</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#E0E1DD]">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[#00B4D8]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-white">Soluções</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#E0E1DD]">
            <li>Integrações & Automação</li>
            <li>Dados, BI & Confiabilidade</li>
            <li>IA aplicada ao negócio</li>
            <li>Sustentação & Evolução</li>
            <li>SAP Business One</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-white">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#E0E1DD]">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all hover:text-[#00B4D8]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.phoneHref}
                className="hover:text-[#00B4D8]"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>{siteConfig.location}</li>
            <li className="font-semibold text-[#00B4D8]">
              motainteligencia.com.br
            </li>
            <li>
              <a href="/feed.xml" className="hover:text-[#00B4D8]">
                Feed RSS
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#AEB8C2] md:flex-row">
        <p>© 2026 Mota Inteligência de Negócio. Todos os direitos reservados.</p>
        <p>Integrações • Automação • Dados & BI • IA</p>
      </Container>
    </footer>
  );
}
