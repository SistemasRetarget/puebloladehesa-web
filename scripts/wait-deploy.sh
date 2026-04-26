#!/usr/bin/env bash
# Monitor de deploy Railway con signal file.
# Uso:   scripts/wait-deploy.sh [marker_url] [expected_sha] [max_seconds]
# Salida: escribe estado a .qa/deploy-status.json cada 10s y al terminar.
#
# Estados posibles en deploy-status.json:
#   {"state":"waiting", "elapsed":N, "last_check":"..."}
#   {"state":"ready",   "elapsed":N, "sha":"...", "ts":"..."}
#   {"state":"timeout", "elapsed":N}
#
# Cascade puede leer este archivo en cualquier momento sin bloquear.

set -e
MARKER="${1:-https://puebloladehesa-web-production.up.railway.app/legal/terminos-y-condiciones}"
EXPECTED_SHA="${2:-$(git rev-parse --short HEAD 2>/dev/null || echo '')}"
MAX="${3:-300}"
OUT="$(dirname "$0")/../.qa/deploy-status.json"
mkdir -p "$(dirname "$OUT")"

START=$(date +%s)
while true; do
  NOW=$(date +%s)
  ELAPSED=$((NOW - START))

  if [ "$ELAPSED" -ge "$MAX" ]; then
    echo "{\"state\":\"timeout\",\"elapsed\":$ELAPSED,\"marker\":\"$MARKER\"}" > "$OUT"
    exit 1
  fi

  CODE=$(/usr/bin/curl -sS -o /dev/null -w "%{http_code}" -m 8 "$MARKER?v=$NOW" || echo "000")

  if [ "$CODE" = "200" ]; then
    echo "{\"state\":\"ready\",\"elapsed\":$ELAPSED,\"sha\":\"$EXPECTED_SHA\",\"marker\":\"$MARKER\",\"ts\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}" > "$OUT"
    exit 0
  fi

  echo "{\"state\":\"waiting\",\"elapsed\":$ELAPSED,\"http\":$CODE,\"marker\":\"$MARKER\"}" > "$OUT"
  sleep 10
done
