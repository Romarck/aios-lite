# AIOS Lite

Framework enxuto de desenvolvimento guiado por IA para MVPs e projetos ágeis.

**GitHub Copilot first** · Agnóstico de tecnologia · Greenfield & Brownfield

---

## O que é

AIOS Lite é um conjunto de **5 agentes de IA especializados** que guiam o desenvolvimento de software do brainstorm ao deploy. Funciona nativamente com **GitHub Copilot** e opcionalmente com **Claude Code**.

| Agente | Quando usar |
|--------|-------------|
| `@product` | Brainstorm, PRD, stories, backlog |
| `@architect` | Stack, arquitetura, modelo de dados, ADRs |
| `@dev` | Implementação (agnóstico de tecnologia) |
| `@ux` | Pesquisa, wireframes, sistema de design |
| `@ship` | QA, aprovação de stories, deploy |

---

## Instalação

### Pré-requisitos
- Node.js 18+

### Clonar o AIOS Lite
```bash
git clone https://github.com/seu-usuario/aios-lite.git ~/tools/aios-lite
cd ~/tools/aios-lite
npm install
```

### Instalar em um projeto
```bash
cd /caminho/do/seu-projeto
node ~/tools/aios-lite/bin/install.js
```

O installer faz perguntas sobre seu projeto e gera os arquivos de configuração automaticamente.

---

## Uso Rápido

### GitHub Copilot
1. Abra o VS Code no seu projeto
2. No Copilot Chat, selecione um agente (ex: `product`)
3. Use os comandos com prefixo `*`:

```
*help           # ver todos os comandos disponíveis
*brainstorm     # iniciar sessão de ideação (no @product)
*develop 1      # implementar story 1 (no @dev)
*qa 1           # revisar qualidade da story 1 (no @ship)
```

### Claude Code
```
@product *brainstorm
@architect *architecture
@dev *develop 3
@ship *qa 3
```

---

## Guia Passo-a-Passo

### 🌱 Projeto Novo (Greenfield)

**Objetivo:** Começar do zero com brainstorm, arquitetura, design e desenvolvimento estruturado.

#### Passo 1: Ideação e Visão do Produto
```
Copilot Chat > @product

> *help                    # Veja todos os comandos disponíveis
> *brainstorm              # Inicie uma sessão de ideação
```
**O que acontece:** O agente @product vai guiar você por:
- O que é o projeto
- Quem são os usuários
- Quais são os problemas que resolve
- Principais funcionalidades

**Arquivo gerado:** `docs/brainstorm.md`

---

#### Passo 2: Product Requirements Document (PRD)
```
Copilot Chat > @product

> *prd
```
**O que acontece:** Estrutura um PRD completo com:
- Visão do produto
- Objetivos e KPIs
- User personas
- Funcionalidades prioritizadas
- Critérios de aceitação

**Arquivo gerado:** `docs/prd.md`

---

#### Passo 3: Pesquisa e Design de Experiência
```
Copilot Chat > @ux

> *research                # Pesquise necessidades dos usuários
> *wireframes              # Crie wireframes de fluxos principais
```

**Escolha uma opção:**

**Opção A: Criar novo Design System (Novo projeto)**
```
> *design-system           # Defina sistema de design do zero
```

**Opção B: Validar/Corrigir Design System Existente (Projeto com design já documentado)**
```
> *import-design-system    # Importe arquivo de design system existente
> *validate-design-system  # Valide e corrija o design system importado
```

**O que acontece:**
- **Research:** Análise de usuários, entrevistas, personas
- **Wireframes:** Layout das telas principais, fluxo de navegação
- **Design System (novo):** Cria componentes, cores, tipografia, padrões de UI do zero
- **Design System (existente):** Valida documentação, identifica inconsistências, propõe melhorias e atualizações

**Arquivos gerados:**
- `docs/design/research.md`
- `docs/design/wireframes/`
- `docs/design/design-system.md` (novo ou atualizado)

> **💡 Quando usar cada opção:**
> - **Novo Design System**: Projeto sem documentação de design (greenfield puro)
> - **Importar/Validar**: Projeto que já tem design system documentado (Figma, documentação interna, etc.) e precisa validar ou atualizar

---

