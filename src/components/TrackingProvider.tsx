'use client';

import { usePageTracking } from '@/hooks/usePageTracking';

/**
 * Componente que activa tracking automático:
 * - Metadatos de página → GTM (integración SEO)
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - External links
 *
 * Agregar una sola vez en el layout raíz del sitio.
 */
export default function TrackingProvider() {
  usePageTracking({
    enableMetadata: true,
    enableScroll: true,
  });

  return null;
}
