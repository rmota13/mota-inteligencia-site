import type {
  Ecosystem,
  Solution,
  TechnologyGroup,
  ValuePillar,
  WorkStep,
} from "@/types/home";

export const valuePillars: ValuePillar[] = [
  {
    title: "Problema antes da ferramenta",
    description:
      "Cada solução começa pelo processo, pelo impacto no negócio e pelos riscos que precisam ser controlados.",
    icon: "layers",
  },
  {
    title: "Integração ponta a ponta",
    description:
      "Sistemas, dados e equipes conectados com validação, rastreabilidade e tratamento explícito de exceções.",
    icon: "network",
  },
  {
    title: "Engenharia para operar",
    description:
      "Deploy, monitoramento, segurança e evolução fazem parte da entrega — não ficam para depois.",
    icon: "shield",
  },
];

export const ecosystems: Ecosystem[] = [
  {
    title: "ERP e operação",
    description:
      "Integração de processos comerciais, financeiros e operacionais sem contornar as regras do sistema de gestão.",
    examples: ["SAP Business One", "Service Layer", "SQL Server"],
    icon: "database",
  },
  {
    title: "Canais e plataformas",
    description:
      "Conectores para receber eventos, normalizar contratos e preparar novos canais sem replicar regras críticas.",
    examples: ["Marketplaces", "E-commerce", "APIs REST"],
    icon: "plug",
  },
  {
    title: "Microsoft 365",
    description:
      "Fluxos de trabalho, portais internos e comunicação operacional integrados ao ambiente já utilizado pelas equipes.",
    examples: ["Teams", "Power Platform", "SharePoint"],
    icon: "cloud",
  },
  {
    title: "Dados, BI e IA",
    description:
      "Pipelines, indicadores e análises que transformam dados operacionais em contexto confiável para decisão.",
    examples: ["Qlik Cloud", "Power BI", "AWS e IA aplicada"],
    icon: "brain",
  },
];

export const solutions: Solution[] = [
  {
    title: "Integrações & Automação",
    description:
      "Conectar ERP, APIs, e-commerce, Microsoft 365 e sistemas internos para eliminar tarefas manuais e fluxos frágeis.",
    outcome: "Menos retrabalho, mais rastreabilidade e processos preparados para escalar.",
    icon: "workflow",
  },
  {
    title: "Dados, BI & Confiabilidade",
    description:
      "Estruturar indicadores, pipelines, auditorias e monitoramento para que a decisão seja feita sobre dados realmente confiáveis.",
    outcome: "Dashboards que não apenas atualizam: entregam informação validada e utilizável.",
    icon: "bar-chart",
  },
  {
    title: "IA aplicada ao negócio",
    description:
      "Aplicar IA em classificação, análise, geração de insights e automações onde há contexto, supervisão e ganho operacional real.",
    outcome: "Inteligência incorporada ao processo sem abrir mão de controle e governança.",
    icon: "sparkles",
  },
  {
    title: "Sustentação & Evolução",
    description:
      "Acompanhar integrações, automações e soluções críticas depois do go-live, com diagnóstico, correções e melhorias contínuas.",
    outcome: "Menos dependência de conhecimento isolado e uma operação que continua evoluindo.",
    icon: "activity",
  },
];

export const technologyGroups: TechnologyGroup[] = [
  {
    title: "Sistemas e dados",
    description:
      "A base transacional e analítica onde processos, documentos e indicadores precisam permanecer consistentes.",
    icon: "database",
    items: [
      { name: "SAP Business One", role: "ERP e processos empresariais" },
      { name: "SQL Server", role: "Dados, staging e rastreabilidade" },
      { name: "Qlik Cloud", role: "BI, cargas e soluções analíticas" },
      { name: "Power BI", role: "Análise e inteligência operacional" },
    ],
  },
  {
    title: "Integração e automação",
    description:
      "A camada que recebe eventos, coordena etapas e transforma contratos externos em ações de negócio controladas.",
    icon: "workflow",
    items: [
      { name: "n8n", role: "Orquestração de eventos e workflows" },
      { name: "FastAPI", role: "Serviços de domínio e APIs" },
      { name: "Python", role: "Automação, dados e processamento" },
      { name: "REST e Webhooks", role: "Contratos entre plataformas" },
    ],
  },
  {
    title: "Operação e plataforma",
    description:
      "Infraestrutura, observabilidade e serviços que permitem implantar, monitorar e evoluir soluções com segurança.",
    icon: "server",
    items: [
      { name: "AWS", role: "Dados, serviços e arquitetura cloud" },
      { name: "Docker e Linux", role: "Execução e isolamento de serviços" },
      { name: "Microsoft Teams", role: "Operação, alertas e colaboração" },
      { name: "Power Platform", role: "Fluxos e aplicações internas" },
    ],
  },
];

export const workSteps: WorkStep[] = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Entendimento do processo, das restrições e do impacto esperado.",
  },
  {
    number: "02",
    title: "Arquitetura",
    description: "Definição de fronteiras, contratos, dados, riscos e estratégia de evolução.",
  },
  {
    number: "03",
    title: "Implementação",
    description: "Construção incremental com regras de domínio e critérios verificáveis.",
  },
  {
    number: "04",
    title: "Integração",
    description: "Conexão dos sistemas, validações, exceções e caminhos de reprocessamento.",
  },
  {
    number: "05",
    title: "Deploy",
    description: "Publicação controlada, configuração de ambientes e ativação progressiva.",
  },
  {
    number: "06",
    title: "Monitoramento",
    description: "Logs, estados, alertas e evidências para sustentar a operação.",
  },
  {
    number: "07",
    title: "Evolução",
    description: "Aprendizado produtivo convertido em melhorias e novas capacidades.",
  },
];

export const professionalCapabilities = [
  "Dados, BI e confiabilidade",
  "Arquitetura de integrações",
  "Automação de processos",
  "IA aplicada ao negócio",
  "SAP Business One e APIs",
  "Observabilidade e operação",
] as const;
