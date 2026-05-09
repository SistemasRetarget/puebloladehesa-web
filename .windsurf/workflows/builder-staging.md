---
description: Integrate Builder.io or any new feature in a staging branch with its own Cloud Run service
---

## Stack de referencia
- Next.js 15 + Payload CMS v3 + SQLite (better-sqlite3)
- Cloud Run (europe-west1) + Cloud Build + Artifact Registry
- Proyecto GCP: pueblo-494618

---

## 1. Crear la rama de feature

```bash
git checkout main
git pull origin main
git checkout -b feature/builder-integration
```

## 2. Crear el cloudbuild-staging.yaml

Copia `cloudbuild.yaml` y renómbralo `cloudbuild-staging.yaml`. Cambia:
- El nombre del servicio: `puebloladehesa-web-staging`
- El tag de imagen: agrega `-staging` al path

```yaml
# En el paso de deploy:
- 'deploy'
- 'puebloladehesa-web-staging'   # ← servicio separado
```

## 3. Crear el trigger de staging en Cloud Build

En Google Cloud Console → Cloud Build → Activadores → Crear activador:
- **Nombre:** `puebloladehesa-web-staging`
- **Evento:** Push a una rama
- **Rama:** `^feature/.*$` (regex — cualquier rama feature/)
- **Archivo de configuración:** `cloudbuild-staging.yaml`
- **Variables de sustitución:** mismas que el trigger de producción + `_PAYLOAD_SECRET`

## 4. Hacer push de la rama

```bash
git push origin feature/builder-integration
```

El trigger de staging se dispara automáticamente y despliega en:
`https://puebloladehesa-web-staging-[hash].europe-west1.run.app`

## 5. Verificar en staging

```bash
gcloud run services list --project=pueblo-494618 --region=europe-west1
```

## 6. Merge a producción cuando esté listo

```bash
git checkout main
git merge feature/builder-integration
git push origin main
```

El trigger de producción se dispara y despliega en el servicio principal.

---

## Notas importantes

- **Base de datos:** Staging usa su propia `/tmp/cms.db` — los datos no se comparten con producción
- **Builder.io API Key:** La misma key funciona en ambos entornos (es pública `NEXT_PUBLIC_`)
- **`init-db.mjs`:** Ya incluido en el repo — crea tablas automáticamente en ambos entornos
- **Costo staging:** Con `--min-instances=0` el servicio de staging no cobra cuando no hay tráfico
