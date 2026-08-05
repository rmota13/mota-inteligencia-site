# Fase 3 — plataforma editorial, SEO e autoridade técnica

Implementação e validação local concluídas em 4 de agosto de 2026. Não houve commit, push, Pull Request, deploy, alteração remota, instalação de dependência ou modificação de asset público.

## Conclusão executiva

A Fase 3 criou uma plataforma editorial estática e tipada, conectada aos projetos existentes e sustentada por fontes públicas sanitizadas. A entrega contém:

- três áreas editoriais com listagem e rota individual;
- seis conteúdos iniciais publicados no build local;
- templates e componentes compartilhados;
- links entre projetos, autor e conteúdos;
- metadata dinâmica, canonical, Open Graph, Twitter Cards e imagens sociais individuais;
- JSON-LD de `TechArticle`, `FAQPage`, `BreadcrumbList`, `ItemList` e `WebPage`;
- feed RSS e sitemap editorial automático;
- eventos de Analytics sem alterar GA4 ou Microsoft Clarity;
- preparação tipada para busca local futura, sem engine e sem dependência nova;
- validação técnica, semântica, responsiva, visual e de performance.

## Arquitetura editorial

### Rotas

| Área | Listagem | Conteúdos |
|---|---|---:|
| Projetos | `/projetos` | 6 |
| Insights | `/insights` | 2 |
| Guias | `/guias` | 1 |
| Artigos | `/artigos` | 3 |

Rotas adicionais:

- `/feed.xml` para RSS 2.0;
- `/sitemap.xml` com 17 URLs indexáveis;
- `/robots.txt` preservado;
- `/[tipo]/[slug]/opengraph-image` para imagens editoriais individuais;
- `/projetos/[slug]/opengraph-image` para imagens individuais dos projetos.

O build gerou 24 páginas e rotas. Drafts não entram em listagens, sitemap, feed ou parâmetros estáticos.

### Modelo de conteúdo

O tipo editorial registra:

- slug, título, descrição, tipo e status;
- tópicos e datas;
- resumo executivo;
- seções semânticas;
- FAQ;
- fontes públicas;
- projetos e conteúdos relacionados;
- configuração SEO opcional.

O agregador central fornece consultas por tipo e slug, ordenação de publicados, resolução de relacionados e documentos estáticos preparados para uma futura busca local.

## Conteúdos iniciais

### Guia

- Como estruturar uma integração entre marketplaces e SAP Business One.

### Artigos

- Quando uma automação vira uma plataforma;
- Arquitetura do SAP Commerce Integration Platform;
- FastAPI como camada de integração: fronteira, não orquestrador.

### Insights

- Idempotência em integrações: repetir sem duplicar;
- Observabilidade em fluxos n8n orientada a exceções.

Cada página apresenta resumo executivo, seções, FAQ, fontes, autor, compartilhamento, projetos e conteúdos relacionados e CTA. O guia possui tempo calculado de 12 minutos, compatível com a extensão editorial indicada na especificação.

## Componentes reutilizáveis

- `ArticleCard`;
- `EditorialTemplate`;
- `ArticleTemplate`;
- `GuideTemplate`;
- `InsightTemplate`;
- `EditorialIndexTemplate`;
- `AuthorCard`;
- `ShareButtons`;
- `ReadingTime`;
- `RelatedProjects`;
- `RelatedArticles`;
- `EditorialCta`;
- `RelatedEditorial` para páginas de projeto;
- `ProjectRelatedProjects`;
- `Breadcrumbs` e `ProjectCard` preservados e reutilizados.

## SEO editorial e compreensão por IA

Cada conteúdo possui:

- title e description próprios;
- canonical absoluto resolvido pelo `metadataBase`;
- Open Graph e Twitter Card individuais;
- data de publicação e modificação;
- autor e tópicos;
- imagem social 1200 × 630 gerada por rota;
- HTML semântico com um H1, H2 por seção e listas explícitas;
- resumo executivo;
- FAQ visível e correspondente ao JSON-LD;
- fontes públicas vinculadas;
- internal linking para projeto e conteúdo relacionado.

