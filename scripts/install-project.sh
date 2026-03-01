#!/bin/bash
# AIOS Lite — Script de instalação simplificado
# Uso: ./scripts/install-project.sh [project-path] [--custom]

set -e

PROJECT_PATH="${1:-.}"
CUSTOM_CONFIG="${2:---non-interactive}"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
AIOS_LITE_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║       AIOS Lite — Project Setup v1.0.0       ║"
echo "║   Framework de desenvolvimento guiado por IA ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# Verificar pré-requisitos
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+."
    exit 1
fi

echo "✓ Node.js $(node --version)"
echo ""

# Criar diretório do projeto se não existir
if [ ! -d "$PROJECT_PATH" ]; then
    echo "📁 Criando diretório: $PROJECT_PATH"
    mkdir -p "$PROJECT_PATH"
fi

cd "$PROJECT_PATH"
PROJECT_NAME=$(basename "$(pwd)")

echo "📍 Instalando AIOS Lite em: $PROJECT_PATH"
echo "📦 Nome do projeto: $PROJECT_NAME"
echo ""

# Verificar se já está instalado
if [ -f ".aios-lite/config.yaml" ]; then
    echo "⚠️  AIOS Lite já está instalado neste projeto."
    read -p "Deseja reinstalar? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Instalação cancelada."
        exit 0
    fi
fi

# Se --custom foi passado, pedir para copiar arquivo de config
if [ "$CUSTOM_CONFIG" = "--custom" ]; then
    echo "📋 Configuração customizada detectada"
    if [ ! -f ".aios-lite-install.json" ]; then
        echo "Copiando template de configuração..."
        cp "$AIOS_LITE_DIR/.aios-lite-install.example.json" .aios-lite-install.json
        echo "✓ Arquivo .aios-lite-install.json criado"
        echo ""
        echo "Edite .aios-lite-install.json com suas preferências e execute novamente."
        exit 0
    fi
fi

# Executar instalador
echo "⚙️  Instalando AIOS Lite..."
node "$AIOS_LITE_DIR/bin/install.js" "$(pwd)" $CUSTOM_CONFIG

echo ""
echo "✅ Configuração completa!"
echo ""
echo "📚 Próximas etapas:"
echo "   1. cd $(pwd)"
echo "   2. claude"
echo "   3. @product *brainstorm"
echo ""
