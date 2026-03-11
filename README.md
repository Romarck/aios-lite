# AIOS Lite

Framework enxuto de desenvolvimento guiado por IA para MVPs e projetos ágeis.

**GitHub Copilot first** · Agnóstico de tecnologia · Greenfield & Brownfield

---

## O que é

AIOS Lite integra **6 agentes IA especializados** que guiam o desenvolvimento do brainstorm ao deploy. Funciona nativamente com **GitHub Copilot** e **Claude Code**.

| Agente | Função |
|--------|--------|
| `@po` | Brainstorm, PRD, stories, backlog |
| `@architect` | Stack, arquitetura, modelo de dados, ADRs |
| `@dev` | Implementação (agnóstico) |
| `@ux` | Pesquisa, wireframes, design system |
| `@si` | 🔐 Auditoria, vulnerabilidades, compliance BCB/FEBRABAN/B3/CVM |
| `@qadv` | QA, aprovação, deploy |

---

## Comparativo: AIOS-Lite vs AIOX-Squad

Um quadro para entender as diferenças fundamentais de arquitetura entre os dois frameworks:

| Métrica | **AIOS-Lite** | **AIOX-Squad** | Diferença |
|---------|---------------|-------|-----------|
| **Agentes Especializados** | 6 | 12 | AIOX tem 2x mais agentes |
| **Suporte a Squads** | ❌ Não | ✅ Sim (paralelo) | AIOX permite equipes paralelas |
| **Workflows Predefinidos** | 2 (greenfield, brownfield) | 12+ (git, story, epic, etc) | AIOX mais workflows especializados |
| **Arquivos Totais** | 19 | 7.842 | AIOX 413x maior |
| **Linhas de Código** | 2.628 | 1.555.839 | AIOX 593x mais código |
| **Pacotes NPM Separados** | 0 (monolito) | 3 (aiox-install, aiox-pro-cli, gemini-ext) | AIOX modularizado |
| **Dependências Diretas** | 3 | 10+ | AIOX mais dependências |
| **Templates de Docs** | 4 | 20+ | AIOX mais templates |
| **Documentação** | Reduzida (didática) | Extensa (português, inglês, espanhol, chinês) | AIOX multilíngue |
| **Curva de Aprendizado** | Rápida (30 min) | Íngreme (horas/dias) | AIOS-Lite minimalista |
| **Ideal para** | MVPs, startups, prototipagem rápida | Projetos enterprise, grande escala |
| **Filosofia** | Enxuto e pragmático | Robusto e extensível |

**Resumo:** AIOS-Lite é uma versão **ultraleve** otimizada para velocidade (MVP em dias), enquanto AIOX-Squad é uma plataforma **enterprise** com suporte a squads paralelos, workflows complexos e múltiplas linguagens.

---

## Instalação Rápida

### Pré-requisitos
- Node.js 18+

### Passo 1: Clonar e Instalar Dependências

```bash
mkdir -p ~/tools
git clone https://github.com/Romarck/aios-lite.git ~/tools/aios-lite
cd ~/tools/aios-lite
npm install
```

**Dependências instaladas:**
- `chalk` (4.1.2) — Colorização de terminal
- `fs-extra` (11.3.0) — Operações de arquivo avançadas
- `inquirer` (8.2.6) — Interface interativa de perguntas

### Passo 2: Usar em seu Projeto

```bash
# Opção A: Clonar em ~/tools/ (recomendado)
cd ~/tools/aios-lite
node bin/install.js

# OU Opção B: Clone em outro local
cd /caminho/do/seu-projeto
git clone https://github.com/Romarck/aios-lite.git aios-lite
cd aios-lite
npm install
node bin/install.js
```

**Responda as perguntas interativas:**
- Nome do projeto
- Tipo (greenfield / brownfield)
- Backend, frontend, banco de dados
- IDE preferida (Copilot / Claude Code / ambos)

**Arquivos gerados no seu projeto:**
- `.aios-lite/config.yaml` — Configuração
- `.claude/CLAUDE.md` ou `.github/copilot-instructions.md` — Instruções para IA
- `docs/prd.md`, `docs/architecture.md` — Templates
- `docs/stories/`, `docs/decisions/` — Diretórios vazios

---

## Uso Rápido

### GitHub Copilot
1. Abra o VS Code no seu projeto
2. Selecione o agente no Copilot Chat (ex: `@product`)
3. Digite: `*brainstorm` (ou outro comando)

### Claude Code
```bash
claude
@product *brainstorm
```

---

## Referência de Comandos

