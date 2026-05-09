#!/bin/sh
# Script de inicio para Cloud Run - inicializa DB y arranca servidor

echo "🚀 Iniciando Pueblo La Dehesa Web..."

# Verificar/crear directorio para base de datos
mkdir -p /tmp

# Inicializar base de datos con payload (crea tablas si no existen)
echo "📊 Inicializando base de datos..."
npx payload migrate:create || true
npx payload migrate || true

# Iniciar servidor Next.js
echo "🌐 Iniciando servidor..."
exec npm start -- -p ${PORT:-8080}
