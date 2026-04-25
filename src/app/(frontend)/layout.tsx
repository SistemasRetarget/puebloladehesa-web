import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import MetaPixel from "@/components/MetaPixel";
import ConsentBanner from "@/components/ConsentBanner";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    default: "Pueblo La Dehesa · Tu refugio en la ciudad",
    template: "%s · Pueblo La Dehesa"
  },
  description:
    "Casas amobladas para estadías flexibles en La Dehesa, rodeadas de naturaleza, diseño y calma.",
  openGraph: { type: "website", locale: "es_CL", siteName: "Pueblo La Dehesa" },
  robots: { index: true, follow: true }
};

/**
 * Layout común a ES y EN. Incluye tracking y consent.
 * El Header/Footer se monta en cada sub-layout de idioma.
 */
export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Analytics />
      <MetaPixel />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={localBusinessSchema()} />
      {children}
      <ConsentBanner />
    </>
  );
}
