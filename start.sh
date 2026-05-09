#!/bin/sh
# Script de inicio para Cloud Run

export NODE_ENV=production
export PORT=${PORT:-8080}

echo "🚀 Iniciando Pueblo La Dehesa Web..."
echo "📊 DATABASE_URL: ${DATABASE_URL}"
echo "🔑 PAYLOAD_SECRET: ${PAYLOAD_SECRET:+SET}"

# Aplicar migraciones para crear tablas en la DB (idempotente)
echo "⚙️  Aplicando migraciones Payload..."
npm run payload migrate:run 2>&1 || echo "⚠️  migrate:run falló o no hay migraciones — continuando"

echo "🌐 Iniciando servidor Next.js en puerto ${PORT}..."
exec npm start -- -p ${PORT}
