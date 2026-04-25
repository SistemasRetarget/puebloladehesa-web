import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listHouses, imageForPage } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Estadías | Pueblo La Dehesa",
  description: "Descubre nuestras casas amobladas en La Dehesa. Cada propiedad es un refugio único rodeado de naturaleza y diseño.",
  openGraph: {
    title: "Estadías | Pueblo La Dehesa",
    description: "Casas amobladas exclusivas para tu estadía en La Dehesa",
    type: "website",
    locale: "es_CL"
  }
};

export default function EstadiasPrincipal() {
  const houses = listHouses("es");

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden -mt-20 lg:-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="font-serif text-5xl md:text-6xl font-light tracking-tight mb-4">
            Nuestras Estadías
          </h1>
          <p className="text-lg max-w-2xl opacity-95">
            Cada casa es un refugio único rodeado de naturaleza, diseño y comodidad
          </p>
        </div>
      </section>

      {/* Houses Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {houses.map((h) => {
            const key = `${h.lang}_${h.path.replace(/\//g, "_")}`;
            const img = imageForPage(key);
            const slug = h.path.split("/").pop();
            return (
              <Link
                key={h.path}
                href={`/casas/${slug}`}
                className="group block rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft">
                  <Image
                    src={img}
                    alt={h.meta.title || "Casa"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-xl font-light">{h.meta.title?.split("|")[0].trim() || "Casa"}</h3>
                  <p className="mt-2 text-sm text-brand-muted line-clamp-2">
                    {h.meta.description || ""}
                  </p>
                  <div className="mt-4 inline-flex text-xs font-semibold text-brand-accent uppercase tracking-wider">
                    Ver más →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif text-4xl font-light mb-6">¿Listo para tu estadía?</h2>
        <p className="text-lg text-brand-muted mb-8">
          Reserva tu casa ahora y vive la experiencia de Pueblo La Dehesa
        </p>
        <a
          href={process.env.NEXT_PUBLIC_BOOKING_URL || "https://puebloladehesa.book2dream.com/"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-accent/90 transition-colors"
        >
          Reservar Ahora
        </a>
      </section>
    </>
  );
}
