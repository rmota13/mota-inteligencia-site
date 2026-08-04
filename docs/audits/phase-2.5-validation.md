# Fase 2.5 — auditoria final, SEO e hardening

Auditoria e implementação local concluídas em 3 de agosto de 2026. Esta fase termina antes da Fase 2.6 e da Fase 3. Não houve commit, push, Pull Request, deploy ou alteração em serviços externos.

## Conclusão executiva

A aplicação local está funcional, indexável, responsiva e com build estático válido. A Fase 2.5 corrigiu o host canônico, adicionou headers defensivos, retirou 1,4 MiB redundante do carregamento inicial, reduziu hidratação do Header e deslocou analytics para o período ocioso sem perder o `page_view`.

A produção **não pode ser aprovada como equivalente ao local**: ainda publica a versão anterior, retorna 404 para `/projetos`, para os seis cases e para `/opengraph-image`, e expõe todas as 12 capturas em `public/cases` por URL direta. Há também cinco alertas de segurança altos na árvore npm, incluindo `next@16.2.4`. Esses dois pontos são gates P0 antes de considerar a nova versão pronta para publicação deliberada.

## Alterações da Fase 2.5

- `config/site.ts`: canonical base alterada para `https://www.motainteligencia.com.br`, alinhada ao host efetivo de produção.
- `next.config.ts`: headers `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options` e `Permissions-Policy` em todas as rotas.
- `app/layout.tsx`: removida a declaração redundante do `favicon.png`; GA4 e Clarity usam `lazyOnload`.
- `components/layout/site-header.tsx`: Header convertido em Server Component; somente o menu móvel hidrata.
- documentação e evidências da Fase 2.5 adicionadas em `docs/audits` e `docs/evidence/phase-2.5`.

Nenhum asset em `public/` foi alterado.

## Local × produção

| Item | Build local final | Produção em 03/08/2026 | Situação |
|---|---|---|---|
| Host principal | `www.motainteligencia.com.br` | apex responde 307 para `www` | Canonical local alinhada; redirect deveria ser permanente |
| `/` | 200, nova Home | 200, Home anterior | Deploy pendente |
| `/projetos` | 200 | 404 | Deploy pendente |
| 6 páginas de projeto | 200 | 404 | Deploy pendente |
| `/opengraph-image` | 200, PNG 1200 × 630 | 404 | Deploy pendente |
| Canonical da Home | `https://www.motainteligencia.com.br` | Ausente | Corrigido localmente |
| OG image da Home | `/opengraph-image` | `logo-mota.png` quadrado | Corrigido localmente |
| `robots.txt` | Allow, Host e Sitemap | Conteúdo gerenciado do Cloudflare, sem Sitemap do origin | Revalidar após deploy |
| `sitemap.xml` | Home, catálogo e 6 cases | Apenas Home, com canonical apex | Deploy pendente |
| Headers defensivos | Presentes | Ausentes, exceto HSTS do edge | Deploy pendente |
| GA4/Clarity | Presentes e com tráfego confirmado | Presentes | Preservados |

Respostas de produção confirmadas:

- `https://motainteligencia.com.br/`: 307 para `https://www.motainteligencia.com.br/`;
- Home `www`: 200;
- catálogo e case SAP: 404;
- OG image: 404;
- favicon PNG: 200 e 1.444.335 bytes;
- as 12 URLs em `/cases/*.png`: 200.

Um 307 é temporário. Para consolidar sinais de busca e compartilhamento, o redirect apex → `www` deve ser alterado no provedor para 308 ou 301 e testado sem cadeia intermediária. Isso é configuração externa e não foi alterado.

## SEO técnico

### Crawl local final

| Verificação | Resultado |
|---|---|
| URLs indexáveis no sitemap | 8 |
| Status das 8 URLs | 200 |
| Title | Único e presente em todas as URLs |
| Meta description | Presente em todas as URLs |
| Canonical absoluto | Presente e alinhado ao `www` em todas as URLs |
| H1 | Exatamente 1 por URL |
| Imagens sem `alt` | 0 |
| Links internos quebrados | 0 |
| Âncoras internas sem destino | 0 |
| JSON-LD inválido | 0 blocos |
| `robots.txt` local | 200, `Allow: /`, Host e Sitemap |
| `sitemap.xml` local | 200 e XML válido |
| `/insights` | 404 intencional; não aparece no sitemap/menu |

