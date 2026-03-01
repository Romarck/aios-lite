# AIOS Lite — {{projectName}}

**Tipo:** {{projectType}} | **Stack:** {{backend}} + {{frontend}} + {{database}}
**Framework:** AIOS Lite v{{version}}

---

## Agentes Disponíveis

Ative com `/AIOS:agents:{nome}` ou mencionando `@{nome}`:

| Agente | Escopo |
|--------|--------|
| `@product` | Brainstorm, PRD, stories, backlog |
| `@architect` | Arquitetura, stack, modelo de dados, ADRs |
| `@dev` | Implementação, debug, refactor |
| `@ux` | Pesquisa, wireframes, design system |
| `@ship` | QA, deploy, git push, Pull Requests |

---

## Princípios (obrigatórios)

1. **Story-Driven:** nenhum código sem story em `docs/stories/`
2. **Autoridade dos agentes:** respeite os escopos exclusivos (ver `templates/constitution.md`)
3. **Sem invenção:** implemente apenas o que está na story
4. **Qualidade primeiro:** toda story passa pelo `@ship` antes de `Concluído`

---

## Estrutura do Projeto

```
docs/
├── prd.md               # Requisitos do produto
├── architecture.md      # Arquitetura do sistema
├── datamodel.md         # Modelo de dados
├── stories/             # Stories (N-titulo.md)
├── decisions/           # ADRs (ADR-N-titulo.md)
└── ux/                  # Artefatos de UX
```

---

## Fluxo

{{#if greenfield}}
**Greenfield:** `@product *brainstorm → *prd` → `@architect *stack → *architecture → *datamodel` → `@product *stories` → `@dev *develop {N}` → `@ship *qa {N}` → `@ship *deploy`
{{/if}}
{{#if brownfield}}
**Brownfield:** `@architect *audit` → `@product *prd` → `@product *stories` → `@dev *develop {N}` → `@ship *qa {N}` → `@ship *deploy`
{{/if}}

---

## Arquivos Sempre Relevantes

- `docs/prd.md` — requisitos
- `docs/architecture.md` — decisões técnicas
- `docs/stories/` — stories ativas

---
*AIOS Lite v{{version}}*
