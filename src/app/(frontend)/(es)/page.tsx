import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPage, listHouses, extractParagraphs } from "@/lib/content";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Narrativa from "@/components/sections/Narrativa";
import ImageWithText from "@/components/sections/ImageWithText";
import CTABlock from "@/components/sections/CTABlock";
import BuilderPage from "@/components/BuilderPage";

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

const CASAS = [
  {
    slug: "casa-doble-altura",
    name: "Casa Doble Altura",
    specs: "2 HABITACIONES / 2,5 BAÑOS",
    desc: "Dos niveles y doble altura, pensada para vivir con mayor amplitud y privacidad entre ambientes.",
    img: "https://puebloladehesa.cl/cdn/shop/files/07A1871_870b59a3-cea5-46af-a04f-16711cf0bdd6_1.webp",
  },
  {
    slug: "casa-parque",
    name: "Casa Parque",
    specs: "2 HABITACIONES / 2 BAÑOS",
    desc: "Un primer piso que se abre al parque, con la terraza como extensión natural de la casa.",
    img: "https://puebloladehesa.cl/cdn/shop/files/07A9319_9e57ed7b-b137-4536-ae8e-abfc85a8aeec_1.webp",
  },
  {
    slug: "casa-panoramica",
    name: "Casa Panorámica",
    specs: "2 HABITACIONES / 2 BAÑOS",
    desc: "Un segundo piso con vistas abiertas a la cordillera y mayor sensación de perspectiva.",
    img: "https://puebloladehesa.cl/cdn/shop/files/07A0248.jpg",
  },
  {
    slug: "casa-suite",
    name: "Casa Suite",
    specs: "1 HABITACIÓN / 1,5 BAÑOS",
    desc: "Un dormitorio, con la mayor amplitud interior y una experiencia más abierta y protagónica.",
    img: "https://puebloladehesa.cl/cdn/shop/files/IMG_0011_1.webp",
  },
];

const EXPERIENCIAS = [
  { src: "https://puebloladehesa.cl/cdn/shop/files/Cabalgata.png", tag: "Naturaleza", title: "Cabalgatas al atardecer" },
  { src: "https://puebloladehesa.cl/cdn/shop/files/trekking_1.webp", tag: "Naturaleza", title: "Trekking en cordillera" },
  { src: "https://puebloladehesa.cl/cdn/shop/files/Jardin_07A9818_1.webp", tag: "Pausa", title: "Jardín y silencio" },
  { src: "https://puebloladehesa.cl/cdn/shop/files/vida_en_comunidad_07A0078_1_7bdc8b09-9b68-4924-a72c-3bea87f72e31.webp", tag: "Comunidad", title: "Vida compartida" },
];

