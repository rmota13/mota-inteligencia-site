# Fase 3 — auditoria de fontes editoriais

Auditoria concluída em 4 de agosto de 2026 antes da redação e da disponibilização local dos conteúdos da Fase 3. Nenhum conteúdo foi publicado externamente.

## Objetivo e regra editorial

O objetivo desta auditoria foi confrontar os temas sugeridos na Fase 3 com:

- a fonte tipada dos projetos do site;
- os relatórios de implementação e validação das fases anteriores;
- o repositório público e sanitizado do projeto principal;
- os demais repositórios públicos disponíveis no perfil técnico;
- o repositório privado de origem, usado somente como verificação de coerência.

A fonte pública sanitizada foi definida como autoridade para qualquer afirmação publicada. O repositório privado não foi usado para introduzir estado mais granular, nomes internos, caminhos, infraestrutura, clientes, regras ou resultados ausentes da versão pública.

## Fontes aprovadas

### Site e relatórios locais

- `content/projects.ts`: estados, contexto, arquitetura, decisões, limitações e resultados qualitativos já aprovados para o portfólio;
- `docs/audits/phase-2-validation.md`: arquitetura institucional e limites editoriais definidos na Fase 2;
- `docs/audits/phase-2.8-validation.md`: estado técnico e visual imediatamente anterior à Fase 3;
- `docs/audits/public-assets.md` e `docs/audits/phase-2.5-public-assets.md`: classificação dos assets públicos e lista de capturas sensíveis.

### Repositório público sanitizado

Fonte principal: `https://github.com/rmota13/sap-business-one-integration-platform`.

Documentos confrontados:

- `README.md`;
- `docs/architecture.md`;
- `docs/business-flow.md`;
- `docs/decisions.md`;
- `docs/security.md`;
- `docs/observability.md`;
- `docs/roadmap.md`;
- `docs/portfolio-case.md`.

Os conteúdos editoriais exibem links diretos para essas fontes. A rastreabilidade faz parte do modelo tipado e da interface.

### Demais repositórios

- `rmota13/CrystalReport_SQL` possui apenas uma descrição curta sobre uma query de layout para SAP Business One. O material não sustenta um artigo técnico aprofundado.
- `rmota13/Consultas-SAP-B1---Query-SQL` não forneceu um README no caminho padrão consultado. Nenhum conteúdo foi inferido a partir do nome do repositório.
- repositórios vazios ou sem documentação suficiente não foram usados como fonte.
- o repositório privado de origem foi confrontado apenas para detectar divergências. Nenhum detalhe exclusivo dessa fonte aparece nos conteúdos, schemas, metadados ou relatórios públicos da fase.

## Estado factual preservado

| Área | Estado que pode ser publicado | Fonte |
|---|---|---|
| Integração comercial | Em produção | README, roadmap e fonte tipada do projeto |
| Integração financeira | Entregue tecnicamente e em rollout produtivo | README, roadmap e fonte tipada do projeto |
| Conciliação | Arquitetura e staging definidos; implementação e homologação em desenvolvimento | ADRs e roadmap público |
| Idempotência | Decisão por canal + identificador externo; retomada documentada | ADR-004 e fluxo público |
| Escrita no SAP | Exclusivamente pelo Service Layer | ADR-002 e arquitetura pública |
| Observabilidade | Padrão de correlation ID, estado, tentativa, duração e referências | documento público de observabilidade |
| Resultados | Somente impactos qualitativos já publicados | README e case público |

Não foram publicados volumes, percentuais, SLAs, economias, taxas de sucesso, tempos médios, quantidades de pedidos, valores financeiros ou indicadores de conciliação. A lista de métricas presente no documento de observabilidade foi tratada como arquitetura desejada, não como resultado medido.

## Conteúdos iniciais liberados pela evidência

| Rota | Tipo | Base factual |
|---|---|---|
| `/guias/integrar-marketplaces-sap-business-one` | Guia | arquitetura, fluxo, ADRs, segurança, observabilidade e roadmap |
| `/artigos/quando-automacao-vira-plataforma` | Artigo | separação de responsabilidades, estado, feature flags e fases |
| `/artigos/arquitetura-sap-commerce-integration-platform` | Artigo | arquitetura completa e estados públicos do projeto |
| `/artigos/fastapi-como-camada-de-integracao` | Artigo | papel público dos serviços de domínio e do adaptador SAP |
| `/insights/idempotencia-em-integracoes` | Insight | ADR de idempotência, fluxo e testes de retomada publicados |
| `/insights/observabilidade-em-fluxos-n8n` | Insight | contrato público de logs, estados, alertas e sanitização |

O tempo de leitura não é uma métrica editorial inserida manualmente. Ele é calculado no build a partir do total de palavras do conteúdo, usando 200 palavras por minuto e arredondamento para cima.

## Temas mantidos fora da publicação inicial

Os temas abaixo continuam preparados pela arquitetura, mas não receberam página publicada por falta de fonte técnica pública suficiente ou por dependerem de uma fase ainda não concluída:

- como proteger um ERP de cargas analíticas;
- arquitetura da conciliação financeira como entrega concluída;
- Power BI em ambientes corporativos;
- SQL Server para BI sem impactar o ERP.

A conciliação é explicada nos conteúdos já publicados apenas como arquitetura e roadmap, sempre com o estado de desenvolvimento explícito.

## Segurança e assets

- nenhum arquivo em `public/` foi alterado, movido, removido ou reutilizado em conteúdo novo;
- nenhuma captura classificada como sensível foi incorporada às páginas editoriais ou às imagens Open Graph;
- as imagens sociais são geradas em código com identidade institucional, títulos e tópicos públicos;
- nenhum payload, SQL, token, IP, endpoint, URL interna, nome de cliente, pedido ou dado financeiro foi copiado;
- o inventário e as justificativas de sanitização das fases anteriores permanecem inalterados.

## Conclusão

Os seis conteúdos iniciais possuem fonte pública rastreável e linguagem compatível com o estado real do projeto. Os quatro temas sem base suficiente foram deliberadamente retidos. Essa decisão aplica a instrução de não inventar métricas, estados, resultados ou detalhes técnicos e mantém a arquitetura pronta para recebê-los quando houver documentação aprovada.
