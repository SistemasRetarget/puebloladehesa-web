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
              src="https://puebloladehesa.cl/cdn/shop/files/Locacion_AEREA_1_1_38dd9d39-992c-4897-9b6f-cd9711ae23fb.webp"
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

      {/* SECTION 6: Promo bar Estadías flexibles — matches prod section 8 */}
      <section className="py-section bg-brand-ink text-white">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light">Estadías flexibles</h2>
              <p className="mt-3 text-white/80 text-lg max-w-2xl">
                Reserva para nuestras estadías de corto, mediano y largo plazo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/estadias" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-accent text-white font-medium hover:bg-brand-accent/90 transition-colors">
                Reservar
              </Link>
              <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition-colors">
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      {/* SECTION 8: Quote / pull quote — matches prod section 10 */}
      <section className="py-section bg-brand-soft">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-brand-ink leading-tight">
            La vida de pueblo que hoy buscamos, con naturaleza y calma, sin salir de la ciudad.
          </p>
        </div>
      </section>

      {/* SECTION 9: Inline contact form — matches prod section 11 */}
      <section className="py-section">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-ink">Estamos aquí para ayudarte</h2>
            <p className="mt-3 text-brand-muted leading-relaxed">
              Si quieres conocer más detalles o coordinar una visita, escríbenos.
            </p>
          </div>
          <form action="/api/contact" method="POST" className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" required placeholder="Nombre" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
              <input name="email" type="email" required placeholder="Correo electrónico" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
            </div>
            <input name="phone" type="tel" placeholder="Teléfono" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
            <textarea name="message" required rows={4} placeholder="Mensaje" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
            <button type="submit" className="justify-self-start px-8 py-4 rounded-full bg-brand-accent text-white font-medium hover:bg-brand-accent/90 transition-colors">
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 10: Feature bar — matches prod section 12 */}
      <section className="py-section-sm border-t border-brand-line bg-brand-bg">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <li>
              <p className="text-xs uppercase tracking-widest text-brand-muted mb-1">Reserva</p>
              <p className="font-serif text-lg text-brand-ink">Arriendos por semanas o meses</p>
            </li>
            <li>
              <p className="text-xs uppercase tracking-widest text-brand-muted mb-1">Entorno</p>
              <p className="font-serif text-lg text-brand-ink">Barrio seguro y silencioso</p>
            </li>
            <li>
              <p className="text-xs uppercase tracking-widest text-brand-muted mb-1">Paisaje</p>
              <p className="font-serif text-lg text-brand-ink">Vistas a la cordillera</p>
            </li>
            <li>
              <p className="text-xs uppercase tracking-widest text-brand-muted mb-1">Calidad de vida</p>
              <p className="font-serif text-lg text-brand-ink">Aire limpio y naturaleza</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
