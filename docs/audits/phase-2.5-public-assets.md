# Fase 2.5 — inventário e classificação de assets públicos

Auditoria concluída em 3 de agosto de 2026. Nenhum arquivo em `public/` foi removido, movido, substituído ou editado nesta fase.

## Resultado executivo

- 48 arquivos, totalizando 33.432.823 bytes (31,88 MiB).
- 12 capturas de projetos (2,56 MiB); todas retornam HTTP 200 por URL direta em produção.
- 19 logos PNG de tecnologia (27,12 MiB) sem uso na interface atual.
- 9 logos SVG (0,05 MiB) sem uso na interface atual.
- 3 arquivos de marca/perfil (2,16 MiB).
- 5 SVGs do scaffold sem uso.
- O diretório `public/` não possui alterações no working tree.

`public/` é uma área de publicação, não um arquivo privado. Um item continua exposto mesmo quando não existe link na interface. Remover do HTML ou do catálogo não revoga a URL direta nem apaga cópias em cache ou no histórico Git.

## Critérios

- **Manter:** seguro e necessário no estado atual.
- **Sanitizar:** preservar a captura, ocultando ou reconstruindo dados identificáveis.
- **Substituir:** usar uma versão pública controlada, preferencialmente com dados sintéticos explicitamente identificados.
- **Remover da publicação:** arquivo sem uso ou incompatível com publicação pública. A ação só deverá ocorrer após autorização e plano de cache/histórico.

## Capturas de projetos

| Asset | Dimensão | Peso | Uso atual | Exposição observada | Decisão |
|---|---:|---:|---|---|---|
| `cases/cotacao-layout-antigo.png` | 2000 × 1413 | 309 KiB | Galeria do case | Identidade empresarial, contato, produtos e valores | **Substituir** por versão pública controlada |
| `cases/cotacao-layout-novo.png` | 2000 × 1413 | 433 KiB | Card e galeria | Identidade empresarial, documento, produtos e valores | **Substituir** por versão pública controlada |
| `cases/n8n-cobranca-inteligente.png` | 1904 × 828 | 103 KiB | Card e galeria | Nome de fluxo, ambiente e parte de webhook | **Sanitizar** |
| `cases/n8n-cotacao-35k.png` | 1904 × 826 | 112 KiB | Card e galeria | Nome de fluxo e parte de webhook | **Sanitizar** |
| `cases/n8n-pedidos-48h.png` | 1907 × 829 | 111 KiB | Galeria do case | Nome de fluxo e parte de webhook | **Sanitizar** |
| `cases/n8n-report-diretoria.png` | 1911 × 822 | 102 KiB | Sem referência | Nome de fluxo, serviços e parte de endpoint | **Remover da publicação**; sanitizar se voltar a ser usado |
| `cases/pbi-pedidos-48h.png` | 1751 × 985 | 314 KiB | Card e galeria | Valores, datas, volumes e contexto operacional | **Substituir** por versão pública controlada |
| `cases/pbi-pedidos-abertos.png` | 1297 × 702 | 325 KiB | Card e galeria | Totais, volumes, datas, estados e contexto interno | **Substituir** por versão pública controlada |
| `cases/query-sql-server.png` | 1483 × 673 | 231 KiB | Sem referência | Sessão SQL, objeto, documentos, condições e estrutura interna | **Remover da publicação**; substituir se voltar a ser usado |
| `cases/teams-cobranca-inteligente.png` | 1241 × 807 | 215 KiB | Galeria do case | Valores, títulos e contexto financeiro | **Substituir** por versão profundamente sanitizada |
| `cases/teams-cotacoes-35.png` | 1158 × 738 | 188 KiB | Galeria do case | Valores, documentos e histórico comercial | **Substituir** por versão profundamente sanitizada |
| `cases/teams-cotacoes-35-detalhe.png` | 1177 × 748 | 179 KiB | Galeria do case | Documentos, valores e histórico comercial | **Substituir** por versão profundamente sanitizada |

Os 12 arquivos acima retornaram HTTP 200 em `https://www.motainteligencia.com.br/cases/<arquivo>` durante esta auditoria. As duas capturas sem referência continuam tão públicas quanto as demais.

## Marca, perfil e arquivos gerais

