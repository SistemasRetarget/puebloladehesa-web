import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPage, listHouses, imageForPage, extractParagraphs } from "@/lib/content";
import Features from "@/components/sections/Features";
// import Testimonials from "@/components/Testimonials";
// import FAQ from "@/components/FAQ";

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

export default function Home() {
  const home = getPage("es", "home");
  const houses = listHouses("es");
  const heroImg = home ? imageForPage("es__home", "/media//media/placeholder.svg") : "/media//media/placeholder.svg";
  const intro = home ? extractParagraphs(home, 2)[0] : "";

  return (
    <>
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden -mt-20 lg:-mt-24">
        <img
          src={heroImg}
          alt="Pueblo La Dehesa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            Tu refugio en la ciudad
          </h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl opacity-95">
            Arriendo de casas amobladas inmersas en la naturaleza con vistas a la cordillera y al valle de la Dehesa.
          </p>
        </div>
      </section>

      {/* SECTION 2: Rich text — narrativa de marca (matches prod section 3) */}
      <section className="py-section bg-brand-soft">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-brand-ink leading-tight">
            Pueblo nace de la idea de volver a lo esencial.
          </h2>
          <p className="mt-6 text-brand-muted leading-relaxed text-lg">
            Un lugar donde la naturaleza, el diseño y la calma se cruzan para crear un nuevo sentido de habitar la ciudad. Aquí cada casa se piensa como un refugio integrado al entorno, con la cordillera como horizonte y el ritmo del valle como telón de fondo.
          </p>
        </div>
      </section>

      {/* SECTION 3: Tres Pilares (Features) — matches prod section 4 */}
      <Features locale="es" />
    </>
  );
}
