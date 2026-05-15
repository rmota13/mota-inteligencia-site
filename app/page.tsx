"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bot,
  Database,
  DollarSign,
  FileText,
  Globe2,
  Network,
  Workflow,
  X,
  ArrowRight,
} from "lucide-react";

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=5531987212604&text=Olá,%20Rodrigo!%20Vim%20pelo%20site%20Mota%20Inteligência%20de%20Negócio.";

const email = "contato@motainteligencia.com.br";

const solutions = [
  {
    title: "Inteligência financeira e visão de caixa",
    desc: "Leitura executiva de recebimentos, vencimentos, exposição financeira e alertas de risco.",
    icon: DollarSign,
  },
  {
    title: "Automação de cobranças, alertas e rotinas",
    desc: "Fluxos automáticos para reduzir retrabalho, acelerar decisões e padronizar processos.",
    icon: Bot,
  },
  {
    title: "Integração entre ERP, BI, APIs e sistemas",
    desc: "Conexão entre SAP, SQL Server, Power BI, n8n, Teams, SharePoint e aplicações internas.",
    icon: Workflow,
  },
  {
    title: "Dashboards executivos para decisão rápida",
    desc: "Indicadores visuais, objetivos e acionáveis para diretoria, comercial, financeiro e operação.",
    icon: BarChart3,
  },
];

