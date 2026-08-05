import type { Insight } from "@/types/insight";

const publicRepository =
  "https://github.com/rmota13/sap-business-one-integration-platform";

export const articles: Insight[] = [
  {
    slug: "quando-automacao-vira-plataforma",
    title: "Quando uma automação vira uma plataforma",
    description:
      "A mudança acontece quando novos canais, estados, riscos e ciclos de negócio deixam de caber em um fluxo isolado e passam a exigir fronteiras arquiteturais explícitas.",
    kind: "article",
    status: "published",
    topics: ["Arquitetura", "Automação", "Integrações"],
    publishedAt: "2026-08-04",
    executiveSummary: [
      "Uma automação resolve uma sequência delimitada; uma plataforma coordena diferentes origens, regras de domínio, estados, exceções e fases de evolução.",
      "No SAP Commerce Integration Platform, conectores, orquestração, validação, serviços de domínio, adaptador do ERP, persistência e monitoramento possuem responsabilidades separadas.",
      "A evidência de plataforma não está em um rótulo ou em uma quantidade de integrações, mas na capacidade de adicionar canais e fases sem replicar as regras críticas do ERP.",
    ],
    sections: [
      {
        id: "fluxo-inicial",
        title: "O fluxo inicial ainda parece uma automação",
        paragraphs: [
          "Um pedido pago chega por webhook, a integração consulta os dados completos, valida cliente e itens e cria um Pedido de Venda no SAP Business One. Vista de fora, essa sequência pode ser representada como uma automação linear.",
          "O desenho muda quando a operação precisa atender mais de um canal, suportar polling além de webhook, resolver clientes, tratar kits e cancelamentos, preservar idempotência e reprocessar exceções. Cada nova condição amplia o número de estados e efeitos possíveis.",
          "O problema deixa de ser apenas mover um payload entre dois pontos. Passa a ser manter coerência de negócio ao longo do tempo, inclusive quando um sistema está indisponível, uma notificação é repetida ou uma inconsistência depende de decisão humana.",
        ],
      },
      {
        id: "sinais",
        title: "Sinais de que o workflow isolado perdeu a fronteira",
        paragraphs: [
          "Workflows visuais são adequados para receber eventos, coordenar etapas, agendar consultas e integrar a operação. Eles se tornam frágeis quando contratos do ERP, regras fiscais, resolução de clientes e persistência de estado são duplicados em cada canal.",
          "No projeto documentado, a resposta foi manter a orquestração no n8n e deslocar regras sensíveis para serviços e contratos definidos. Essa separação preserva a velocidade de entrega do orquestrador sem torná-lo o único lugar onde o domínio existe.",
        ],
        items: [
          "A mesma regra precisa ser copiada para cada novo conector.",
          "O workflow precisa conhecer detalhes internos do ERP para tomar decisões.",
          "Não existe uma visão única de estado, tentativa e resultado.",
          "Uma falha parcial torna incerto se o efeito já ocorreu no destino.",
          "Alertas de sucesso e erro se acumulam sem critério operacional.",
          "A evolução de uma fase exige interromper fluxos já estáveis.",
        ],
      },
      {
        id: "fronteiras",
        title: "Fronteiras transformam sequência em arquitetura",
        paragraphs: [
          "A arquitetura pública divide a plataforma em conectores, orquestrador, validação, serviços de domínio, adaptador do SAP, banco de integração e monitoramento. Cada camada responde por uma decisão diferente.",
          "Conectores traduzem particularidades dos canais. O orquestrador controla webhooks, polling, filas, retries e feature flags. A validação garante formato e consistência mínima. Serviços de domínio aplicam regras de cliente, pedido, pagamento e conciliação. O adaptador controla o contrato com o Service Layer.",
          "O banco de integração registra estado, idempotência, staging, logs e quarentena fora do SAP. O monitoramento conecta execução e efeito por correlation ID. Esse arranjo evita usar o ERP como motor de workflow e impede que cada canal replique sua própria versão das mesmas regras.",
        ],
      },
      {
        id: "estado",
        title: "Plataformas precisam tratar estado como parte da entrega",
        paragraphs: [
          "Uma automação simples pode encerrar ao receber uma resposta. Uma plataforma precisa lembrar o que aconteceu. A mesma venda pode atravessar criação do cliente, pedido, adiantamento, recebimento e referência financeira, com retomadas possíveis entre essas etapas.",
          "A idempotência por canal e identificador externo protege contra eventos repetidos. O correlation ID reúne evidências. Retries limitados tratam falhas temporárias, enquanto a quarentena preserva erros de negócio para uma decisão posterior sem criar um ciclo infinito.",
          "Essa memória operacional é o que permite recuperar uma execução sem assumir que tudo falhou ou que tudo foi concluído. Também permite ativar fases progressivamente e recuar uma configuração sem interromper canais já estabilizados.",
        ],
      },
      {
        id: "fases",
        title: "A evolução por fases é uma característica arquitetural",
        paragraphs: [
          "O projeto público separa integração comercial, integração financeira e conciliação. A primeira fase está em produção. A segunda foi entregue tecnicamente e permanece em rollout produtivo. A conciliação tem arquitetura e staging definidos, mas sua ingestão, matching, tolerâncias e homologação ainda estão em desenvolvimento.",
          "Essa distinção é importante porque uma plataforma não precisa declarar todas as capacidades como concluídas para demonstrar arquitetura. Ela precisa tornar explícito o que existe, o que está sendo ativado e o que depende de trabalho futuro.",
          "Feature flags por canal e fase permitem evolução progressiva. A conciliação foi deliberadamente posicionada depois da estabilização do pedido e do ciclo financeiro porque depende de referências consistentes produzidas por essas etapas. O roadmap, portanto, funciona como parte do contrato público de estado.",
        ],
      },
      {
        id: "operacao",
        title: "Operar é tão importante quanto conectar",
        paragraphs: [
          "Uma plataforma de integração precisa responder qual evento falhou, em qual etapa, quantas tentativas ocorreram e se algum documento já foi criado. Sem essas respostas, a equipe depende de inspeção manual e interpretações diferentes para o mesmo incidente.",
          "A decisão do projeto é registrar sucesso e alertar exceções acionáveis. Indisponibilidade do ERP, retry esgotado, quarentena e falha terminal merecem atenção; uma execução normal precisa ser auditável sem produzir ruído individual.",
          "Segurança também atravessa a operação. Credenciais ficam fora do código público, dados pessoais e financeiros são mascarados, e a documentação sanitizada não expõe endpoints, ambientes ou regras proprietárias.",
        ],
      },
      {
        id: "criterio",
        title: "O critério não é tamanho: é capacidade de mudança controlada",
        paragraphs: [
          "Não existe um número universal de workflows ou conectores que transforme uma automação em plataforma. No case analisado, a mudança está na existência de fronteiras reutilizáveis, estado persistido, contratos comuns, recuperação segura e roadmap por fases.",
          "A arquitetura passa a sustentar novas origens sem duplicar regras críticas do SAP Business One. Essa capacidade de mudança controlada, acompanhada por observabilidade e segurança, é uma evidência mais útil do que chamar qualquer conjunto de automações de plataforma.",
        ],
        items: [
          "Regras de domínio reutilizáveis fora dos conectores.",
          "Fronteira única e controlada para escrita no ERP.",
          "Persistência própria para estado, idempotência e auditoria.",
          "Tratamentos distintos para retry, quarentena e falha terminal.",
          "Feature flags e fases com estado público explícito.",
          "Observabilidade capaz de reconstruir a execução.",
        ],
      },
    ],
    faq: [
      {
        question: "Todo conjunto de workflows é uma plataforma?",
        answer:
          "Não. O termo se torna útil quando existem capacidades reutilizáveis, responsabilidades separadas, estado persistido e meios de evoluir canais e fases sem duplicar regras críticas.",
      },
      {
        question: "Usar n8n impede uma arquitetura de plataforma?",
        answer:
          "Não. No projeto analisado, o n8n permanece como orquestrador. Regras de domínio e contratos com o ERP ficam em serviços próprios, enquanto estado e auditoria ficam em uma persistência separada.",
      },
      {
        question: "A conciliação já está concluída?",
        answer:
          "Não. O repositório público registra arquitetura e staging definidos, mas ingestão, matching, tolerâncias, integração e homologação permanecem no roadmap de desenvolvimento.",
      },
    ],
    sources: [
      {
        label: "Arquitetura pública da plataforma",
        url: `${publicRepository}/blob/main/docs/architecture.md`,
      },
      {
        label: "Decisões arquiteturais",
        url: `${publicRepository}/blob/main/docs/decisions.md`,
      },
      {
        label: "Roadmap e estados das fases",
        url: `${publicRepository}/blob/main/docs/roadmap.md`,
      },
      {
        label: "Case público de portfólio",
        url: `${publicRepository}/blob/main/docs/portfolio-case.md`,
      },
    ],
    relatedProjectSlugs: ["sap-commerce-integration-platform"],
    relatedContentSlugs: [
      "arquitetura-sap-commerce-integration-platform",
      "integrar-marketplaces-sap-business-one",
      "idempotencia-em-integracoes",
    ],
    seo: {
      title: "Quando uma automação vira uma plataforma",
      description:
        "Entenda como fronteiras, estado, idempotência, observabilidade e evolução por fases diferenciam uma plataforma de um workflow isolado.",
    },
  },
  {
    slug: "arquitetura-sap-commerce-integration-platform",
    title: "Arquitetura do SAP Commerce Integration Platform",
    description:
      "Uma leitura das camadas, fronteiras e decisões públicas que conectam canais digitais ao SAP Business One sem concentrar o domínio em cada conector.",
    kind: "article",
    status: "published",
    topics: ["SAP Business One", "Arquitetura", "Integrações"],
    publishedAt: "2026-08-04",
    executiveSummary: [
      "A plataforma usa conectores para receber eventos, n8n para orquestração, serviços de domínio para regras de negócio e Service Layer como única fronteira de escrita no SAP Business One.",
      "Um banco de integração separado mantém estado, idempotência, staging, logs e quarentena, enquanto correlation IDs conectam as evidências da execução.",
      "Integração comercial está em produção, integração financeira foi entregue e está em rollout, e conciliação permanece em desenvolvimento conforme o roadmap público.",
    ],
    sections: [
      {
        id: "contexto",
        title: "O contexto que orienta o desenho",
        paragraphs: [
          "Pedidos de comércio digital chegam com estruturas e ciclos próprios, mas precisam produzir clientes, itens, entrega, pedido e documentos financeiros consistentes no ERP. Quando essa tradução depende de lançamentos e conferências manuais, a operação perde rastreabilidade e aumenta a exposição a duplicidade.",
          "O SAP Commerce Integration Platform foi desenhado para uma operação industrial de médio porte com diferentes canais digitais. A versão pública é sanitizada: não contém credenciais, endpoints, dados corporativos, regras fiscais proprietárias ou payloads produtivos.",
          "A arquitetura busca incorporar novos canais sem reimplementar em cada conector as regras críticas do SAP Business One. Esse objetivo explica a separação entre origem, orquestração, domínio, ERP, controle e operação.",
        ],
      },
      {
        id: "canais-orquestracao",
        title: "Canais e orquestração absorvem variação externa",
        paragraphs: [
          "Conectores recebem webhooks ou executam polling e consultam os dados completos de cada canal. Eles traduzem particularidades da origem para uma entrada que pode ser normalizada e validada.",
          "O n8n coordena eventos, agendamentos, filas, retries limitados, feature flags e reprocessamentos. A escolha privilegia velocidade de entrega e visibilidade do fluxo, mas evita concentrar regras de negócio sensíveis dentro dos workflows.",
          "Essa fronteira permite que a orquestração mude sem alterar o contrato central do ERP. Também permite ativar canais ou fases progressivamente, mantendo uma forma explícita de rollback por configuração.",
        ],
      },
      {
        id: "validacao-dominio",
        title: "Validação e domínio preservam significado",
        paragraphs: [
          "Depois da captura, o payload é convertido para um modelo canônico. Cliente, documento, endereço, itens e entrega passam por validações antes que a integração tente produzir qualquer efeito no SAP Business One.",
          "Serviços de domínio aplicam regras de cliente, pedido, pagamento e, futuramente, conciliação. A separação reduz o risco de versões diferentes da mesma regra surgirem em workflows de canais distintos.",
          "FastAPI participa dessa camada como interface explícita para serviços e adaptadores. Seu papel no projeto não é substituir o orquestrador, e sim manter contratos testáveis para decisões que precisam permanecer consistentes entre canais.",
        ],
      },
      {
        id: "fronteira-sap",
        title: "Service Layer é a fronteira de escrita no ERP",
        paragraphs: [
          "Toda criação de documentos no SAP Business One passa pelo Service Layer. A decisão preserva as validações da aplicação e evita escrita direta nas tabelas transacionais do ERP.",
          "O adaptador controla autenticação, sessão e contratos com essa API. Serviços de domínio solicitam a resolução ou criação do Business Partner, a criação do Pedido de Venda e as etapas financeiras sem espalhar detalhes do contrato SAP por cada workflow.",
          "Consultas e estado operacional não transformam a base transacional em banco de workflow. Essa fronteira reduz acoplamento e torna mais claro onde uma operação com efeito deve ser auditada.",
        ],
      },
      {
        id: "controle",
        title: "Banco de integração controla estado e recuperação",
        paragraphs: [
          "Idempotência, staging, logs e quarentena ficam em um banco separado. A combinação canal + identificador externo funciona como chave lógica única para impedir que notificações repetidas criem documentos duplicados.",
          "Cada resultado é registrado com correlation ID e referências dos documentos relacionados. Falhas temporárias seguem retry limitado; inconsistências de negócio são preservadas em quarentena para correção e reprocessamento seguro.",
          "Na fase de conciliação, a persistência separada também recebe dados de liquidação em staging. A origem do pedido e a origem da liquidação permanecem modeladas separadamente porque podem representar sistemas diferentes.",
        ],
      },
      {
        id: "fluxos",
        title: "Fluxo comercial, financeiro e conciliação",
        paragraphs: [
          "No fluxo comercial, o canal informa um pedido pago, o orquestrador consulta os detalhes, normaliza o payload, valida dados e reserva a chave de idempotência. O Business Partner é resolvido ou criado e o Pedido de Venda segue pelo Service Layer.",
          "No ciclo financeiro, a plataforma identifica o meio de pagamento, resolve o código correspondente no ERP, cria o adiantamento, cria o recebimento e registra a referência da transação. O roadmap registra essa entrega técnica em rollout produtivo, ainda com janela de estabilização aberta.",
          "A conciliação é uma fase posterior. Liquidações externas deverão chegar por API ou arquivo, passar por staging, normalização e matching. Taxas, tolerâncias, ajustes e homologação ainda não são apresentados como concluídos.",
        ],
      },
      {
        id: "operacao-seguranca",
        title: "Observabilidade e segurança atravessam todas as camadas",
        paragraphs: [
          "Correlation IDs ajudam a responder qual evento falhou, em qual etapa, quantas tentativas ocorreram e se algum documento foi criado. O padrão registra canal, identificador, etapa, status, tentativa, duração, erro sanitizado e referências relacionadas.",
          "Credenciais são resolvidas por variáveis de ambiente ou cofre de segredos. Webhooks exigem assinatura, segredo ou token, e dados pessoais, fiscais e financeiros devem ser mascarados em logs.",
          "A versão editorial mantém essa mesma disciplina. As fontes públicas sustentam as decisões e os estados exibidos, mas nenhuma métrica de volume, SLA, sucesso ou impacto financeiro foi adicionada porque esses resultados não estão publicados.",
        ],
      },
    ],
    faq: [
      {
        question: "O n8n contém todas as regras da plataforma?",
        answer:
          "Não. Ele coordena eventos, filas, retries, feature flags e reprocessamentos. Regras sensíveis permanecem em serviços de domínio e contratos definidos.",
      },
      {
        question: "A integração escreve diretamente nas tabelas do SAP?",
        answer:
          "Não. A decisão pública do projeto define o Service Layer como única fronteira de escrita no SAP Business One.",
      },
      {
        question: "Qual é o estado atual da conciliação?",
        answer:
          "Arquitetura e modelo de staging estão definidos. Ingestão, matching, tolerâncias, integração, alertas e homologação permanecem em desenvolvimento no roadmap público.",
      },
    ],
    sources: [
      {
        label: "Arquitetura pública",
        url: `${publicRepository}/blob/main/docs/architecture.md`,
      },
      {
        label: "Fluxos de negócio",
        url: `${publicRepository}/blob/main/docs/business-flow.md`,
      },
      {
        label: "Decisões arquiteturais",
        url: `${publicRepository}/blob/main/docs/decisions.md`,
      },
      {
        label: "Segurança e sanitização",
        url: `${publicRepository}/blob/main/docs/security.md`,
      },
      {
        label: "Roadmap público",
        url: `${publicRepository}/blob/main/docs/roadmap.md`,
      },
    ],
    relatedProjectSlugs: ["sap-commerce-integration-platform"],
    relatedContentSlugs: [
      "integrar-marketplaces-sap-business-one",
      "fastapi-como-camada-de-integracao",
      "observabilidade-em-fluxos-n8n",
    ],
    seo: {
      title: "Arquitetura do SAP Commerce Integration Platform",
      description:
        "Conheça as camadas e decisões públicas da integração entre marketplaces, n8n, FastAPI, Service Layer e SAP Business One.",
    },
  },
  {
    slug: "fastapi-como-camada-de-integracao",
    title: "FastAPI como camada de integração: fronteira, não orquestrador",
    description:
      "Como serviços com contratos explícitos podem concentrar domínio e integração com o ERP enquanto o n8n permanece responsável pela coordenação do fluxo.",
    kind: "article",
    status: "published",
    topics: ["FastAPI", "APIs", "SAP Business One"],
    publishedAt: "2026-08-04",
    executiveSummary: [
      "No projeto público, FastAPI aparece na camada de serviços de domínio e no adaptador do SAP, não como substituto do n8n.",
      "A separação impede que contratos do Service Layer e regras críticas sejam replicados em cada workflow de canal.",
      "O benefício arquitetural está na responsabilidade definida: orquestração coordena, domínio decide, adaptador conversa com o ERP e persistência registra estado.",
    ],
    sections: [
      {
        id: "dois-papeis",
        title: "Orquestrar e aplicar domínio são trabalhos diferentes",
        paragraphs: [
          "O n8n é responsável por receber eventos, executar polling, agendar tarefas, controlar filas, aplicar retry limitado e coordenar reprocessamentos. Essas capacidades tornam o fluxo visível e aceleram a integração entre sistemas.",
          "Resolver clientes, validar contratos, criar pedidos e preservar regras compartilhadas entre canais exige outra fronteira. Se cada workflow implementar sua própria versão dessas decisões, qualquer evolução precisa ser repetida e testada em vários lugares.",
          "FastAPI foi usado para expor serviços e adaptadores com contratos definidos. A tecnologia atende a um papel arquitetural específico; o projeto não afirma que ela seja obrigatória para toda integração.",
        ],
      },
      {
        id: "contrato-canonico",
        title: "Um contrato comum começa depois da normalização",
        paragraphs: [
          "Cada marketplace possui um payload próprio. A camada de captura consulta os dados completos e os converte para um modelo canônico antes de invocar as regras de domínio.",
          "Esse contrato reduz a quantidade de particularidades externas que chegam ao serviço. Em vez de conhecer todos os formatos de canal, a camada de domínio recebe dados normalizados e aplica validações de cliente, documento, endereço, itens, entrega e pagamento.",
          "A clareza do contrato também facilita adicionar um novo conector. O canal precisa produzir o modelo esperado, mas não precisa reimplementar a forma como o SAP Business One cria ou resolve os documentos.",
        ],
      },
      {
        id: "adaptador-sap",
        title: "O adaptador protege o contrato com o SAP Business One",
        paragraphs: [
          "O Service Layer é a única fronteira de escrita no ERP. O adaptador gerencia autenticação, sessão e contratos dessa comunicação, evitando que detalhes da API SAP se espalhem pelos workflows.",
          "Serviços de domínio solicitam operações com significado de negócio, como resolver um Business Partner ou criar um Pedido de Venda. O adaptador traduz essa intenção para o contrato externo e devolve referências que podem ser persistidas e auditadas.",
          "Essa separação não elimina falhas de integração, mas delimita onde elas são interpretadas. Também preserva a regra de não escrever diretamente nas tabelas transacionais do SAP.",
        ],
      },
      {
        id: "idempotencia-estado",
        title: "A API não deve esconder idempotência e estado",
        paragraphs: [
          "Um endpoint bem formado ainda pode duplicar efeitos se receber o mesmo evento duas vezes. Por isso, a camada de serviço trabalha com uma chave lógica externa e com a persistência de controle antes de produzir uma escrita no ERP.",
          "O estado fica em um banco de integração separado. Canal, identificador externo, etapa, tentativa, resultado, correlation ID e referências dos documentos ajudam a decidir se uma chamada deve iniciar, retomar ou devolver uma operação já concluída.",
          "FastAPI organiza a fronteira do serviço, mas a garantia depende do desenho completo: contrato, persistência, comportamento de retomada e validação do efeito no destino.",
        ],
      },
      {
        id: "erros",
        title: "Erros temporários e erros de negócio seguem caminhos diferentes",
        paragraphs: [
          "Indisponibilidade ou falha transitória pode justificar retry limitado com backoff. A repetição só é segura porque a operação preserva idempotência.",
          "Uma inconsistência cadastral não melhora com novas tentativas automáticas. O projeto encaminha erros não resolvíveis para quarentena com contexto sanitizado e correlation ID, permitindo correção e reprocessamento posterior.",
          "A camada de serviço precisa devolver informações suficientes para que o orquestrador aplique a política correta, sem expor credenciais, payloads produtivos ou detalhes internos em mensagens públicas.",
        ],
      },
      {
        id: "operacao",
        title: "Contratos também precisam ser operáveis",
        paragraphs: [
          "A observabilidade acompanha a chamada além do status HTTP. A execução precisa responder qual evento estava em processamento, qual etapa falhou, quantas tentativas ocorreram e se houve criação de documento.",
          "Correlation ID e referências do ERP conectam o workflow à camada de serviço. Logs registram códigos sanitizados; dados pessoais, fiscais e financeiros devem ser mascarados.",
          "A documentação pública lista métricas desejadas, mas não fornece volumes ou SLAs observados. Este artigo, portanto, descreve o contrato e a estratégia sem atribuir resultados numéricos à implementação.",
        ],
      },
      {
        id: "quando-usar",
        title: "Quando uma camada de serviço passa a fazer sentido",
        paragraphs: [
          "O case sugere uma camada dedicada quando múltiplos canais compartilham regras, quando o destino possui contrato complexo, quando efeitos precisam ser idempotentes ou quando a operação exige auditoria e reprocessamento.",
          "Para um fluxo curto e sem domínio compartilhado, introduzir um serviço pode aumentar a manutenção sem benefício proporcional. A decisão deve partir das fronteiras e dos riscos, não do desejo de adicionar uma tecnologia à stack.",
        ],
        items: [
          "Regras críticas precisam permanecer consistentes entre conectores.",
          "O ERP exige uma fronteira controlada de autenticação e escrita.",
          "Operações repetidas não podem duplicar documentos.",
          "Estado e referências precisam sobreviver ao workflow.",
          "Falhas exigem políticas distintas de retry e quarentena.",
          "Contratos precisam ser testados e evoluídos de forma independente.",
        ],
      },
    ],
    faq: [
      {
        question: "FastAPI substitui o n8n nessa arquitetura?",
        answer:
          "Não. O n8n coordena eventos e fluxo. FastAPI expõe serviços e adaptadores para regras de domínio e contratos que precisam ser compartilhados entre canais.",
      },
      {
        question: "A API pode escrever diretamente no banco do SAP?",
        answer:
          "No projeto documentado, não. Toda criação de documentos passa pelo Service Layer para preservar as validações da aplicação e evitar escrita direta nas tabelas transacionais.",
      },
      {
        question: "FastAPI é obrigatório para integrar com SAP Business One?",
        answer:
          "Não. É a tecnologia usada neste projeto para uma camada de serviços. A necessidade arquitetural é ter responsabilidades e contratos claros; a escolha da ferramenta depende do contexto.",
      },
    ],
    sources: [
      {
        label: "Arquitetura pública da plataforma",
        url: `${publicRepository}/blob/main/docs/architecture.md`,
      },
      {
        label: "ADRs do projeto",
        url: `${publicRepository}/blob/main/docs/decisions.md`,
      },
      {
        label: "Segurança e sanitização",
        url: `${publicRepository}/blob/main/docs/security.md`,
      },
      {
        label: "Fluxo de negócio",
        url: `${publicRepository}/blob/main/docs/business-flow.md`,
      },
    ],
    relatedProjectSlugs: ["sap-commerce-integration-platform"],
    relatedContentSlugs: [
      "integrar-marketplaces-sap-business-one",
      "idempotencia-em-integracoes",
      "arquitetura-sap-commerce-integration-platform",
    ],
    seo: {
      title: "FastAPI como camada de integração",
      description:
        "Entenda como FastAPI pode concentrar domínio e contratos com o ERP enquanto o n8n coordena eventos, retries e reprocessamentos.",
    },
  },
];
