#!/bin/sh
# Script de inicio para Cloud Run

export NODE_ENV=production
export PORT=${PORT:-8080}

echo "🚀 Iniciando Pueblo La Dehesa Web..."
echo "📊 DATABASE_URL: ${DATABASE_URL}"
echo "🔑 PAYLOAD_SECRET: ${PAYLOAD_SECRET:+SET}"
echo "🌐 Iniciando servidor Next.js en puerto ${PORT}..."

exec npm start -- -p ${PORT}
