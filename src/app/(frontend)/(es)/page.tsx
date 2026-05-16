import type { Metadata } from "next";
import BuilderPage from "@/components/BuilderPage";
import ContactSection from "@/components/sections/ContactSection";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pueblo La Dehesa | Casas de Lujo en La Dehesa, Santiago",
  description: "Descubre casas rodeadas de naturaleza en La Dehesa. Diseño, calma y refugio en la ciudad. Conoce nuestras propiedades exclusivas.",
  keywords: "casas La Dehesa, propiedades Santiago, casas lujo, arrendamiento casas",
  openGraph: {
    title: "Pueblo La Dehesa | Casas de Lujo en La Dehesa",
    description: "Casas rodeadas de naturaleza, diseño y calma en La Dehesa.",
    type: "website",
    locale: "es_CL",
    url: "https://puebloladehesa.cl"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pueblo La Dehesa | Casas de Lujo en La Dehesa",
    description: "Casas rodeadas de naturaleza, diseño y calma en La Dehesa."
  }
};

/**
 * Home page — completamente editable desde Builder.io (modelo `pueblo-home`).
 *
 * El contenido visual (hero, narrativa, casas, experiencias, CTAs, etc.) se gestiona
 * desde el visual editor de Builder.io. Solo el formulario de contacto queda en código
 * porque tiene lógica que no es presentacional.
 *
 * Editar: https://builder.io/content?model=pueblo-home
 */
export default function Home() {
  return (
    <>
      <BuilderPage modelName="pueblo-home" />
      <ContactSection locale="es" />
    </>
  );
}
