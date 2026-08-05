import type { Insight } from "@/types/insight";

const publicRepository =
  "https://github.com/rmota13/sap-business-one-integration-platform";

export const guides: Insight[] = [
  {
    slug: "integrar-marketplaces-sap-business-one",
    title: "Como estruturar uma integração entre marketplaces e SAP Business One",
    description:
      "Um guia arquitetural baseado em um projeto público e sanitizado: do evento do canal ao pedido, ciclo financeiro, exceções e evolução para conciliação.",
    kind: "guide",
    status: "published",
    topics: ["SAP Business One", "Integrações", "Marketplaces", "n8n"],
    publishedAt: "2026-08-04",
    executiveSummary: [
      "Comece pelo processo e pelos efeitos que precisam permanecer consistentes, não pelo desenho de um workflow isolado.",
      "Separe conectores, orquestração, validação, domínio, adaptador do SAP, persistência de controle e observabilidade para evitar replicar regras críticas por canal.",
      "Use o Service Layer como fronteira de escrita, mantenha idempotência e estado fora da base transacional do ERP e trate retry, quarentena e reprocessamento como comportamentos diferentes.",
      "Publique estados com precisão: no case de referência, a fase comercial está em produção, a financeira está entregue e em rollout, e a conciliação permanece em desenvolvimento.",
    ],
    sections: [
      {
        id: "escopo",
        title: "1. Delimite o processo antes de escolher as ferramentas",
        paragraphs: [
          "Integrar um marketplace ao SAP Business One não é apenas enviar um payload para um endpoint. O evento externo representa uma venda que precisa preservar cliente, documento, endereço, itens, entrega, pagamento e referências ao longo de sistemas com contratos diferentes.",
          "O primeiro passo é desenhar o ciclo de negócio. No case público usado como referência, o fluxo começa com um pedido pago, consulta os dados completos no canal, converte o conteúdo para um modelo canônico, valida as informações e somente então resolve o Business Partner e cria o Pedido de Venda.",
          "O ciclo financeiro vem depois: identificar o meio de pagamento, resolver o código correspondente no ERP, criar adiantamento, criar recebimento e registrar a referência da transação. A conciliação é uma terceira fase porque compara liquidações externas aos documentos esperados no SAP.",
          "Essa decomposição impede que o primeiro webhook assuma responsabilidades que pertencem a fases posteriores. Também permite declarar com clareza o estado de cada entrega e testar os efeitos de forma progressiva.",
        ],
        items: [
          "Quais eventos iniciam o processo: webhook, polling ou ambos?",
          "Qual condição torna um pedido elegível para integração?",
          "Quais dados precisam ser validados antes da escrita no ERP?",
          "Quais documentos serão criados e em qual ordem?",
          "Quais inconsistências podem ser resolvidas automaticamente?",
          "Quais decisões precisam de intervenção humana?",
          "Como a execução será retomada depois de uma falha?",
        ],
      },
      {
        id: "fronteiras",
        title: "2. Defina fronteiras que possam ser reutilizadas por novos canais",
        paragraphs: [
          "Cada canal possui autenticação, formato de evento, ciclo de atualização e nomenclaturas próprias. Essas particularidades devem permanecer nos conectores, onde podem ser traduzidas sem contaminar o restante da plataforma.",
          "O orquestrador coordena webhooks, polling, agendamentos, filas, retries, feature flags e reprocessamentos. No projeto documentado, esse papel pertence ao n8n. A escolha aproveita a visibilidade e a velocidade de composição dos workflows, mas não transforma o orquestrador em repositório de todas as regras de negócio.",
          "Depois da normalização, serviços de domínio trabalham com um contrato comum. Eles aplicam regras de cliente, pedido, pagamento e conciliação. Um adaptador dedicado gerencia autenticação, sessão e contratos com o SAP Business One Service Layer.",
          "Persistência e monitoramento formam outras duas fronteiras. O banco de integração mantém estado, idempotência, staging, logs e quarentena. A observabilidade conecta cada etapa por correlation ID. Com essa divisão, um novo canal precisa produzir o contrato canônico, mas não reimplementar a lógica central do ERP.",
        ],
      },
      {
        id: "captura",
        title: "3. Trate o evento como sinal, não como verdade completa",
        paragraphs: [
          "Uma notificação pode carregar apenas o identificador necessário para consultar o recurso. Mesmo quando o webhook contém mais campos, a arquitetura precisa definir qual fonte fornece o estado completo e atual do pedido.",
          "O fluxo público registra duas formas de captura: webhook e polling. Elas não são mutuamente exclusivas. O webhook reduz o intervalo entre evento e processamento; a consulta programada pode cobrir cenários em que notificações não chegam ou precisam ser verificadas.",
          "Depois da captura, o conector consulta os detalhes e produz um modelo canônico. Essa tradução é a oportunidade de normalizar nomes de campos, datas, identificadores, itens, entrega e referências sem permitir que o domínio conheça todos os formatos externos.",
          "A arquitetura deve assumir que notificações podem ser repetidas. Webhook e polling também podem observar o mesmo pedido em janelas próximas. Por isso, nenhuma etapa com efeito deve depender da suposição de chegada única.",
        ],
      },
      {
        id: "validacao",
        title: "4. Valide antes de produzir efeitos no ERP",
        paragraphs: [
          "O modelo canônico ainda precisa ser validado. No projeto de referência, cliente, documento, endereço, itens e entrega fazem parte dessa barreira. O objetivo é identificar ausência de campos obrigatórios e inconsistências antes de iniciar uma sequência parcial de documentos.",
          "Validação de schema responde se os dados possuem formato esperado. Validação de domínio responde se eles fazem sentido para a operação. Separar as duas ajuda a explicar o motivo de uma rejeição e a decidir se o erro pode ser corrigido automaticamente.",
          "Uma inconsistência cadastral não deve entrar em retry infinito. Quando a plataforma não consegue resolver o caso com segurança, ela persiste o contexto sanitizado e encaminha o registro para quarentena. Depois da correção, o fluxo pode ser reprocessado com a mesma chave de idempotência.",
          "A versão pública não detalha regras fiscais ou comerciais proprietárias. Um projeto real deve documentar essas regras em ambiente controlado, manter dados sensíveis fora dos logs e publicar somente exemplos sanitizados.",
        ],
      },
      {
        id: "service-layer",
        title: "5. Use o Service Layer como fronteira de escrita",
        paragraphs: [
          "A decisão arquitetural do case é explícita: toda criação de documentos no SAP Business One passa pelo Service Layer. Não há escrita direta nas tabelas transacionais do ERP.",
          "Essa fronteira preserva validações da aplicação e concentra os contratos de integração. O adaptador controla autenticação e sessão, enquanto os serviços de domínio solicitam operações com significado, como resolver um Business Partner ou criar um Pedido de Venda.",
          "A separação evita espalhar detalhes da API do SAP por workflows de marketplace. Também cria um ponto único para interpretar respostas, sanitizar erros, devolver referências e manter o comportamento consistente quando novos canais são adicionados.",
          "Privilégio mínimo continua necessário para banco, APIs e ERP. Credenciais devem ser resolvidas por variáveis de ambiente ou cofre de segredos, nunca incorporadas ao workflow exportado ou à documentação pública.",
        ],
      },
      {
        id: "idempotencia",
        title: "6. Projete idempotência antes da primeira escrita",
        paragraphs: [
          "Idempotência significa que repetir a mesma intenção não cria um segundo efeito. No case, a combinação canal + identificador externo é a chave lógica única. O canal evita colisões entre origens, e o identificador relaciona todas as tentativas ao mesmo pedido.",
          "A chave é reservada no banco de integração antes da operação de escrita. O registro acompanha estado, tentativas, referências e correlation ID. Quando o mesmo evento retorna, a plataforma pode reconhecer o processamento existente e decidir se devolve o resultado, retoma uma etapa ou mantém o registro em quarentena.",
          "Uma constraint única ajuda a proteger a reserva, mas não resolve sozinha falhas parciais. A integração precisa lidar com o cenário em que o SAP criou um documento e a confirmação não foi persistida. Referências externas e consulta do efeito ajudam a reconstruir esse estado.",
          "O mesmo raciocínio atravessa pedido, adiantamento, recebimento e cancelamento. Cada etapa com efeito precisa de uma estratégia de repetição segura e de testes específicos de retomada.",
        ],
      },
      {
        id: "retry-quarentena",
        title: "7. Separe retry, quarentena e falha terminal",
        paragraphs: [
          "Falhas temporárias podem desaparecer depois de uma nova tentativa. A documentação pública prevê retry limitado com backoff, evitando ciclos rápidos e intermináveis. O limite precisa terminar em um estado que a operação consiga identificar.",
          "Erros de negócio seguem outro caminho. Dados inválidos, inconsistências cadastrais ou decisões que não podem ser automatizadas são persistidos em quarentena com contexto e correlation ID. Repetir a mesma chamada sem mudar a causa apenas consome recursos e aumenta ruído.",
          "Uma falha terminal indica que as tentativas automáticas foram encerradas ou que o caso exige ação fora do fluxo. A observabilidade precisa diferenciar esses estados para que alertas e painéis não tratem todos os erros como equivalentes.",
          "Depois da correção, o reprocessamento reutiliza a chave lógica e as referências existentes. O objetivo é continuar com segurança, não reiniciar a venda como se nunca tivesse sido observada.",
        ],
      },
      {
        id: "financeiro",
        title: "8. Modele o ciclo financeiro como fase própria",
        paragraphs: [
          "Criar o Pedido de Venda não encerra necessariamente a integração. O case público inclui uma fase financeira que resolve o meio de pagamento, cria adiantamento, cria recebimento e registra a referência da transação.",
          "Essa fase foi entregue tecnicamente e está em rollout produtivo controlado por feature flag. O roadmap ainda registra a necessidade de encerrar a janela de rollout e estabilização. Portanto, a comunicação pública não deve convertê-la em operação totalmente estabilizada.",
          "Separar a fase permite testar documentos isoladamente, executar um cenário de ponta a ponta, validar com o financeiro e verificar retomada e idempotência antes da ativação progressiva.",
          "A origem do pedido e a origem da liquidação também precisam ser modeladas separadamente. Uma loja pode originar a venda enquanto outro provedor é responsável pelo pagamento. Essa distinção prepara o caminho para a conciliação sem alterar a identidade do pedido.",
        ],
      },
      {
        id: "conciliacao",
        title: "9. Não apresente conciliação planejada como capacidade concluída",
        paragraphs: [
          "A arquitetura da conciliação está definida como fase separada. Liquidações externas deverão ser capturadas por API ou arquivo, persistidas em staging, normalizadas e comparadas aos documentos esperados no ERP.",
          "O roadmap público confirma a separação entre origem do pedido e origem da liquidação e o modelo de staging. Ingestão, matching, tolerâncias, classificação de taxas, integração de baixa ou ajuste, alertas e homologação ainda permanecem pendentes.",
          "Essa precisão editorial evita atribuir resultados a uma solução incompleta. Também permite que a documentação acompanhe a evolução real: decisões concluídas podem ser explicadas; estados em desenvolvimento permanecem claramente identificados.",
          "Quando implementada, a estratégia prevista é orientar alertas às divergências, não a cada liquidação bem-sucedida. Nenhuma tolerância, taxa de matching ou volume foi publicado, por isso este guia não apresenta números.",
        ],
      },
      {
        id: "observabilidade",
        title: "10. Faça a execução responder o que aconteceu",
        paragraphs: [
          "A operação precisa localizar qual pedido falhou, em qual etapa, quantas tentativas ocorreram, se algum documento foi criado e se a execução pode ser retomada. Essas perguntas devem orientar o contrato de logs e estados.",
          "O padrão público registra canal, identificador externo, etapa, status, tentativa, duração, código de erro sanitizado e documentos SAP relacionados. Um correlation ID conecta essas evidências entre conector, orquestrador, serviço, persistência e ERP.",
          "Estados sugeridos representam a progressão do evento, da recepção ao ciclo financeiro concluído, além de retry, quarentena e falha terminal. Eles são um vocabulário de operação, não métricas publicadas.",
          "Alertas são reservados para indisponibilidade, retry esgotado, crescimento da quarentena, falha terminal e divergências acionáveis. O sucesso continua registrado para auditoria sem gerar uma notificação individual.",
        ],
      },
      {
        id: "seguranca-rollout",
        title: "11. Combine segurança, feature flags e rollout controlado",
        paragraphs: [
          "Webhooks precisam validar assinatura, segredo compartilhado ou token e considerar uma janela de tempo para reduzir replay. Usuários de banco, API e ERP devem operar com privilégio mínimo. Ambientes de desenvolvimento, homologação e produção permanecem separados.",
          "Logs mascaram dados pessoais, fiscais e financeiros. Exports brutos de n8n, dumps, arquivos de ambiente e capturas operacionais não pertencem a um repositório público. A documentação de referência removeu tokens, URLs internas, nomes corporativos, payloads e regras proprietárias.",
          "Feature flags permitem ativar canais e fases progressivamente. Essa estratégia reduz o impacto de uma mudança e oferece rollback por configuração sem interromper os fluxos já estáveis.",
          "O encerramento do rollout depende de observação e validação operacional, não apenas de build concluído. Publicar o estado correto faz parte da governança técnica do projeto.",
        ],
      },
      {
        id: "validacao",
        title: "12. Valide a arquitetura como sistema, não só como endpoint",
        paragraphs: [
          "Testar uma resposta de API não comprova o fluxo completo. A validação precisa acompanhar o evento desde o canal, atravessar normalização e domínio, confirmar os efeitos no SAP e verificar o estado persistido para retomada.",
          "A fase financeira documentada incluiu teste isolado dos documentos, teste end-to-end, validação com o financeiro, teste de retomada e idempotência e ativação por feature flag. Essa sequência fornece um modelo de validação proporcional ao risco.",
          "Casos de erro também fazem parte do aceite: evento repetido, falha temporária, inconsistência de negócio, retry esgotado, reprocessamento e efeito já criado. Segurança exige verificar que logs e capturas não exponham dados reais.",
          "Por fim, a documentação pública deve refletir o resultado que existe. Métricas só entram quando possuem fonte verificável; capacidades em rollout ou desenvolvimento permanecem com esses estados, sem linguagem que sugira conclusão plena.",
        ],
        items: [
          "Evento válido processado de ponta a ponta.",
          "Evento repetido sem efeito duplicado.",
          "Falha temporária com retry limitado e estado final explícito.",
          "Erro de negócio encaminhado à quarentena.",
          "Reprocessamento após correção sem novo documento indevido.",
          "Referências e correlation ID disponíveis para auditoria.",
          "Logs e evidências sem dados sensíveis.",
          "Feature flag e rollback verificados antes do rollout.",
        ],
      },
    ],
    faq: [
      {
        question: "É necessário usar n8n para seguir esta arquitetura?",
        answer:
          "Não. O n8n é o orquestrador do projeto de referência. Os princípios reutilizáveis são separar captura, orquestração, domínio, adaptador do ERP, persistência e observabilidade.",
      },
      {
        question: "Pode escrever diretamente nas tabelas do SAP Business One?",
        answer:
          "No projeto documentado, não. Toda criação de documentos passa pelo Service Layer para preservar validações da aplicação e evitar escrita direta nas tabelas transacionais.",
      },
      {
        question: "Como evitar pedidos duplicados quando o webhook é reenviado?",
        answer:
          "A solução pública usa canal + identificador externo como chave lógica única, reservada antes da escrita, e mantém estado e referências em um banco de integração separado.",
      },
      {
        question: "Quando usar quarentena em vez de retry?",
        answer:
          "Retry é adequado para falhas temporárias. Inconsistências de negócio que não mudam com repetição devem ser persistidas com contexto sanitizado e encaminhadas para correção ou decisão humana.",
      },
      {
        question: "A conciliação financeira do case já está em produção?",
        answer:
          "Não. A arquitetura e o staging estão definidos, mas ingestão, matching, tolerâncias, integração, alertas e homologação permanecem no roadmap de desenvolvimento.",
      },
    ],
    sources: [
      {
        label: "README do repositório público sanitizado",
        url: publicRepository,
      },
      {
        label: "Arquitetura da plataforma",
        url: `${publicRepository}/blob/main/docs/architecture.md`,
      },
      {
        label: "Fluxos de negócio",
        url: `${publicRepository}/blob/main/docs/business-flow.md`,
      },
      {
        label: "Architecture Decision Records",
        url: `${publicRepository}/blob/main/docs/decisions.md`,
      },
      {
        label: "Segurança e sanitização",
        url: `${publicRepository}/blob/main/docs/security.md`,
      },
      {
        label: "Observabilidade",
        url: `${publicRepository}/blob/main/docs/observability.md`,
      },
      {
        label: "Roadmap público",
        url: `${publicRepository}/blob/main/docs/roadmap.md`,
      },
    ],
    relatedProjectSlugs: ["sap-commerce-integration-platform"],
    relatedContentSlugs: [
      "arquitetura-sap-commerce-integration-platform",
      "fastapi-como-camada-de-integracao",
      "idempotencia-em-integracoes",
    ],
    seo: {
      title: "Guia: integrar marketplaces ao SAP Business One",
      description:
        "Estruture captura, modelo canônico, Service Layer, idempotência, retry, quarentena, observabilidade e rollout em integrações com SAP Business One.",
    },
  },
];
