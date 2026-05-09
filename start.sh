#!/bin/sh
# Script de inicio para Cloud Run

export NODE_ENV=production
export PORT=${PORT:-8080}

echo "🚀 Iniciando Pueblo La Dehesa Web..."
echo "📊 DATABASE_URL: ${DATABASE_URL}"
echo "🔑 PAYLOAD_SECRET: ${PAYLOAD_SECRET:+SET}"

# Crear tablas SQLite con better-sqlite3 (idempotente, sin CLI de Payload)
echo "⚙️  Inicializando tablas en base de datos..."
node /app/scripts/init-db.mjs

echo "🌐 Iniciando servidor Next.js en puerto ${PORT}..."
exec npm start -- -p ${PORT}
