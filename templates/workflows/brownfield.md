# Workflow: Projeto Existente (Brownfield)

Guia passo a passo para adicionar funcionalidades ou dar sustentação em um projeto já existente.

---

## Visão Geral

```
SEGURANÇA (auditoria obrigatória) → DESCOBERTA (auditar o que existe) → PLANEJAMENTO → CONSTRUÇÃO (ciclo) → ENTREGA
```

> **Diferença do Greenfield:** começa com auditoria de segurança + auditoria do sistema existente antes de planejar novas funcionalidades.

---

## Fase 0: Auditoria de Segurança (OBRIGATÓRIO)

**Objetivo:** Garantir que o sistema existente não possui vulnerabilidades críticas, malware, supply chain comprometida ou riscos de compliance antes de qualquer mudança.

> ⚠️ **CRÍTICO:** Esta fase é obrigatória para projetos regulados (BCB, FEBRABAN, B3, CVM) e altamente recomendada para todos os projetos.

### 0.1 Auditoria Completa de Código

```
Ative: @security
Comando: *audit-code
```

O `@security` executa análise completa em 7 fases:
1. Mapeamento inicial do projeto (linguagens, frameworks, runtime)
2. Análise de dependências e supply chain (typosquatting, versões perigosas)
3. Análise de código para padrões maliciosos (exfiltração, backdoors, ofuscação)
4. Análise de endpoints externos e comunicação de rede
5. Verificação de licenças e compliance
6. Análise de risco regulatório (BCB, FEBRABAN, B3, CVM)
7. Relatório final com veredicto

**Entrega:** `docs/security/audit-report.md` com tabela de achados

### 0.2 Conformidade Regulatória (se aplicável)

Dependendo do contexto do projeto, execute:

```
Ative: @security
Comando: *compliance BCB          # Se regido pelo Banco Central
Comando: *compliance FEBRABAN     # Se integração bancária/pagamentos
Comando: *compliance B3-CVM       # Se dados de mercado/investidores
```

**Entrega:** `docs/security/compliance-bcb.md`, `docs/security/compliance-febraban.md`, etc.

### 0.3 Veredicto

```
Ative: @security
Comando: *report
```

**Resultado esperado:**
- ✅ **APROVADO** — Prosseguir para Fase 1
- ⚠️ **APROVADO COM RESSALVAS** — Prosseguir para Fase 1 com plano de remediação
- ❌ **REPROVADO** — NÃO prosseguir até resolver achados críticos

Se resultado for ❌, resolva os achados críticos com time de desenvolvimento antes de continuar.

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
@security *audit-code (FASE 0 — obrigatório)
  │
  ▼
@security *compliance [BCB|FEBRABAN|B3-CVM] (se regulado)
  │
  ▼
✅ Segurança aprovada?
  │
  ├─ Não ──► Resolver achados críticos → voltar para *audit-code
  │
  └─ Sim ──► Prosseguir
       │
       ▼
@architect *audit (FASE 1)
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
