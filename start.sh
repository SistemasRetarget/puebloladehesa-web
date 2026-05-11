#!/bin/sh
# Script de inicio para Cloud Run

export PORT=${PORT:-8080}

echo "🚀 Iniciando Pueblo La Dehesa Web..."
echo "📊 DATABASE_URL: ${DATABASE_URL}"
echo "🔑 PAYLOAD_SECRET: ${PAYLOAD_SECRET:+SET}"

# Crear/actualizar schema PostgreSQL antes de que Next.js arranque.
# pushDevSchema solo corre cuando NODE_ENV != production — se setea aquí
# explícitamente antes de que next start lo fuerce a production.
echo "⚙️  Inicializando schema PostgreSQL..."
NODE_ENV=development NODE_OPTIONS="--no-deprecation --require /app/scripts/patch-globals.cjs" node_modules/.bin/payload migrate:create --name initial 2>&1 || true
NODE_ENV=development NODE_OPTIONS="--no-deprecation --require /app/scripts/patch-globals.cjs" node_modules/.bin/payload migrate 2>&1 || true
echo "✅ Schema listo"

echo "🌐 Iniciando servidor Next.js en puerto ${PORT}..."
exec npm start -- -p ${PORT}
