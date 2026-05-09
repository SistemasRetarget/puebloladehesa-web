import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Houses } from "./src/collections/Houses";
import { Pages } from "./src/collections/Pages";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Startup diagnostics — visible in Cloud Run Logs Explorer
console.log("[payload] NODE_ENV:", process.env.NODE_ENV);
console.log("[payload] PAYLOAD_SECRET:", process.env.PAYLOAD_SECRET ? "SET" : "NOT SET (insecure default)");
console.log("[payload] DATABASE_URL:", process.env.DATABASE_URL || "(not set — default file:/tmp/cms.db)");
console.log("[payload] NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL || "(not set — default localhost:3000)");

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Pueblo La Dehesa CMS",
      icons: [],
      description: "Panel de administración — Pueblo La Dehesa"
    },
    components: {
      views: {
        dashboard: {
          Component: "@/components/admin/Dashboard#default"
        }
      },
      graphics: {
        Logo: "@/components/admin/Logo#default",
        Icon: "@/components/admin/Icon#default"
      },
      Nav: "@/components/admin/BuilderLink#default"
    },
    custom: {},
    theme: "all"
  },
  collections: [Users, Media, Houses, Pages],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-change-me",
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts")
  },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || "file:/tmp/cms.db" },
    push: true,
  }),
  sharp,
  localization: {
    locales: [
      { label: "Español", code: "es" },
      { label: "English", code: "en" }
    ],
    defaultLocale: "es",
    fallback: true
  },
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  cors: [process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"]
});
