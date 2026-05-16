import { getPayload } from "payload";

/**
 * GET /api/settings
 * Retorna la configuración global (Analytics, Tracking, etc.)
 * Cached agresivamente (1 hora) porque casi nunca cambia.
 */
export async function GET(request: Request) {
  try {
    // getPayload sin config — usa el archivo payload.config.ts automáticamente
    const payload = await getPayload();

    // Buscar el único documento de Settings
    const settings = await payload.find({
      collection: "settings",
      limit: 1,
      depth: 0,
    });

    const doc = settings.docs[0];

    // Retornar con defaults si no existe documento
    const response = doc || {
      analytics: {
        gtmId: null,
        ga4Id: null,
      },
      consent: {
        enableConsentBanner: true,
        consentText:
          'Usamos cookies para mejorar tu experiencia. <a href="/legal/politicas-de-privacidad">Política de privacidad</a>',
        consentDaysValid: 365,
      },
      tracking: {
        metaPixelId: null,
        hotjarSiteId: null,
        enableServerSideTracking: false,
      },
      seoTracking: {
        enablePageTrackingEvents: true,
        enableScrollTracking: true,
        enableOutboundLinkTracking: true,
        enableFormTracking: true,
      },
    };

    return Response.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[settings API] Error:", error);
    return Response.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
