import type { Metadata } from "next";
import Image from "next/image";
import { getPage, imageForPage, extractParagraphs } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "La Casita Salón Gourmet | Pueblo La Dehesa",
  description: "Descubre La Casita, el corazón de Pueblo La Dehesa. Un espacio para compartir, trabajar y disfrutar.",
  openGraph: {
    title: "La Casita | Pueblo La Dehesa",
    description: "Salón Gourmet y punto de encuentro en Pueblo La Dehesa",
    type: "website",
    locale: "es_CL"
  }
};

export default function LaCasita() {
  const casitaContent = getPage("es", "la-casita");
  const description = casitaContent
    ? extractParagraphs(casitaContent, 1)[0]
    : "La Casita es el corazón de Pueblo La Dehesa, un espacio diseñado para el encuentro, el trabajo y la buena mesa.";

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden -mt-20 lg:-mt-24">
        <Image
          src="https://puebloladehesa.cl/cdn/shop/files/ubicacion.webp"
          alt="La Casita"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            La Casita
          </h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl opacity-95">
            Salón Gourmet & Punto de Encuentro
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-4xl font-light mb-8">Bienvenido a La Casita</h2>
          <p className="text-xl text-brand-muted leading-relaxed mb-8">
            {description}
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-16">
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Para Compartir</h3>
              <p className="text-brand-muted">
                Un espacio diseñado para que te encuentres con otros huéspedes, compartas historias y experiencias alrededor de una buena mesa.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Para Trabajar</h3>
              <p className="text-brand-muted">
                Conexión WiFi, espacio cómodo y ambiente inspirador para trabajar en calma, alejado del ruido de la ciudad.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Para Disfrutar</h3>
              <p className="text-brand-muted">
                Gastronomía local, bebidas seleccionadas y momentos inolvidables en un ambiente cálido y acogedor.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Eventos Privados</h3>
              <p className="text-brand-muted">
                Disponible para reuniones, celebraciones y eventos privados. Consulta nuestras opciones personalizadas.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t border-brand-line pt-12">
          <h3 className="font-serif text-3xl font-light mb-4">¿Quieres conocer La Casita?</h3>
          <p className="text-brand-muted mb-8">
            Contáctanos para reservar tu experiencia
          </p>
          <a
            href="/contacto"
            className="inline-block bg-brand-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-accent/90 transition-colors"
          >
            Contactar
          </a>
        </div>
      </section>
    </>
  );
}
