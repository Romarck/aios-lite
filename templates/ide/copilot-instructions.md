# AIOS Lite — Instruções para GitHub Copilot

**Projeto:** {{projectName}}
**Tipo:** {{projectType}}
**Stack:** {{backend}} + {{frontend}} + {{database}}
**Versão:** AIOS Lite v{{version}}

---

## O que é o AIOS Lite

AIOS Lite é um framework de desenvolvimento guiado por IA com 5 agentes especializados. Cada agente tem escopo e responsabilidades bem definidas. O desenvolvimento é orientado por stories em `docs/stories/`.

---

## Os 5 Agentes

Ative um agente selecionando-o no GitHub Copilot Chat ou mencionando seu nome:

| Agente | Ativar com | Quando usar |
|--------|-----------|-------------|
| `@product` | Selecione "product" no chat | Brainstorm, PRD, stories, backlog |
| `@architect` | Selecione "architect" no chat | Arquitetura, stack, modelo de dados, ADRs |
| `@dev` | Selecione "dev" no chat | Implementação de código, debug, refactor |
| `@ux` | Selecione "ux" no chat | Pesquisa, wireframes, design system |
| `@ship` | Selecione "ship" no chat | QA, aprovação de stories, deploy |

> **Dica:** Cada agente responde ao comando `*help` com sua lista completa de comandos.

---

## Estrutura de Documentos

```
docs/
├── prd.md               # Product Requirements Document
├── architecture.md      # Arquitetura do sistema
├── datamodel.md         # Modelo de dados / schema
├── stories/             # User stories (N-titulo.md)
├── decisions/           # Architecture Decision Records (ADR-N-titulo.md)
└── ux/                  # Artefatos de UX (pesquisa, wireframes, design system)
```

---

## Fluxo de Trabalho

{{#if greenfield}}
### Projeto Novo (Greenfield)

```
1. DESCOBERTA    @product *brainstorm → @product *prd
2. DESIGN        @architect *stack → @architect *architecture → @architect *datamodel
                 @ux *research → @ux *wireframes (opcional, em paralelo)
3. PLANEJAMENTO  @product *stories
4. CONSTRUÇÃO    @dev *develop {N} → @ship *qa {N}   (repetir por story)
5. ENTREGA       @ship *deploy
```
{{/if}}
{{#if brownfield}}
### Projeto Existente (Brownfield)

```
1. DESCOBERTA    @architect *audit → @architect *architecture → @architect *datamodel
                 @product *prd (nova funcionalidade)
2. PLANEJAMENTO  @product *stories
3. CONSTRUÇÃO    @dev *develop {N} → @ship *qa {N}   (repetir por story)
4. ENTREGA       @ship *deploy
```
{{/if}}

---

## Princípios Fundamentais

1. **Story-Driven:** nenhum código sem story válida em `docs/stories/`
2. **Autoridade clara:** cada agente tem responsabilidades exclusivas
3. **Sem invenção:** implementações rastreiam para stories e PRD
4. **Qualidade:** toda story passa pelo `@ship` antes de `Concluído`

---

## Comandos Rápidos

| O que fazer | Comando |
|-------------|---------|
| Iniciar projeto | `@product *brainstorm` |
| Ver stories | `@product *status` |
| Implementar story 3 | `@dev *develop 3` |
| Revisar QA da story 3 | `@ship *qa 3` |
| Ver todos os comandos | Qualquer agente + `*help` |

---

*AIOS Lite v{{version}} — github.com/{{author}}/aios-lite*
