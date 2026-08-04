# Fase 2 — evolução institucional e validação

Registro concluído em 3 de agosto de 2026. A implementação partiu da fundação aprovada na Fase 1 e preservou analytics, acessibilidade, responsividade e publicação estática.

## Resultado

A Home deixou de apresentar uma sequência centrada em serviços e passou a comunicar capacidade de engenharia nesta ordem:

1. Hero;
2. proposta de valor;
3. ecossistemas integráveis;
4. projeto principal;
5. projetos selecionados;
6. capacidades empresariais;
7. stack contextualizada;
8. método de trabalho;
9. perfil profissional;
10. GitHub;
11. CTA;
12. Footer.

O dashboard com métricas ilustrativas foi substituído por um mapa de arquitetura empresarial. O mapa mostra Mercado Livre, Nuvemshop e Shopee conectados à camada de orquestração, serviços de domínio e persistência, com SAP Business One, ciclo financeiro e observabilidade como destinos. Idempotência, retry, quarentena e correlation ID aparecem como capacidades transversais.

## Projetos e rotas

Rotas públicas criadas:

- `/projetos`;
- `/projetos/sap-commerce-integration-platform`;
- `/projetos/gestao-inteligente-pedidos-abertos`;
- `/projetos/cobranca-inteligente`;
- `/projetos/cotacoes-acima-35-mil`;
- `/projetos/pedidos-mais-48-horas`;
- `/projetos/relatorios-sap-identidade-visual`.

O catálogo está organizado em Plataformas, SAP Business One, Automação, Dados, Infraestrutura e Aplicações. Todos os cards apontam para páginas próprias; o modal antigo deixou de fazer parte da aplicação.

O case principal possui módulos para resumo executivo, problema, contexto, arquitetura, fluxo, tecnologias, Fase Comercial, Fase Financeira, Conciliação, engenharia, segurança, observabilidade, resultados, roadmap, GitHub e CTA. As demais páginas usam o mesmo modelo flexível e omitem módulos sem conteúdo aprovado.

## Fonte do case principal

O conteúdo técnico foi confrontado em modo leitura com o repositório público `rmota13/sap-business-one-integration-platform`, incluindo README, arquitetura, fluxos, decisões, segurança, observabilidade, roadmap e case de portfólio.

Foram preservadas as classificações documentadas:

- Fase Comercial em produção;
- Fase Financeira entregue e em rollout;
- Conciliação em desenvolvimento.

Não foram adicionadas métricas, nomes de clientes, endpoints, credenciais, payloads ou regras proprietárias.

## Insights

A infraestrutura editorial foi preparada por meio de:

- tipo de conteúdo `Insight`;
- fonte de conteúdo tipada e vazia;
- template editorial compartilhado;
- template de artigo;
- template de insight.

`/insights` retorna 404 e não aparece no menu, pois ainda não existe conteúdo editorial aprovado.

## SEO e dados estruturados

Implementado:

- metadata específica na Home, no catálogo e em cada projeto;
- canonical absoluto;
- Open Graph e Twitter Cards;
- imagem social 1200 × 630 gerada pela aplicação;
- sitemap com o catálogo e os seis projetos;
- breadcrumbs visuais e em JSON-LD;
- links internos entre Home, catálogo e páginas de projeto;
- `WebPage` na Home e nas páginas internas;
- `BreadcrumbList` no catálogo e nos projetos;
- `ItemList` no catálogo;
- `SoftwareSourceCode` no projeto principal;
- `CreativeWork` nos demais projetos;
- `Person`, `ProfessionalService` e `WebSite` globais.

`Organization` não foi utilizado. Todos os blocos JSON-LD foram convertidos de volta para JSON durante a validação, sem erro.

## Analytics e integrações preservadas

Confirmados no HTML de produção local:

- Google Analytics `G-GKDVFR37K4`;
- Microsoft Clarity `wsm484ezzp`;
- validação Microsoft `5674226CB9CDE7C1A05CD689CAC4A25B`;
- WhatsApp, e-mail, telefone, LinkedIn e GitHub.

## Validações automatizadas

| Verificação | Resultado |
|---|---|
| `npm.cmd run lint` | Sucesso, sem erros ou avisos |
| `npm.cmd run typecheck` | Sucesso, sem erros |
| `npm.cmd run build` | Sucesso, 14 páginas geradas |
| `git diff --check` | Sem erros; apenas avisos locais LF/CRLF |
| Rotas públicas | 200 em Home, catálogo, seis projetos, OG image, robots e sitemap |
| `/insights` | 404 intencional |
| Runtime no Chrome | Nenhuma exceção |
| Menu mobile | Abre, fecha com Escape e devolve o foco ao acionador |

