import type { Insight } from "@/types/insight";

const publicRepository =
  "https://github.com/rmota13/sap-business-one-integration-platform";

export const insights: Insight[] = [
  {
    slug: "idempotencia-em-integracoes",
    title: "Idempotência em integrações: repetir sem duplicar",
    description:
      "Como uma chave externa, estados explícitos e uma fronteira de escrita controlada reduzem o risco de documentos duplicados em integrações com ERP.",
    kind: "insight",
    status: "published",
    topics: ["Integrações", "Arquitetura", "SAP Business One"],
    publishedAt: "2026-08-04",
    executiveSummary: [
      "Em integrações orientadas por webhook ou polling, receber o mesmo evento mais de uma vez é uma condição esperada, não uma exceção improvável.",
      "No SAP Commerce Integration Platform, a combinação entre canal e identificador externo funciona como chave lógica única, e o estado da execução permanece fora da base transacional do ERP.",
      "Idempotência não é apenas bloquear uma segunda chamada: o fluxo também precisa saber se pode retomar, devolver um resultado anterior ou encaminhar uma inconsistência para quarentena.",
    ],
    sections: [
      {
        id: "repeticao-faz-parte",
        title: "A repetição faz parte do contrato operacional",
        paragraphs: [
          "Marketplaces e outros sistemas externos podem reenviar notificações. Consultas programadas também podem se sobrepor a eventos recebidos por webhook. Se a integração tratar cada chegada como inédita, uma mesma venda pode iniciar mais de uma tentativa de criação no ERP.",
          "A arquitetura pública do projeto parte do princípio oposto: repetir uma solicitação deve ser seguro. Esse requisito aparece antes da escrita no SAP Business One e acompanha pedido, ciclo financeiro, quarentena e reprocessamento.",
        ],
      },
      {
        id: "chave-logica",
        title: "Canal e identificador externo formam a chave lógica",
        paragraphs: [
          "O ADR público do projeto define a combinação canal + identificador externo como chave única. O canal é necessário porque dois sistemas diferentes podem usar identificadores com o mesmo formato; o identificador externo conecta as tentativas ao mesmo evento de negócio.",
          "Antes de criar um documento, o serviço reserva essa chave no banco de integração. Essa persistência separada registra a execução sem usar a base transacional do SAP como mecanismo de controle do workflow.",
        ],
        items: [
          "A chave precisa ser estável durante toda a vida do evento.",
          "A reserva ocorre antes da operação que produz efeito no ERP.",
          "O resultado gravado permite responder a uma repetição sem gerar novo documento.",
        ],
      },
      {
        id: "estado-e-efeito",
        title: "Estado da integração e efeito no ERP são coisas diferentes",
        paragraphs: [
          "Uma tentativa pode falhar depois de o ERP ter criado um documento, mas antes de a integração registrar a confirmação. Por isso, olhar apenas para o retorno da última chamada é insuficiente. A retomada precisa consultar o estado conhecido e, quando aplicável, reconciliar esse estado com o documento já criado.",
          "O banco de integração mantém status, tentativas, referências e correlation ID. O Service Layer permanece como fronteira de escrita no SAP Business One, enquanto a camada de controle decide se a operação deve começar, continuar ou apenas devolver o resultado existente.",
        ],
      },
      {
        id: "retry-quarentena",
        title: "Retry não substitui idempotência — e nem todo erro merece retry",
        paragraphs: [
          "Falhas temporárias podem seguir uma política de novas tentativas limitada e com intervalo crescente. Isso só é seguro quando a operação repetida não duplica efeitos. A idempotência protege o destino; o retry organiza a recuperação.",
          "Erros de negócio e inconsistências cadastrais seguem outro caminho. Repetir indefinidamente não muda um dado inválido. Nesses casos, o projeto persiste contexto sanitizado e correlation ID em quarentena, interrompendo o ciclo automático até haver uma decisão ou correção.",
        ],
      },
      {
        id: "financeiro",
        title: "O mesmo princípio precisa atravessar o ciclo financeiro",
        paragraphs: [
          "Criar o pedido de venda de forma idempotente resolve apenas uma parte do problema. Adiantamento, recebimento e referência da transação também precisam reconhecer uma retomada. A documentação pública registra testes de retomada e idempotência na fase financeira antes do rollout produtivo.",
          "A implementação editorial não afirma volumes, taxas de sucesso ou resultados numéricos porque essas métricas não foram publicadas. O que está comprovado é a decisão arquitetural, a entrega técnica da fase financeira e a existência de uma janela de estabilização ainda aberta no roadmap público.",
        ],
      },
      {
        id: "checklist",
        title: "Checklist para revisar um fluxo idempotente",
        paragraphs: [
          "Uma revisão útil começa pelo efeito que não pode ser duplicado e segue de volta até a origem do evento. O objetivo é tornar explícito o comportamento de cada repetição possível.",
        ],
        items: [
          "Definir uma chave lógica única e verificável.",
          "Reservar a chave antes da primeira escrita com efeito externo.",
          "Persistir estado e referências fora da base transacional do ERP.",
          "Distinguir falha temporária de erro de negócio.",
          "Limitar retries e encaminhar inconsistências para quarentena.",
          "Manter correlation ID e referências do documento de ponta a ponta.",
          "Testar retomada em cada etapa que produz efeito.",
        ],
      },
    ],
    faq: [
      {
        question: "Idempotência significa ignorar toda chamada repetida?",
        answer:
          "Não. A repetição pode devolver o resultado já registrado, retomar uma etapa segura ou indicar que o fluxo aguarda correção. O ponto é impedir que a mesma intenção de negócio produza efeitos duplicados.",
      },
      {
        question: "Uma constraint única resolve o problema sozinha?",
        answer:
          "Ela protege a chave de controle, mas o fluxo ainda precisa registrar estados, referências e comportamento de retomada para lidar com falhas ocorridas antes ou depois da escrita no sistema de destino.",
      },
      {
        question: "Por que o controle não fica diretamente no SAP Business One?",
        answer:
          "No projeto documentado, estado, idempotência, staging, logs e quarentena ficam em um banco de integração separado. Essa fronteira evita transformar a base transacional do ERP em banco de controle do workflow.",
      },
    ],
    sources: [
      {
        label: "Decisões arquiteturais do projeto público",
        url: `${publicRepository}/blob/main/docs/decisions.md`,
      },
      {
        label: "Fluxos de negócio e reprocessamento",
        url: `${publicRepository}/blob/main/docs/business-flow.md`,
      },
      {
        label: "Roadmap público da plataforma",
        url: `${publicRepository}/blob/main/docs/roadmap.md`,
      },
    ],
    relatedProjectSlugs: ["sap-commerce-integration-platform"],
    relatedContentSlugs: [
      "integrar-marketplaces-sap-business-one",
      "observabilidade-em-fluxos-n8n",
    ],
    seo: {
      title: "Idempotência em integrações com ERP",
      description:
        "Entenda como chave externa, estado persistido, retry limitado e quarentena ajudam a evitar duplicidade em integrações com SAP Business One.",
    },
  },
  {
    slug: "observabilidade-em-fluxos-n8n",
    title: "Observabilidade em fluxos n8n orientada a exceções",
    description:
      "O que registrar para explicar uma execução, distinguir falhas temporárias de erros de negócio e reprocessar com segurança.",
    kind: "insight",
    status: "published",
    topics: ["n8n", "Observabilidade", "Automação"],
    publishedAt: "2026-08-04",
    executiveSummary: [
      "Um workflow visual não elimina a necessidade de estado, correlação e critérios operacionais claros.",
      "A observabilidade do projeto público acompanha canal, etapa, status, tentativa, duração, erro sanitizado e referências dos documentos relacionados.",
      "O sucesso é registrado, enquanto alertas são reservados para indisponibilidade, retry esgotado, quarentena crescente, falha terminal e divergências que realmente exigem ação.",
    ],
    sections: [
      {
        id: "perguntas-operacionais",
        title: "Começar pelas perguntas que a operação precisa responder",
        paragraphs: [
          "A documentação pública da plataforma define observabilidade a partir de perguntas concretas: qual pedido falhou, em qual etapa, quantas tentativas ocorreram, se algum documento foi criado no SAP e se o registro pode ser reprocessado com segurança.",
          "Esse recorte evita confundir grande volume de logs com capacidade real de diagnóstico. Cada registro precisa contribuir para explicar a execução, e não apenas reproduzir o payload ou a mensagem bruta de uma ferramenta.",
        ],
      },
      {
        id: "correlation-id",
        title: "Correlation ID conecta o evento ao efeito",
        paragraphs: [
          "Uma integração atravessa canal, orquestrador, serviço de domínio, banco de controle e ERP. Sem um identificador comum, cada camada enxerga apenas um fragmento. O correlation ID mantém essas evidências relacionadas do início ao fim.",
          "No padrão documentado, a execução registra canal, identificador externo, etapa, status, tentativa, duração, código de erro sanitizado e documentos SAP relacionados. A lista descreve o contrato de observabilidade; ela não publica dados operacionais reais.",
        ],
      },
      {
        id: "estados-explicitos",
        title: "Estados explícitos tornam a retomada compreensível",
        paragraphs: [
          "Recebido, validado, cliente resolvido, pedido criado e ciclo financeiro concluído são exemplos de marcos que ajudam a localizar o ponto alcançado. Retry, quarentena e falha terminal representam desvios que exigem tratamentos diferentes.",
          "Esses estados são apresentados no repositório como padrão de referência da plataforma. A interface editorial preserva essa distinção sem converter a lista em indicador de volume, SLA ou disponibilidade, porque nenhuma dessas métricas foi tornada pública.",
        ],
      },
      {
        id: "alerta-com-criterio",
        title: "Alertar somente quando há decisão a tomar",
        paragraphs: [
          "Enviar uma notificação para cada execução bem-sucedida transfere o ruído do workflow para o canal humano. A decisão do projeto é registrar o sucesso e reservar alertas para situações acionáveis.",
          "Os exemplos documentados incluem indisponibilidade do ERP, esgotamento de retry, crescimento da quarentena, falha terminal e divergência financeira acima da tolerância. A tolerância da conciliação ainda depende da implementação e homologação previstas no roadmap; nenhum valor foi publicado.",
        ],
      },
      {
        id: "sanitizacao",
        title: "Logs úteis também precisam ser publicamente seguros",
        paragraphs: [
          "CPF, CNPJ, e-mail, endereço, dados financeiros, tokens, URLs internas e regras proprietárias não devem aparecer em exemplos ou logs públicos. O documento de segurança do projeto determina mascaramento de dados pessoais, fiscais e financeiros.",
          "A mesma disciplina vale para o n8n: exports brutos, capturas de produção e mensagens completas de erro podem conter mais contexto do que o necessário. A observabilidade deve preservar o diagnóstico sem criar uma segunda fonte de exposição.",
        ],
      },
      {
        id: "revisao",
        title: "Uma revisão prática para cada workflow",
        paragraphs: [
          "Antes de considerar um fluxo observável, é útil percorrer uma falha do início ao fim e verificar se a equipe consegue reconstruir o que aconteceu apenas com dados sanitizados e referências controladas.",
        ],
        items: [
          "Propagar um correlation ID entre orquestração, serviços e persistência.",
          "Registrar a etapa e o estado, não somente a mensagem final.",
          "Manter a contagem de tentativas e o motivo do encerramento.",
          "Referenciar efeitos já confirmados no sistema de destino.",
          "Separar retry automático, quarentena e falha terminal.",
          "Definir alertas por necessidade de ação, não por volume de eventos.",
          "Mascarar dados pessoais, fiscais, financeiros e infraestrutura interna.",
        ],
      },
    ],
    faq: [
      {
        question: "O histórico do próprio n8n é suficiente?",
        answer:
          "Ele ajuda no diagnóstico do orquestrador, mas o projeto documentado mantém estado, idempotência, referências e auditoria em uma camada de integração separada para acompanhar efeitos além do workflow visual.",
      },
      {
        question: "Toda falha deve gerar alerta no Teams?",
        answer:
          "Não. Falhas temporárias podem seguir retry limitado. Alertas são mais úteis quando indicam falha terminal, indisponibilidade, retry esgotado, quarentena ou outra exceção que exige decisão.",
      },
      {
        question: "Quais métricas públicas existem para esse projeto?",
        answer:
          "O repositório descreve quais métricas a arquitetura deve acompanhar, mas não publica volumes, taxas ou SLAs observados. Por isso, este insight não apresenta resultados numéricos.",
      },
    ],
    sources: [
      {
        label: "Padrão público de observabilidade",
        url: `${publicRepository}/blob/main/docs/observability.md`,
      },
      {
        label: "Segurança e sanitização",
        url: `${publicRepository}/blob/main/docs/security.md`,
      },
      {
        label: "Arquitetura da plataforma",
        url: `${publicRepository}/blob/main/docs/architecture.md`,
      },
    ],
    relatedProjectSlugs: ["sap-commerce-integration-platform"],
    relatedContentSlugs: [
      "idempotencia-em-integracoes",
      "quando-automacao-vira-plataforma",
    ],
    seo: {
      title: "Observabilidade em n8n orientada a exceções",
      description:
        "Veja como correlation ID, estados explícitos, logs sanitizados e alertas acionáveis apoiam fluxos n8n integrados ao ERP.",
    },
  },
];
