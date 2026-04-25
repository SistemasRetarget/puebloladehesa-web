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
  const heroImg = home ? imageForPage("es__home", "/media/placeholder.svg") : "/media/placeholder.svg";
  const intro = home ? extractParagraphs(home, 2)[0] : "";

  return (
    <>
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden -mt-20 lg:-mt-24">
        <Image
          src={heroImg}
          alt="Pueblo La Dehesa"
          fill
          priority
          sizes="100vw"
          className="object-cover"
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

      {intro && (
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-xl leading-relaxed text-brand-muted">{intro}</p>
        </section>
      )}

      <Features locale="es" />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 font-light">Un lugar para quedarte el tiempo que necesites</h2>
            <p className="text-brand-muted leading-relaxed text-lg">
              Arriendo de casas amobladas integradas al paisaje, con luz natural y vistas a la cordillera. Como en todo pueblo, hay un punto de encuentro: La Casita, un espacio para un café, algo rico para comer, para trabajar con calma o simplemente cruzarse con otros de manera natural.
            </p>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg bg-gradient-to-br from-brand-soft to-gray-200 hidden md:block">
            <Image
              src="https://puebloladehesa.cl/cdn/shop/files/ubicacion.webp"
              alt="Vista panorámica del valle de La Dehesa"
              fill
              className="object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl mb-4 font-light">Nuestras casas</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Cada propiedad es un refugio único rodeado de naturaleza, diseño y comodidad
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {houses.map((h) => {
            const key = `${h.lang}_${h.path.replace(/\//g, "_")}`;
            const img = imageForPage(key);
            const slug = h.path.split("/").pop();
            return (
              <Link
                key={h.path}
                href={`/casas/${slug}`}
                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft">
                  <Image
                    src={img}
                    alt={h.meta.title || "Casa"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-2xl font-light">{h.meta.title?.split("|")[0].trim() || "Casa"}</h3>
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

      {/* Testimonials section hidden - not in production */}
      {/* <Testimonials locale="es" /> */}

      <section className="max-w-6xl mx-auto px-6 py-24 my-20 border-t border-brand-line">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light">Experiencias</h2>
          <p className="text-brand-muted text-lg mb-12 leading-relaxed">
            Bienestar, naturaleza y comunidad. Descubre actividades y servicios exclusivos cerca de todo, envuelto en silencio y privacidad.
          </p>
          <Link
            href="/experiencias"
            className="inline-flex px-8 py-4 btn-primary"
          >
            Explorar experiencias
          </Link>
        </div>
      </section>

      {/* FAQ section hidden - not in production */}
      {/* <FAQ locale="es" /> */}
    </>
  );
}
