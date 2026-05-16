# GTM + GA4 Setup — Auto-Administrable desde Payload

## 🎯 Overview

Sistema de tracking completamente auto-administrable para Google Tag Manager (GTM) + Google Analytics 4 (GA4), sin necesidad de redeploy.

**Stack:**
- ✅ Google Tag Manager (GTM) — contenedor de tags
- ✅ Google Analytics 4 (GA4) — measurement ID
- ✅ Meta Pixel — conversiones y tracking
- ✅ Hotjar — heatmaps y recordings
- ✅ Payload CMS — administración de IDs
- ✅ SEO Integration — metadatos de página → GTM events

---

## 📋 Configuración Inicial

### 1. Crear/obtener Google Tag Manager

1. Ve a https://tagmanager.google.com
2. Crea un contenedor (Container) para "Web"
3. Copia el **Container ID** (formato: `GTM-XXXXXXX`)
4. Guarda este ID en Payload CMS (ver sección "Admin UI")

**Alternativa:** Si usas GA4 directo sin GTM:
- Ve a Google Analytics 4
- Busca **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 2. Crear Google Analytics 4 Property

1. Ve a https://analytics.google.com
2. Crea un "Account" y "Property"
3. Copia el **Measurement ID** (G-XXXXXXXXXX)
4. Guarda en Payload CMS

**Relación GTM ↔ GA4:**
- GTM es el contenedor (administra múltiples tags)
- GA4 es el tag (uno de muchos posibles dentro de GTM)
- Si tienes GTM, GA4 dentro se configura en el contenedor
- Si NO tienes GTM, carga GA4 directamente

### 3. Crear Meta Pixel (opcional)

1. Ve a https://business.facebook.com/pixels
2. Crea un Pixel para tu sitio
3. Copia el **Pixel ID** (número de 15 dígitos)
4. Guarda en Payload CMS

### 4. Crear Hotjar (opcional)

1. Ve a https://hotjar.com/sign-up
2. Crea un sitio
3. Copia el **Site ID** (número)
4. Guarda en Payload CMS

---

## 🛠️ Admin UI — Cambiar IDs en Payload

**URL:** `https://tu-sitio.com/admin/collections/settings`

El documento "Configuración" tiene estas secciones:

### Google Analytics + Tag Manager
```
GTM ID:        [campo vacío] ← GTM-XXXXXXX (si tienes GTM)
GA4 ID:        [campo vacío] ← G-XXXXXXXXXX (si solo usas GA4)
```

### Tracking Adicional
```
Meta Pixel ID:     [campo vacío] ← 123456789012345
Hotjar Site ID:    [campo vacío] ← 1234567
```

### Consentimiento & GDPR
```
✓ Mostrar banner
Texto del banner
Días válido: 365
```

### SEO & Tracking Integration
```
✓ Rastrear eventos de página
✓ Rastrear scroll (25%, 50%, 75%, 100%)
✓ Rastrear links externos
✓ Rastrear formularios
```

**Cambios:** Se aplican automáticamente en el sitio (sin redeploy). ✨

---

## 📊 Cómo Funciona

### Flujo de Datos

```
1. Usuario carga página
                ↓
2. Analytics component fetcha /api/settings
                ↓
3. Payload retorna IDs de tracking (GTM, GA4, Meta, Hotjar)
                ↓
4. Scripts se inyectan dinámicamente
                ↓
5. TrackingProvider ejecuta:
   - trackPageMetadata() → envía datos SEO a GTM
   - initScrollTracking() → monitores 25/50/75/100%
                ↓
6. Usuario interactúa (click, form, scroll)
                ↓
7. GTM captura eventos y los enruta:
   - GA4 (si está configurado)
   - Meta Pixel
   - Otros tags en el contenedor
```

### Archivos Principales

| Archivo | Propósito |
|---------|-----------|
| `src/collections/Settings.ts` | Colección Payload para almacenar IDs |
| `src/app/api/settings/route.ts` | API endpoint que retorna configuración |
| `src/components/Analytics.tsx` | Script que inyecta GTM/GA4/Meta/Hotjar |
| `src/components/TrackingProvider.tsx` | Hook que dispara tracking automático |
| `src/lib/tracking.ts` | Utilidades: `track()`, `trackPageMetadata()`, `initScrollTracking()` |
| `src/hooks/usePageTracking.ts` | Hook para ejecutar tracking en cualquier página |

---

## 🎯 Eventos Automáticos

### Page Metadata (SEO Integration)
Cada página envía automáticamente a GTM:
```javascript
{
  event: "page_metadata",
  page_title: "Nosotros | Pueblo La Dehesa",
  page_description: "La historia detrás de Pueblo...",
  page_canonical: "/nosotros",
  page_og_image: "https://...",
  page_locale: "es_CL"
}
```

**Usa en GTM** para:
- Segmentar por sección del sitio
- Validar metadatos en tiempo real
- Comparar tráfico por canonical URL

