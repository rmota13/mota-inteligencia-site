# Fase 1 — baseline anterior à modularização

Registro criado em 3 de agosto de 2026, antes de qualquer alteração no código-fonte da Fase 1.

## Estado do repositório

- Branch: `feat/portfolio-enterprise-evolution`
- Commit-base: `118507a14c333d6885cde138a81047b2e25f3bcb`
- `app/page.tsx`: 1.023 linhas
- Assets em `public/`: 48 arquivos, totalizando 33.432.823 bytes (31,88 MB)
- Rotas geradas: `/`, `/_not-found`, `/robots.txt` e `/sitemap.xml`
- Arquivos de instrução e complementos da fase já estavam fora do histórico Git.

## Validações anteriores às mudanças

| Comando | Resultado |
|---|---|
| `npm.cmd run lint` | Concluído com 0 erros e 3 avisos |
| `npx.cmd tsc --noEmit --incremental false` | Concluído sem erros |
| `npm.cmd run build` | Concluído; todas as rotas foram pré-renderizadas estaticamente |

Avisos existentes no lint:

- imports `Database` e `Network` não utilizados;
- `structuredData` duplicado e não utilizado em `app/page.tsx`.

## Evidências visuais anteriores

As capturas registram o topo da Home antes da correção estrutural do Header/Hero.

- `docs/evidence/phase-1/before/mobile-390x844.png`
- `docs/evidence/phase-1/before/desktop-1366x768.png`
- `docs/evidence/phase-1/before/desktop-1440x900.png`
- `docs/evidence/phase-1/before/desktop-1920x1080.png`
- `docs/evidence/phase-1/before/desktop-1440x900-scale-125.png`
- `docs/evidence/phase-1/before/desktop-1440x900-scale-150.png`

## Comportamentos observados

- Header fixo compensado por seis valores diferentes de `padding-top` no Hero.
- Logo deslocada verticalmente por transformação negativa.
- Grande faixa vazia entre Header e conteúdo em resoluções e escalas maiores.
- Em 390 px, o Header não oferece navegação mobile e o CTA ocupa espaço excessivo.
- Em 390 px, selo, título e CTAs do Hero extrapolam horizontalmente o viewport.
- O dashboard visual continua sendo parte importante da identidade e será preservado nesta fase.
- O conteúdo e as funcionalidades atuais servem como referência de regressão.

## Restrições do baseline

- Nenhuma imagem pública foi removida, movida, comprimida ou substituída.
- Analytics, Clarity, WhatsApp, metadata, sitemap e robots permanecem inalterados.
- As capturas não representam aprovação de métricas ilustrativas; apenas documentam o estado anterior.
