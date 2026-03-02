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

### Setup Inicial

Primeiro, clone o AIOS Lite para uma pasta central (recomendado: `~/tools/aios-lite`):

```bash
# Criar diretório tools na sua home (opcional, apenas se não existir)
mkdir -p ~/tools

# Clonar o repositório
git clone https://github.com/Romarck/aios-lite.git ~/tools/aios-lite
cd ~/tools/aios-lite

# ⚠️ IMPORTANTE: Instale as dependências ANTES de usar qualquer opção
npm install
```

> **Nota sobre o Local:** O caminho `~/tools/aios-lite` é sugerido por convenção. Você pode clonar em qualquer outro local (ex: `~/aios-lite`, `~/Documentos/aios-lite`, `/opt/aios-lite`, ou até dentro do seu projeto), desde que:
> 1. Execute `npm install` no diretório do aios-lite
> 2. Ajuste os caminhos nos comandos subsequentes (substitua `~/tools/aios-lite` pelo caminho real)

### Opção 1: Instalação Rápida (Automática)

**Melhor para:** Começar rápido com configuração padrão

Usa a configuração padrão (Greenfield + Node.js/Express + React/Next.js + SQLite + Claude Code):

```bash
cd /caminho/do/seu-projeto
npm install ~/tools/aios-lite -- --non-interactive
```

Ou use o script conveniente:

```bash
~/tools/aios-lite/scripts/install-project.sh /caminho/do/seu-projeto
```

**Configuração Padrão:**
```json
{
  "projectName": "projeto",
  "projectType": "greenfield",
  "backend": "Node.js/Express",
  "frontend": "React/Next.js",
  "database": "SQLite",
  "ide": "claude"
}
```

**O que é instalado:**
- ✓ `.claude/CLAUDE.md` — Instruções para Claude Code
- ✓ `.aios-lite/config.yaml` — Configuração do projeto
- ✓ `docs/prd.md` — Template de Product Requirements Document
- ✓ `docs/architecture.md` — Template de arquitetura
- ✓ `docs/workflow-greenfield.md` — Guia do workflow
- ✓ `docs/stories/` — Diretório para user stories
- ✓ `docs/decisions/` — Diretório para Architecture Decision Records

### Opção 2: Instalação com Configuração Customizada

**Melhor para:** Projetos com stack específico (Python, Java, PostgreSQL, etc.)

#### Passo 1: Criar arquivo de configuração

```bash
cd /caminho/do/seu-projeto
cp ~/tools/aios-lite/.aios-lite-install.example.json .aios-lite-install.json
```

#### Passo 2: Editar configuração

```bash
# Abra .aios-lite-install.json e customize:
{
  "projectName": "Minha Aplicação",
  "projectType": "greenfield",
  "backend": "Python/FastAPI",
  "frontend": "React/Next.js",
  "database": "PostgreSQL",
  "ide": "claude"
}
```

#### Opções Disponíveis

**projectName** (string)
- Qualquer nome para seu projeto
- Padrão: nome do diretório

**projectType** (string)
- `greenfield` — Projeto novo do zero
- `brownfield` — Projeto existente

**backend** (string)
- `Java/Spring Boot`
- `Python/FastAPI`
- `Node.js/Express`
- `Node.js/NestJS`
- `Outro`

**frontend** (string)
- `Angular`
- `React/Next.js`
- `Vue/Nuxt`
- `API-only`
- `Outro`

**database** (string)
- `PostgreSQL`
- `MySQL`
- `MongoDB`
- `SQLite`
- `Outro`

**ide** (string)
- `copilot` — GitHub Copilot
- `claude` — Claude Code
- `ambos` — GitHub Copilot + Claude Code

**author** (string, opcional)
- Seu nome ou organização
- Padrão: "AIOS Lite"

#### Passo 3: Executar instalação

```bash
npm install ~/tools/aios-lite -- --non-interactive
```

Ou:

```bash
~/tools/aios-lite/scripts/install-project.sh /caminho/do/seu-projeto
```

