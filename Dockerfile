FROM node:20.18-slim

WORKDIR /app

# Argumentos para build (recibidos de Railway/Cloud Run)
ARG PAYLOAD_SECRET
ARG DATABASE_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_BUILDER_API_KEY

# Variables de entorno para el build
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET:-dev-only-secret-change-me}
ENV DATABASE_URL=${DATABASE_URL:-postgresql://localhost/puebloladehesa_dev}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}
ENV NEXT_PUBLIC_BUILDER_API_KEY=${NEXT_PUBLIC_BUILDER_API_KEY}

# Instalar dependencias del sistema para módulos nativos (isolated-vm)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copiar package.json
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para build)
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copiar código fuente
COPY . .

# Crear directorio para media uploads
RUN mkdir -p /app/public/media

# Copiar y hacer ejecutable el script de inicio
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Build (con NODE_ENV=production para optimización)
ENV NODE_ENV=production
RUN npm run build

# Exponer puerto (Railway usa PORT env variable)
# Cloud Run requiere puerto 8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (r) => {if (r.statusCode >= 500) throw new Error(r.statusCode)})"

# Start server (inicializa DB primero)
CMD ["/app/start.sh"]
