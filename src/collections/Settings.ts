import type { CollectionConfig } from "payload";

export const Settings: CollectionConfig = {
  slug: "settings",
  labels: {
    singular: "Configuración",
    plural: "Configuración",
  },
  admin: {
    useAsTitle: "label",
    group: "Configuración",
    description: "Configuración global del sitio: Analytics, SEO, tracking.",
  },
  access: {
    read: () => true, // Público para que Next.js pueda leerlo
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    // — ANALYTICS ──────────────────────────────────────────────────
    {
      name: "analytics",
      type: "group",
      label: "Google Analytics + Tag Manager",
      fields: [
        {
          name: "gtmId",
          type: "text",
          label: "Google Tag Manager ID",
          placeholder: "GTM-XXXXXXX",
          admin: {
            description:
              "Container ID de Google Tag Manager. Ej: GTM-XXXXXXX. Déjalo vacío para desactivar GTM.",
          },
        },
        {
          name: "ga4Id",
          type: "text",
          label: "Google Analytics 4 ID",
          placeholder: "G-XXXXXXXXXX",
          admin: {
            description:
              "Measurement ID de GA4. Ej: G-XXXXXXXXXX. Solo se usa si GTM no está configurado. Los cambios se reflejan automáticamente sin redeploy.",
          },
        },
      ],
    },

    // — CONSENTIMIENTO ─────────────────────────────────────────────
    {
      name: "consent",
      type: "group",
      label: "Consentimiento & GDPR",
      fields: [
        {
          name: "enableConsentBanner",
          type: "checkbox",
          defaultValue: true,
          label: "Mostrar banner de consentimiento",
          admin: {
            description: "Si está activado, muestra banner de cookies al cargar.",
          },
        },
        {
          name: "consentText",
          type: "textarea",
          admin: {
            description:
              "Texto del banner de consentimiento (HTML permitido).",
            rows: 4,
          },
          defaultValue:
            'Usamos cookies y tecnologías de rastreo para mejorar tu experiencia. Al aceptar, consientes el almacenamiento de datos según <a href="/legal/politicas-de-privacidad">nuestra política de privacidad</a>.',
        },
        {
          name: "consentDaysValid",
          type: "number",
          defaultValue: 365,
          admin: {
            description: "Días que el consentimiento es válido (default: 365).",
          },
        },
      ],
    },

    // — TRACKING ADICIONAL ─────────────────────────────────────────
    {
      name: "tracking",
      type: "group",
      label: "Tracking Adicional",
      fields: [
        {
          name: "metaPixelId",
          type: "text",
          label: "Meta Pixel ID (Facebook)",
          placeholder: "123456789012345",
          admin: {
            description:
              "ID del Meta Pixel para conversiones e instalación de folletos. Déjalo vacío para desactivar.",
          },
        },
        {
          name: "hotjarSiteId",
          type: "text",
          label: "Hotjar Site ID",
          placeholder: "1234567",
          admin: {
            description:
              "ID de Hotjar para heatmaps y recordings. Déjalo vacío para desactivar.",
          },
        },
        {
          name: "enableServerSideTracking",
          type: "checkbox",
          defaultValue: false,
          label: "Habilitar tracking server-side",
          admin: {
            description:
              "Si está activo, los eventos se envían desde el servidor (más privado, requiere API key adicional).",
          },
        },
      ],
    },

    // — INTEGRACIÓN SEO ────────────────────────────────────────────
    {
      name: "seoTracking",
      type: "group",
      label: "SEO & Tracking Integration",
      fields: [
        {
          name: "enablePageTrackingEvents",
          type: "checkbox",
          defaultValue: true,
          label: "Rastrear eventos de página",
          admin: {
            description:
              "Si está activo, cada página envía evento a GTM con: título, descripción, ruta, canonical URL.",
          },
        },
        {
          name: "enableScrollTracking",
          type: "checkbox",
          defaultValue: true,
          label: "Rastrear profundidad de scroll",
          admin: {
            description:
              "Si está activo, registra cuándo el usuario llega a 25%, 50%, 75%, 100% de la página.",
          },
        },
        {
          name: "enableOutboundLinkTracking",
          type: "checkbox",
          defaultValue: true,
          label: "Rastrear links externos",
          admin: {
            description:
              "Si está activo, cada click a un sitio externo se registra en GTM.",
          },
        },
        {
          name: "enableFormTracking",
          type: "checkbox",
          defaultValue: true,
          label: "Rastrear envíos de formulario",
          admin: {
            description:
              "Si está activo, cada envío de formulario (contacto, reserva) se registra.",
          },
        },
      ],
    },

    // — METADATOS ADICIONALES ──────────────────────────────────────
    {
      name: "label",
      type: "text",
      admin: { hidden: true },
      defaultValue: "Configuración Global",
    },
  ],

  // Un solo documento de settings
  // Si necesitas permitir múltiples, simplemente remueve esta restricción
  // hooks: {
  //   beforeValidate: [
  //     async ({ data, operation }) => {
  //       if (operation === "create") {
  //         const existingCount = await payload.count({
  //           collection: "settings"
  //         });
  //         if (existingCount > 0) {
  //           throw new Error("Solo puede existir un documento de Configuración");
  //         }
  //       }
  //       return data;
  //     },
  //   ],
  // },
};
