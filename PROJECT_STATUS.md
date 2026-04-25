# 📊 Pueblo La Dehesa - Estado del Proyecto

> Archivo compartido entre desarrolladores (Cascade/Windsurf y Claude/Opus).
> Actualizado automáticamente tras cada ronda de cambios.

---

## 🎯 Sección en desarrollo: **Hero Banner**

**Asignado:** Cascade (Windsurf)
**Última actualización:** 2026-04-25 01:07 UTC-04
**Commit actual:** `ad5b7fb`
**Deploy:** ✅ Live → https://puebloladehesa-web-production.up.railway.app

---

## ✅ Validación por sección

| Sección | Estado | Notas |
|---|---|---|
| **Header / Nav** | ⏸️ Pendiente | Logo y navegación pendientes de revisar |
| **Hero Banner** | 🔄 En revisión | Ver detalles abajo |
| **Intro paragraph** | ⏸️ Pendiente | - |
| **Casas (grid)** | ⏸️ Pendiente | - |
| **Testimonios** | ⏸️ Pendiente | - |
| **FAQ** | ⏸️ Pendiente | - |
| **Footer** | ⏸️ Pendiente | - |

---

## 🔍 Hero Banner — Validación detallada

### Cambios aplicados (Ronda 1)
- [x] Altura: `h-[85vh]` → `h-[90vh]`
- [x] Min-height: `min-h-[500px]` → `min-h-[600px]`
- [x] Gradiente: `bg-black/30` → `bg-gradient-to-b from-black/20 via-black/10 to-black/40`
- [x] Alineación: `justify-center` → `justify-end`
- [x] Padding inferior: `pb-24 lg:pb-32`

### Pendientes de feedback del MCP
- [ ] **Imagen de fondo** — URL actual `https://puebloladehesa.cl/cdn/shop/files/baner.webp` parece servir imagen incorrecta (arquitectura en lugar de paisaje natural). Esperando URL correcta del MCP.
- [ ] **Logo en header** — En la referencia el logo está centrado arriba, en deploy actual aparece en esquina izquierda y no carga (broken image).

### Validaciones automáticas (MCP)
- [ ] `screenshot` capturado del deploy
- [ ] `visual-diff` ejecutado contra `design-baseline-desktop/reference.png`
- [ ] Issues identificados con recursos para resolverlos

---

## 📋 Próxima acción

Esperando que el MCP `quality-gate` provea:
1. URL correcta de la imagen del hero (paisaje natural de La Dehesa)
2. Posición correcta del logo en el header
3. Confirmación de cambios ya aplicados (altura, gradiente, alineación)

---

## 📜 Log de rondas

### Ronda 1 — 2026-04-25 01:01
- **Commit:** `ad5b7fb` — fix: Align hero banner height and gradient
- **Archivos:** `src/app/(frontend)/(es)/page.tsx`, `src/app/(frontend)/en/page.tsx`
- **Resultado:** Layout del banner alineado parcialmente. Imagen y logo siguen pendientes.

---

## 🤝 Notas para coordinación

- **No tocar simultáneamente:** Cuando una sección esté `🔄 En revisión`, no modificar desde otro IDE.
- **Marcar como completada** sólo cuando el MCP apruebe (`✅ Aprobado`).
- **Push automático:** Railway detecta cambios en `main` → rebuilda → deploy.
