# Auditoria inicial de assets públicos

Inventário da Fase 1. Nenhum arquivo desta lista foi removido, movido, substituído ou editado.

## Critérios de ação

- **Manter:** pode continuar publicado no estado atual durante a Fase 1.
- **Sanitizar:** preservar o valor visual, removendo informações identificáveis.
- **Substituir:** produzir uma versão pública reconstruída ou com dados sintéticos.
- **Mover:** retirar da distribuição web após aprovação; se for sensível, também manter fora do Git rastreado.
- **Remover após aprovação:** asset sem uso ou duplicado, excluído somente após comparação e autorização.

Mover um arquivo para fora de `public/` impede sua entrega direta pelo site, mas não apaga o histórico Git. Esse tratamento, se necessário, deverá ser autorizado separadamente.

## Resumo

- Total: 48 arquivos.
- Peso total: 31,88 MB.
- Maior concentração de peso: logos PNG quadrados de 1248 × 1248, geralmente exibidos entre 20 e 72 px.
- Todos os arquivos em `public/` podem ser acessados diretamente, mesmo quando não são referenciados pela interface.

## Marca e arquivos gerais

| Arquivo | Uso atual | Diagnóstico | Ação proposta |
|---|---|---|---|
| `public/logo-mota.png` | Header, footer e metadata social | Seguro, mas pesado e quadrado | Manter; otimizar após comparação visual |
| `public/favicon.png` | Metadata de ícones | Seguro; 1024 × 1024 e cerca de 1,4 MB | Manter; criar variantes adequadas em fase posterior |
| `public/linkedin-rodrigo.png` | Perfil profissional | Baixo risco | Manter após confirmação de atualização |
| `public/file.svg` | Sem referência | Asset padrão do scaffold | Remover após aprovação |
| `public/globe.svg` | Sem referência | Asset padrão do scaffold | Remover após aprovação |
| `public/next.svg` | Sem referência | Asset padrão do scaffold | Remover após aprovação |
| `public/vercel.svg` | Sem referência | Asset padrão do scaffold | Remover após aprovação |
| `public/window.svg` | Sem referência | Asset padrão do scaffold | Remover após aprovação |

Observação: a metadata declara `logo-mota.png` como imagem 1200 × 630, mas o arquivo real é 1248 × 1248. A correção exige uma imagem Open Graph própria e fica fora da Fase 1.

## Capturas de projetos

| Arquivo | Referenciado | Exposição observada | Ação proposta |
|---|---:|---|---|
| `public/cases/pbi-pedidos-abertos.png` | Sim | Totais, volumes, datas, estados operacionais e contexto interno | Sanitizar ou substituir |
| `public/cases/n8n-cobranca-inteligente.png` | Sim | Nome do fluxo, ambiente e parte de URL de webhook | Sanitizar |
| `public/cases/teams-cobranca-inteligente.png` | Sim | Valores, quantidade de títulos e contexto financeiro | Sanitizar profundamente |
| `public/cases/n8n-cotacao-35k.png` | Sim | Nome do fluxo e parte de URL de webhook | Sanitizar |
| `public/cases/teams-cotacoes-35.png` | Sim | Valores, documentos e histórico comercial | Sanitizar profundamente |
| `public/cases/teams-cotacoes-35-detalhe.png` | Sim | Documentos, valores e histórico comercial | Sanitizar profundamente |
| `public/cases/pbi-pedidos-48h.png` | Sim | Valores, datas, volumes e contexto operacional | Sanitizar ou substituir |
| `public/cases/n8n-pedidos-48h.png` | Sim | Nome do fluxo e parte de URL de webhook | Sanitizar |
| `public/cases/cotacao-layout-antigo.png` | Sim | Identidade empresarial, contato, produtos e valores | Substituir por versão pública controlada |
| `public/cases/cotacao-layout-novo.png` | Sim | Identidade empresarial visível, dados de documento, produtos e valores | Substituir por versão pública controlada |
| `public/cases/query-sql-server.png` | Não | Sessão SQL, objeto de banco, documentos, condições e estrutura interna | Mover ou substituir após aprovação |
| `public/cases/n8n-report-diretoria.png` | Não | Nome do fluxo, serviços integrados e parte de endpoint externo | Sanitizar ou mover após aprovação |

Nenhuma métrica exibida nessas imagens foi classificada como resultado público validado. A futura versão sanitizada deverá usar dados comprovadamente publicáveis ou dados sintéticos claramente identificados.

## Logos de tecnologias

Arquivos PNG atualmente presentes:

- `business_intelligence.png`
- `crystal_reports.png`
- `docker.png`
- `erp_integration.png`
- `executive_dashboards.png`
- `fastapi.png`
- `linux.png`
- `n8n.png`
- `power_apps.png`
- `power_automate.png`
- `power_bi.png`
- `process_automation.png`
- `python.png`
- `rest_api.png`
- `sap_b1.png`
- `sharepoint.png`
- `sql_server.png`
- `systems_integration.png`
- `teams.png`

Arquivos SVG atualmente presentes:

- `n8n.svg`
- `power-apps.svg`
- `power-automate.svg`
- `power-bi.svg`
- `rest-api.svg`
- `sap-b1.svg`
- `sharepoint.svg`
- `sql-server.svg`
- `teams.svg`

Diagnóstico do grupo:

- não há exposição de informação corporativa identificável;
- os PNGs têm aproximadamente 1,4 a 1,5 MB cada e resolução de 1248 × 1248;
- há duplicação PNG/SVG em várias tecnologias;
- `power_bi.png` e `process_automation.png` não são referenciados pela interface atual;
- os SVGs são utilizados no dashboard do Hero e devem ser preservados nesta fase.

Ação proposta: manter todos na Fase 1. Em fase posterior, comparar visualmente SVG, WebP/AVIF e PNG redimensionado, consolidando apenas após aprovação.

## Decisão da Fase 1

- Nenhum asset será alterado.
- A modularização manterá exatamente os mesmos caminhos públicos.
- Otimização, sanitização, movimentação e remoção dependem de uma decisão específica posterior.
