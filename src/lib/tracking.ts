/**
 * Utility para pushar eventos al dataLayer (GTM) y a Meta Pixel (fbq).
 * GTM maneja enrutado a GA4 + cualquier otro tag via container.
 *
 * Uso:
 *   import { track } from "@/lib/tracking";
 *   track("click_reserva", { location: "hero", house: "casa-parque" });
 */

type TrackParams = Record<string, unknown>;

export function track(eventName: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;

  // GTM dataLayer
  const dl = (window as any).dataLayer;
  if (Array.isArray(dl)) {
    dl.push({ event: eventName, ...params });
  }

  // Meta Pixel (mapea eventos custom → standard cuando aplica)
  const fbq = (window as any).fbq;
  if (typeof fbq === "function") {
    const pixelEvent = mapToMetaEvent(eventName);
    if (pixelEvent?.standard) {
      fbq("track", pixelEvent.name, params);
    } else if (pixelEvent?.custom) {
      fbq("trackCustom", pixelEvent.name, params);
    }
  }
}

function mapToMetaEvent(name: string): { name: string; standard?: boolean; custom?: boolean } | null {
  switch (name) {
    case "click_reserva":
      return { name: "InitiateCheckout", standard: true };
    case "click_contacto":
    case "click_whatsapp":
      return { name: "Contact", standard: true };
    case "form_submit_contacto":
      return { name: "Lead", standard: true };
    case "view_casa":
      return { name: "ViewContent", standard: true };
    case "newsletter_subscribe":
      return { name: "Subscribe", standard: true };
    case "click_social":
    case "click_email":
      return { name, custom: true };
    default:
      return { name, custom: true };
  }
}

/**
 * Hook sencillo para trackear page view en cambios de ruta.
 * Ya no es necesario en GA4 (automático) pero sí para Meta Pixel en SPAs.
 */
export function trackPageView(url: string): void {
  if (typeof window === "undefined") return;
  const dl = (window as any).dataLayer;
  if (Array.isArray(dl)) dl.push({ event: "page_view", page_path: url });
  const fbq = (window as any).fbq;
  if (typeof fbq === "function") fbq("track", "PageView");
}

/**
 * Envía metadatos de la página a GTM como evento "page_metadata"
 * Útil para SEO + tracking integrado
 *
 * Uso:
 *   import { trackPageMetadata } from "@/lib/tracking";
 *   trackPageMetadata({
 *     title: "Nosotros | Pueblo La Dehesa",
 *     description: "La historia detrás de Pueblo...",
 *     canonical: "/nosotros",
 *     ogImage: "..."
 *   });
 */
export interface PageMetadata {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogUrl?: string;
  locale?: string;
  [key: string]: unknown;
}

export function trackPageMetadata(metadata: PageMetadata): void {
  if (typeof window === "undefined") return;

  const dl = (window as any).dataLayer;
  if (Array.isArray(dl)) {
    dl.push({
      event: "page_metadata",
      page_title: metadata.title,
      page_description: metadata.description,
      page_canonical: metadata.canonical,
      page_og_image: metadata.ogImage,
      page_og_url: metadata.ogUrl,
      page_locale: metadata.locale,
      ...metadata,
    });
  }
}

/**
 * Trackea conversiones de formulario (contacto, reserva, etc.)
 *
 * Uso:
 *   trackFormSubmission("contacto", { email: "user@example.com" });
 */
export function trackFormSubmission(
  formType: "contacto" | "reserva" | "newsletter" | string,
  data?: TrackParams
): void {
  track(`form_submit_${formType}`, data || {});
}

/**
 * Trackea clicks en links externos
 *
 * Uso:
 *   trackExternalLink("https://booking.example.com", "booking-button");
 */
export function trackExternalLink(url: string, label?: string): void {
  track("click_external_link", {
    external_url: url,
    link_label: label || url,
  });
}

/**
 * Trackea scroll depth (25%, 50%, 75%, 100%)
 * Para usar en un hook dentro de pages o layouts
 */
export function initScrollTracking(): void {
  if (typeof window === "undefined") return;

  const tracked = { 25: false, 50: false, 75: false, 100: false };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrollPercent = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );

    ([25, 50, 75, 100] as const).forEach((threshold) => {
      if (scrollPercent >= threshold && !tracked[threshold]) {
        tracked[threshold] = true;
        track("scroll_depth", { depth_percent: threshold });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () =>
    window.removeEventListener("scroll", handleScroll);
}