### Scroll Depth
```javascript
{
  event: "scroll_depth",
  depth_percent: 25 | 50 | 75 | 100
}
```

**Usa en GA4** para:
- Entender engagement por página
- Identificar drop-off points
- Medir lectura de artículos

### External Links
```javascript
{
  event: "click_external_link",
  external_url: "https://booking.example.com",
  link_label: "Reservar ahora"
}
```

### Form Submissions
```javascript
{
  event: "form_submit_contacto",
  // datos del formulario
}
```

---

## 🔧 Usar Tracking en Tu Código

### Trackear un evento custom
```typescript
import { track } from '@/lib/tracking';

track('click_reserva', {
  house: 'casa-parque',
  origin: 'hero-section'
});
```

### Trackear scroll depth
```typescript
import { usePageTracking } from '@/hooks/usePageTracking';

export default function MyPage() {
  usePageTracking({ enableScroll: true });
  
  return <div>...</div>;
}
```

### Trackear form submission
```typescript
import { trackFormSubmission } from '@/lib/tracking';

function handleSubmit(data) {
  // enviar form...
  trackFormSubmission('contacto', {
    email: data.email,
    subject: data.subject
  });
}
```

### Trackear link externo
```typescript
import { trackExternalLink } from '@/lib/tracking';

<a 
  href="https://booking.example.com"
  onClick={() => trackExternalLink('https://booking.example.com', 'Booking')}
>
  Reservar
</a>
```

---

## 🔐 Consentimiento (Consent Mode v2)

El sistema implementa **Google Consent Mode v2**:

1. Por defecto, todo es `denied` (privacidad-first)
2. Cuando el usuario acepta el banner → `analytics_storage` se actualiza a `granted`
3. GTM respeta la preferencia del usuario

**En Payload** puedes configurar:
- ✓ Mostrar/ocultar banner
- ✓ Texto del banner
- ✓ Días de validez del consentimiento

---

## 📈 Verificar Que Funciona

### En GTM
1. Ve a https://tagmanager.google.com
2. Abre tu contenedor
3. Click "Preview" → Paste tu sitio URL
4. Abre el sitio en otra pestaña
5. Deberías ver eventos en tiempo real en el panel de Debug

### En GA4
1. Ve a Google Analytics 4
2. Realtime → Events
3. Navega por el sitio
4. Deberías ver eventos como:
   - `page_view`
   - `page_metadata`
   - `scroll_depth`
   - Eventos custom que disparaste

### En Browser Console
```javascript
// Ver dataLayer (eventos que se han enviado a GTM)
console.log(window.dataLayer);

// Manualmente push un evento para test
window.dataLayer.push({
  event: 'test_event',
  test: 'data'
});
```

---

## ❓ FAQ

### ¿Qué pasa si no tengo GTM?
→ El sistema carga GA4 directamente. Meta Pixel sigue funcionando.

### ¿Los cambios en Payload se aplican al instante?
→ Casi sí. El Analytics component fetcha `/api/settings` que está cacheado 1 hora. Puedes:
- Esperar 1 hora
- Hacer hard refresh del navegador (Ctrl+Shift+R)
- O purgar la cache manualmente en Cloud Run

### ¿Se registra si JavaScript está deshabilitado?
→ No. El sistema requiere JS para inyectar scripts. Para usuarios sin JS:
- GTM tiene un noscript fallback (opcional)
- Considera Google Analytics con Google Tag Manager noscript

### ¿Puedo rastrear sin mostrar banner de cookies?
→ Sí, pero deberías tener consentimiento previo o ser EU y cumplir GDPR. Configura `enableConsentBanner: false` en Payload.

### ¿Qué datos se envían a GTM?
→ Solo: event name + parámetros custom (title, description, URL, scroll %). No se envía contenido privado.

---

## 🚀 Próximos Pasos Recomendados

1. **Crear GTM Container** → obtener Container ID
2. **Crear GA4 Property** → obtener Measurement ID
3. **Loguear en Payload CMS** → `/admin/collections/settings`
4. **Llenar IDs** en el formulario de Configuración
5. **Verificar en GTM Preview** que eventos llegan
6. **Crear Triggers y Tags** en GTM para acciones específicas (reservas, contacto, etc.)

---

## 📚 Recursos

- [Google Tag Manager Docs](https://support.google.com/tagmanager/)
- [Google Analytics 4 Setup](https://support.google.com/analytics/answer/9306384)
- [Consent Mode v2](https://developers.google.com/tag-platform/gtagjs/reference/consent)
- [Meta Pixel Setup](https://www.facebook.com/business/help/742478679120153)
- [Hotjar Integration](https://help.hotjar.com/hc/en-us/articles/115011640727)

---

**Última actualización:** 2026-05-16  
**Version:** 1.0 — Auto-administrable desde Payload