export default function Home() {
  return (
    <>
      {/* HERO — editable en Builder.io (modelo: pueblo-hero) */}
      <BuilderPage
        modelName="pueblo-hero"
        fallback={
          <Hero
            image="/amplios_horizontes_1.webp"
            imageAlt="Pueblo La Dehesa"
            title="Tu refugio en la ciudad"
            subtitle="Arriendo de casas amobladas inmersas en la naturaleza con vistas a la cordillera y al valle de la Dehesa."
          />
        }
      />

      {/* NARRATIVA — editable en Builder.io (modelo: pueblo-narrativa) */}
      <BuilderPage
        modelName="pueblo-narrativa"
        fallback={
          <Narrativa
            title="Pueblo nace de la idea de volver a lo esencial."
            paragraphs={[
              "Un lugar donde la naturaleza, el diseño y la calma se cruzan para crear un nuevo sentido de habitar la ciudad. Aquí cada casa se piensa como un refugio integrado al entorno, con la cordillera como horizonte y el ritmo del valle como telón de fondo.",
            ]}
          />
        }
      />

      {/* PILARES */}
      <Features locale="es" />

      {/* IMAGEN + TEXTO — editable en Builder.io (modelo: pueblo-imagen-texto) */}
      <BuilderPage
        modelName="pueblo-imagen-texto"
        fallback={
          <ImageWithText
            image="https://puebloladehesa.cl/cdn/shop/files/Locacion_AEREA_1_1_38dd9d39-992c-4897-9b6f-cd9711af23fb.webp"
            imageAlt="Vista panorámica del valle de La Dehesa"
            title="Un lugar para quedarte el tiempo que necesites"
            paragraphs={[
              "Arriendo de casas amobladas integradas al paisaje, con luz natural y vistas a la cordillera.",
              "Como en todo pueblo, hay un punto de encuentro: La Casita, un espacio para un café, algo rico para comer, para trabajar con calma o simplemente cruzarse con otros de manera natural.",
              "Con un equipo atento, arriendo flexible y una ubicación privilegiada —cerca de todo, envuelta en silencio— Pueblo propone una forma de vivir simple, conectada y tranquila desde el primer día.",
            ]}
          />
        }
      />

      {/* CASAS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl mb-4 font-light">Espacios para quedarse</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Cada casa propone una experiencia distinta, unida por la luz, el diseño y la calma del entorno.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CASAS.map((casa) => (
            <Link key={casa.slug} href={`/casas/${casa.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-soft mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={casa.img}
                  alt={casa.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-brand-ink mb-2">{casa.name}</h3>
              <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">{casa.specs}</p>
              <p className="text-sm text-brand-muted leading-relaxed mb-4">{casa.desc}</p>
              <span className="inline-flex items-center text-sm text-brand-ink group-hover:text-brand-accent transition-colors">
                ver más →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA ESTADÍAS — editable en Builder.io (modelo: pueblo-cta) */}
      <BuilderPage
        modelName="pueblo-cta"
        fallback={
          <CTABlock
            title="Estadías flexibles"
            description="Reserva para nuestras estadías de corto, mediano y largo plazo."
            bookingLabel="Reservar"
            contactLabel="Contáctanos"
            locale="es"
          />
        }
      />

      {/* EXPERIENCIAS */}
      <section className="bg-brand-soft py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-12">
            <div className="max-w-3xl">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-brand-ink leading-tight mb-6">
                Experiencias que le dan vida a Pueblo
              </h2>
              <p className="text-brand-muted text-lg leading-relaxed">
                Además de disfrutar en Pueblo, organizamos experiencias en tres mundos —naturaleza,
                pausa y comunidad— que nacen en Pueblo y se expanden hacia su entorno: desde
                caminatas, clases de yoga, hasta exploraciones que conectan la cordillera, los
                centros de ski y la costa.
              </p>
            </div>
            <Link
              href="/experiencias"
              className="hidden lg:inline-flex items-center gap-3 text-sm uppercase tracking-widest text-brand-ink hover:text-brand-accent transition-colors whitespace-nowrap"
            >
              Ver todas <span className="text-2xl">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EXPERIENCIAS.map((exp, i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden bg-brand-soft group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={exp.src}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-xs uppercase tracking-widest text-white/80 mb-1">{exp.tag}</p>
                  <p className="font-serif text-lg text-white font-light leading-tight">{exp.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center lg:hidden">
            <Link
              href="/experiencias"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-brand-ink hover:text-brand-accent transition-colors"
            >
              Ver todas las experiencias <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* QUOTE PARALLAX */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://puebloladehesa.cl/cdn/shop/files/07A1871_870b59a3-cea5-46af-a04f-16711cf0bdd6_1.webp"
          alt="Pueblo La Dehesa con vista a la cordillera"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="relative h-full flex items-center px-6 lg:px-16">
          <div className="max-w-2xl">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
              La vida de pueblo que hoy buscamos, con naturaleza y calma, sin salir de la ciudad
            </p>
          </div>
        </div>
      </section>

      {/* VIDA EN PUEBLO */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Vida en Pueblo</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              Espacios pensados para habitar con calma, integrados al paisaje de La Dehesa.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { src: "https://puebloladehesa.cl/cdn/shop/files/07A0373_1_9306cd35-d2d4-4c49-b3de-55aa005f487c.webp", alt: "Interior con vista a la cordillera" },
              { src: "https://puebloladehesa.cl/cdn/shop/files/07A9353_1_1.webp", alt: "Terraza y parque en Pueblo La Dehesa" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden bg-brand-soft group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-ink mb-6">
                Estamos aquí para ayudarte
              </h2>
              <p className="text-brand-muted leading-relaxed mb-10">
                Si quieres conocer más detalles o coordinar una visita, escríbenos.
              </p>
              <div className="space-y-6 text-brand-muted">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-ink mb-1">Dirección</p>
                  <p>Av. Santa Blanca 550, Lo Barnechea,<br />Santiago, Chile</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-ink mb-1">Email</p>
                  <a href="mailto:contacto@puebloladehesa.cl" className="hover:text-brand-accent transition-colors">
                    contacto@puebloladehesa.cl
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-ink mb-1">WhatsApp</p>
                  <a href="https://wa.me/56984148269" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                    +56 9 8414 8269
                  </a>
                </div>
              </div>
            </div>
            <div>
              <form action="/api/contact" method="POST" className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="nombre" required placeholder="Nombre" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                  <input name="email" type="email" required placeholder="Correo electrónico" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                </div>
                <input name="phone" type="tel" placeholder="Teléfono" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                <textarea name="mensaje" required rows={4} placeholder="Mensaje" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                <button type="submit" className="justify-self-start px-8 py-4 rounded-full bg-brand-accent text-white font-medium hover:bg-brand-accent/90 transition-colors">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
