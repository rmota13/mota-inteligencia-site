# Fase 2.6 — refinamentos de identidade visual

Implementação e validação local concluídas em 4 de agosto de 2026. A fase preserva a arquitetura, o posicionamento, as rotas, o conteúdo institucional, SEO e telemetria existentes. Não houve commit, push, Pull Request, deploy ou alteração em serviços externos.

## Resultado

A Fase 2.6 entregou três refinamentos visuais pontuais:

- o retrato de Rodrigo Mota passou a usar recorte e borda totalmente circulares, ocultando os cantos escuros do arquivo original sem alterar o asset;
- LinkedIn e GitHub passaram a usar símbolos vetoriais reconhecíveis, locais e sem scripts externos;
- a SAP Commerce Integration Platform recebeu um fluxo animado e responsivo na Home e uma versão detalhada na página do case.

Nenhuma dependência foi adicionada e nenhum arquivo de `public/` foi alterado.

## Avatar e identidades de marca

O card profissional mantém o layout, o tamanho responsivo e o glow discreto existentes. A classe do avatar foi alterada de raio retangular para `rounded-full`, e o texto alternativo agora identifica a imagem como retrato profissional de Rodrigo Mota.

O botão do LinkedIn usa o símbolo vetorial da marca em azul institucional. A seção institucional do GitHub, o botão de perfil, o botão de repositório no projeto principal e as chamadas da página do case usam o símbolo reconhecível do GitHub em versão monocromática adequada ao tema escuro. Todos os ícones são decorativos porque os links mantêm texto explícito, portanto recebem `aria-hidden="true"`.

O footer não foi alterado porque não contém menção direta ao GitHub ou LinkedIn.

## Fluxo animado da integração

Foi criado um único componente React com duas variantes, sem bibliotecas adicionais.

### Home

A versão resumida apresenta:

1. Marketplaces;
2. recebimento por webhook ou polling;
3. orquestração, normalização e validação;
4. SAP Business One e Pedido de Venda;
5. financeiro e monitoramento.

O próprio painel contém CTA para `/projetos/sap-commerce-integration-platform`.

### Página do projeto

A versão detalhada apresenta:

- Mercado Livre, Nuvemshop e Shopee;
- webhook e polling;
- normalização e validação;
- fila, idempotência e processamento;
- SAP Business One e Pedido de Venda;
- módulo financeiro e observabilidade;
- conciliação identificada como “em desenvolvimento”;
- desvio controlado para quarentena.

### Comportamento e acessibilidade

O ciclo alterna uma passagem bem-sucedida e uma segunda passagem com desvio de validação para quarentena. Um marcador vetorial representa o pedido nos conectores, enquanto a etapa corrente e o estado final recebem destaque visual.

- `IntersectionObserver` interrompe o avanço do ciclo fora da viewport;
- a validação automatizada confirmou que o frame permaneceu inalterado durante 2,6 segundos fora da viewport;
- `prefers-reduced-motion: reduce` desativa deslocamentos e mostra o fluxo completo em estado estático;
- a parte animada é decorativa para tecnologias assistivas;
- cada variante fornece uma descrição textual completa por `aria-describedby`;
- não são exibidos dados internos, métricas, endpoints, payloads ou regras proprietárias.

## Responsividade

Validação realizada no build de produção com Microsoft Edge headless e device metrics equivalentes aos viewports solicitados.

| Viewport | Fluxo da Home | Overflow horizontal | Avatar | Exceções de runtime |
|---|---|---:|---|---:|
| 360 × 800 | Vertical | Não | 96 × 96, circular | 0 |
| 390 × 844 | Vertical | Não | 96 × 96, circular | 0 |
| 768 × 1024 | Vertical | Não | 112 × 112, circular | 0 |
| 1366 × 768 | Horizontal | Não | 112 × 112, circular | 0 |
| 1440 × 900 | Horizontal | Não | 112 × 112, circular | 0 |
| 1920 × 1080 | Horizontal | Não | 112 × 112, circular | 0 |

A página detalhada também foi validada em 390 × 844, com orientação vertical, e em 1440 × 900, com orientação horizontal. Ambas tiveram um H1, zero overflow horizontal e zero exceções de runtime.

## Evidências visuais

### Fluxo da Home

- `docs/evidence/phase-2.6/home-flow-mobile-360x800.png`;
- `docs/evidence/phase-2.6/home-flow-mobile-390x844.png`;
- `docs/evidence/phase-2.6/home-flow-tablet-768x1024.png`;
- `docs/evidence/phase-2.6/home-flow-desktop-1366x768.png`;
- `docs/evidence/phase-2.6/home-flow-desktop-1440x900.png`;
- `docs/evidence/phase-2.6/home-flow-desktop-1920x1080.png`.

### Fluxo detalhado

- `docs/evidence/phase-2.6/project-flow-mobile-390x844.png`;
- `docs/evidence/phase-2.6/project-flow-desktop-1440x900.png`;
- `docs/evidence/phase-2.6/project-flow-quarantine-1440x900.png`;
- `docs/evidence/phase-2.6/project-flow-reduced-motion-1440x900.png`.

### LinkedIn e GitHub

- `docs/evidence/phase-2.6/linkedin-card-mobile-390x844.png`;
- `docs/evidence/phase-2.6/linkedin-card-desktop-1440x900.png`;
- `docs/evidence/phase-2.6/github-section-mobile-390x844.png`;
- `docs/evidence/phase-2.6/github-section-desktop-1440x900.png`.

Cada PNG possui um JSON homônimo com viewport, overflow, orientação, dimensões do avatar, contagem de ícones de marca e exceções observadas.

## Validações finais

| Verificação | Resultado |
|---|---|
| `npm.cmd run lint` | Sucesso, sem erros ou warnings |
| `npm.cmd run typecheck` | Sucesso, sem erros |
| `npm.cmd run build` | Sucesso, 14 páginas geradas |
| `git diff --check` | Sucesso; apenas avisos locais esperados de LF/CRLF |
| Rotas e arquivos técnicos | Home, catálogo, seis cases, OG image, robots e sitemap retornaram 200 |
| Analytics e validação | GA4, Clarity e validação Bing permanecem no HTML |
| Dependências | Nenhuma alteração em `package.json` ou `package-lock.json` |
| Navegador | Zero overflow horizontal e zero exceções nas evidências |
| Movimento reduzido | Fluxo estático, sem marcador em deslocamento |
| Pausa fora da viewport | Confirmada no fluxo detalhado |

## Arquivos da implementação

### Alterados

- `app/projetos/[slug]/page.tsx`;
- `components/home/about-section.tsx`;
- `components/home/featured-project-section.tsx`;
- `components/home/github-section.tsx`.

### Criados

- `components/projects/integration-flow-animation.tsx`;
- `components/projects/integration-flow-animation.module.css`;
- `components/ui/brand-icons.tsx`;
- `docs/audits/phase-2.6-validation.md`;
- 14 pares PNG/JSON em `docs/evidence/phase-2.6`.

`docs/FASE2.6.txt` já estava modificado no início desta execução e foi preservado sem novas edições pela implementação.

## Encerramento

A Fase 2.6 está concluída no escopo local e pronta para revisão visual. Não houve commit, push, Pull Request ou deploy. A execução para e aguarda aprovação antes de qualquer avanço de fase.
