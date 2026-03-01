'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { generateFiles } = require('./generator');

const AIOS_LITE_VERSION = '1.0.0';

function printBanner() {
  console.log('');
  console.log(chalk.cyan('╔══════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.bold.white('         AIOS Lite — Installer v' + AIOS_LITE_VERSION + '         ') + chalk.cyan('║'));
  console.log(chalk.cyan('║') + chalk.gray('  Framework de desenvolvimento guiado por IA  ') + chalk.cyan('║'));
  console.log(chalk.cyan('╚══════════════════════════════════════════════╝'));
  console.log('');
}

function printSuccess(files) {
  console.log('');
  console.log(chalk.green('✅ AIOS Lite instalado com sucesso!\n'));
  console.log(chalk.white('Arquivos gerados:'));
  files.forEach(f => console.log(chalk.gray('  ✓ ') + chalk.white(f)));
  console.log('');
}

function printNextSteps(config) {
  console.log(chalk.yellow('─────────────────────────────────────────────'));
  console.log(chalk.bold.white('🚀 Próximos passos:\n'));

  if (config.ide.includes('copilot') || config.ide.includes('ambos')) {
    console.log(chalk.white('  GitHub Copilot:'));
    console.log(chalk.gray('  1. Abra o VS Code no diretório do projeto'));
    console.log(chalk.gray('  2. No Copilot Chat, selecione o agente "product"'));
    console.log(chalk.gray('  3. Digite: ') + chalk.cyan('*brainstorm') + chalk.gray(' para começar'));
    console.log('');
  }

  if (config.ide.includes('claude') || config.ide.includes('ambos')) {
    console.log(chalk.white('  Claude Code:'));
    console.log(chalk.gray('  1. Abra o terminal no diretório do projeto'));
    console.log(chalk.gray('  2. Execute: ') + chalk.cyan('claude'));
    console.log(chalk.gray('  3. Digite: ') + chalk.cyan('@product *brainstorm') + chalk.gray(' para começar'));
    console.log('');
  }

  console.log(chalk.white('  Workflow recomendado (' + config.projectType + '):'));
  if (config.projectType === 'greenfield') {
    console.log(chalk.gray('  @product *brainstorm → *prd → @architect *stack → *architecture → @product *stories → @dev *develop 1 → @ship *qa 1'));
  } else {
    console.log(chalk.gray('  @architect *audit → *datamodel → @product *prd → *stories → @dev *develop 1 → @ship *qa 1'));
  }
  console.log('');
  console.log(chalk.yellow('─────────────────────────────────────────────'));
  console.log('');
}

/**
 * Tenta detectar o nome do projeto a partir do diretório ou package.json/pom.xml
 */
function detectProjectName(targetDir) {
  try {
    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.name) return pkg.name;
    }
  } catch {}

  try {
    const pomPath = path.join(targetDir, 'pom.xml');
    if (fs.existsSync(pomPath)) {
      const content = fs.readFileSync(pomPath, 'utf8');
      const match = content.match(/<artifactId>([^<]+)<\/artifactId>/);
      if (match) return match[1];
    }
  } catch {}

  return path.basename(targetDir);
}

/**
 * Coleta as informações do projeto via perguntas interativas
 */
async function collectConfig(targetDir) {
  const defaultName = detectProjectName(targetDir);

  console.log(chalk.gray('Responda as perguntas abaixo para configurar o AIOS Lite no seu projeto.\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Nome do projeto:',
      default: defaultName,
      validate: (val) => val.trim().length > 0 || 'O nome não pode ser vazio',
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'Tipo de projeto:',
      choices: [
        { name: '🌱 Greenfield — projeto novo do zero', value: 'greenfield' },
        { name: '🏗️  Brownfield — projeto existente', value: 'brownfield' },
      ],
    },
    {
      type: 'list',
      name: 'backend',
      message: 'Stack principal do backend:',
      choices: [
        { name: 'Java / Spring Boot', value: 'Java/Spring Boot' },
        { name: 'Python / FastAPI', value: 'Python/FastAPI' },
        { name: 'Node.js / Express', value: 'Node.js/Express' },
        { name: 'Node.js / NestJS', value: 'Node.js/NestJS' },
        { name: 'Outro (agnóstico)', value: 'Outro' },
      ],
    },
    {
      type: 'list',
      name: 'frontend',
      message: 'Frontend:',
      choices: [
        { name: 'Angular', value: 'Angular' },
        { name: 'React / Next.js', value: 'React/Next.js' },
        { name: 'Vue / Nuxt', value: 'Vue/Nuxt' },
        { name: 'Nenhum (API-only)', value: 'API-only' },
        { name: 'Outro', value: 'Outro' },
      ],
    },
    {
      type: 'list',
      name: 'database',
      message: 'Banco de dados:',
      choices: [
        { name: 'PostgreSQL', value: 'PostgreSQL' },
        { name: 'MySQL / MariaDB', value: 'MySQL' },
        { name: 'MongoDB', value: 'MongoDB' },
        { name: 'SQLite', value: 'SQLite' },
        { name: 'Outro', value: 'Outro' },
      ],
    },
    {
      type: 'list',
      name: 'ide',
      message: 'IDE / Assistente de IA:',
      choices: [
        { name: 'GitHub Copilot', value: 'copilot' },
        { name: 'Claude Code', value: 'claude' },
        { name: 'Ambos', value: 'ambos' },
      ],
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: (answers) => {
        console.log('');
        console.log(chalk.bold.white('📋 Resumo da instalação:'));
        console.log(chalk.gray(`  Projeto: `) + chalk.white(answers.projectName));
        console.log(chalk.gray(`  Tipo: `) + chalk.white(answers.projectType));
        console.log(chalk.gray(`  Stack: `) + chalk.white(`${answers.backend} + ${answers.frontend} + ${answers.database}`));
        console.log(chalk.gray(`  IDE: `) + chalk.white(answers.ide));
        console.log('');
        return 'Confirmar instalação?';
      },
      default: true,
    },
  ]);

  return answers;
}

/**
 * Ponto de entrada principal do installer
 */
async function run(targetDir = process.cwd()) {
  printBanner();

  // Verificar se já foi instalado
  const configPath = path.join(targetDir, '.aios-lite/config.yaml');
  if (fs.existsSync(configPath)) {
    console.log(chalk.yellow('⚠️  AIOS Lite já está instalado neste projeto.'));
    const { overwrite } = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: 'Reinstalar / atualizar configurações?',
      default: false,
    }]);
    if (!overwrite) {
      console.log(chalk.gray('Instalação cancelada.'));
      return;
    }
  }

  const config = await collectConfig(targetDir);

  if (!config.confirm) {
    console.log(chalk.gray('\nInstalação cancelada.\n'));
    return;
  }

  console.log('');
  console.log(chalk.cyan('⚙️  Gerando arquivos...'));

  try {
    const generatedFiles = await generateFiles(targetDir, config);
    printSuccess(generatedFiles);
    printNextSteps(config);
  } catch (error) {
    console.error(chalk.red('\n❌ Erro durante a instalação:'), error.message);
    process.exit(1);
  }
}

module.exports = { run };