#### Passo 4: Decisões Arquiteturais
```
Copilot Chat > @architect

> *stack                   # Escolha stack tecnológico
> *architecture            # Desenhe arquitetura e componentes
> *datamodel               # Defina modelo de dados
```
**O que acontece:**
- **Stack:** Recomendações de tecnologia (frontend, backend, DB, infra)
- **Architecture:** Diagrama de componentes e fluxo de dados
- **Data Model:** Schema de banco de dados, relacionamentos

**Arquivos gerados:**
- `docs/architecture.md`
- `docs/decisions/` (Architecture Decision Records)

---

#### Passo 5: User Stories e Backlog
```
Copilot Chat > @product

> *stories                 # Gere stories baseadas no PRD e design
```
**O que acontece:** Converte PRD + wireframes em user stories estruturadas:
- Critérios de aceitação claros
- Estimativas de esforço
- Dependências entre stories
- Priorização
- Referência aos wireframes e design system

**Arquivo gerado:** `docs/stories/story-001.md`, `story-002.md`, etc.

---

#### Passo 6: Implementação (Para cada story)
```
Copilot Chat > @dev

> *develop 1               # Implemente story 1
> *develop 2               # Implemente story 2
> # ... continue para todas as stories
```
**O que acontece:**
- Implementação código-agnóstica baseada na story
- Segue arquitetura definida
- Código pronto para copiar/colar ou usar como template

**Resultado:** Código em `src/` ou diretório apropriado

---

#### Passo 7: QA e Aprovação (Para cada story)
```
Copilot Chat > @ship

> *qa 1                    # Revise story 1
> *qa 2                    # Revise story 2
> # ... para todas as stories
```
**O que acontece:**
- Valida critérios de aceitação
- Verifica cobertura de testes
- Aprova qualidade
- Identifica issues antes do deploy

**Checklist:** `.aios-lite/qa-checklist.md`

---

#### Passo 8: Deploy
```
Copilot Chat > @ship

> *deploy                  # Prepare deploy
```
**O que acontece:**
- Checklists pré-deploy
- Plano de rollback
- Instruções de deployment
- Monitoramento

**Guia:** `docs/deploy.md`

---

**Fluxo Completo Resumido:**
```bash
@product *brainstorm
@product *prd
@ux *research
@ux *wireframes

# Escolha uma opção:
# Opção A: Novo Design System
@ux *design-system

# OU Opção B: Validar Design System Existente
@ux *import-design-system
@ux *validate-design-system

@architect *stack
@architect *architecture
@architect *datamodel
@product *stories
# Para cada story N:
@dev *develop N
@ship *qa N
# Ao final:
@ship *deploy
```

---

### 🏗️ Projeto Existente (Brownfield)

**Objetivo:** Entender o projeto atual, documentar arquitetura e planejar evolução estruturada.

#### Passo 1: Auditoria da Arquitetura Existente
```
Copilot Chat > @architect

> *audit                   # Analise codebase existente
```
**O que acontece:**
- Mapeia tecnologias atuais
- Identifica padrões arquiteturais
- Aponta dívida técnica
- Recomenda melhorias

**Arquivo gerado:** `docs/audit.md`

---

#### Passo 2: Documentar Modelo de Dados
```
Copilot Chat > @architect

> *datamodel               # Documente schema atual
```
**O que acontece:**
- Mapeia banco de dados
- Documentar relacionamentos
- Identifica inconsistências
- Sugere normalizações

**Arquivo gerado:** `docs/architecture.md` (atualizado)

---

#### Passo 3: Definir Visão do Produto (Atual + Futuro)
```
Copilot Chat > @product

> *prd                     # Atualize ou crie novo PRD
```
**O que acontece:**
- Documenta estado atual
- Define novo roadmap
- Prioriza features
- Planeja evolução

**Arquivo gerado:** `docs/prd.md`

---

#### Passo 4: Quebrar em Stories
```
Copilot Chat > @product

> *stories                 # Gere stories baseadas no novo PRD
```
**O que acontece:**
- Quebra features em stories
- Define dependências
- Estima esforço
- Planeja sprints

**Arquivo gerado:** `docs/stories/story-*.md`

---

#### Passo 5: Implementação (Para cada story)
```
Copilot Chat > @dev

> *develop 1               # Implemente story 1
> *develop 2               # Implemente story 2
> # ... continue
```
**O que acontece:**
- Implementação incrementaal
- Respeita arquitetura existente
- Refatora conforme necessário
- Mantém compatibilidade

