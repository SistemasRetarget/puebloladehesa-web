FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema para SQLite
RUN apk add --no-cache python3 make g++

# Copiar package.json
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para build)
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . .

# Crear directorio para datos persistentes
RUN mkdir -p /app/data

# Build
RUN npm run build

# Exponer puerto (Railway usa PORT env variable)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start con PORT dinámico
CMD ["sh", "-c", "npm start -- -p ${PORT:-3000}"]
