'use strict';

const fs = require('fs-extra');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

/**
 * Substitui placeholders {{key}} no conteúdo de um template.
 * Suporta condicionais simples: {{#if condition}}...{{/if}}
 */
function renderTemplate(content, vars) {
  // Processar condicionais {{#if condition}}...{{/if}}
  let rendered = content.replace(
    /\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, key, block) => (vars[key] ? block : '')
  );

  // Substituir variáveis simples {{key}}
  rendered = rendered.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? vars[key] : `{{${key}}}`
  );

  return rendered;
}

/**
 * Lê um arquivo de template e renderiza com as variáveis fornecidas.
 */
function loadTemplate(relativePath, vars = {}) {
  const fullPath = path.join(TEMPLATES_DIR, relativePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  return renderTemplate(content, vars);
}

/**
 * Gera os arquivos do AIOS Lite no projeto do usuário.
 * @param {string} targetDir - Diretório do projeto alvo
 * @param {object} config - Configuração coletada pelo installer
 */
async function generateFiles(targetDir, config) {
  const vars = buildTemplateVars(config);
  const generated = [];

  // 1. Criar estrutura de diretórios
  const dirs = [
    '.github/agents',
    '.aios-lite',
    'docs/stories',
    'docs/decisions',
  ];

  if (config.ide.includes('copilot') || config.ide.includes('ambos')) {
    dirs.push('.github/agents');
  }
  if (config.ide.includes('claude') || config.ide.includes('ambos')) {
    dirs.push('.claude');
  }
  if (config.includeUX) {
    dirs.push('docs/ux');
  }

  for (const dir of dirs) {
    await fs.ensureDir(path.join(targetDir, dir));
  }

  // 2. Agentes GitHub Copilot
  if (config.ide.includes('copilot') || config.ide.includes('ambos')) {
    const agents = ['product', 'architect', 'dev', 'ux', 'ship'];
    for (const agent of agents) {
      const content = loadTemplate(`agents/${agent}.md`, vars);
      const dest = path.join(targetDir, `.github/agents/${agent}.agent.md`);
      await fs.writeFile(dest, content);
      generated.push(`.github/agents/${agent}.agent.md`);
    }

    // Instruções globais do Copilot
    const copilotInstructions = loadTemplate('ide/copilot-instructions.md', vars);
    const copilotDest = path.join(targetDir, '.github/copilot-instructions.md');
    await fs.writeFile(copilotDest, copilotInstructions);
    generated.push('.github/copilot-instructions.md');
  }

  // 3. Claude Code
  if (config.ide.includes('claude') || config.ide.includes('ambos')) {
    const claudeContent = loadTemplate('ide/claude-code.md', vars);
    const claudeDest = path.join(targetDir, '.claude/CLAUDE.md');
    await fs.writeFile(claudeDest, claudeContent);
    generated.push('.claude/CLAUDE.md');
  }

  // 4. Config do AIOS Lite
  const configContent = buildConfigYaml(config);
  const configDest = path.join(targetDir, '.aios-lite/config.yaml');
  await fs.writeFile(configDest, configContent);
  generated.push('.aios-lite/config.yaml');

  // 5. Documentos iniciais
  const prdContent = loadTemplate('docs/prd.md', vars);
  await fs.writeFile(path.join(targetDir, 'docs/prd.md'), prdContent);
  generated.push('docs/prd.md');

  const archContent = loadTemplate('docs/architecture.md', vars);
  await fs.writeFile(path.join(targetDir, 'docs/architecture.md'), archContent);
  generated.push('docs/architecture.md');

  // 6. Workflow relevante
  const workflowFile = config.projectType === 'greenfield' ? 'greenfield' : 'brownfield';
  const workflowContent = loadTemplate(`workflows/${workflowFile}.md`, vars);
  await fs.writeFile(
    path.join(targetDir, `docs/workflow-${workflowFile}.md`),
    workflowContent
  );
  generated.push(`docs/workflow-${workflowFile}.md`);

  // 7. Constitution
  const constitutionContent = loadTemplate('constitution.md', vars);
  await fs.writeFile(path.join(targetDir, '.aios-lite/constitution.md'), constitutionContent);
  generated.push('.aios-lite/constitution.md');

  // 8. .gitkeep para diretórios vazios
  await fs.writeFile(path.join(targetDir, 'docs/stories/.gitkeep'), '');
  await fs.writeFile(path.join(targetDir, 'docs/decisions/.gitkeep'), '');
  generated.push('docs/stories/ (diretório)');
  generated.push('docs/decisions/ (diretório)');

  return generated;
}

/**
 * Constrói as variáveis para substituição nos templates.
 */
function buildTemplateVars(config) {
  const now = new Date();
  const date = now.toISOString().split('T')[0];

  return {
    projectName: config.projectName,
    projectType: config.projectType,
    backend: config.backend,
    frontend: config.frontend,
    database: config.database,
    version: '1.0.0',
    installedAt: now.toISOString(),
    date,
    author: config.author || 'AIOS Lite',
    // Condicionais de workflow
    greenfield: config.projectType === 'greenfield' ? true : '',
    brownfield: config.projectType === 'brownfield' ? true : '',
    // Condicionais de IDE
    hasGitHubCopilot: config.ide.includes('copilot') || config.ide.includes('ambos') ? true : '',
    hasClaudeCode: config.ide.includes('claude') || config.ide.includes('ambos') ? true : '',
  };
}

/**
 * Gera o conteúdo do arquivo .aios-lite/config.yaml
 */
function buildConfigYaml(config) {
  const now = new Date().toISOString();
  return `# AIOS Lite — Configuração do Projeto
# Gerado automaticamente pelo installer

project:
  name: "${config.projectName}"
  type: "${config.projectType}"
  version: "1.0.0"
  installedAt: "${now}"

stack:
  backend: "${config.backend}"
  frontend: "${config.frontend}"
  database: "${config.database}"

ide:
  selected: "${config.ide}"

agents:
  - product
  - architect
  - dev
  - ux
  - ship

docs:
  prd: "docs/prd.md"
  architecture: "docs/architecture.md"
  datamodel: "docs/datamodel.md"
  stories: "docs/stories/"
  decisions: "docs/decisions/"

aiosLite:
  version: "1.0.0"
`;
}

module.exports = { generateFiles, renderTemplate, loadTemplate };