### @po — Product Manager
```
*brainstorm       Sessão de ideação
*prd              Criar/atualizar PRD
*stories          Gerar user stories
*story {título}   Criar story específica
*prioritize       Reordenar backlog
*help             Ver todos os comandos
```

### @architect — Arquiteto
```
*audit            Auditar codebase (brownfield)
*stack            Escolher stack tecnológico
*architecture     Desenhar arquitetura
*datamodel        Definir modelo de dados
*help             Ver todos os comandos
```

### @dev — Desenvolvedor
```
*develop N        Implementar story N
*refactor         Refatorar código
*test N           Gerar testes para story N
*help             Ver todos os comandos
```

### @ux — Design
```
*research         Pesquisa de usuário
*wireframes       Criar wireframes
*design-system    Criar novo design system
*validate-design-system   Validar design existente
*help             Ver todos os comandos
```

### @si — Segurança & Compliance
```
*audit-code                   Auditoria completa (7 fases)
*scan-deps                    Análise supply chain
*check-network                Mapeiar endpoints externos
*check-code {pattern}         Procurar padrões maliciosos
*compliance BCB               Validar conformidade BCB 85/2021
*compliance FEBRABAN          Checklist CNAB/pagamentos
*compliance B3-CVM            Checklist mercado de capitais
*report                       Gerar relatório final
*help                         Ver todos os comandos
```

### @qadv — QA/Deploy
```
*qa N             Revisar qualidade da story N
*deploy           Preparar deploy
*rollback         Planejar rollback
*help             Ver todos os comandos
```

---

## Fluxo Recomendado

### 🌱 Novo Projeto (Greenfield)
```bash
@po *brainstorm
@po *prd
@ux *research
@ux *wireframes
@ux *design-system
@architect *stack
@architect *architecture
@architect *datamodel
@po *stories

# Recomendado antes de implementar:
@si *scan-deps
@si *compliance [BCB|FEBRABAN|B3-CVM]  # Se regulado

# Para cada story N:
@dev *develop N
@qadv *qa N

# Obrigatório antes de produção:
@si *audit-code

# Ao final:
@qadv *deploy
```

### 🏗️ Projeto Existente (Brownfield)
```bash
# ⚠️ FASE 0 — OBRIGATÓRIA (segurança):
@si *audit-code
@si *compliance [BCB|FEBRABAN|B3-CVM]  # Se regulado

# Depois prosseguir com:
@architect *audit
@architect *datamodel
@po *prd
@po *stories

# Para cada story N:
@dev *develop N
@qadv *qa N

@qadv *deploy
```

---

## Princípios Fundamentais

1. **Story-Driven** — Nenhum código sem story em `docs/stories/`
2. **Autoridade dos Agentes** — Cada agente tem escopo exclusivo
3. **Sem Invenção** — Tudo deve rastrear para PRD ou requisitos documentados
4. **Qualidade Primeiro** — Toda story passa pelo `@ship` antes de deploy
5. **Segurança Obstinada** — `@security` valida código, dependências e compliance regulatório

---

## Troubleshooting

**Comando npm não encontrado?**
```bash
# Instale Node.js 18+
node --version  # Deve ser v18.0.0+
```

**Instalação interativa não funciona?**
```bash
# Certifique-se de estar no diretório do projeto:
cd /seu-projeto
node ~/tools/aios-lite/bin/install.js
```

**AIOS Lite já instalado?**
```bash
# O instalador pede confirmação para reinstalar
# Selecione "Sim" para atualizar
```

---

## Estrutura do Repositório

```
aios-lite/
├── agents/                    # Definições dos 5 agentes (marketplace)
│   ├── product.agent.md       # @product — Brainstorm, PRD, stories
│   ├── architect.agent.md     # @architect — Stack, arquitetura, ADRs
│   ├── dev.agent.md           # @dev — Implementação agnóstica
│   ├── ux.agent.md            # @ux — Pesquisa, wireframes, design
│   └── ship.agent.md          # @ship — QA, deploy, releases
├── bin/
│   └── install.js             # CLI entry point
├── config/
│   └── squad-config.yaml      # Configuração do squad
├── src/
│   ├── installer.js        # Lógica interativa
│   └── generator.js        # Geração de arquivos
├── templates/
│   ├── agents/             # 5 agentes
│   ├── docs/               # Templates (PRD, story, etc)
│   ├── workflows/          # Greenfield e brownfield
│   ├── ide/                # Instruções para IDEs
│   └── constitution.md     # Princípios fundamentais
└── package.json
```

---

## Licença

MIT — Robson Marques
