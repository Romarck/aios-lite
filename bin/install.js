#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra');
const { run } = require(path.join(__dirname, '..', 'src', 'installer'));
const { generateFiles } = require(path.join(__dirname, '..', 'src', 'generator'));

// O diretório alvo é o diretório atual de quem executou o comando
const targetDir = process.argv[2] || process.cwd();

// Verificar se há argumentos para modo não-interativo
const args = process.argv.slice(3);
const isNonInteractive = args.includes('--non-interactive') || args.includes('-y');

async function main() {
  try {
    if (isNonInteractive) {
      // Modo não-interativo: use configuração padrão
      const defaultConfig = {
        projectName: path.basename(targetDir),
        projectType: 'greenfield',
        backend: 'Node.js/Express',
        frontend: 'React/Next.js',
        database: 'SQLite',
        ide: 'claude',
        confirm: true,
      };

      // Tentar carregar configuração customizada se existir
      const customConfigPath = path.join(targetDir, '.aios-lite-install.json');
      let finalConfig = defaultConfig;

      if (fs.existsSync(customConfigPath)) {
        try {
          const customConfig = await fs.readJson(customConfigPath);
          finalConfig = { ...defaultConfig, ...customConfig };
        } catch (err) {
          console.warn('Aviso: não foi possível ler .aios-lite-install.json');
        }
      }

      await generateFiles(targetDir, finalConfig);

      console.log('\n✅ AIOS Lite instalado com sucesso!\n');
      console.log('Para começar, execute:\n');
      console.log('  cd ' + targetDir);
      console.log('  claude');
      console.log('\nDepois no Claude Code, digite: @product *brainstorm\n');
    } else {
      // Modo interativo
      await run(targetDir);
    }
  } catch (err) {
    console.error('Erro fatal:', err.message);
    process.exit(1);
  }
}

main();
