import type {
  Project,
  ProjectCategory,
  ProjectCategoryDefinition,
  ProjectStatus,
} from "@/types/project";

export const projectCategories: ProjectCategoryDefinition[] = [
  {
    slug: "plataformas",
    label: "Plataformas",
    description: "Soluções ponta a ponta que conectam sistemas, dados e operação.",
  },
  {
    slug: "sap-business-one",
    label: "SAP Business One",
    description: "Integrações, documentos e inteligência operacional conectados ao ERP.",
  },
  {
    slug: "automacao",
    label: "Automação",
    description: "Fluxos rastreáveis para reduzir etapas manuais e tratar exceções.",
  },
  {
    slug: "dados",
    label: "Dados",
    description: "Modelos e produtos analíticos para decisões operacionais e executivas.",
  },
  {
    slug: "infraestrutura",
    label: "Infraestrutura",
    description: "Deploy, observabilidade e sustentação de aplicações empresariais.",
  },
  {
    slug: "aplicacoes",
    label: "Aplicações",
    description: "Ferramentas que traduzem processos de negócio em experiências úteis.",
  },
];

export const projectStatusLabels: Record<ProjectStatus, string> = {
  production: "Em produção",
  rollout: "Em rollout",
  development: "Em desenvolvimento",
  completed: "Concluído",
  planned: "Planejado",
};

