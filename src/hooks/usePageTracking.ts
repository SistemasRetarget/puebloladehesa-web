'use client';

import { useEffect } from 'react';
import { trackPageMetadata, initScrollTracking } from '@/lib/tracking';

/**
 * Hook para rastrear automáticamente:
 * - Metadatos de la página (title, description, canonical, og:image)
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Datos extraídos del document head (Next.js Metadata)
 *
 * Usar en layout raíz:
 *   usePageTracking({ enableScroll: true });
 */
interface UsePageTrackingOptions {
  enableScroll?: boolean;
  enableMetadata?: boolean;
}

export function usePageTracking(
  options: UsePageTrackingOptions = {}
): void {
  const { enableScroll = true, enableMetadata = true } = options;

  useEffect(() => {
    if (!enableMetadata) return;

    // Extraer metadatos del document head
    const getMetaContent = (name: string): string | undefined => {
      const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      return meta?.getAttribute('content') || undefined;
    };

    const metadata = {
      title: document.title,
      description: getMetaContent('description') || getMetaContent('og:description'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      ogImage: getMetaContent('og:image'),
      ogUrl: getMetaContent('og:url'),
      locale: getMetaContent('og:locale'),
    };

    // Enviar a GTM
    trackPageMetadata(metadata);
  }, [enableMetadata]);

  // Scroll tracking
  useEffect(() => {
    if (!enableScroll) return;

    return initScrollTracking();
  }, [enableScroll]);
}
