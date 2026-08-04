# Fase 2.5 — dependências, vulnerabilidades e licenças

Auditoria executada em 3 de agosto de 2026 com Node.js 24.15.0 e npm 11.12.1. Nenhuma dependência foi instalada, removida ou atualizada.

## Resultado executivo

| Verificação | Resultado |
|---|---|
| `npm audit --json` | 6 pacotes afetados: 0 críticos, 5 altos, 0 moderados e 1 baixo na consolidação do npm |
| Dependência direta vulnerável | `next@16.2.4` |
| Correção indicada pelo npm | `next@16.3.0`, sem major SemVer |
| `npm outdated --json` | 12 dependências diretas com versão mais recente disponível |
| Pacotes marcados como deprecated no lockfile | 0 |
| Pacotes extraneous no `node_modules` local | 5 |
| Pacotes com licença declarada no lockfile | 430 de 430 |
| Licença do site/repositório | Ausente |

O resultado **não atende a um gate de segurança sem alertas altos**. A atualização é P0 antes de uma publicação deliberada da nova versão, mas foi mantida fora desta fase porque as instruções proíbem atualização automática de dependências.

## Vulnerabilidades

### Dependência direta: Next.js

`next@16.2.4` está dentro das faixas afetadas por advisories publicados para App Router, Server Components, Server Actions, proxy/middleware, cache, Image Optimization e WebSocket/custom server. Os itens de maior severidade incluem:

- [GHSA-8h8q-6873-q5fj](https://github.com/advisories/GHSA-8h8q-6873-q5fj) — negação de serviço com Server Components;
- [GHSA-26hh-7cqf-hhc6](https://github.com/advisories/GHSA-26hh-7cqf-hhc6) — bypass de proxy/middleware no App Router;
- [GHSA-6gpp-xcg3-4w24](https://github.com/advisories/GHSA-6gpp-xcg3-4w24) — bypass no App Router/Turbopack;
- [GHSA-m99w-x7hq-7vfj](https://github.com/advisories/GHSA-m99w-x7hq-7vfj) — negação de serviço em Server Actions;
- [GHSA-89xv-2m56-2m9x](https://github.com/advisories/GHSA-89xv-2m56-2m9x) — SSRF em Server Actions/custom servers;
- [GHSA-p9j2-gv94-2wf4](https://github.com/advisories/GHSA-p9j2-gv94-2wf4) — SSRF em rewrites;
- [GHSA-q8wf-6r8g-63ch](https://github.com/advisories/GHSA-q8wf-6r8g-63ch) — negação de serviço na otimização de SVGs.

As faixas corrigidas variam entre 16.2.5, 16.2.6 e 16.2.11. O npm consolida a correção disponível em `next@16.3.0`, que também deve ser sincronizada com `eslint-config-next` e submetida a build, testes de rotas, imagens, metadata, analytics e Lighthouse.

### Dependências transitivas

| Pacote | Severidade consolidada | Origem/risco principal | Correção indicada |
|---|---:|---|---|
| `postcss` | Alta | leitura arbitrária/path traversal via `sourceMappingURL` | atualização transitiva via Next.js |
| `sharp` | Alta | vulnerabilidades herdadas do libvips | atualização transitiva via Next.js |
| `brace-expansion` | Alta | DoS por expansão não limitada/exponencial | atualização da árvore de lint/build |
| `js-yaml` | Alta | DoS quadrático em merge keys | atualização da árvore de lint/build |
| `@babel/core` | Baixa | leitura de arquivo via `sourceMappingURL` | atualização da árvore de build |

O site não recebe YAML, glob patterns ou source maps de usuários na interface atual, e não usa custom server, middleware ou Server Actions no código auditado. Isso reduz a superfície de alguns advisories, mas não elimina a necessidade de atualizar a dependência direta vulnerável.

## Dependências desatualizadas

| Pacote | Atual | Wanted | Latest | Observação |
|---|---:|---:|---:|---|
| `@tailwindcss/postcss` | 4.2.4 | 4.3.3 | 4.3.3 | Atualização minor |
| `@types/node` | 20.19.39 | 20.19.43 | 26.1.2 | Manter major alinhado ao alvo de runtime |
| `@types/react` | 19.2.14 | 19.2.18 | 19.2.18 | Patch |
| `@types/react-dom` | 19.2.3 | 19.2.4 | 19.2.4 | Patch |
| `eslint` | 9.39.4 | 9.39.5 | 10.8.0 | Patch disponível; major exige migração |
| `eslint-config-next` | 16.2.4 | 16.2.4 | 16.3.0 | Atualizar junto com Next.js |
| `lucide-react` | 1.14.0 | 1.28.0 | 1.28.0 | Minor |
| `next` | 16.2.4 | 16.2.4 | 16.3.0 | **P0 de segurança** |
| `react` | 19.2.4 | 19.2.4 | 19.2.8 | Patch fora da faixa fixada atual |
| `react-dom` | 19.2.4 | 19.2.4 | 19.2.8 | Atualizar em conjunto com React |
| `tailwindcss` | 4.2.4 | 4.3.3 | 4.3.3 | Atualizar junto com o plugin PostCSS |
| `typescript` | 5.9.3 | 5.9.3 | 7.0.2 | Major; não combinar com o patch de segurança |

Estratégia recomendada: primeiro uma atualização mínima de segurança de Next.js/eslint-config-next, depois patches compatíveis, e somente em mudanças separadas avaliar majors de Node types, ESLint e TypeScript.

## Integridade local

`npm ls --depth=0` encontrou cinco pacotes extraneous no `node_modules`, sem entrada no lockfile:

- `@emnapi/core@1.10.0`;
- `@emnapi/runtime@1.10.0`;
- `@emnapi/wasi-threads@1.2.1`;
- `@napi-rs/wasm-runtime@0.2.12`;
- `@tybys/wasm-util@0.10.2`.

Eles aparentam ser resíduos/optionals do ecossistema nativo/WASM. Uma instalação limpa baseada no lockfile deve ser usada no CI para confirmar reprodutibilidade. Nenhum `npm prune`, `npm install` ou `npm ci` foi executado nesta fase.

## Licenças

Resumo das 430 entradas do lockfile:

| Licença declarada | Pacotes |
|---|---:|
| MIT | 340 |
| Apache-2.0 | 31 |
| ISC | 18 |
| MPL-2.0 | 13 |
| LGPL-3.0-or-later | 10 |
| BSD-2-Clause | 7 |
| Apache-2.0 + LGPL-3.0-or-later | 3 |
| BSD-3-Clause | 2 |
| Outras declaradas (0BSD, BlueOak, Python-2.0, CC0, CC-BY e combinação Sharp) | 6 |
| Sem declaração | 0 |

As entradas LGPL pertencem principalmente aos binários opcionais do libvips/Sharp; as entradas MPL pertencem principalmente a Lightning CSS e Axe. O inventário não substitui análise jurídica de obrigações de distribuição e avisos.

Os repositórios públicos `mota-inteligencia-site` e `sap-business-one-integration-platform` não possuem arquivo `LICENSE`. Em um repositório público, ausência de licença não equivale a licença open source. Deve-se definir explicitamente a intenção de uso antes de incentivar reutilização externa.

## Plano recomendado

1. **P0:** aprovar atualização controlada de `next` e `eslint-config-next` para uma versão corrigida, preferencialmente 16.3.0, em mudança isolada.
2. Executar `npm audit`, lint, typecheck, build, crawler de rotas, analytics e Lighthouse após a atualização.
3. Reinstalar a árvore em ambiente limpo para eliminar/explicar os cinco pacotes extraneous.
4. Definir a licença do site e do repositório principal com orientação do titular.
5. Atualizar os demais pacotes em lotes pequenos; não misturar majors com o patch de segurança.
