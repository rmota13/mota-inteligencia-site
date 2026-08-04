import type {
  Ecosystem,
  Solution,
  TechnologyGroup,
  ValuePillar,
  WorkStep,
} from "@/types/home";

export const valuePillars: ValuePillar[] = [
  {
    title: "Arquitetura antes da ferramenta",
    description:
      "Cada solução começa pelo fluxo de negócio, pelas fronteiras entre sistemas e pelos riscos que precisam ser controlados.",
    icon: "layers",
  },
  {
    title: "Integração ponta a ponta",
    description:
      "Dados percorrem canais, APIs, automações e ERP com validação, rastreabilidade e tratamento explícito de exceções.",
    icon: "network",
  },
  {
    title: "Engenharia para operar",
    description:
      "Deploy, observabilidade, segurança e evolução fazem parte da entrega — não são etapas deixadas para depois.",
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
    title: "Dados e inteligência",
    description:
      "Modelos, indicadores e automações que transformam eventos operacionais em contexto para decisão.",
    examples: ["Power BI", "Engenharia de dados", "IA aplicada"],
    icon: "brain",
  },
];

export const solutions: Solution[] = [
  {
    title: "Integração ERP",
    description:
      "Conectar sistemas ao ERP respeitando contratos, validações, sessões e regras de negócio.",
    outcome: "Menos digitação e maior consistência transacional.",
    icon: "plug",
  },
  {
    title: "Automação",
    description:
      "Orquestrar tarefas, eventos, aprovações e exceções entre áreas e plataformas.",
    outcome: "Processos repetíveis, rastreáveis e recuperáveis.",
    icon: "workflow",
  },
  {
    title: "APIs",
    description:
      "Criar fronteiras estáveis para serviços, integrações e aplicações corporativas.",
    outcome: "Contratos claros e evolução desacoplada.",
    icon: "api",
  },
  {
    title: "Dados e BI",
    description:
      "Organizar dados operacionais e indicadores para leitura financeira, comercial e executiva.",
    outcome: "Decisões apoiadas por contexto confiável.",
    icon: "bar-chart",
  },
  {
    title: "Power Platform",
    description:
      "Construir fluxos, aplicações e pontos de colaboração conectados ao Microsoft 365.",
    outcome: "Operações internas mais fluidas e acessíveis.",
    icon: "cloud",
  },
  {
    title: "Infraestrutura",
    description:
      "Preparar ambientes, containers, redes e rotinas de deploy para aplicações empresariais.",
    outcome: "Operação previsível e evolução controlada.",
    icon: "server",
  },
  {
    title: "IA aplicada",
    description:
      "Aplicar modelos de inteligência artificial onde há contexto, supervisão e ganho operacional real.",
    outcome: "Assistência inteligente sem perder governança.",
    icon: "sparkles",
  },
  {
    title: "Observabilidade",
    description:
      "Estruturar logs, estados, alertas e trilhas de auditoria para acompanhar cada execução.",
    outcome: "Falhas localizáveis e reprocessamento seguro.",
    icon: "eye",
  },
  {
    title: "Arquitetura",
    description:
      "Traduzir objetivos, restrições e riscos em componentes, fluxos e decisões técnicas sustentáveis.",
    outcome: "Soluções preparadas para crescer sem perder clareza.",
    icon: "layers",
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
      { name: "Service Layer", role: "Fronteira oficial de integração" },
      { name: "SQL Server", role: "Dados, staging e rastreabilidade" },
      { name: "Power BI", role: "Análise e leitura operacional" },
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
      { name: "Python", role: "Automação e processamento" },
      { name: "REST e Webhooks", role: "Contratos entre plataformas" },
    ],
  },
  {
    title: "Operação e plataforma",
    description:
      "A infraestrutura que permite implantar, observar, comunicar exceções e evoluir a solução com segurança.",
    icon: "server",
    items: [
      { name: "Docker e Linux", role: "Execução e isolamento de serviços" },
      { name: "Redis", role: "Fila, cache e coordenação" },
      { name: "Microsoft Teams", role: "Operação e Adaptive Cards" },
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
  "Arquitetura de integrações",
  "SAP Business One e Service Layer",
  "APIs REST e FastAPI",
  "Automação com n8n e Power Platform",
  "SQL Server e engenharia de dados",
  "Observabilidade e operação",
] as const;
