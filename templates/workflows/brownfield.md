# Workflow: Projeto Existente (Brownfield)

Guia passo a passo para adicionar funcionalidades ou dar sustentação em um projeto já existente.

---

## Visão Geral

```
DESCOBERTA (auditar o que existe) → PLANEJAMENTO → CONSTRUÇÃO (ciclo) → ENTREGA
```

> **Diferença do Greenfield:** começa com auditoria do sistema existente antes de planejar novas funcionalidades.

---

## Fase 1: Descoberta

**Objetivo:** Entender o sistema atual antes de propor mudanças.

### 1.1 Auditoria de Arquitetura
```
Ative: @architect
Comando: *audit
```
O `@architect` analisa o projeto e documenta:
- Componentes existentes
- Stack atual
- Dívida técnica identificada
- Pontos de acoplamento

**Entrega:** `docs/architecture.md` com situação atual

### 1.2 Documentar Modelo de Dados
```
Ative: @architect
Comando: *datamodel
```
Documenta o schema existente do banco.

**Entrega:** `docs/datamodel.md` com estrutura atual

### 1.3 Definir Requisitos da Nova Funcionalidade
```
Ative: @product
Comando: *prd
```
O `@product` coleta os requisitos da nova funcionalidade ou melhoria.

**Entrega:** `docs/prd.md` (ou seção adicionada ao PRD existente)

### 1.4 Auditoria UX (opcional)
```
Ative: @ux
Comando: *audit
```
Identifica problemas de UX no produto atual antes de adicionar novas telas.

**Entrega:** `docs/ux/audit.md`

---

## Fase 2: Planejamento

**Objetivo:** Criar stories para as novas funcionalidades.

```
Ative: @product
Comando: *stories
```

> **Atenção brownfield:** stories devem considerar compatibilidade com o sistema existente.
> O `@architect` deve revisar as stories antes de marcá-las como `Pronto`.

```
Ative: @architect
Comando: *review {N}   (para cada story)
```

**Entrega:** Stories em `docs/stories/` com status `Pronto`

---

## Fase 3: Construção (ciclo por story)

**Objetivo:** Implementar e validar uma story por vez sem quebrar o que já funciona.

### 3.1 Implementar
```
Ative: @dev
Comando: *develop {N}
```
O `@dev` em projetos brownfield:
1. Lê a story e a documentação de arquitetura existente
2. **Analisa o código existente** antes de qualquer mudança
3. Implementa de forma aditiva — evita quebrar o que funciona
4. Adiciona/atualiza testes
5. Faz commits atômicos com referência à story

### 3.2 Quality Gate
```
Ative: @ship
Comando: *qa {N}
```
O QA em brownfield verifica itens extras:
- [ ] Funcionalidades existentes continuam funcionando (sem regressões)
- [ ] Compatibilidade com dados existentes no banco
- [ ] Migrações de banco são reversíveis (quando aplicável)

---

## Fase 4: Entrega

**Objetivo:** Deploy seguro em produção com rollback planejado.

```
Ative: @ship
Comandos: *push → *pr "descrição" → *deploy staging
```

> **Atenção brownfield:** valide em staging antes de ir para produção.
> Planeje rollback antes de fazer deploy em produção.

```
@ship *deploy production
```

---

## Checklist Brownfield (antes de começar)

Antes de iniciar qualquer desenvolvimento em projeto existente:

- [ ] O código existente está em git com histórico limpo?
- [ ] Existe uma forma de rodar o projeto localmente?
- [ ] Os testes existentes passam no estado atual?
- [ ] Existe ambiente de staging separado de produção?
- [ ] A estratégia de rollback está definida?

Se algum item estiver com ❌, resolva antes de prosseguir.

---

## Diagrama do Fluxo

```
START (projeto existente)
  │
  ▼
@architect *audit
  │
  ▼
@architect *datamodel (documenta atual)
  │
  ▼
@product *prd (nova funcionalidade) ─── (opcional: @ux *audit)
  │
  ▼
@product *stories
  │
  ▼
@architect *review {N} (valida viabilidade)
  │
  ▼
┌─────────────────────────────┐
│  Para cada story "Pronto"   │
│                             │
│  @dev *develop {N}          │
│        │                    │
│        ▼                    │
│  @ship *qa {N}              │
│   (+ checklist regressão)   │
│        │                    │
│  ✅ Aprovado? ──── Sim ─► Próxima story
│        │                    │
│        └─── Não ──► @dev corrige
└─────────────────────────────┘
  │
  ▼
@ship *deploy staging (validar)
  │
  ▼
@ship *deploy production
  │
  ▼
END
```

---

*AIOS Lite v{{version}}*
