# Seed del landing Nosotros

Este documento explica cómo crear el landing `/nosotros` siguiendo el protocolo Builder.io + Payload + Next.js.

## Estado actual (2026-05-16)

✅ **Página Next.js**: `src/app/(frontend)/(es)/nosotros/page.tsx` ya existe con fallback HTML
✅ **Scripts de seed**: Listos en `scripts/seed-builder-nosotros.py` y `scripts/seed-payload-nosotros.py`

## Pasos para completar

### Paso 1: Crear modelo en Builder.io (manual)

La creación de modelos vía API no está soportada públicamente. Debes crear el modelo manualmente:

1. Ve a https://builder.io/content?model=pueblo-nosotros
2. Builder.io te ofrecerá crear el modelo automáticamente (o ve a https://builder.io/models)
3. Crea modelo con estos valores:
   - **Name**: `pueblo-nosotros`
   - **Kind**: `page`
   - **Preview URL**: `https://puebloladehesa-web-635392253567.europe-west1.run.app/nosotros`

Una vez creado, el modelo estará vacío (sin contenido). Puedes:
- **Opción A**: Usar el visual editor de Builder.io para crear las secciones
- **Opción B**: Ejecutar el script `seed-builder-nosotros.py` para cargar contenido base (vea abajo)

### Paso 2: Ejecutar seed de Builder.io (opcional si vas con Opción B)

```bash
cd /Users/spam11/Desktop/RETARGET-WORKSPACE/PROJECTS/puebloladehesa/puebloladehesa-rediseno
python3 scripts/seed-builder-nosotros.py
```

Este script:
- Crea el modelo si no existe
- Carga 9 secciones predefinidas (hero, pregunta, quotes, inspiración, CTA)
- Guarda el content ID en `/tmp/pueblo_nosotros_content_id.txt`

Output esperado:
```
✅ Modelo creado: pueblo-nosotros
✅ Contenido pueblo-nosotros creado en Builder.io (id=abc123...)
   Próximo paso: python3 seed-payload-nosotros.py <password_admin>
```

### Paso 3: Crear entrada en Payload

```bash
python3 scripts/seed-payload-nosotros.py <password_admin>
```

Este script:
- Autentica con el usuario `sistemas@retarget.cl`
- Crea o actualiza la entrada "Nosotros" en la colección Pages
- Vincula el `builderContentId` (si se ejecutó el seed de Builder.io)

Output esperado:
```
✅ Auth OK (user: sistemas@retarget.cl)
✅ Nosotros creado (id=xyz...)
```

## Resultado final

Una vez completados los pasos:

1. **En el admin de Payload** (`/admin/collections/pages`): aparece entrada "Nosotros" con route `/nosotros` y link a Builder.io
2. **En el sitio** (`https://puebloladehesa-web-635392253567.europe-west1.run.app/nosotros`): 
   - Si el contenido de Builder.io está disponible → renderiza secciones del Builder.io
   - Si no → cae al fallback HTML (ya existe)
3. **En Builder.io** (`https://builder.io/content?model=pueblo-nosotros`): el editor visual muestra las secciones

## Estructura de secciones (seed de Builder.io)

El seed `seed-builder-nosotros.py` crea estas 9 secciones:

1. **Hero** — Título "La historia detrás de Pueblo" con imagen de fondo
2. **Pregunta Manifiesto** — "¿Y si bajar el ritmo...?"
3. **Quote Arquitecto** — Cita de Martín Lira
4. **Volver a lo Esencial** — Imagen + texto
5. **Quote Paisajista** — Cita de Inés Couve
6. **Nuestra Inspiración** — 4 pilares (vida de pueblo, naturaleza, ritmo, diseño)
7. **Quote Interiores** — Cita de Juan Ignacio Court
8. **Quote Maureen** — Cita de Maureen Morrison
9. **CTA Final** — "Vive la experiencia Pueblo" + botones de reserva y contacto

Cada sección usa:
- Typography: Cormorant Garamond (serif) para títulos
- Colores: #D7632C (naranja Retarget), #1a1a1a (oscuro), #F5F1EA (crema)
- Responsive: Media queries para mobile (styles_sm), tablet (styles_md), desktop (styles_lg)

## Troubleshooting

### Error 401 en Payload
```
urllib.error.HTTPError: HTTP Error 401: Unauthorized
```
→ Password incorrecto o usuario no existe. Verifica credenciales.

### Error 404 en Builder.io
```
"Model not found"
```
→ El modelo `pueblo-nosotros` no existe en Builder.io. Créalo manualmente primero (Paso 1).

### Content ID no se guarda
Si `seed-builder-nosotros.py` falla al guardar el content ID en `/tmp/pueblo_nosotros_content_id.txt`:
1. El script fallará al leer el ID
2. El seed de Payload correrá con `builderContentId: null`
3. Puedes editar la página en Payload después y llenar el `builderContentId` manualmente

## Referencias

- Protocolo completo: `memory/protocol_home_builder_payload.md`
- Página Next.js: `src/app/(frontend)/(es)/nosotros/page.tsx`
- Colección Payload: `src/collections/Pages.ts`
- PageActions banner: `src/components/admin/PageActions.tsx`