const technologyGroups = [
  {
    title: "ERP, dados e relatórios",
    items: [
      { name: "SAP Business One", logo: "/logos/sap_b1.png" },
      { name: "SQL Server", logo: "/logos/sql_server.png" },
      { name: "Crystal Reports", logo: "/logos/crystal_reports.png" },
      { name: "Business Intelligence", logo: "/logos/business_intelligence.png" },
      { name: "Executive Dashboards", logo: "/logos/executive_dashboards.png" },
    ],
  },
  {
    title: "Automação e Microsoft 365",
    items: [
      { name: "n8n", logo: "/logos/n8n.png" },
      { name: "Power Automate", logo: "/logos/power_automate.png" },
      { name: "Power Apps", logo: "/logos/power_apps.png" },
      { name: "SharePoint", logo: "/logos/sharepoint.png" },
      { name: "Microsoft Teams", logo: "/logos/teams.png" },
      
    ],
  },
  {
    title: "APIs, desenvolvimento e infraestrutura",
    items: [
      { name: "Python", logo: "/logos/python.png" },
      { name: "FastAPI", logo: "/logos/fastapi.png" },
      { name: "Docker", logo: "/logos/docker.png" },
      { name: "Linux", logo: "/logos/linux.png" },
      { name: "REST API", logo: "/logos/rest_api.png" },
      { name: "ERP Integration", logo: "/logos/erp_integration.png" },
      { name: "Systems Integration", logo: "/logos/systems_integration.png" },
    ],
  },
];
const projects = [
  {
    title: "Cobrança Inteligente",
    desc: "Automação de leitura financeira com análise contextual, concentração de risco e monitoramento executivo.",
    problem:
      "O financeiro precisava consolidar manualmente títulos vencidos, identificar exposição e interpretar cenários críticos.",
    solution:
      "Criação de automação inteligente com SQL + n8n + Teams para leitura automática de contas vencidas e geração de insights.",
    impact:
      "Redução de tempo operacional, visão executiva imediata e aumento da capacidade de priorização financeira.",
    stack: "SQL Server • n8n • Teams • BI Financeiro",
    image: "/cases/n8n-cobranca-inteligente.png",
  gallery: [
  "/cases/n8n-cobranca-inteligente.png",
  "/cases/teams-cobranca-inteligente.png",
],
    icon: DollarSign,
  },
  {
    title: "Cotações acima de R$35 mil",
    desc: "Monitoramento automático de oportunidades comerciais relevantes, com score, histórico e alerta executivo para tomada de ação.",
    problem:
      "As cotações de menor valor performavam comercialmente, mas as oportunidades acima de R$35 mil tinham baixa conversão e muitas vezes não recebiam priorização adequada.",
    solution:
      "Automação para capturar cotações acima de R$35 mil, estruturar contexto, gerar leitura comercial e enviar alerta no Teams.",
    impact:
      "Maior visibilidade comercial, priorização de oportunidades e apoio direto à conversão de vendas relevantes.",
    stack: "SQL Server • n8n • Teams • BI Comercial",
    image: "/cases/n8n-cotacao-35k.png",
    gallery: [
      "/cases/n8n-cotacao-35k.png",
      "/cases/teams-cotacoes-35.png",
      "/cases/teams-cotacoes-35-detalhe.png",
    ],
    icon: BarChart3,
  },
  {
    title: "Pedidos com mais de 48h",
    desc: "Rotina automatizada para identificar pedidos pendentes de autorização, reduzir gargalos e acionar responsáveis via Teams.",
    problem:
      "Pedidos pendentes por mais de 48 horas geravam risco operacional, atraso de processo e pouca visibilidade para acompanhamento.",
    solution:
      "Criação de consulta SQL, painel de acompanhamento e alerta automático para responsáveis via Teams.",
    impact:
      "Mais controle sobre pedidos pendentes, redução de gargalos e melhor acompanhamento do fluxo comercial e operacional.",
    stack: "SAP B1 • SQL Server • n8n • Power BI",
    image: "/cases/pbi-pedidos-48h.png",
    gallery: [
      "/cases/pbi-pedidos-48h.png",
      "/cases/n8n-pedidos-48h.png",
    ],
    icon: Bot,
  },
  {
    title: "Relatórios SAP com identidade visual",
    desc: "Layouts comerciais e operacionais no Crystal Reports com padrão visual profissional para documentos enviados a clientes.",
    problem:
      "Documentos comerciais gerados pelo SAP tinham baixa força visual, pouca padronização e aparência menos profissional.",
    solution:
      "Redesenho dos layouts no Crystal Reports com identidade visual, melhor hierarquia da informação e padrão comercial mais limpo.",
    impact:
      "Melhoria na percepção profissional da empresa e aumento da qualidade visual dos documentos enviados.",
    stack: "SAP B1 • Crystal Reports • SQL Server",
    image: "/cases/cotacao-layout-novo.png",
  gallery: [
  "/cases/cotacao-layout-antigo.png",
  "/cases/cotacao-layout-novo.png",
],
    icon: FileText,
  },
];
const capabilities = [
  "BI executivo e dashboards gerenciais",
  "Automação com n8n e Power Automate",
  "Integração com SAP Business One",
  "Criação de APIs web com FastAPI",
  "Portais internos e intranet com SharePoint",
  "Aplicações internas com Power Apps",
  "Relatórios SAP com Crystal Reports",
  "Alertas inteligentes via Teams",
  "Views, queries e modelagem SQL Server",
  "Governança operacional e documentação de processos",
  "Integração ERP + BI + automação",
  "Soluções internas com baixo custo e alto impacto",
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <div 
     className={
      footer 
      ? "flex w-full flex-col gap-5" 
      : "flex items-center"
     }
    >
      <Image
        src="/logo-mota.png"
        alt="Mota Inteligência de Negócio"
        width={footer ? 320 : 280}
        height={footer ? 180 : 150}
        className={
          footer
            ? "h-auto w-full max-w-[220px] object-contain md:max-w-[300px]"
            : "h-auto w-[112px] object-contain object-left sm:w-[135px] md:w-[220px]"
        }
        priority
      />
    </div>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",

  name: "Mota Inteligência de Negócio",

  url: "https://motainteligencia.com.br",

  logo: "https://motainteligencia.com.br/logo-mota.png",

  image: "https://motainteligencia.com.br/logo-mota.png",

  description:
    "Especialista em BI, automação corporativa, integração ERP, Power BI, SAP Business One, APIs REST, Microsoft 365, Docker, Linux e deploy de aplicações empresariais.",

  areaServed: "Brasil",

  founder: {
    "@type": "Person",
    name: "Rodrigo Mota",
  },

  serviceType: [
    "Business Intelligence",
    "Power BI",
    "Automação Corporativa",
    "Integração ERP",
    "SAP Business One",
    "APIs REST",
    "Deploy de Aplicações",
    "Docker",
    "Linux",
    "Microsoft 365",
    "Power Automate",
    "n8n",
    "SharePoint",
    "Power Apps",
  ],

  knowsAbout: [
    "SQL Server",
    "Dashboards",
    "Indicadores",
    "Automação Financeira",
    "Cloudflare",
    "Traefik",
    "FastAPI",
    "APIs",
    "ERP",
    "Business Intelligence",
  ],
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCase, setSelectedCase] = useState<(typeof projects)[0] | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openCase(project: (typeof projects)[0]) {
    setSelectedCase(project);
    setSelectedImage(project.image);
  }