Os seis conteúdos foram verificados com schemas parseáveis e completos:

- `WebPage`;
- `BreadcrumbList` com três posições;
- `TechArticle` com headline, datas, imagem, autor, tópicos, projetos e citações;
- `FAQPage` com perguntas e respostas equivalentes às exibidas.

As listagens usam `ItemList`. O grafo global existente de `Person`, `ProfessionalService` e `WebSite` foi preservado sem duplicar identidade jurídica.

## RSS, sitemap e robots

- o RSS 2.0 foi validado como XML;
- contém exatamente os seis conteúdos publicados;
- usa URL canônica como `guid`;
- inclui título, descrição, autor, data e categorias;
- declara `atom:link` para autodiscovery;
- a Home declara o tipo `application/rss+xml` na metadata;
- o footer oferece link direto para o feed;
- o sitemap foi validado como XML e contém 17 URLs;
- apenas conteúdo com status `published` entra no feed e no sitemap;
- robots e host foram preservados.

## Analytics, Clarity e vínculos externos

GA4, Microsoft Clarity e a validação Bing permanecem no layout. Foi adicionada uma camada client-side pequena e sem dependências que envia eventos apenas quando `gtag` está disponível.

Eventos preparados:

| Evento | Uso |
|---|---|
| `article_read` | sentinela alcançada ao final do conteúdo |
| `editorial_open` | abertura de card editorial |
| `projects_click` | abertura de projeto ou catálogo |
| `github_click` | acesso a perfil ou documentação pública |
| `linkedin_click` | acesso ao perfil profissional |
| `contact_click` | WhatsApp ou e-mail |
| `share_click` | compartilhamento, e-mail ou cópia do link |
| `source_open` | abertura de fonte editorial |
| `download_click` | nome reservado para download futuro |

O projeto principal passou a vincular o LinkedIn e os conteúdos relacionados. O card de autor editorial vincula o perfil profissional ao projeto em destaque. Nenhuma API do GitHub ou LinkedIn foi consumida.

## Projeto principal

A rota do SAP Commerce Integration Platform recebeu:

- imagem Open Graph individual;
- FAQ com estado real da arquitetura;
- JSON-LD de FAQ;
- seção explícita de limitações, antes existente apenas na fonte tipada;
- conteúdos editoriais relacionados;
- projetos relacionados;
- eventos para GitHub, LinkedIn, catálogo e contato.

Os estados foram preservados: comercial em produção, financeiro entregue e em rollout e conciliação em desenvolvimento.

## Responsividade, acessibilidade e movimento

A auditoria em Chrome headless cobriu 390 × 844, 1024 × 768, 1200 × 630 e 1440 × 900, incluindo:

- Home e nova seção editorial;
- listagem de insights;
- cabeçalho e corpo do guia;
- artigo em mobile e desktop;
- vínculos editoriais dentro do projeto;
- menu mobile;
- movimento reduzido;
- imagem Open Graph.

Resultados:

- zero overflow horizontal da página;
- zero elementos focáveis sem nome acessível;
- zero imagens HTML sem atributo `alt` nas páginas;
- um único H1 em cada página;
- hierarquia iniciada por H1;
- zero erro de parsing JSON-LD;
- menu mobile abre com `aria-expanded="true"`;
- Escape fecha o menu e devolve o foco ao acionador;
- `prefers-reduced-motion` reconhecido e zero animações em execução no cenário auditado;
- zero exceção de runtime da aplicação.

O navegador local bloqueou por política de rede as requisições externas ao Google Tag Manager e ao Microsoft Clarity. Os dois scripts foram encontrados no HTML; os registros são falhas de rede do ambiente de validação, não erros da aplicação.

## Rotas e links

