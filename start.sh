#!/bin/sh
# Script de inicio para Cloud Run

export PORT=${PORT:-8080}

echo "🚀 Iniciando Pueblo La Dehesa Web..."
echo "📊 DATABASE_URL: ${DATABASE_URL}"
echo "🔑 PAYLOAD_SECRET: ${PAYLOAD_SECRET:+SET}"

# Schema sync: con push: true en payload.config drizzle sincroniza el schema
# automáticamente al arrancar Next.js. No se necesita migrate:create aquí.
echo "⚙️  Schema sync gestionado por payload push: true"

echo "🌐 Iniciando servidor Next.js en puerto ${PORT}..."
exec npm start -- -p ${PORT}
