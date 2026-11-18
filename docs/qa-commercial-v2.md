# QA — V2 comercial

- Data: 18/11/2026
- Branch: `revamp/commercial-v2`
- Ambiente: build de produção do Next.js servido localmente com `next start`
- Escopo: responsividade, usabilidade, conversão, acessibilidade, consistência visual, conteúdo, SEO técnico e regressões

## Validações automatizadas

- `npm run typecheck`: aprovado.
- `npm run lint`: aprovado, sem avisos.
- `npm run build`: aprovado; 26 páginas geradas pelo Next.js.
- 72 combinações de rota e viewport validadas no build real, sem ocorrência registrada.
- Todas as oito rotas responderam HTTP 200.
- Em todas as combinações, `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.
- `prefers-reduced-motion: reduce` foi reconhecido e não deixou animações ativas.

## Viewports testados

- 360 × 800
- 390 × 844
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1366 × 768
- 1440 × 900
- 1536 × 864
- 1920 × 1080

## Rotas testadas

- `/`
- `/projetos`
- `/projetos/sap-commerce-integration-platform`
- `/projetos/bi-reliability-data-quality`
- `/projetos/ia-classificacao-enriquecimento-dados`
- `/insights`
- `/artigos/arquitetura-sap-commerce-integration-platform`
- `/guias/integrar-marketplaces-sap-business-one`

## Problemas encontrados e corrigidos

- Quebra arbitrária de palavras e compressão do `ArchitectureMap` em larguras intermediárias.
- Diagrama do Hero excessivamente específico para um único cenário SAP.
- Hero e header altos demais para notebooks, deixando o CTA principal abaixo da primeira dobra.
- Navegação desktop ativada antes de existir espaço suficiente para logo, seis links e CTA.
- Menu mobile sem bloqueio do scroll de fundo, foco inicial, contenção de Tab e devolução de foco.
- Overlay mobile posicionado incorretamente por causa do contexto criado pelo backdrop do header.
- Cards com altura fixa para imagens 16:9 e categorias com separação pouco clara.
- Covers dos novos cases ausentes da região inicial das páginas internas e repetidas na galeria.
- Título fixo do fluxo SAP reutilizado indevidamente nos cases de BI e IA.
- Estados públicos dos novos cases acima do nível factual documentado.
- Home comercial densa, com seções editoriais e técnicas competindo com solução, prova e contato.
- Copy do GitHub orientada a detalhe de implementação e copy de sustentação orientada a horas.
- Metadata de `/projetos`, dados estruturados e datas do sitemap desatualizados para o posicionamento comercial atual.
- Listagem de projetos repetida por categoria e novamente no catálogo completo.

## Resultado do QA visual e funcional

- `ArchitectureMap` responde à largura real do contêiner, empilha em espaços estreitos e mantém ícones sem encolhimento.
- “Orquestração”, “Nuvemshop”, “SAP Business One”, “Serviços de domínio”, “Fila e persistência”, “Ciclo financeiro” e “Observabilidade” não quebram no meio.
- CTA principal aparece na primeira dobra nas resoluções de notebook solicitadas.
- Menu desktop aparece a partir de `xl`; abaixo disso, o menu mobile permanece disponível.
- Menu mobile bloqueia o fundo, move e contém o foco, fecha com Escape e devolve o foco ao acionador.
- Cards e covers usam proporção 16:9, `object-cover` e posição central, sem deformação observada.
- Categorias dos cards aparecem como pills separadas.
- As covers aprovadas aparecem uma vez no Hero dos novos cases e não são repetidas logo abaixo.
- Breadcrumbs, anchors, filtros, hover, foco de teclado e navegação foram verificados.
- O `body` mantém a proteção existente contra overflow horizontal, mas nenhum overflow real foi detectado pela medição do documento.

## Lighthouse

Auditoria executada sem adicionar dependência ao projeto.

| Perfil | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 96 | 100 | 77 | 100 | 1,1 s | 0 |
| Desktop | 100 | 100 | 77 | 100 | 0,3 s | 0 |

O resultado de Best Practices abaixo de 90 é causado pelos cookies de terceiros e pelos avisos associados ao Microsoft Clarity. O relatório encontrou oito cookies de terceiros. O mobile também apontou 210 ms de Total Blocking Time e oportunidades não bloqueantes em JavaScript não utilizado, JavaScript legado e cache de recursos externos. Analytics e Clarity foram preservados conforme o escopo.

## SEO e privacidade

- Canonical, Open Graph, Twitter metadata, robots e dados estruturados foram verificados.
- O domínio canônico permanece `https://www.motainteligencia.com.br`.
- Home, `/projetos` e índices editoriais receberam `lastModified` da V2 comercial no sitemap.
- Não foi localizada uma política pública de privacidade/cookies nem uma interface de consentimento no site atual.
- Antes de campanhas de aquisição, é necessário decidir e implementar a política de privacidade e o mecanismo de consentimento aplicável a Google Analytics e Microsoft Clarity, com validação jurídica adequada.

## Restrições preservadas

- Os PNGs aprovados em `public/cases` não foram alterados.
- Conteúdo editorial e páginas de artigos, guias e insights foram preservados.
- Nenhuma métrica ou resultado foi inventado.
- Não houve merge em `main` nem publicação manual em produção.
