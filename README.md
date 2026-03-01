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

## Fluxo de Trabalho

### Projeto Novo (Greenfield)
```
@product *brainstorm → *prd
@architect *stack → *architecture → *datamodel
@product *stories
# Para cada story:
@dev *develop {N} → @ship *qa {N}
@ship *deploy
```

### Projeto Existente (Brownfield)
```
@architect *audit → *datamodel
@product *prd → *stories
# Para cada story:
@dev *develop {N} → @ship *qa {N}
@ship *deploy
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
