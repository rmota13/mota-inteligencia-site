# FASE 2.9 — Relatório de implementação e validação

Data da execução: 04/08/2026

## Escopo executado

A implementação foi limitada aos três pontos do primeiro viewport definidos na FASE 2.9:

1. enquadramento da marca no Header;
2. selo do Hero em uma linha no desktop;
3. painel de arquitetura contido na grade, com margem direita e coluna “Operação” preservadas.

Não foram alterados textos, navegação, rotas, SEO, schemas, Analytics, Clarity, dependências ou assets. A variante compacta de `ArchitectureMap`, usada nos cards de projetos, manteve as classes anteriores; a contenção interna nova é aplicada somente à variante não compacta exibida no Hero.

## Alterações cirúrgicas

### `components/layout/brand.tsx`

- wrapper exclusivo da marca do Header com altura igual a `--site-header-height` e `overflow-hidden`;
- larguras aparentes mantidas em 100 px, 116 px e 150 px nos breakpoints existentes;
- imagem mantida com `object-contain` e posicionada no topo à esquerda;
- renderização do Footer preservada;
- asset `public/logo-mota.png` preservado sem edição.

O elemento de imagem continua com suas dimensões intrínsecas responsivas, mas a área transparente excedente é recortada pelo wrapper. Em todas as medições, o limite visível do wrapper terminou antes da borda inferior do Header.

### `components/home/hero-section.tsx`

- grade desktop convertida para colunas com `minmax(0, ...)`;
- gap desktop ajustado de forma responsiva, sem deslocamentos ou margens negativas;
- selo com `w-fit`, `max-w-max` e `whitespace-nowrap` a partir de 1024 px;
- letter-spacing e padding horizontal discretamente reduzidos apenas no desktop;
- quebra adaptativa mantida em telas menores;
- wrapper do painel com `w-full`, `min-w-0`, `max-w-[44rem]` e `justify-self-center`.

### `components/projects/architecture-map.tsx`

- variante não compacta recebeu trilhas internas com `minmax(0, ...)`;
- espaçamentos responsivos redistribuídos para acomodar integralmente a coluna “Operação” sem reduzir textos;
- conteúdo, cores, rótulos e comportamento do painel preservados;
- nenhuma solução por `translate` ou ocultação adicional de conteúdo foi introduzida.

## Validação visual automatizada

As capturas finais foram produzidas contra o build de produção local. A tabela registra os valores medidos no DOM:

| Cenário | Selo | Margem direita do painel | “Operação” e descendentes dentro do painel | Overflow horizontal | Erros de runtime/console |
| --- | ---: | ---: | --- | --- | --- |
| 390 × 844 | 2 linhas, adaptação mobile | 16 px do viewport | sim | não | 0 / 0 |
| 1024 × 768 | 1 linha | 24 px | sim | não | 0 / 0 |
| 1152 × 720 | 1 linha | 24 px | sim | não | 0 / 0 |
| 1366 × 768 | 1 linha | 67 px | sim | não | 0 / 0 |
| 1440 × 900 | 1 linha | 104 px | sim | não | 0 / 0 |
| 1920 × 1080 | 1 linha | 344 px | sim | não | 0 / 0 |
| equivalente a zoom 125% — 1152 × 720 CSS | 1 linha | 24 px | sim | não | 0 / 0 |
| equivalente a zoom 150% — 960 × 600 CSS | 1 linha | 128 px | sim | não | 0 / 0 |

Confirmações complementares:

- marca visivelmente contida em todos os cenários, sem alterar a altura do Header;
- menu e CTA de WhatsApp mantidos centralizados;
- botão do menu mobile preservado em 390 × 844, com caixa de 44 × 44 px;
- conteúdo textual completo do selo e do painel preservado;
- nenhuma exceção JavaScript ou mensagem de console do tipo `error` nas oito execuções.

Métricas completas: [`after-metrics.json`](../evidence/phase-2.9/after-metrics.json)

Capturas finais:

- [`390 × 844`](../evidence/phase-2.9/after/mobile-390x844.png)
- [`1024 × 768`](../evidence/phase-2.9/after/desktop-1024x768.png)
- [`1152 × 720`](../evidence/phase-2.9/after/desktop-1152x720.png)
- [`1366 × 768`](../evidence/phase-2.9/after/desktop-1366x768.png)
- [`1440 × 900`](../evidence/phase-2.9/after/desktop-1440x900.png)
- [`1920 × 1080`](../evidence/phase-2.9/after/desktop-1920x1080.png)
- [`zoom 125% equivalente`](../evidence/phase-2.9/after/zoom-125-equivalent-1152x720.png)
- [`zoom 150% equivalente`](../evidence/phase-2.9/after/zoom-150-equivalent-960x600.png)

## Validações técnicas

| Comando | Resultado |
| --- | --- |
| `npm.cmd run lint` | aprovado, exit code 0 |
| `npm.cmd run typecheck` | aprovado, exit code 0 |
| `npm.cmd run build` | aprovado, 24 páginas estáticas processadas, exit code 0 |
| `git diff --check` | aprovado, exit code 0; somente avisos informativos de normalização LF/CRLF |

## Guardas de escopo

- `package.json` e `package-lock.json`: sem alterações da FASE 2.9;
- `public/`: sem alterações da FASE 2.9;
- Header: altura e navegação preservadas;
- Hero: título, subtítulo, listas, CTAs, cores e textos preservados;
- demais seções, rotas e infraestrutura editorial: não alteradas pela FASE 2.9;
- nenhum commit, push, pull request ou deploy realizado.

## Resultado

FASE 2.9 concluída tecnicamente e aguardando aprovação.