---

#### Passo 6: QA e Aprovação
```
Copilot Chat > @ship

> *qa 1                    # Teste story 1
> *qa 2                    # Teste story 2
> # ... para todas
```
**O que acontece:**
- Valida funcionalidades
- Testa regressão
- Aprova releases
- Documenta mudanças

---

#### Passo 7: Deploy
```
Copilot Chat > @ship

> *deploy                  # Coordene deploy
```
**O que acontece:**
- Migrações de banco de dados
- Rollback strategy
- Comunicação com stakeholders
- Monitoramento pós-deploy

---

**Fluxo Completo Resumido:**
```bash
@architect *audit
@architect *datamodel
@product *prd
@product *stories
# Para cada story N:
@dev *develop N
@ship *qa N
# Ao final:
@ship *deploy
```

---

### 📋 Referência de Comandos

Todos os comandos disponíveis em cada agente:

```
@product
  *help              Ver todos os comandos
  *brainstorm        Ideação inicial
  *prd               Criar Product Requirements Document
  *stories           Quebrar PRD em user stories
  *backlog           Refinar backlog

@architect
  *help              Ver todos os comandos
  *audit             Auditar arquitetura existente (brownfield)
  *stack             Escolher stack tecnológico
  *architecture      Desenhar arquitetura
  *datamodel         Definir modelo de dados
  *adr                Criar Architecture Decision Record

@dev
  *help              Ver todos os comandos
  *develop N         Implementar story N
  *refactor          Refatorar código existente
  *test              Gerar testes para story N

@ux
  *help                    Ver todos os comandos
  *research                Pesquisa de usuário
  *wireframes              Criar wireframes
  *design-system           Criar novo sistema de design do zero
  *import-design-system    Importar design system existente
  *validate-design-system  Validar e corrigir design system importado

@ship
  *help              Ver todos os comandos
  *qa N              Revisar qualidade da story N
  *deploy            Preparar deploy
  *rollback          Planejar rollback
```

---

## Arquivos Gerados

```
seu-projeto/
├── .github/
│   ├── copilot-instructions.md   # Instruções para GitHub Copilot
│   └── agents/
│       ├── product.agent.md
│       ├── architect.agent.md
│       ├── dev.agent.md
│       ├── ux.agent.md
│       └── ship.agent.md
├── .aios-lite/
│   ├── config.yaml               # Configuração do projeto
│   └── constitution.md           # Princípios fundamentais
└── docs/
    ├── prd.md                    # Template de PRD
    ├── architecture.md           # Template de arquitetura
    ├── stories/                  # Stories de desenvolvimento
    ├── decisions/                # Architecture Decision Records
    └── workflow-greenfield.md    # Guia do workflow
```

---

## Custo de Tokens vs AIOS Completo

| | AIOS Completo | AIOS Lite | Redução |
|---|---|---|---|
| Baseline por sessão | ~5.000 tokens | ~600 tokens | **-88%** |
| Por ativação de agente | ~4.000 tokens | ~700 tokens | **-83%** |
| Hooks por prompt | Sim (Synapse) | Zero | **-100%** |
| Ciclo completo / story | ~30.000 tokens | ~4.500 tokens | **-85%** |

---

## Estrutura do Repositório

```
aios-lite/
├── bin/
│   └── install.js          # CLI entry point
├── src/
│   ├── installer.js        # Lógica do installer (perguntas)
│   └── generator.js        # Geração de arquivos
├── templates/
│   ├── agents/             # 5 agentes
│   ├── docs/               # Templates de PRD, story, arquitetura
│   ├── workflows/          # Greenfield e brownfield
│   ├── ide/                # Instruções para GitHub Copilot e Claude Code
│   └── constitution.md     # Princípios fundamentais
└── package.json
```

---

## Princípios Fundamentais

1. **Story-Driven:** nenhum código sem story em `docs/stories/`
2. **Autoridade dos agentes:** cada agente tem escopo exclusivo
3. **Sem invenção:** implementações rastreiam para stories e PRD
4. **Qualidade primeiro:** toda story passa pelo `@ship` antes de concluir

---

## Licença

MIT — Robson Marques