- 25 rotas e imagens verificadas com HTTP 200;
- seis páginas editoriais com canonical e Open Graph individual;
- 18 destinos internos extraídos do HTML e verificados com HTTP 200;
- RSS e sitemap parseados como XML;
- GA4 e Clarity encontrados no HTML editorial.

## Lighthouse 13.4.1

| Página e perfil | Performance | Acessibilidade | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Guia desktop | 100 | 100 | 96 | 100 | 0,25 s | 0,53 s | 0 ms | 0 |
| Guia mobile | 100 | 100 | 100 | 100 | 0,91 s | 1,81 s | 16 ms | 0 |
| Home desktop | 100 | 100 | 100 | 100 | 0,29 s | 0,55 s | 0 ms | 0 |
| Home mobile | 99 | 100 | 100 | 100 | 1,06 s | 1,96 s | 32 ms | 0 |

Todas as amostras locais atingiram as metas da Fase 3. Como o ambiente bloqueou as requisições externas de telemetria, essas notas não substituem uma medição pós-deploy: o Clarity pode voltar a reduzir Best Practices em produção, como registrado nas fases anteriores. O launcher do Lighthouse registrou `EPERM` ao remover diretórios temporários do Chrome no Windows depois de salvar relatórios JSON completos e parseáveis. O mesmo comportamento já havia sido documentado na Fase 2.8 e não afetou os relatórios gravados.

## Validações de engenharia

- `npm.cmd run typecheck`: aprovado;
- `npm.cmd run lint`: aprovado;
- `npm.cmd run build`: aprovado;
- build estático e rotas dinâmicas de imagem gerados sem erro;
- `package.json` e `package-lock.json`: inalterados;
- nenhuma dependência instalada ou atualizada;
- `public/`: inalterado;
- nenhum asset sensível tocado;
- nenhum commit, push, Pull Request ou deploy.

## Evidências

`docs/evidence/phase-3` contém 23 arquivos:

- 19 capturas PNG responsivas e de estado;
- quatro relatórios JSON do Lighthouse.

## Arquivos principais da Fase 3

### Rotas

- `app/insights/page.tsx` e `app/insights/[slug]/*`;
- `app/guias/page.tsx` e `app/guias/[slug]/*`;
- `app/artigos/page.tsx` e `app/artigos/[slug]/*`;
- `app/feed.xml/route.ts`;
- `app/projetos/[slug]/opengraph-image.tsx`;
- `app/sitemap.tsx`;
- `app/layout.tsx`;
- `app/page.tsx`.

### Conteúdo e infraestrutura

- `content/insights.ts`;
- `content/articles.ts`;
- `content/guides.ts`;
- `content/editorial.ts`;
- `types/insight.ts`;
- `lib/editorial.ts`;
- `lib/editorial-metadata.ts`;
- `lib/open-graph-image.tsx`;
- `lib/structured-data.ts`;
- `config/analytics.ts`;
- componentes em `components/insights`, `components/analytics` e `components/projects`.

## Roadmap sugerido para a Fase 4

1. Aprovar individualmente os seis conteúdos e seu calendário editorial.
2. Criar novos conteúdos somente após receber fontes públicas suficientes para os quatro temas retidos.
3. Implementar busca local quando o volume justificar, reutilizando os documentos de indexação já preparados.
4. Definir governança editorial para revisão de estado, fontes, datas e links quebrados.
5. Medir os eventos em ambiente publicado e revisar a nomenclatura depois de acumular dados reais.
6. Tratar consentimento e política de privacidade em trabalho específico, preservando a decisão proporcional das fases anteriores.
7. Sanitizar ou substituir assets sensíveis somente após aprovação separada do inventário existente.
8. Avaliar paginação, taxonomias e páginas por tópico apenas quando houver volume editorial real.

## Encerramento

A Fase 3 está concluída no escopo local e pronta para revisão. A plataforma editorial é estática, rápida, indexável, acessível, conectada aos projetos e limitada a fatos verificáveis. Nenhuma publicação ou ação remota foi realizada.
