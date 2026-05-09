#!/bin/sh
# Script de inicio para Cloud Run

# Usar NODE_ENV=production para que payload push:true funcione
export NODE_ENV=production

# Iniciar servidor - Payload creará tablas automáticamente con push:true
exec npm start -- -p ${PORT:-8080}
