# Fase 2.8 — ajustes finos e polimento visual

Implementação e validação local concluídas em 4 de agosto de 2026, após aprovação explícita dos ajustes. A fase refinou a entrega da Fase 2.6 sem redesign, novas páginas, novas dependências ou mudanças de conteúdo, posicionamento, SEO e telemetria.

Não houve commit, push, Pull Request, deploy ou alteração em serviços externos.

## Conclusão executiva

A auditoria encontrou uma regressão visual específica nos layouts intermediários: em 1024 × 768, a animação usava orientação horizontal dentro de painéis de apenas 520 px na Home e 604 px no case. Os cards ficavam com aproximadamente 73–74 px, provocando quebras excessivas e baixa legibilidade.

A correção passou a considerar simultaneamente a largura da viewport e a largura real do painel por meio de container queries. Como resultado:

- 1024 e 1152 pixels usam fluxo vertical, com cards largos e texto íntegro;
- 1366, 1440 e 1920 pixels preservam o fluxo horizontal;
- os layouts mobile e tablet continuam verticais;
- nenhuma largura validada apresentou overflow horizontal, chips cortados ou exceções de runtime.

## Ajustes implementados

### Animação da integração

- container query adicionada ao painel para evitar decisões baseadas somente na viewport;
- variante compacta passa a horizontal somente quando possui largura interna suficiente;
- variante detalhada usa limiar maior, compatível com suas seis etapas;
- ramo de quarentena acompanha o limiar da respectiva variante;
- tipografia e chips ganharam tamanho maior nos layouts verticais;
- altura dos cards e conectores foi ajustada para reduzir espaço ocioso no mobile;
- duração do frame passou de 1150 ms para 1200 ms e o deslocamento do pedido de 900 ms para 1000 ms;
- CTA interno da Home foi convertido em link textual centralizado e secundário, preservando o destino exigido sem competir com o CTA principal;
- transições do CTA, status e ícones respeitam movimento reduzido.

### LinkedIn e GitHub

- avatar recebeu `shrink-0`, preservando a forma circular em layouts estreitos;
- símbolos vetoriais receberam proteção contra compressão;
- botões e cards ganharam microdeslocamento discreto, estado ativo e foco com offset;
- todos os movimentos adicionados são desativados por `motion-reduce`;
- identidade, conteúdo, links e fotografia foram preservados.

## Comparação antes × depois

| Cenário | Antes | Depois |
|---|---|---|
| Home em 1024 × 768 | Horizontal; painel de 520 px; cards de 73 px | Vertical; cards de 470 px |
| Case em 1024 × 768 | Horizontal; painel de 604 px; cards de 74 px | Vertical; cards de 554 px |
| Home em 1440 × 900 | Horizontal; cards de 107 px | Horizontal preservado; cards de 107 px |
| Case em 1440 × 900 | Horizontal; cards de 107 px | Horizontal preservado; chips íntegros |
| Home em 390 × 844 | Vertical; painel com 1256 px de altura | Vertical; painel com 1246 px de altura |
| CTA interno da Home | Botão secundário de largura total | Link textual centralizado e subordinado ao CTA principal |

O aumento de altura em 1024 é intencional: o conteúdo deixou de ser comprimido e passou a ocupar o fluxo normal da página, sem corte ou overflow.

## Responsividade final

| Viewport | Home | Case detalhado | Overflow | Chips cortados | Runtime |
|---|---|---|---:|---:|---:|
| 360 × 800 | Vertical | — | Não | 0 | 0 |
| 390 × 844 | Vertical | Vertical | Não | 0 | 0 |
| 768 × 1024 | Vertical | — | Não | 0 | 0 |
| 960 × 600, equivalente a 150% | Vertical | Vertical | Não | 0 | 0 |
| 1024 × 768 | Vertical | Vertical | Não | 0 | 0 |
| 1152 × 720, equivalente a 125% | Vertical | Vertical | Não | 0 | 0 |
| 1366 × 768 | Horizontal | Horizontal | Não | 0 | 0 |
| 1440 × 900 | Horizontal | Horizontal | Não | 0 | 0 |
| 1920 × 1080 | Horizontal | — | Não | 0 | 0 |

Todas as capturas possuem um H1, nenhum elemento focável sem nome acessível e nenhum corte lateral do painel auditado.

## Acessibilidade e interação

Validações automatizadas no build de produção confirmaram:

- links de LinkedIn, GitHub e CTA com `:focus-visible` ativo e indicador visual computado;
- zero elementos focáveis sem texto ou `aria-label`;
- menu mobile abre com `aria-expanded="true"`;
- Escape fecha o menu;
- foco retorna ao acionador após o fechamento;
- avatar permanece 96 × 96 no mobile e 112 × 112 no desktop, com raio circular;
- `prefers-reduced-motion` mantém o fluxo estático e sem pedido em deslocamento;
- o frame da animação não avançou durante 2,6 segundos fora da viewport;
- alternativa textual e ícones decorativos da Fase 2.6 foram preservados.

## Lighthouse e performance

### Desktop

| Performance | Acessibilidade | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 100 | 100 | 77 | 100 | 0,3 s | 0,6 s | 10 ms | 0 |

### Mobile — três amostras

| Amostra | Performance | Acessibilidade | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 91 | 100 | 77 | 100 | 1,08 s | 2,54 s | 286 ms | 0 |
| 2 | 92 | 100 | 77 | 100 | 1,06 s | 2,62 s | 239 ms | 0 |
| 3 | 93 | 100 | 77 | 100 | 1,06 s | 2,56 s | 237 ms | 0 |

A mediana mobile ficou em 92, com LCP de aproximadamente 2,56 s, TBT de 239 ms e CLS zero. A referência final da Fase 2.5 era 93, LCP de 2,6 s e TBT de 220 ms. As amostras atuais mantêm LCP e estabilidade visual, enquanto a variação de nota e TBT permanece dentro da oscilação sintética já documentada nas fases anteriores.

Best Practices permanece em 77 pelos recursos de terceiros do Microsoft Clarity, sem mudança em relação à referência. Clarity não foi removido.

O Lighthouse 13.4.1 salvou relatórios JSON completos e parseáveis, mas o launcher registrou `EPERM` ao tentar remover alguns diretórios temporários do Chrome no Windows após as execuções. O erro ocorreu depois da gravação dos resultados e não afetou os relatórios.

Não houve alteração em `package.json`, `package-lock.json` ou `public/`. Nenhuma imagem, vídeo, biblioteca ou requisição externa foi acrescentada.

## Rotas, SEO e telemetria

O build continuou gerando 14 páginas. A validação HTTP confirmou status 200 para:

- Home;
- catálogo de projetos;
- seis páginas de projeto;
- imagem Open Graph;
- `robots.txt`;
- `sitemap.xml`.

GA4, Microsoft Clarity e a validação Bing permanecem no HTML. Titles, canonical, schemas, sitemap e conteúdo não foram alterados pela Fase 2.8.

## Evidências

### Antes

`docs/evidence/phase-2.8/before` contém seis pares PNG/JSON para Home e case em 390, 1024 e 1440 pixels.

### Depois

`docs/evidence/phase-2.8/after` contém:

- nove pares PNG/JSON da matriz responsiva da Home;
- seis pares PNG/JSON do case detalhado;
- estados de quarentena e movimento reduzido;
- LinkedIn mobile e desktop;
- GitHub mobile e desktop;
- Lighthouse desktop e três amostras mobile.

Os JSONs de navegador registram viewport, orientação, dimensões, overflow, chips, nomes acessíveis, foco, menu, pausa fora da viewport e erros.

## Arquivos da Fase 2.8

### Aplicação

- `components/projects/integration-flow-animation.tsx`;
- `components/projects/integration-flow-animation.module.css`;
- `components/home/about-section.tsx`;
- `components/home/featured-project-section.tsx`;
- `components/home/github-section.tsx`;
- `app/projetos/[slug]/page.tsx`.

### Documentação e evidências

- `docs/FASE2.8.txt`;
- `docs/audits/phase-2.8-validation.md`;
- `docs/evidence/phase-2.8/before/*`;
- `docs/evidence/phase-2.8/after/*`.

O working tree ainda contém a implementação e as evidências não commitadas da Fase 2.6. `docs/FASE2.6.txt` já estava modificado antes da Fase 2.6 e continuou preservado.

## Encerramento

A Fase 2.8 está concluída no escopo local. Os ajustes corrigem a densidade nos viewports intermediários sem introduzir redesign ou regressão relevante. A recomendação técnica é aprovar esta etapa e manter o projeto parado antes de qualquer próxima fase.

Nenhum commit, push, Pull Request ou deploy foi realizado.