export const projects: Project[] = [
  {
    slug: "sap-commerce-integration-platform",
    title: "SAP Commerce Integration Platform",
    shortTitle: "SAP Commerce Platform",
    summary:
      "Plataforma de integração ponta a ponta entre canais de comércio digital e SAP Business One, da captura do pedido ao ciclo financeiro, com conciliação como próxima fase arquitetural.",
    description:
      "Uma engenharia própria para normalizar pedidos, aplicar regras de domínio, criar documentos no ERP e manter cada etapa rastreável e recuperável.",
    status: "rollout",
    featured: true,
    categories: [
      "plataformas",
      "sap-business-one",
      "automacao",
      "infraestrutura",
    ],
    technologies: [
      "SAP Business One",
      "Service Layer",
      "n8n",
      "Python",
      "FastAPI",
      "SQL Server",
      "Docker",
      "Redis",
      "Microsoft Teams",
    ],
    stackLabel:
      "SAP Business One · Service Layer · n8n · FastAPI · SQL Server · Docker · Redis",
    icon: "network",
    image: "/logo-mota.png",
    problem:
      "Pedidos de comércio digital precisam chegar ao ERP com cliente, itens, entrega e pagamento consistentes. Sem uma camada de integração, o ciclo depende de lançamentos, planilhas e conferências manuais, ampliando o risco de duplicidade e perda de rastreabilidade.",
    context:
      "A plataforma foi desenhada para uma operação industrial de médio porte com diferentes canais digitais. A versão pública é sanitizada: credenciais, endpoints, dados corporativos e regras proprietárias não fazem parte do case.",
    businessRelevance:
      "O projeto conecta venda, operação e financeiro em uma base extensível. Novos canais podem ser incorporados sem replicar as regras críticas do SAP Business One em cada conector.",
    role:
      "Atuação como arquiteto e desenvolvedor principal, do levantamento e modelagem à integração, testes, deploy, observabilidade e sustentação, incluindo a coordenação de dependências com negócio, financeiro, parceiro SAP e infraestrutura.",
    solution:
      "Eventos de pedidos são capturados, convertidos para um modelo canônico e validados antes de chegar aos serviços de domínio. A escrita no ERP ocorre exclusivamente pelo Service Layer; um banco de integração separado mantém estado, idempotência, staging, logs, quarentena e auditoria.",
    architecture:
      "Conectores de canal alimentam um orquestrador. A validação e os serviços de domínio permanecem separados dos workflows visuais, enquanto adaptadores controlam a comunicação com o SAP e a persistência operacional sustenta reprocessamento e observabilidade.",
    architectureLayers: [
      {
        title: "Canais",
        description: "Webhooks, polling e conectores para marketplaces e e-commerce.",
      },
      {
        title: "Orquestração",
        description: "n8n, filas, retry limitado, feature flags e reprocessamentos.",
      },
      {
        title: "Domínio",
        description: "FastAPI, validações, modelo canônico, pedidos e pagamentos.",
      },
      {
        title: "ERP",
        description: "Service Layer como fronteira de escrita no SAP Business One.",
      },
      {
        title: "Controle",
        description: "SQL Server, Redis, idempotência, staging, logs e quarentena.",
      },
      {
        title: "Operação",
        description: "Correlation IDs, métricas, alertas e Adaptive Cards no Teams.",
      },
    ],
    flow: [
      "O canal informa um pedido pago por webhook ou consulta programada.",
      "A plataforma busca os dados completos e converte o payload para um modelo canônico.",
      "Cliente, documento, endereço, itens e entrega passam por validações.",
      "A chave canal + identificador externo reserva o processamento idempotente.",
      "O Business Partner é resolvido ou criado e o Pedido de Venda é enviado pelo Service Layer.",
      "A fase financeira cria adiantamento, recebimento e referência da transação.",
      "Cada resultado é persistido com correlation ID para auditoria e reprocessamento.",
    ],
    phases: [
      {
        title: "Fase Comercial",
        status: "production",
        summary:
          "Captura, normalização e criação controlada do pedido de venda no SAP Business One.",
        items: [
          "Conectores para Mercado Livre, Nuvemshop e Shopee",
          "Business Partners e pedidos de venda",
          "Kits, combos e cancelamentos",
          "Idempotência, quarentena e reprocessamento",
        ],
      },
      {
        title: "Fase Financeira",
        status: "rollout",
        summary:
          "Ciclo financeiro entregue e em ativação produtiva controlada por feature flag.",
        items: [
          "Mapeamento de meios de pagamento",
          "Adiantamento e recebimento",
          "Referência de transação",
          "Testes de retomada e idempotência",
        ],
      },
      {
        title: "Conciliação",
        status: "development",
        summary:
          "Motor separado para comparar liquidações externas aos documentos esperados no ERP.",
        items: [
          "Ingestão por API ou arquivo",
          "Staging financeiro",
          "Matching, taxas e tolerâncias",
          "Alertas reservados para divergências",
        ],
      },
    ],
    engineeringDecisions: [
      "Separar regras de domínio da orquestração visual.",
      "Usar o Service Layer como única fronteira de escrita no ERP.",
      "Manter estado e auditoria fora da base transacional do SAP.",
      "Aplicar idempotência por canal e identificador externo.",
      "Limitar retries com backoff e encaminhar erros de negócio para quarentena.",
      "Ativar canais e fases progressivamente por feature flags.",
    ],
    security: [
      "Credenciais por variáveis de ambiente ou cofre de segredos.",
      "Privilégio mínimo em banco, APIs e ERP.",
      "Assinatura, segredo compartilhado ou token nos webhooks.",
      "Mascaramento de dados pessoais, fiscais e financeiros em logs.",
      "Separação entre desenvolvimento, homologação e produção.",
    ],
    observability: [
      "Correlation ID mantido de ponta a ponta.",
      "Registro de canal, etapa, status, tentativa, duração e documentos relacionados.",
      "Estados explícitos para execução, retry, quarentena e falha terminal.",
      "Alertas para indisponibilidade, retry esgotado, crescimento da quarentena e divergências.",
    ],
    results: [
      "Eliminação de etapas manuais no fluxo integrado.",
      "Menor risco de duplicidade e inconsistência cadastral.",
      "Rastreabilidade por etapa e reprocessamento seguro.",
      "Automação do ciclo financeiro.",
      "Base preparada para novos canais e conciliação.",
    ],
    limitations: [
      "A versão pública não expõe workflows produtivos, payloads, endpoints ou regras proprietárias.",
      "A conciliação permanece em desenvolvimento e não é apresentada como funcionalidade concluída.",
      "As plataformas integráveis são públicas, mas o material não as associa a clientes, contas ou operações identificáveis.",
    ],
    roadmap: [
      "Encerrar a janela de rollout e estabilização da fase financeira.",
      "Implementar ingestão de liquidações e matching da conciliação.",
      "Homologar alertas de exceção com o financeiro.",
      "Evoluir métricas de SLA, painel operacional e gestão de reprocessamentos.",
      "Adicionar novos conectores de forma progressiva.",
    ],
    gallery: [],
    repositoryUrl:
      "https://github.com/rmota13/sap-business-one-integration-platform",
    updatedAt: "2026-08-03",
    seo: {
      title: "SAP Commerce Integration Platform",
      description:
        "Case técnico de integração entre canais de comércio digital e SAP Business One com Service Layer, n8n, FastAPI, SQL Server, Redis e observabilidade.",
    },
  },
  {
    slug: "gestao-inteligente-pedidos-abertos",
    title: "Gestão Inteligente de Pedidos em Aberto",
    shortTitle: "Pedidos em Aberto",
    summary:
      "Dashboard operacional integrado ao SAP Business One para acompanhar a carteira de pedidos, gargalos, inatividade e prioridades comerciais.",
    status: "production",
    categories: ["sap-business-one", "dados"],
    technologies: ["Power BI", "SAP Business One", "SQL Server", "n8n"],
    stackLabel: "Power BI · SAP Business One · SQL Server · n8n",
    icon: "activity",
    image: "/cases/pbi-pedidos-abertos.png",
    problem:
      "A operação possuía baixa visibilidade sobre pedidos em aberto e dificuldade para localizar rapidamente gargalos, pedidos sem atividade ou dependências financeiras.",
    role:
      "Modelagem dos indicadores, integração com o ERP e construção da experiência de acompanhamento operacional.",
    solution:
      "Dashboard em Power BI integrado ao SAP Business One, consolidando indicadores críticos da carteira e pontos de atenção para priorização.",
    architecture:
      "Dados do ERP são preparados no SQL Server, modelados para leitura operacional e apresentados em uma camada analítica orientada a exceções.",
    results: [
      "Maior visibilidade da carteira e melhor capacidade de priorizar gargalos comerciais e operacionais.",
    ],
    gallery: [
      {
        src: "/cases/pbi-pedidos-abertos.png",
        alt: "Dashboard de gestão de pedidos em aberto",
      },
    ],
    seo: {
      description:
        "Projeto de inteligência operacional para pedidos em aberto no SAP Business One com Power BI e SQL Server.",
    },
  },
  {
    slug: "cobranca-inteligente",
    title: "Cobrança Inteligente",
    summary:
      "Automação de leitura financeira com análise contextual, concentração de risco e monitoramento executivo.",
    status: "production",
    categories: ["automacao", "dados"],
    technologies: ["SQL Server", "n8n", "Microsoft Teams"],
    stackLabel: "SQL Server · n8n · Microsoft Teams",
    icon: "dollar-sign",
    image: "/cases/n8n-cobranca-inteligente.png",
    problem:
      "O financeiro precisava consolidar manualmente títulos vencidos, identificar exposição e interpretar cenários críticos.",
    role:
      "Desenho do fluxo, consulta financeira, automação e entrega do resumo no canal operacional.",
    solution:
      "Fluxo com SQL Server, n8n e Teams para estruturar títulos vencidos e produzir uma leitura contextual para priorização.",
    architecture:
      "A consulta financeira alimenta uma automação que consolida contexto e entrega somente a informação necessária para acompanhamento.",
    results: [
      "Redução do trabalho de consolidação e acesso mais rápido ao contexto necessário para priorizar cobranças.",
    ],
    gallery: [
      {
        src: "/cases/n8n-cobranca-inteligente.png",
        alt: "Fluxo de automação da cobrança inteligente",
      },
      {
        src: "/cases/teams-cobranca-inteligente.png",
        alt: "Resumo executivo da cobrança inteligente no Microsoft Teams",
      },
    ],
    seo: {
      description:
        "Automação de cobrança e leitura financeira com SQL Server, n8n e Microsoft Teams.",
    },
  },
  {
    slug: "cotacoes-acima-35-mil",
    title: "Monitoramento de cotações relevantes",
    summary:
      "Automação para identificar oportunidades comerciais de maior valor, estruturar contexto e gerar alerta executivo.",
    status: "production",
    categories: ["automacao", "dados"],
    technologies: ["SQL Server", "n8n", "Microsoft Teams"],
    stackLabel: "SQL Server · n8n · Microsoft Teams",
    icon: "bar-chart",
    image: "/cases/n8n-cotacao-35k.png",
    problem:
      "Oportunidades comerciais relevantes nem sempre recebiam priorização compatível com o valor e o histórico da negociação.",
    role:
      "Definição do critério de monitoramento, construção do fluxo e organização do contexto comercial.",
    solution:
      "Automação para localizar cotações dentro do critério aprovado, compor uma leitura comercial e enviar o alerta no Teams.",
    architecture:
      "A consulta seleciona eventos relevantes, a automação enriquece o contexto e o Teams funciona como ponto de ação para a equipe.",
    results: [
      "Maior visibilidade e priorização consistente de oportunidades comerciais relevantes.",
    ],
    gallery: [
      {
        src: "/cases/n8n-cotacao-35k.png",
        alt: "Fluxo de monitoramento de cotações relevantes",
      },
      {
        src: "/cases/teams-cotacoes-35.png",
        alt: "Resumo de oportunidades comerciais no Microsoft Teams",
      },
      {
        src: "/cases/teams-cotacoes-35-detalhe.png",
        alt: "Detalhamento de oportunidades comerciais no Microsoft Teams",
      },
    ],
    seo: {
      description:
        "Automação comercial para monitorar cotações relevantes com SQL Server, n8n e Microsoft Teams.",
    },
  },
  {
    slug: "pedidos-mais-48-horas",
    title: "Pedidos com mais de 48 horas",
    summary:
      "Rotina automatizada para identificar pedidos pendentes de autorização, reduzir gargalos e acionar responsáveis.",
    status: "production",
    categories: ["sap-business-one", "automacao", "dados"],
    technologies: ["SAP Business One", "SQL Server", "n8n", "Power BI"],
    stackLabel: "SAP Business One · SQL Server · n8n · Power BI",
    icon: "bot",
    image: "/cases/pbi-pedidos-48h.png",
    problem:
      "Pedidos pendentes por mais de 48 horas geravam risco operacional, atraso de processo e pouca visibilidade para acompanhamento.",
    role:
      "Consulta no ERP, camada de acompanhamento e automação do alerta aos responsáveis.",
    solution:
      "Consulta SQL, painel de acompanhamento e alerta automático para dar visibilidade aos pedidos fora do tempo esperado.",
    architecture:
      "O ERP fornece o estado dos pedidos, a camada de dados identifica exceções e o fluxo automatizado distribui os alertas.",
    results: [
      "Mais controle sobre pedidos pendentes e melhor acompanhamento do fluxo comercial e operacional.",
    ],
    gallery: [
      {
        src: "/cases/pbi-pedidos-48h.png",
        alt: "Monitor de pedidos pendentes há mais de 48 horas",
      },
      {
        src: "/cases/n8n-pedidos-48h.png",
        alt: "Fluxo de alerta de pedidos pendentes no n8n",
      },
    ],
    seo: {
      description:
        "Monitoramento automatizado de pedidos pendentes no SAP Business One com SQL Server, n8n e Power BI.",
    },
  },
  {
    slug: "relatorios-sap-identidade-visual",
    title: "Relatórios SAP com identidade visual",
    summary:
      "Layouts comerciais e operacionais no Crystal Reports com hierarquia de informação e padrão visual consistente.",
    status: "completed",
    categories: ["sap-business-one", "aplicacoes"],
    technologies: ["SAP Business One", "Crystal Reports", "SQL Server"],
    stackLabel: "SAP Business One · Crystal Reports · SQL Server",
    icon: "file-text",
    image: "/cases/cotacao-layout-novo.png",
    problem:
      "Documentos comerciais gerados pelo ERP tinham baixa padronização visual e hierarquia de informação insuficiente.",
    role:
      "Redesenho da informação, desenvolvimento dos layouts e integração com os dados do SAP Business One.",
    solution:
      "Layouts em Crystal Reports com identidade visual, melhor hierarquia e estrutura mais clara para documentos comerciais.",
    architecture:
      "Consultas e parâmetros do SAP alimentam layouts de documento controlados no Crystal Reports.",
    results: [
      "Comunicação documental mais consistente e leitura mais clara das informações comerciais.",
    ],
    gallery: [
      {
        src: "/cases/cotacao-layout-antigo.png",
        alt: "Layout anterior de cotação gerada pelo SAP Business One",
      },
      {
        src: "/cases/cotacao-layout-novo.png",
        alt: "Novo layout de cotação gerada pelo SAP Business One",
      },
    ],
    seo: {
      description:
        "Projeto de relatórios e documentos do SAP Business One com Crystal Reports e SQL Server.",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectCategory(slug: ProjectCategory) {
  return projectCategories.find((category) => category.slug === slug);
}

export function getFeaturedProject() {
  return projects.find((project) => project.featured);
}
