import type { Metadata } from "next";
import { getPage, extractParagraphs, imageForPage } from "@/lib/content";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nosotros | Pueblo La Dehesa",
  description:
    "Conoce la historia de Pueblo La Dehesa: un proyecto que combina naturaleza, diseño y comunidad para crear tu refugio en la ciudad.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros | Pueblo La Dehesa",
    description: "La historia detrás de Pueblo La Dehesa: naturaleza, diseño y comunidad.",
    type: "website",
    locale: "es_CL",
    url: "/nosotros",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pueblo La Dehesa — Nosotros" }]
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] }
};

const TESTIMONIALS = [
  {
    quote: "Propusimos una arquitectura elevada… para que el lugar, la luz y la cordillera dialoguen.",
    author: "Martín Lira",
    role: "Arquitecto"
  },
  {
    quote: "Elegimos especies nativas y flores, diseñando un verde que se recorre, se vive y se cuida, acompañado por la cordillera.",
    author: "Inés Couve",
    role: "Paisajista"
  },
  {
    quote: "Pensamos interiores cálidos, nobles y simples. Espacios que se sienten bien y dan ganas de habitar.",
    author: "Juan Ignacio Court",
    role: "Interiorista"
  },
  {
    quote: "Acompañamos cada estadía con atención y cariño, para que desde el primer día se sientan en casa.",
    author: "Maureen Morrison",
    role: "Experiencia Pueblo"
  }
];

const INSPIRATION = [
  { title: "La vida de pueblo", text: "Los encuentros espontáneos, los gestos cotidianos, el centro que reúne." },
  { title: "La naturaleza como escenario", text: "Parques de árboles nativos, pasarelas y la cordillera siempre presente." },
  { title: "El diseño como hospitalidad", text: "Arquitectura serena y materiales nobles que invitan a quedarse." }
];

export default function Nosotros() {
  const heroImg = imageForPage("es__pages_nosotros") || "https://puebloladehesa.cl/cdn/shop/files/Masterplan_1.webp";
  return (
    <>
      {/* Section 1: Hero */}
      <section className="relative h-[60vh] min-h-[420px] -mt-20 lg:-mt-24">
        <Image src={heroImg} alt="La historia detrás de Pueblo" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">La historia detrás de Pueblo</h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl opacity-95">Inspirados en la vida de pueblo, la naturaleza y la calma.</p>
        </div>
      </section>

      {/* Section 2: Big question */}
      <section className="py-section bg-brand-soft">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-brand-ink leading-tight">
            ¿Y si bajar el ritmo no implicara irse de la ciudad?
          </h2>
          <p className="mt-6 text-brand-muted leading-relaxed text-lg">
            Hoy vivimos rodeados de ruido, tránsito y prisa. Pero todos buscamos, consciente o inconscientemente, un lugar donde ese ritmo pueda cambiar. Ahí comienza la historia de Pueblo: un refugio integrado al paisaje, sin tener que salir de la ciudad.
          </p>
        </div>
      </section>

      {/* Section 3: Volver a lo esencial */}
      <section className="py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">Nuestro origen</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-brand-ink leading-tight">Volver a lo esencial</h2>
              <p className="mt-6 text-brand-muted leading-relaxed text-lg">
                Pueblo nace de una idea simple y poderosa: crear un lugar donde la vida se sienta calma y con propósito. Imaginamos una forma de vivir más simple, inspirada en la vida de pueblo, donde la naturaleza, el diseño y los encuentros vuelven a ser protagonistas.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src="https://puebloladehesa.cl/cdn/shop/files/Jardin_07A9818_1.webp" alt="Jardín de Pueblo La Dehesa" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Inspiración (3-up) */}
      <section className="py-section bg-brand-soft">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-ink">Nuestra inspiración</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {INSPIRATION.map((it) => (
              <article key={it.title} className="text-center">
                <h3 className="font-serif text-2xl text-brand-ink font-light mb-3">{it.title}</h3>
                <p className="text-brand-muted leading-relaxed">{it.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Testimoniales del equipo (4 quotes) */}
      <section className="py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">El equipo</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-ink">Las voces detrás del proyecto</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <figure key={t.author} className="bg-brand-soft p-8 rounded-lg">
                <blockquote className="font-serif text-xl md:text-2xl text-brand-ink leading-snug font-light">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-brand-ink">{t.author}</span>
                  <span className="text-brand-muted"> — {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