const dashboardStack = [
  { name: "SAP B1", logo: "/logos/sap-b1.svg" },
  { name: "SQL Server", logo: "/logos/sql-server.svg" },
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "Power BI", logo: "/logos/power-bi.svg" },
  { name: "Teams", logo: "/logos/teams.svg" },
  { name: "Power Automate", logo: "/logos/power-automate.svg" },
  { name: "SharePoint", logo: "/logos/sharepoint.svg" },
  { name: "Power Apps", logo: "/logos/power-apps.svg" },
  { name: "APIs", logo: "/logos/rest-api.svg" },
];

  return (
    <main
      className="min-h-screen overflow-hidden bg-[var(--base-dark)] text-white"
      style={
        {
          "--brand-dark": "#020D1F",
          "--base-dark": "#0A1628",
          "--base-card": "#1B263B",
          "--accent": "#00B4D8",
          "--success": "#2EC4B6",
          "--light": "#E0E1DD",
          "--muted": "#6C757D",
        } as React.CSSProperties
      }
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        section {
          scroll-margin-top: 120px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes glow {
          0%, 100% { opacity: .35; }
          50% { opacity: .82; }
        }

        .float {
          animation: float 5s ease-in-out infinite;
        }

        .glowPulse {
          animation: glow 4s ease-in-out infinite;
        }
      `}</style>

      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-[#00B4D8]/10 bg-[#020D1F]/88 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
            : "bg-[#020D1F]"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-2 md:gap-8 md:px-6 md:py-3">
          <Brand />

          <nav className="hidden justify-center gap-10 text-[15px] font-semibold text-[#E0E1DD] md:flex">
            <a href="#solucoes" className="transition hover:text-[#00B4D8]">
              Soluções
            </a>

            <a href="#tecnologias" className="transition hover:text-[#00B4D8]">
              Tecnologias
            </a>

            <a href="#projetos" className="transition hover:text-[#00B4D8]">
              Projetos
            </a>

            <a href="#sobre" className="transition hover:text-[#00B4D8]">
              Sobre
            </a>

            <a href="#contato" className="transition hover:text-[#00B4D8]">
              Contato
            </a>
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#00B4D8] px-4 py-2 text-xs font-bold text-[#020D1F] transition hover:bg-[#2EC4B6] hover:shadow-[0_12px_35px_rgba(0,180,216,0.28)] md:px-5 md:py-2.5 md:text-sm"
          >
            WhatsApp
          </a>
        </div>
      </header>
            <section className="relative bg-[#0A1628] pt-[208px] md:pt-[220px]">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[#00B4D8]/5 blur-3xl" />
        <div className="absolute -right-40 top-52 h-96 w-96 rounded-full bg-[#00B4D8]/20 blur-3xl glowPulse" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#2EC4B6]/10 blur-3xl glowPulse" />

        <div className="relative mx-auto grid min-h-[calc(100vh-90px)] max-w-7xl items-center gap-10 px-4 pb-32 sm:px-6 md:grid-cols-2 md:pb-24">
          <div className="relative z-10">
           <div className="mb-7 inline-flex rounded-full border border-[#00B4D8]/35 bg-[#0D1B2A]/70 px-4 py-2 text-sm font-semibold text-[#00B4D8] shadow-[0_0_28px_rgba(0,180,216,0.18)] backdrop-blur-md">
              BI • Automação • APIs • Deploy • Inteligência de Negócio
            </div>

            <h1 className="max-w-4xl font-black leading-[1.08] tracking-tight text-white [font-size:clamp(2.45rem,11vw,4.6rem)] md:leading-[1.05] md:[font-size:clamp(2.4rem,4.6vw,4.6rem)]">
              Transforme seus dados em{" "}
              <span className="text-[#00B4D8]">decisões reais</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#E0E1DD] md:text-xl">
              Especialista em BI, automação corporativa, integração ERP, APIs, Power BI, SAP Business One, Microsoft 365 e deploy de         aplicações empresariais.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-bold text-[#E0E1DD]">
              <span className="text-[#00B4D8]">↗</span>
              <span>Menos retrabalho</span>
              <span className="hidden h-5 w-px bg-white/20 sm:block" />
              <span>Mais visibilidade financeira</span>
              <span className="hidden h-5 w-px bg-white/20 sm:block" />
              <span>Decisão com dados</span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-[#00B4D8] px-8 py-4 text-center font-black text-[#020D1F] transition hover:bg-[#2EC4B6]"
              >
                Quero meu diagnóstico
              </a>

              <a
                href="#projetos"
                className="rounded-xl border border-[#00B4D8]/40 px-8 py-4 text-center font-black text-[#E0E1DD] transition hover:border-[#00B4D8] hover:text-[#00B4D8]"
              >
                Ver projetos
              </a>
            </div>
          </div>

          <div className="relative z-10 float">
            <div className="rounded-3xl border border-[#00B4D8]/30 bg-[#1B263B]/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-bold text-[#00B4D8]">
                  Dashboard Operacional
                </span>

                <span className="rounded-full bg-[#2EC4B6]/20 px-3 py-1 text-xs text-[#2EC4B6]">
                  Online
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-[#0A1628] p-5">
                  <p className="text-sm text-[#6C757D]">
                    Recebimentos monitorados
                  </p>
                  <h3 className="mt-2 text-3xl font-black text-[#00B4D8]">
                    R$ 842k
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#0A1628] p-5">
                  <p className="text-sm text-[#6C757D]">
                    Alertas automáticos
                  </p>
                  <h3 className="mt-2 text-3xl font-black text-[#2EC4B6]">
                    128
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#0A1628] p-5 md:col-span-2">
                  <p className="mb-4 text-sm text-[#6C757D]">
                    Fluxo de automação
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                   {dashboardStack.map((item, index) => (
                 <div key={item.name} className="flex items-center gap-3">
                 <span className="flex items-center gap-2 rounded-xl border border-[#00B4D8]/10 bg-[#1B263B] px-4 py-2">
                  <Image
                   src={item.logo}
                   alt={item.name}
                   width={20}
                   height={20}
                   className="object-contain"
                 />

                 {item.name}
              </span>

               {index < dashboardStack.length - 1 && (
                <span className="text-[#00B4D8]">→</span>
                )}
              </div>
             ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="solucoes" className="bg-[#1B263B] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#00B4D8]">
            O que eu resolvo
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-black md:text-5xl">
            Menos operação manual. Mais controle, dados e ação.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {solutions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-[#00B4D8]/20 bg-[#0A1628] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#00B4D8] hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00B4D8]/10 text-[#00B4D8] shadow-lg shadow-cyan-500/10 transition-all duration-300 group-hover:bg-[#00B4D8]/20 group-hover:shadow-cyan-500/30">
                    <Icon size={28} strokeWidth={2.2} />
                  </div>

                  <p className="text-lg font-bold text-[#E0E1DD]">
                    {item.title}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#6C757D]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
            <section id="tecnologias" className="bg-[#0A1628] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#00B4D8]">
            Tecnologias e plataformas
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black md:text-5xl">
            Stack real para integrar ERP, dados, automação e decisão.
          </h2>

          <div className="mt-14 space-y-12">
            {technologyGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#00B4D8]/20" />
                  <h3 className="text-center text-sm font-black uppercase tracking-[0.18em] text-[#00B4D8] md:tracking-[0.24em]">
                    {group.title}
                  </h3>
                  <div className="h-px flex-1 bg-[#00B4D8]/20" />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex min-h-[124px] flex-col items-center justify-center rounded-3xl border border-[#00B4D8]/10 bg-[#1B263B]/60 p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#00B4D8]/50 hover:shadow-2xl hover:shadow-cyan-500/10 md:min-h-[150px] md:p-5"
                    >
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={72}
                        height={72}
                        className="h-14 w-14 object-contain transition duration-300 group-hover:scale-110 md:h-16 md:w-16"
                      />

                      <p className="mt-4 text-xs font-bold text-[#E0E1DD] md:text-sm">
                        {tech.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projetos" className="bg-[#020D1F] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#00B4D8]">
            Projetos em destaque
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black md:text-5xl">
            Cases reais de automação, integração e inteligência operacional.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#E0E1DD] md:text-lg">
            Clique em qualquer case para abrir a solução completa, visualizar as
            telas em tamanho maior e entender o problema, a solução aplicada e o
            impacto gerado.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {projects.map((project) => {
              const Icon = project.icon;

              return (
                <article
                  key={project.title}
                  onClick={() => openCase(project)}
                  className="group cursor-pointer overflow-hidden rounded-3xl border border-[#00B4D8]/20 bg-[#1B263B] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-[#00B4D8] hover:shadow-2xl hover:shadow-cyan-500/10 md:p-6"
                >
                  <div className="relative mb-7 h-56 overflow-hidden rounded-2xl border border-[#00B4D8]/20 bg-[#0A1628] md:mb-8 md:h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#020D1F]/80 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full border border-[#00B4D8]/30 bg-[#020D1F]/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#00B4D8] backdrop-blur md:px-4 md:py-2 md:text-xs">
                      {project.gallery.length} tela(s)
                    </div>

                    <div className="absolute bottom-4 left-4 rounded-full bg-[#00B4D8] px-4 py-2 text-xs font-black text-[#020D1F]">
                      Abrir case
                    </div>
                  </div>

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00B4D8]/10 text-[#00B4D8]">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-2xl font-black">{project.title}</h3>

                  <p className="mt-4 leading-relaxed text-[#E0E1DD]">
                    {project.desc}
                  </p>

                  <p className="mt-6 text-sm font-bold text-[#2EC4B6]">
                    {project.stack}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
            {selectedCase && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 px-3 py-4 backdrop-blur-md md:px-4 md:py-8"
          onClick={() => {
            setSelectedCase(null);
            setSelectedImage(null);
          }}
        >
          <div
            className="relative max-h-[94vh] w-full max-w-7xl overflow-y-auto rounded-[28px] border border-[#00B4D8]/25 bg-[#0A1628] p-4 shadow-2xl shadow-cyan-500/20 md:rounded-[36px] md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setSelectedCase(null);
                setSelectedImage(null);
              }}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#00B4D8] hover:text-[#00B4D8] md:right-5 md:top-5 md:h-11 md:w-11"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
              <div>
                <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-[#00B4D8]/20 bg-[#020D1F] p-3 md:min-h-[520px] md:p-4">
                  <Image
                    src={selectedImage || selectedCase.image}
                    alt={selectedCase.title}
                    fill
                    className="object-contain p-3 md:p-4"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm font-bold text-[#E0E1DD]">
                    Toque nas miniaturas abaixo para trocar a tela exibida.
                  </p>

                  <span className="w-fit rounded-full border border-[#00B4D8]/20 bg-[#00B4D8]/5 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#00B4D8]">
                    Galeria do case
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:gap-4">
                  {selectedCase.gallery.map((img) => (
                    <button
                      key={img}
                      onClick={() => setSelectedImage(img)}
                      className={`relative h-28 overflow-hidden rounded-2xl border bg-[#020D1F] transition hover:-translate-y-1 hover:border-[#00B4D8] md:h-44 ${
                        selectedImage === img
                          ? "border-[#00B4D8] shadow-lg shadow-cyan-500/20"
                          : "border-[#00B4D8]/20"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={selectedCase.title}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#020D1F]/70 to-transparent opacity-80" />

                      <span className="absolute bottom-3 left-3 rounded-full bg-[#020D1F]/80 px-3 py-1 text-xs font-bold text-[#00B4D8]">
                        Visualizar
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <aside className="lg:sticky lg:top-6 lg:self-start">
                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#00B4D8]">
                  Case real
                </p>

                <h3 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">
                  {selectedCase.title}
                </h3>

                <p className="mt-5 text-base leading-relaxed text-[#E0E1DD] md:text-lg">
                  {selectedCase.desc}
                </p>

                <div className="mt-8 space-y-5">
                  <div className="rounded-2xl border border-[#00B4D8]/10 bg-[#020D1F] p-5">
                    <h4 className="font-black text-[#00B4D8]">Problema</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#E0E1DD]">
                      {selectedCase.problem}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#00B4D8]/10 bg-[#020D1F] p-5">
                    <h4 className="font-black text-[#00B4D8]">
                      Solução aplicada
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#E0E1DD]">
                      {selectedCase.solution}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#00B4D8]/10 bg-[#020D1F] p-5">
                    <h4 className="font-black text-[#00B4D8]">Impacto</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#E0E1DD]">
                      {selectedCase.impact}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#2EC4B6]/20 bg-[#020D1F] p-5">
                    <h4 className="font-black text-[#2EC4B6]">
                      Stack utilizada
                    </h4>

                    <p className="mt-2 text-sm font-bold text-[#E0E1DD]">
                      {selectedCase.stack}
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00B4D8] px-8 py-4 font-black text-[#020D1F] transition hover:bg-[#2EC4B6]"
                >
                  Quero uma solução parecida
                  <ArrowRight size={18} />
                </a>
              </aside>
            </div>
          </div>
        </div>
      )}

      <section id="sobre" className="bg-[#1B263B] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#00B4D8]">
              Sobre
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Tecnologia aplicada ao negócio, não só painel bonito.
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-relaxed text-[#E0E1DD]">
            <p>
              A Mota Inteligência de Negócio foi criada para ajudar empresas que
              já possuem dados, sistemas e processos, mas ainda não conseguem
              transformar isso em decisão, eficiência e resultado.
            </p>

            <p>
              O foco é unir BI, automação, integração de sistemas e inteligência
              operacional para reduzir retrabalho, melhorar controles e acelerar
              decisões.
            </p>

            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#00B4D8]/10 bg-[#0A1628] px-4 py-3 text-sm font-semibold text-[#E0E1DD]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="relative bg-[#0A1628] px-6 py-24 text-center"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#00B4D8]/20 bg-[#1B263B] px-8 py-14 shadow-2xl shadow-cyan-500/10">
          <Globe2 className="mx-auto mb-6 text-[#00B4D8]" size={42} />

          <h2 className="text-3xl font-black md:text-5xl">
            Quer transformar dados em decisões reais?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[#E0E1DD]">
            Vamos identificar gargalos, automatizar processos e criar
            inteligência de negócio para sua operação.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-xl bg-[#00B4D8] px-8 py-4 font-black text-[#020D1F] transition hover:bg-[#2EC4B6]"
            >
              Falar no WhatsApp
            </a>

            <a
              href={`mailto:${email}`}
              className="inline-block rounded-xl border border-[#00B4D8]/40 px-8 py-4 font-black text-[#E0E1DD] transition hover:border-[#00B4D8] hover:text-[#00B4D8]"
            >
              Enviar e-mail
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#00B4D8]/10 bg-[#020D1F] px-6 py-12 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Brand footer />
            <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-[#E0E1DD]">
              BI, automação e integração para empresas que querem operar com
              clareza, controle e inteligência.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">Menu</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#E0E1DD]">
              <li>
                <a href="#solucoes" className="hover:text-[#00B4D8]">
                  Soluções
                </a>
              </li>
              <li>
                <a href="#tecnologias" className="hover:text-[#00B4D8]">
                  Tecnologias
                </a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-[#00B4D8]">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#00B4D8]">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#00B4D8]">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Serviços</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#E0E1DD]">
              <li>BI e dashboards</li>
              <li>Automação de processos</li>
              <li>Integração com ERP</li>
              <li>APIs e dados corporativos</li>
              <li>Intranet e portais internos</li>
              <li>Relatórios SAP personalizados</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#E0E1DD]">
              <li>
                <a href={`mailto:${email}`} className="hover:text-[#00B4D8]">
                  {email}
                </a>
              </li>
              <li>
                <a href="tel:+5531987212604" className="hover:text-[#00B4D8]">
                  +55 (31) 98721-2604
                </a>
              </li>
              <li>Belo Horizonte • MG</li>
              <li className="font-semibold text-[#00B4D8]">
                motainteligencia.com.br
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#6C757D] md:flex-row">
          <p>
            © 2026 Mota Inteligência de Negócio. Todos os direitos reservados.
          </p>
          <p>Dados • Automação • Inteligência de Negócio</p>
        </div>
      </footer>
    </main>
  );
}