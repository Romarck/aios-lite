#!/usr/bin/env node
'use strict';

const path = require('path');
const { run } = require(path.join(__dirname, '..', 'src', 'installer'));

// O diretório alvo é o diretório atual de quem executou o comando
const targetDir = process.argv[2] || process.cwd();

run(targetDir).catch((err) => {
  console.error('Erro fatal:', err.message);
  process.exit(1);
});
