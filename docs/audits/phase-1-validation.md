# Fase 1 — validação da fundação arquitetural

Registro criado em 3 de agosto de 2026 após a modularização da Home.

## Resultado dos comandos

| Verificação | Resultado |
|---|---|
| `npm.cmd run lint` | Sucesso, sem erros ou avisos |
| `npm.cmd run typecheck` | Sucesso, sem erros |
| `npm.cmd run build` | Sucesso, build estático concluído |
| `git diff --check` | Sem erros de whitespace; apenas aviso local de conversão LF/CRLF |

Rotas geradas pelo build:

- `/`
- `/_not-found`
- `/robots.txt`
- `/sitemap.xml`

Todas foram pré-renderizadas como conteúdo estático.

## Limites de escopo confirmados

- Nenhum arquivo em `public/` foi alterado, movido ou removido.
- `app/robots.tsx`, `app/sitemap.tsx`, `next.config.ts` e `package-lock.json` não foram alterados.
- Nenhuma dependência foi adicionada.
- IDs e carregamento de Google Analytics, Microsoft Clarity e validação da Microsoft foram preservados.
- WhatsApp, e-mail, telefone, LinkedIn e metadata de produção foram preservados.
- Hero, dashboard, projetos, textos principais e ordem das seções foram preservados.
- Não foram criadas novas páginas institucionais.

## Arquitetura resultante

- `app/page.tsx` passou de 1.023 para 19 linhas e agora é Server Component.
- Conteúdo institucional e seções estáticas são renderizados no servidor.
- Client Components ficaram restritos a Header com estado de scroll, menu mobile, showcase, modal e galeria.
- Marca e contatos foram centralizados em `config/site.ts`.
- Navegação foi centralizada em `config/navigation.ts`.
- Soluções, tecnologias, capacidades e stack do Hero foram movidas para `content/home.ts`.
- Projetos foram movidos para `content/projects.ts` e validados por `types/project.ts`.
- Cores, animações, altura compartilhada e comportamento de redução de movimento foram centralizados em `app/globals.css`.
- JSON-LD foi centralizado em um único `@graph`, sem a cópia não utilizada da antiga Home.

## Header e Hero

Alteração estrutural aplicada:

- Header agora é `sticky` e permanece no fluxo do documento.
- A altura é compartilhada por `--site-header-height`.
- Foram mantidas apenas variações mobile, intermediária e desktop.
- A transformação negativa da logo foi eliminada.
- A sequência de seis `padding-top` no Hero foi eliminada.
- O Hero usa o espaço disponível abaixo do Header.
- O selo permanece no fluxo normal.
- A logo mantém 112 px no mobile, 135 px na faixa intermediária e 220 px no desktop.
- O dashboard visual e suas métricas não foram modificados.

## Testes funcionais automatizados no navegador

Com viewport CSS real de 390 × 844:

- menu mobile abriu com `aria-expanded="true"`;
- painel de navegação foi inserido e identificado por `aria-controls`;
- modal abriu como elemento `dialog` modal;
- foco inicial foi direcionado para “Fechar projeto”;
- Escape fechou o diálogo;
- foco retornou para “Abrir detalhes do projeto Gestão Inteligente de Pedidos em Aberto”.

## Evidências posteriores

Capturas principais:

- `docs/evidence/phase-1/after/desktop-1366x768.png`
- `docs/evidence/phase-1/after/desktop-1440x900.png`
- `docs/evidence/phase-1/after/desktop-1920x1080.png`
- `docs/evidence/phase-1/after/mobile-360x800-emulated.png`
- `docs/evidence/phase-1/after/mobile-390x844-emulated.png`

Escala e zoom aproximados por viewport CSS equivalente:

- `docs/evidence/phase-1/after/desktop-1152x720-zoom125-emulated.png`
- `docs/evidence/phase-1/after/desktop-960x600-zoom150-emulated.png`

Interações:

- `docs/evidence/phase-1/after/mobile-390x844-menu-open.png`
- `docs/evidence/phase-1/after/mobile-390x844-project-dialog.png`

As capturas chamadas `scale-125` e `scale-150` registram variação de densidade de pixels. As capturas chamadas `zoom125-emulated` e `zoom150-emulated` são as utilizadas para avaliar o espaço CSS efetivamente reduzido.

## Como testar manualmente

1. Execute `npm.cmd run dev`.
2. Abra `http://localhost:3000`.
3. Compare o topo em 1366 × 768, 1440 × 900 e 1920 × 1080.
4. No Chrome ou Edge, aplique zoom de 125% e 150%.
5. Confirme que o selo nunca fica atrás do Header.
6. Confirme que a logo não diminui ou recebe deslocamento negativo.
7. Em 360 e 390 px, abra o menu, navegue por uma âncora e feche com Escape.
8. Abra um projeto por teclado, alterne a galeria e feche por Escape.
9. Confirme que o foco retorna ao card que abriu o diálogo.

## Pendências deliberadamente mantidas

- Assets sensíveis continuam em `public/` aguardando decisão sobre sanitização.
- Métricas do dashboard do Hero ainda precisam ser classificadas.
- Contagem fixa do LinkedIn ainda precisa ser removida ou substituída em fase posterior.
- Imagem Open Graph ainda usa o logo quadrado com dimensões declaradas diferentes.
- Analytics e Clarity ainda precisam de avaliação de privacidade e consentimento.
- Projetos continuam em modal até a criação de `/projetos/[slug]`.
- Otimização e consolidação dos logos foram adiadas.
- A narrativa institucional completa e o novo Hero foram adiados.

## Observações

- A captura do modal replica uma imagem já existente em `public/` e deve seguir a mesma política de revisão antes de qualquer publicação do diretório de evidências.
- Nenhum commit, push ou Pull Request foi realizado.