### Opção 3: Instalação Interativa

**Melhor para:** Exploradores ou quando quer escolher cada opção

#### Passo 1: Preparar AIOS Lite

Primeiro, clone o repositório do AIOS Lite (se ainda não tiver):

```bash
# Opção A: Clone em ~/tools/ (recomendado)
mkdir -p ~/tools
git clone https://github.com/Romarck/aios-lite.git ~/tools/aios-lite
cd ~/tools/aios-lite

# OU Opção B: Clone em outro local (ex: dentro do seu projeto)
cd /caminho/do/seu-projeto
git clone https://github.com/Romarck/aios-lite.git aios-lite
cd aios-lite
```

Instale as dependências do AIOS Lite:

```bash
npm install
```

#### Passo 2: Executar o Instalador

De **dentro do diretório aios-lite**, execute:

```bash
node ./bin/install.js
```

O instalador fará perguntas interativas sobre:
- Nome do projeto
- Tipo (greenfield/brownfield)
- Stack do backend
- Framework frontend
- Banco de dados
- IDE preferida (Copilot/Claude Code/ambos)

Responda cada pergunta e o AIOS Lite gerará os arquivos necessários no seu projeto.

> ⚠️ **Importante:** O `node ./bin/install.js` deve ser executado **de dentro da pasta aios-lite** (não de fora). Se estiver em outro local, use o caminho completo:
> ```bash
> node ~/tools/aios-lite/bin/install.js
> # ou
> node ~/Documentos/Projetos/aios-lite/bin/install.js
> ```
> Mas **nunca misture** `~` com caminhos absolutos completos (ex: ~~`~/home/romarck/Documentos/...`~~)

### Como o Instalador Funciona

**Fluxo de Decisão:**

```
npm install
    ↓
postinstall hook
    ↓
bin/install.js
    ↓
Detecta modo: --non-interactive?
    ├─ Sim → Carrega .aios-lite-install.json ou padrão
    └─ Não → Modo interativo (perguntas)
    ↓
generateFiles() gera estrutura
    ↓
✅ Pronto! AIOS Lite instalado
```

**Estrutura do projeto após instalação:**

```
seu-projeto/
├── .aios-lite/
│   ├── config.yaml           # Configuração do projeto
│   └── constitution.md       # Princípios fundamentais
├── .claude/
│   └── CLAUDE.md            # Instruções para Claude Code
├── .github/
│   ├── copilot-instructions.md   # Instruções para GitHub Copilot
│   └── agents/              # [Se usar GitHub Copilot]
│       ├── product.agent.md
│       ├── architect.agent.md
│       ├── dev.agent.md
│       ├── ux.agent.md
│       └── ship.agent.md
└── docs/
    ├── prd.md               # Template de PRD
    ├── architecture.md      # Template de arquitetura
    ├── workflow-greenfield.md  # [Se greenfield]
    ├── workflow-brownfield.md  # [Se brownfield]
    ├── stories/
    │   └── .gitkeep
    └── decisions/
        └── .gitkeep
```

### Troubleshooting da Instalação

**Problema: "Comando npm não encontrado"**
```bash
# Instale Node.js 18+
# https://nodejs.org/
node --version  # Deve ser v18.0.0 ou superior
```

**Problema: Erro "Cannot find module 'fs-extra'" ou "Cannot find module 'inquirer'"**
```bash
# Isso significa que npm install NÃO foi executado no diretório aios-lite
# Solução:
cd ~/tools/aios-lite  # ou o caminho onde você clonou aios-lite
npm install

# Depois tente novamente:
node ./bin/install.js  # Opção 3 (interativa)
# ou
npm install ~/tools/aios-lite -- --non-interactive  # Opção 1 ou 2
```

**Problema: ".aios-lite/config.yaml já existe"**
```bash
# O instalador detecta instalações existentes e pede confirmação
# Opção 1: Confirmar para reinstalar/atualizar
# Opção 2: Cancelar e revisar arquivos existentes
```

