import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: { es: "Página", en: "Page" },
    plural:   { es: "Páginas", en: "Pages" }
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "route", "published", "updatedAt"],
    group: "Contenido",
    description: "Cada landing del sitio. La construcción visual se hace en Builder.io."
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    // — IDENTIDAD ────────────────────────────────────────────────────────
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Nombre interno de la página" }
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Slug interno único. Ej: home, casas, contacto" }
    },
    {
      name: "route",
      type: "text",
      required: true,
      admin: { description: "URL en el sitio. Ej: /, /casas, /contacto" }
    },

    // — ACCIONES (UI custom) ────────────────────────────────────────────
    {
      name: "actions",
      type: "ui",
      admin: {
        components: {
          Field: "@/components/admin/PageActions"
        }
      }
    },

    // — BUILDER.IO ──────────────────────────────────────────────────────
    {
      name: "builderContentId",
      type: "text",
      admin: {
        description: "ID del contenido en Builder.io para esta página (auto-rellenado al publicar desde Builder)"
      }
    },
    {
      name: "builderModelName",
      type: "text",
      defaultValue: "pueblo-home",
      admin: { description: "Modelo Builder.io. Default: pueblo-home" }
    },

    // — SEO ─────────────────────────────────────────────────────────────
    {
      name: "meta",
      type: "group",
      label: { es: "SEO", en: "SEO" },
      localized: true,
      fields: [
        {
          name: "title",
          type: "text",
          admin: { description: "Título para Google (50–60 caracteres ideal)" }
        },
        {
          name: "description",
          type: "textarea",
          maxLength: 200,
          admin: { description: "Descripción para Google (150–160 caracteres ideal)" }
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          admin: { description: "Imagen para compartir en redes sociales" }
        }
      ]
    },

    // — ESTADO ──────────────────────────────────────────────────────────
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Si está desactivada, la página devuelve 404" }
    }
  ]
};