O build final gerou conteúdo estático para `/`, `/projetos`, `/opengraph-image`, `/robots.txt` e `/sitemap.xml`, além de SSG para os seis slugs de projeto.

## Lighthouse

Relatório: `docs/evidence/phase-2/lighthouse-home.json`.

| Categoria/métrica | Resultado |
|---|---:|
| Performance | 94 |
| Acessibilidade | 100 |
| Best Practices | 77 |
| SEO | 100 |
| First Contentful Paint | 0,9 s |
| Largest Contentful Paint | 2,4 s |
| Total Blocking Time | 220 ms |
| Cumulative Layout Shift | 0 |

Performance e SEO superaram o alvo 90. Best Practices não atingiu 90 porque o Lighthouse identificou oito cookies de terceiros e um Inspector Issue, todos originados pelo Microsoft Clarity. Remover ou bloquear o Clarity apenas para elevar a nota contrariaria a exigência de preservá-lo. Consentimento e política de carregamento continuam como decisão posterior de privacidade.

Não existia um relatório Lighthouse da Fase 1; portanto, não há base numérica equivalente para afirmar ganho ou perda entre as fases. O resultado atual, o build estático, LCP de 2,4 s e CLS zero constituem a referência a partir desta fase.

## Responsividade

Validação por Chrome DevTools Protocol:

| Cenário | Overflow horizontal | Resultado |
|---|---:|---|
| 360 × 800 | Não | Aprovado |
| 390 × 844 | Não | Aprovado |
| 768 × 1024 | Não | Aprovado; menu compacto mantido até 1024 px |
| 1366 × 768 | Não | Aprovado |
| 1440 × 900 | Não | Aprovado |
| 1920 × 1080 | Não | Aprovado |
| 1152 × 720, equivalente a 125% | Não | Aprovado |
| 960 × 600, equivalente a 150% | Não | Aprovado |

O Header permanece no fluxo por `position: sticky`, continua compartilhando a altura via token CSS e não utiliza transformação negativa. A altura foi reduzida para liberar mais conteúdo no primeiro viewport, e o breakpoint da navegação desktop foi movido para 1024 px após a detecção e correção de overflow em 768 px.

## Evidências visuais

### Antes da Fase 2

A referência imediatamente anterior é o conjunto aprovado da Fase 1:

- `docs/evidence/phase-1/after/desktop-1366x768.png`;
- `docs/evidence/phase-1/after/desktop-1440x900.png`;
- `docs/evidence/phase-1/after/desktop-1920x1080.png`;
- `docs/evidence/phase-1/after/mobile-360x800-emulated.png`;
- `docs/evidence/phase-1/after/mobile-390x844-emulated.png`.

### Depois da Fase 2

- `docs/evidence/phase-2/after/home-desktop-1366x768-cdp.png`;
- `docs/evidence/phase-2/after/home-desktop-1440x900-cdp.png`;
- `docs/evidence/phase-2/after/home-desktop-1920x1080-cdp.png`;
- `docs/evidence/phase-2/after/home-mobile-360x800-cdp.png`;
- `docs/evidence/phase-2/after/home-mobile-390x844-cdp.png`;
- `docs/evidence/phase-2/after/home-tablet-768x1024-cdp.png`;
- `docs/evidence/phase-2/after/home-desktop-1152x720-zoom125-cdp.png`;
- `docs/evidence/phase-2/after/home-desktop-960x600-zoom150-cdp.png`;
- `docs/evidence/phase-2/after/home-mobile-390x844-menu-cdp.png`;
- `docs/evidence/phase-2/after/projects-desktop-1440x900-cdp.png`;
- `docs/evidence/phase-2/after/projects-mobile-390x844-cdp.png`;
- `docs/evidence/phase-2/after/project-sap-desktop-1440x900-cdp.png`;
- `docs/evidence/phase-2/after/project-sap-mobile-390x844-cdp.png`.

## Comparativo antes × depois