**Problema: Erro ao ler .aios-lite-install.json**
```bash
# Verifique se o JSON é válido
cat .aios-lite-install.json

# Valide em: https://jsonlint.com/
```

**Problema: Postinstall hook não executa**

O postinstall hook executa automaticamente quando você instala aios-lite como dependência em um projeto:
```bash
# Isso ativa o postinstall hook automaticamente:
npm install ~/tools/aios-lite -- --non-interactive

# Se não funcionar (por exemplo, em alguns ambientes), execute manualmente:
node ~/tools/aios-lite/bin/install.js $(pwd) --non-interactive
```

**Problema: Permissão negada em scripts/install-project.sh**
```bash
chmod +x ~/tools/aios-lite/scripts/install-project.sh
./install-project.sh /seu-projeto
```

**Problema: Erro "Cannot find module" com caminho duplicado**
```bash
# ❌ ERRADO: Misturando ~ com caminho absoluto
node ~/home/romarck/Documentos/Projetos/aios-lite/bin/install.js

# ✅ CORRETO: Use apenas um dos dois:
# Opção A: Com ~
node ~/Documentos/Projetos/aios-lite/bin/install.js

# Opção B: Caminho absoluto completo
node /home/romarck/Documentos/Projetos/aios-lite/bin/install.js

# Opção C: Se estiver dentro do diretório aios-lite
cd aios-lite && node ./bin/install.js
```

### Modo Programático

Se você quer usar AIOS Lite em scripts Node.js:

```javascript
const { generateFiles } = require('./src/generator');

const config = {
  projectName: 'Meu Projeto',
  projectType: 'greenfield',
  backend: 'Python/FastAPI',
  frontend: 'React/Next.js',
  database: 'PostgreSQL',
  ide: 'claude'
};

await generateFiles('/caminho/do/projeto', config);
```

---

## ⚡ Quick Start (Sem LLM!)

Comece em 3 linhas:

```bash
npm install ~/tools/aios-lite -- --non-interactive
cd . && claude
@product *brainstorm
```

Pronto! O AIOS Lite está instalado com configuração automática.

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

---

## Acknowledgments & Attribution

AIOS Lite foi desenvolvido como uma implementação enxuta derivada do **AIOS-Core** (https://github.com/SynkraAI/aios-core), que por sua vez originou-se do **BMad Method**, criado por Brian Madison (BMad Code, LLC). Agradecemos tanto ao AIOS-Core quanto ao BMad Method por fornecer a inspiração arquitetural e conceitual para este projeto.

### Isenções de Responsabilidade Importantes

- Este projeto **NÃO é afiliado com**, endossado por, ou sancionado pelo AIOS-Core, BMad Method ou BMad Code, LLC.
- AIOS Lite é uma implementação **independente e simplificada** projetada para casos de uso específicos e fins educacionais.
- Colaboradores que aparecem no histórico do git do AIOS-Core ou BMad Method **não implicam participação ativa** ou endosso do AIOS-Lite.

### Principais Diferenciais do AIOS-Lite

Em relação aos projetos predecessores, AIOS-Lite foi otimizado para **economia radical de tokens**:

- **-88% de tokens** na linha de base por sessão (~600 vs ~5.000)
- **-83% de tokens** por ativação de agente (~700 vs ~4.000)
- **-100% de overhead** de hooks (zero Synapse, instruções otimizadas)
- **-85% de tokens** em ciclos completos (story inteira: ~4.500 vs ~30.000)

Essa redução foi alcançada através de:
- Instruções de agentes ultra-concentradas
- Remoção de abstrações desnecessárias
- Templates minimalistas e reutilizáveis
- Foco em qualidade sobre quantidade de tokens

Para mais informações sobre os projetos originais:
- **AIOS-Core**: https://github.com/SynkraAI/aios-core
- **BMad Method**: (repositório oficial do BMad Method)

---

## Licença

MIT — Robson Marques