| Asset | Dimensão | Peso | Uso atual | Diagnóstico | Decisão |
|---|---:|---:|---|---|---|
| `favicon.png` | 1024 × 1024 | 1.378 KiB | Não é mais declarado no HTML | Seguro, mas excessivo para favicon e ainda acessível diretamente | **Remover da publicação** após confirmar o `app/favicon.ico` no deploy |
| `linkedin-rodrigo.png` | 400 × 400 | 28 KiB | Seção Sobre | Baixo risco; atualização visual não pôde ser confirmada automaticamente no LinkedIn | **Manter**, sujeito à confirmação de atualidade pelo titular |
| `logo-mota.png` | 1248 × 1248 | 770 KiB | Header e JSON-LD | Seguro; `next/image` otimiza a renderização, mas o master público é pesado | **Manter**; otimizar somente com comparação visual da marca |
| `file.svg` | 16 × 16 | <1 KiB | Sem referência | Scaffold do Next.js | **Remover da publicação** |
| `globe.svg` | 16 × 16 | 1 KiB | Sem referência | Scaffold do Next.js | **Remover da publicação** |
| `next.svg` | 394 × 80 | 1 KiB | Sem referência | Scaffold do Next.js | **Remover da publicação** |
| `vercel.svg` | 1155 × 1000 | <1 KiB | Sem referência | Scaffold do Next.js | **Remover da publicação** |
| `window.svg` | 16 × 16 | <1 KiB | Sem referência | Scaffold do Next.js | **Remover da publicação** |

O HTML deixou de declarar `favicon.png` e passou a depender apenas do `app/favicon.ico` de aproximadamente 15 KiB. Isso reduziu o payload medido da Home em cerca de 1,4 MiB sem alterar qualquer asset.

## Logos de tecnologia em PNG

Todos os 19 arquivos abaixo têm 1248 × 1248, não são referenciados pela interface atual e concentram 27,12 MiB. Não apresentam informação corporativa identificável, mas são publicação desnecessária e, em vários casos, duplicam SVGs.

| Asset | Peso | Decisão |
|---|---:|---|
| `logos/business_intelligence.png` | 1,42 MiB | **Remover da publicação** |
| `logos/crystal_reports.png` | 1,46 MiB | **Remover da publicação** |
| `logos/docker.png` | 1,39 MiB | **Remover da publicação** |
| `logos/erp_integration.png` | 1,40 MiB | **Remover da publicação** |
| `logos/executive_dashboards.png` | 1,40 MiB | **Remover da publicação** |
| `logos/fastapi.png` | 1,49 MiB | **Remover da publicação** |
| `logos/linux.png` | 1,39 MiB | **Remover da publicação** |
| `logos/n8n.png` | 1,42 MiB | **Remover da publicação** |
| `logos/power_apps.png` | 1,49 MiB | **Remover da publicação** |
| `logos/power_automate.png` | 1,45 MiB | **Remover da publicação** |
| `logos/power_bi.png` | 1,34 MiB | **Remover da publicação** |
| `logos/process_automation.png` | 1,48 MiB | **Remover da publicação** |
| `logos/python.png` | 1,44 MiB | **Remover da publicação** |
| `logos/rest_api.png` | 1,49 MiB | **Remover da publicação** |
| `logos/sap_b1.png` | 1,39 MiB | **Remover da publicação** |
| `logos/sharepoint.png` | 1,38 MiB | **Remover da publicação** |
| `logos/sql_server.png` | 1,44 MiB | **Remover da publicação** |
| `logos/systems_integration.png` | 1,50 MiB | **Remover da publicação** |
| `logos/teams.png` | 1,34 MiB | **Remover da publicação** |

## Logos de tecnologia em SVG

Os SVGs abaixo também não são referenciados na Fase 2. O risco de peso é baixo, mas arquivos desnecessários não devem permanecer em uma área pública apenas como biblioteca informal.

| Asset | Peso | Decisão |
|---|---:|---|
| `logos/n8n.svg` | 3,3 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |
| `logos/power-apps.svg` | 4,4 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |
| `logos/power-automate.svg` | 2,5 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |
| `logos/power-bi.svg` | 2,5 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |
| `logos/rest-api.svg` | 1,1 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |
| `logos/sap-b1.svg` | 1,8 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |
| `logos/sharepoint.svg` | 4,7 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |
| `logos/sql-server.svg` | 24,2 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |
| `logos/teams.svg` | 4,7 KiB | **Remover da publicação**; manter fora de `public/` se houver reuso previsto |

## Prioridade recomendada

1. **P0 — exposição:** substituir/sanitizar as dez capturas utilizadas e retirar da publicação as duas capturas sensíveis sem uso. Invalidar cache e testar as URLs antigas.
2. **P1 — peso:** retirar os 19 PNGs de tecnologia e o `favicon.png` público depois de confirmar que não há consumidor externo legítimo.
3. **P2 — higiene:** retirar SVGs de scaffold e tecnologia sem uso; se forem biblioteca de design, armazená-los fora de `public/`.
4. **P2 — marca:** produzir masters otimizados de logo/perfil somente após aprovação visual.

Esta classificação não autoriza exclusão. Remoção do repositório, limpeza de histórico Git, purge de CDN e substituição de imagens são ações separadas e potencialmente irreversíveis.