| Antes | Depois |
|---|---|
| Hero centrado em BI e “decisões reais” | Hero centrado em arquitetura, integrações, automação e dados |
| Dashboard com métricas ilustrativas | Mapa arquitetural sem métricas inventadas |
| Serviços como primeira camada institucional | Proposta de valor e ecossistemas antes das capacidades |
| Tecnologias apresentadas como grade de logos | Stack explicada pelo papel em cada camada |
| Projetos abertos em modal | Catálogo e página própria para cada projeto |
| Case principal ausente da interface | SAP Commerce Integration Platform em destaque e com case completo |
| Sem método de trabalho | Fluxo visual de Diagnóstico a Evolução |
| LinkedIn com número fixo de conexões | Perfil profissional sem métrica volátil |
| GitHub sem seção institucional | Perfil, projeto principal e projetos públicos conectados visualmente |
| SEO concentrado na Home | Metadata, canonical, breadcrumbs e schemas por rota |

## Arquivos alterados na Fase 2

### Aplicação e rotas

- `app/globals.css`;
- `app/layout.tsx`;
- `app/page.tsx`;
- `app/robots.tsx`;
- `app/sitemap.tsx`;
- `app/opengraph-image.tsx`;
- `app/projetos/page.tsx`;
- `app/projetos/[slug]/page.tsx`.

### Home e layout

- `components/home/about-section.tsx`;
- `components/home/contact-section.tsx`;
- `components/home/ecosystems-section.tsx`;
- `components/home/featured-project-section.tsx`;
- `components/home/github-section.tsx`;
- `components/home/hero-section.tsx`;
- `components/home/projects-section.tsx`;
- `components/home/solutions-section.tsx`;
- `components/home/technologies-section.tsx`;
- `components/home/value-proposition-section.tsx`;
- `components/home/work-method-section.tsx`;
- `components/layout/brand.tsx`;
- `components/layout/mobile-navigation.tsx`;
- `components/layout/site-footer.tsx`;
- `components/layout/site-header.tsx`.

### Projetos e componentes compartilhados

- `components/projects/architecture-map.tsx`;
- `components/projects/project-card.tsx`;
- `components/projects/project-content-section.tsx`;
- `components/projects/project-gallery.tsx`;
- `components/projects/project-status.tsx`;
- `components/ui/breadcrumbs.tsx`;
- `components/ui/content-icon.tsx`.

### Conteúdo, configuração, tipos e SEO

- `config/navigation.ts`;
- `config/site.ts`;
- `content/home.ts`;
- `content/insights.ts`;
- `content/projects.ts`;
- `lib/structured-data.ts`;
- `types/home.ts`;
- `types/insight.ts`;
- `types/project.ts`.

### Infraestrutura editorial

- `components/insights/article-template.tsx`;
- `components/insights/editorial-template.tsx`;
- `components/insights/insight-template.tsx`.

### Evidências e documentação

- `docs/audits/phase-2-validation.md`;
- `docs/evidence/phase-2/lighthouse-home.json`;
- os 13 arquivos PNG listados em “Evidências visuais”.

## Git diff resumido

O `git diff --shortstat` mostra `6 files changed, 190 insertions(+), 1128 deletions(-)` para os arquivos que já existiam no commit-base. A maior redução vem da antiga Home monolítica. Os novos diretórios permanecem como arquivos não rastreados e, por isso, não entram nessa estatística enquanto não forem adicionados ao índice. Nenhum arquivo foi staged.

Branch atual: `feat/portfolio-enterprise-evolution`. Commit-base: `118507a`.

## Assets

Nenhum arquivo em `public/` foi alterado, substituído, movido ou removido. O inventário da Fase 1 continua válido.

## Pendências e riscos

- As capturas reais de projetos em `public/cases` continuam com o risco de exposição descrito em `docs/audits/public-assets.md`. Sanitização ou substituição depende de aprovação específica.
- O diretório `public/` permanece com aproximadamente 31,88 MB; os logos PNG pesados deixaram de ser carregados na Home, mas os arquivos continuam publicamente acessíveis.
- O Clarity reduz Best Practices e reforça a necessidade de decisão sobre consentimento e privacidade.
- O estado do case principal é uma fotografia do repositório público em 3 de agosto de 2026 e deve ser revisto quando o rollout ou o roadmap mudarem.
- Insights permanece intencionalmente sem rota até existir conteúdo aprovado.
- Não foi criada uma rota institucional separada para metodologia, tecnologias, soluções ou GitHub nesta fase.

## Encerramento

Nenhum commit, push ou Pull Request foi realizado. A execução para antes da Fase 3 e aguarda aprovação manual.
