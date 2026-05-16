# Setup Landing /Nosotros — Estado Actual (2026-05-16)

## ✅ Completado

### 1. Página Next.js
- ✅ Archivo: `src/app/(frontend)/(es)/nosotros/page.tsx`
- ✅ Estructura: BuilderPage + fallback HTML
- ✅ Metadata: SEO completo (title, description, OG tags)
- ✅ Revalidation: `revalidate = 3600` (1h)
- ✅ Build: Prerendered como static content
- ✅ Ruta: `○ /nosotros` (1.2 kB) 

### 2. Scripts de Seed
- ✅ `scripts/seed-builder-nosotros.py` — crea modelo + 9 secciones en Builder.io
- ✅ `scripts/seed-payload-nosotros.py` — crea entry en Payload Pages
- ✅ `scripts/SEED_NOSOTROS_README.md` — documentación paso a paso
- ✅ Commits pushed: `bcf9f8c`

### 3. Git Status
```
On branch main
Your branch is up to date with 'origin/main'.
```

## ⏳ Próximos pasos (requieren acción manual)

### Paso 1: Crear modelo en Builder.io

Builder.io no permite crear modelos vía API pública. **Debe hacerse manualmente en la UI:**

1. Ve a https://builder.io/models
2. Click "Create model" → Builder.io abrirá un dialog
3. Datos:
   - **Name**: `pueblo-nosotros`
   - **Kind**: `page`
   - **Preview URL**: `https://puebloladehesa-web-635392253567.europe-west1.run.app/nosotros`
4. Click "Create"

**Tiempo**: ~2 minutos

### Paso 2: Ejecutar seed de Builder.io

Carga el contenido (9 secciones predefinidas) en el modelo:

```bash
cd /Users/spam11/Desktop/RETARGET-WORKSPACE/PROJECTS/puebloladehesa/puebloladehesa-rediseno
python3 scripts/seed-builder-nosotros.py
```

Output esperado:
```
ℹ️  Modelo ya existe
✅ Contenido pueblo-nosotros creado en Builder.io (id=abc123xyz...)
   Próximo paso: python3 seed-payload-nosotros.py <password_admin>
```

**Nota**: El content ID se guarda en `/tmp/pueblo_nosotros_content_id.txt` para que lo use el siguiente seed.

**Tiempo**: ~1 minuto

### Paso 3: Ejecutar seed de Payload

Crea la entrada en el CMS:

```bash
python3 scripts/seed-payload-nosotros.py "PASSWORD_AQUI"
```

(Reemplaza `PASSWORD_AQUI` con la contraseña del usuario `sistemas@retarget.cl`)

Output esperado:
```
✅ Auth OK (user: sistemas@retarget.cl)
✅ Nosotros creado (id=xyz...)
```

**Tiempo**: ~30 segundos

## 📊 Contenido que se carga (en el seed de Builder.io)

### 9 secciones predefinidas:

1. **Hero**
   - Imagen de fondo: foto de Pueblo La Dehesa
   - Título: "La historia detrás de Pueblo"
   - Subtítulo: "Inspirados en la vida de pueblo, la naturaleza y la calma."

2. **Pregunta Manifiesto**
   - Título: "¿Y si bajar el ritmo no implicara irse de la ciudad?"
   - Párrafo: contexto sobre la vida actual y la idea de Pueblo

3. **Quote Arquitecto** (fondo crema)
   - Cita: "Propusimos una arquitectura elevada..."
   - Atribución: Martin Lira — arquitecto

4. **Volver a lo Esencial** (grid 2 columnas)
   - Imagen: foto de inmersión en naturaleza
   - Texto: descripción con 3 bullet points

5. **Quote Paisajista** (fondo crema)
   - Cita: "Elegimos especies nativas y flores..."
   - Atribución: Inés Couve — paisajista

6. **Nuestra Inspiración** (4 columnas)
   - 4 pilares: vida de pueblo, naturaleza, ritmo, diseño
   - Cada uno con título + descripción

7. **Quote Interiores** (fondo crema)
   - Cita: "Pensamos interiores cálidos..."
   - Atribución: Juan Ignacio Court

8. **Quote Maureen** (fondo crema)
   - Cita: "Acompañamos cada estadía..."
   - Atribución: Maureen Morrison — Experiencia Pueblo

9. **CTA Final** (fondo oscuro)
   - Título: "Vive la experiencia Pueblo"
   - Descripción
   - 2 botones: "Reservar Ahora" + "Contáctanos"

## 🔗 Flujo completo después de los 3 pasos

1. **Admin de Payload** (`/admin/collections/pages`)
   - Aparecerá entrada "Nosotros"
   - Route: `/nosotros`
   - builderContentId: `abc123xyz...` (del seed)
   - Botón naranja "Editar landing visualmente" abrirá Builder.io

2. **Sitio en vivo** (`/nosotros`)
   - BuilderPage fetchea contenido de Builder.io
   - Si existe: renderiza las 9 secciones
   - Si no existe: cae al fallback HTML (ya existe como backup)

3. **Builder.io** (`https://builder.io/content?model=pueblo-nosotros`)
   - Editor visual con las 9 secciones
   - Cambios se guardan automáticamente
   - El sitio se actualiza en ~1 segundo (gracias a revalidation)

## 🛠️ Debugging

### "Modelo no existe en Builder.io"
→ Ejecuta Paso 1 manualmente en la UI

### "HTTP 401: Unauthorized"
→ Password incorrecto. Verifica credenciales de `sistemas@retarget.cl`

### "Content ID no se guardó"
→ El seed de Payload correrá sin builderContentId. Puedes llenarla manualmente en el admin después.

### "BuilderPage renderiza fallback"
→ Probablemente BuilderPage no pudo fetchear contenido de Builder.io. Verifica:
- builderContentId está en Payload
- El modelo existe en Builder.io
- Hay al menos un bloque de contenido

## 📝 Notas

- El protocolo (Builder.io + Payload + Next.js) está documentado en `memory/protocol_home_builder_payload.md`
- La página fallback HTML tiene el contenido completo, así que funciona "out of the box"
- Los estilos usan design tokens del sitio (Cormorant Garamond, naranja #D7632C, crema #F5F1EA)
- Responsive: mobile (360px), tablet (768px), desktop (1280px+)

## 🚀 Después de completar

- El landing estará 100% editable desde Builder.io
- El admin de Payload tendrá botón directo "Editar landing visualmente"
- Los cambios en Builder.io se reflejan en el sitio en ~1 segundo