Os links externos para GitHub e WhatsApp responderam 200. O LinkedIn respondeu 999 ao cliente automatizado, comportamento de proteção contra bots, mas a URL correta aparece publicamente indexada.

### Search Console

Sem sessão autenticada na propriedade, não foi possível confirmar propriedade, cobertura, inspeção de URL, Core Web Vitals de campo ou submissão efetiva. Nenhuma ação externa foi simulada como concluída.

Preparação local:

- canonical, robots e sitemap convergem para o host `www`;
- todas as URLs do sitemap retornam 200 localmente;
- não existem `noindex` acidentais;
- após deploy, submeter `https://www.motainteligencia.com.br/sitemap.xml` e inspecionar Home, catálogo e case SAP;
- verificar exclusões, canonical escolhida pelo Google e CWV no [relatório de indexação](https://support.google.com/webmasters/answer/10264824?hl=pt-BR) e no [relatório de Sitemaps](https://support.google.com/webmasters/answer/7451001?hl=pt-BR).

Busca pública por `site:motainteligencia.com.br` não retornou páginas do domínio durante a auditoria. Isso é indício, não prova definitiva de ausência no índice; o Search Console autenticado é a fonte adequada.

### Bing Webmaster Tools

A meta tag `msvalidate.01` com o valor já existente está presente no HTML local e na Home de produção. Sem sessão autenticada, não foi possível confirmar propriedade, sitemap processado, Site Explorer ou erros de crawl.

Após deploy:

1. confirmar a propriedade conforme as [opções oficiais de verificação do Bing](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b);
2. submeter/confirmar o [sitemap](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed);
3. revisar Home, catálogo e cases no [Site Explorer](https://www.bing.com/webmasters/help/site-explorer-c680da37).

### Cloudflare e `robots.txt`

O conteúdo de produção mostra o bloco Managed Content do Cloudflare, permite busca geral e bloqueia treinamento/alguns crawlers de IA, mas ainda não incorpora o Sitemap do origin antigo. A [documentação do Cloudflare](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/) informa que, quando o origin responde 200 para seu próprio `robots.txt`, o conteúdo gerenciado é acrescentado ao arquivo existente. Portanto:

- manter a decisão atual de política de IA sem alterá-la nesta fase;
- publicar o origin que já retorna 200 com Host/Sitemap;
- invalidar cache e confirmar se o Cloudflare passou a combinar os blocos;
- se continuar servindo apenas o bloco gerenciado, revisar configuração/routing do origin no painel.

## Dados estruturados e Rich Results

Blocos encontrados e convertidos novamente para JSON sem erro:

- globais: `Person`, `ProfessionalService` e `WebSite`;
- Home e páginas internas: `WebPage`;
- catálogo: `BreadcrumbList` e `ItemList`;
- case principal: `BreadcrumbList` e `SoftwareSourceCode`;
- demais cases: `BreadcrumbList` e `CreativeWork`.

IDs, URLs e breadcrumbs usam o mesmo canonical `www`. Campos obrigatórios definidos pelo modelo local estão presentes. O Google recomenda JSON-LD, mas markup válido não garante rich result; apenas tipos listados na [galeria de recursos de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) geram tratamentos específicos. A validação pública no Rich Results Test fica pendente porque as novas páginas ainda retornam 404 em produção. Após o deploy, testar ao menos catálogo e case SAP conforme as [diretrizes gerais](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## Open Graph, Twitter e compartilhamento

Localmente:

- `og:title`, `og:description`, `og:url`, `og:type`, locale e site name presentes;
- Twitter Card `summary_large_image` presente;
- imagem gerada em PNG, 1200 × 630, 110.889 bytes;
- titles/descriptions específicos para catálogo e cases;
- URL da imagem absoluta no HTML renderizado.

Em produção, `/opengraph-image` retorna 404 e a Home ainda aponta para o logo quadrado antigo. LinkedIn, Facebook e X não podem validar a versão local. O gate pós-deploy é abrir as URLs públicas nos debuggers oficiais, solicitar nova coleta e verificar título, descrição, canonical e crop 1,91:1.

## Lighthouse e Core Web Vitals

### Resultado final

| Perfil | Performance | Acessibilidade | Best Practices | SEO | FCP | LCP | TBT | CLS | TTFB |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Desktop | **100** | **100** | 77 | **100** | 0,2 s | 0,6 s | 0 ms | 0 | 10 ms |
| Mobile | 93 | **100** | 77 | **100** | 0,9 s | 2,6 s | 220 ms | 0 | 40 ms |

Evidências finais:

- `docs/evidence/phase-2.5/lighthouse-final-desktop.report.html` e `.json`;
- `docs/evidence/phase-2.5/lighthouse-final-lazy-telemetry.report.html` e `.json`.

O target ≥95 foi atingido no desktop e não no mobile. No mobile, LCP de 2,6 s fica 0,1 s acima do limiar “bom” de laboratório; CLS é zero e TBT permanece aceitável. INP não é produzido por uma navegação Lighthouse sem interação nem havia dados de campo autenticados/RUM disponíveis, então não foi inventado.

Best Practices permanece em 77 por oito cookies de terceiros e um Inspector Issue associados ao Clarity. Remover o Clarity apenas para elevar nota violaria o requisito de preservação. A estratégia de consentimento abaixo é a correção apropriada.

O payload da Home caiu de aproximadamente 1.867 KiB para 456 KiB quando a declaração do `favicon.png` de 1,44 MiB foi removida. O `app/favicon.ico` de cerca de 15 KiB continua declarado pelo Next.js. O audit `image-delivery-insight` não encontrou economia nas imagens efetivamente renderizadas.

Houve variação sintética entre execuções do Lighthouse, inclusive amostras diagnósticas com simulação de LCP incompatível com o breakdown real de renderização. Por isso, os relatórios foram preservados e o resultado final não é tratado como dado de campo. Após deploy, CrUX/Search Console e várias execuções em rede controlada devem prevalecer sobre uma única amostra local.

## Responsividade e navegadores

Matriz executada em Windows com Chrome 150.0.7871.187 e Edge 151.0.4129.59:

| Viewport/zoom equivalente | Chrome | Edge | Overflow horizontal | Menu |
|---|---|---|---:|---|
| 360 × 800 | Aprovado | Aprovado | Não | Abre, Escape fecha e foco retorna |
| 390 × 844 | Aprovado | Aprovado | Não | Abre, Escape fecha e foco retorna |
| 768 × 1024 | Aprovado | Aprovado | Não | Abre, Escape fecha e foco retorna |
| 1024 × 768 | Aprovado | Aprovado | Não | Navegação desktop |
| 1366 × 768 | Aprovado | Aprovado | Não | Navegação desktop |
| 1440 × 900 | Aprovado | Aprovado | Não | Navegação desktop |
| 1920 × 1080 | Aprovado | Aprovado | Não | Navegação desktop |
| 1152 × 720 (125%) | Aprovado | Aprovado | Não | Navegação desktop |
| 960 × 600 (150%) | Aprovado | Aprovado | Não | Menu compacto |

Todas as execuções tiveram um H1 e zero exceções de runtime. Capturas e métricas por cenário estão em `docs/evidence/phase-2.5/responsive`.

Firefox não está instalado nesta máquina; portanto, não foi marcado como aprovado. Uma passada manual em Firefox Windows continua pendente após deploy.

## Segurança

### Código e configuração

- varredura do working tree: nenhum padrão de segredo de alta confiança;
- nenhum arquivo `.env` no working tree;
- busca por diff no histórico Git: nenhum padrão de segredo de alta confiança;
- IDs de GA4, Clarity e validação Bing são identificadores públicos, não credenciais;
- e-mail, telefone e WhatsApp são dados de contato publicados intencionalmente;
- nenhuma CSP foi ativada: uma política sem nonce/teste poderia bloquear Next.js, GA4 ou Clarity.

Headers locais finais:

- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: SAMEORIGIN`;
- `Permissions-Policy: camera=(), geolocation=(), microphone=(), browsing-topics=()`.

A produção já envia HSTS, mas ainda não envia esses quatro headers. CSP com nonce, `frame-ancestors` e allowlist de GA4/Clarity deve ser projetada e testada em Report-Only antes de enforcement.

### Assets e dependências

- as 12 capturas de projeto estão publicamente acessíveis e contêm os riscos descritos no [inventário da Fase 2.5](./phase-2.5-public-assets.md);
- `npm audit` encontrou 5 pacotes em severidade consolidada alta e 1 baixa;
- `next@16.2.4` é dependência direta vulnerável;
- nenhuma atualização automática foi realizada.

Detalhes e plano de correção: [dependências da Fase 2.5](./phase-2.5-dependencies.md).

## Analytics e eventos

Validação real por Chrome DevTools Protocol após o build final:

- carregamento de `gtag/js?id=G-GKDVFR37K4`;
- request para `google-analytics.com/g/collect` com evento `page_view`;
- carregamento de `clarity.ms/tag/wsm484ezzp` e `scripts.clarity.ms/.../clarity.js`;
- request para `clarity.ms/collect`;
- cookies `_ga`, `_ga_GKDVFR37K4`, `_clck` e `_clsk` observados;
- zero exceções de runtime.

| Evento esperado | Implementação atual | Validação |
|---|---|---|
| Page View | Automático via `gtag('config', ...)` | **Operacional** |
| Visualização de projeto | Sem evento customizado | Não validável |
| Clique GitHub | Sem evento customizado | Não validável |
| Clique LinkedIn | Sem evento customizado | Não validável |
| Clique contato/WhatsApp/e-mail | Sem evento customizado | Não validável |

A fase proíbe criar eventos novos, então essas ausências foram documentadas em vez de mascaradas. GA4 e Clarity usam `lazyOnload`: permanecem operacionais, mas saem do caminho crítico imediato.

## Estratégia de consentimento — proposta, não implementada

O comportamento atual grava cookies analíticos sem uma escolha local de consentimento. A [ANPD classifica cookies analíticos como cookies de desempenho](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/glossario-anpd/c) e seu [guia orientativo](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf) recomenda transparência, gestão de preferências e salvaguardas. A proposta técnica para uma fase posterior é:

1. classificar GA4 e Clarity como analytics não essenciais;
2. exibir ações equivalentes “Aceitar”, “Recusar” e “Gerenciar”, sem caixas pré-marcadas;
3. adotar Google Consent Mode com estado padrão negado; no modo básico, não carregar a tag antes da decisão, conforme a [documentação do Google](https://support.google.com/analytics/answer/10000067?hl=pt-BR);
4. habilitar Consent Mode no projeto Clarity e transmitir `analytics_storage`, seguindo a [documentação da Microsoft](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode);
5. persistir apenas versão, categorias, timestamp e prova mínima da escolha;
6. oferecer retirada/alteração de consentimento no Footer;
7. publicar política de privacidade/cookies com finalidades, fornecedores, cookies, retenção, transferências e canal do titular;
8. validar zero `_ga`, `_clck` e `_clsk` antes da escolha/recusa e coleta normal após aceite;
9. submeter texto, base legal e retenção à revisão jurídica do controlador.

Nenhum banner, CMP, bloqueio ou Consent API foi implementado nesta fase.

## GitHub

Auditoria em modo leitura:

- `https://github.com/rmota13`: 200;
- `sap-business-one-integration-platform`: público, branch `main`, não arquivado, descrição técnica presente e README acessível;
- os links locais do README para os documentos do repositório existem;
- o case do site mantém os estados confirmados no repositório: Comercial em produção, Financeiro em rollout e Conciliação em desenvolvimento;
- não existe `LICENSE` no repositório principal;
- o campo homepage do repositório principal está vazio;
- `mota-inteligencia-site` é público, mas a descrição externa contém “Portifólio” e a homepage aponta para o domínio Vercel, não para o canonical `www`;
- o site aponta apenas para o perfil e o repositório principal, ambos válidos.

Nenhuma descrição, homepage, visibilidade, README, licença ou configuração do GitHub foi alterada.

## LinkedIn

- URL usada pelo site: `https://br.linkedin.com/in/rodrigo-mota-2619b422`;
- perfil público indexado como Rodrigo Mota, Belo Horizonte, AURATEC;
- o conteúdo indexado ainda enfatiza “Dados/BI”, enquanto o site agora enfatiza arquitetura, integrações e automação — existe uma lacuna de posicionamento a revisar manualmente;
- CTA do site está correto e abre em nova aba;
- `linkedin-rodrigo.png` tem 400 × 400 e baixo peso; a correspondência com a foto atual não pôde ser confirmada por automação;
- preview OG da nova versão depende do deploy e de refresh do cache do LinkedIn.

Nenhuma alteração no perfil foi realizada.

## Conteúdo e consistência

- não foram encontrados lorem ipsum, placeholders, TODOs ou “Portifólio” na aplicação;
- titles, H1s, CTAs e schemas convergem para arquitetura, integrações, automação e dados;
- status do case SAP permanece coerente com a documentação pública auditada;
- não foram acrescentados clientes, métricas, endpoints, credenciais ou regras proprietárias;
- Footer e metadata usam “Mota Inteligência de Negócio” de modo consistente;
- a principal inconsistência externa é o posicionamento antigo indexado no LinkedIn e a descrição/homepage do repositório do site no GitHub.

## Validações finais

| Comando/verificação | Resultado |
|---|---|
| `npm.cmd run lint` | Sucesso, sem erros ou warnings |
| `npm.cmd run typecheck` | Sucesso, sem erros |
| `npm.cmd run build` | Sucesso final, 14 páginas geradas |
| `git diff --check` | Sem erros; apenas avisos locais de normalização LF/CRLF |
| Crawl HTTP local | 8 URLs indexáveis com 200; robots, sitemap e OG com 200 |
| Links/âncoras | Sem quebra interna; GitHub e WhatsApp 200 |
| JSON-LD | Todos os blocos parseáveis |
| Analytics | GA4 `page_view` e Clarity collect confirmados |
| Segurança de código | Sem segredo de alta confiança ou `.env` |
| `npm audit` | Falhou gate: 5 altos e 1 baixo |
| Assets | Falhou gate: 12 capturas expostas em produção |

## Priorização para publicação e próxima fase

### P0 — bloqueadores

1. Aprovar e executar atualização controlada do Next.js para versão corrigida; repetir toda a bateria.
2. Substituir/sanitizar as dez capturas usadas e retirar as duas sensíveis sem uso; purgar CDN e testar URLs antigas.
3. Só então publicar a nova versão e comparar novamente local × produção.

### P1 — pós-deploy

1. Converter o redirect apex → `www` de 307 para 308/301.
2. Confirmar merge do `robots.txt` pelo Cloudflare e presença do Sitemap.
3. Submeter/confirmar sitemap e URLs no Search Console e Bing.
4. Rodar Rich Results Test e debuggers de LinkedIn/Facebook/X.
5. Observar CWV/INP real e consentimento em produção.
6. Corrigir homepage/descrição/licença no GitHub e alinhar posicionamento do LinkedIn, mediante autorização externa.

### P2 — higiene

1. Retirar logos e arquivos de scaffold sem uso da área pública.
2. Implementar consentimento após decisão jurídica e de UX.
3. Planejar CSP em Report-Only com nonce e allowlists.
4. Considerar eventos customizados somente em fase que os autorize.

## Encerramento

A Fase 2.5 está concluída no escopo local e documental. Ela não declara produção aprovada, não avança para a Fase 2.6/3 e preserva todas as ações externas ou destrutivas para decisão separada.
