import type { Metadata } from "next";
import { getPage, extractParagraphs, imageForPage } from "@/lib/content";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Experiencias | Pueblo La Dehesa",
  description:
    "Descubre las experiencias que ofrece Pueblo La Dehesa: gastronomía, naturaleza, cultura y bienestar en el corazón de La Dehesa.",
  alternates: { canonical: "/experiencias" },
  openGraph: {
    title: "Experiencias | Pueblo La Dehesa",
    description:
      "Gastronomía, naturaleza y bienestar en el corazón de La Dehesa.",
    type: "website",
    locale: "es_CL",
    url: "/experiencias",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pueblo La Dehesa — Experiencias" }]
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] }
};

const PILLARS = [
  {
    kicker: "Naturaleza",
    title: "Explora lo que te rodea",
    text: "Caminar por el parque, recorrer las pasarelas o salir a despejarte es parte de la vida diaria en Pueblo. A eso se suman experiencias outdoor que organizamos para ir más allá: cabalgatas, trekking en la cordillera y caminatas guiadas por el entorno.",
    img: "https://puebloladehesa.cl/cdn/shop/files/Cabalgata_1_1.webp"
  },
  {
    kicker: "Pausa",
    title: "Conecta contigo",
    text: "En Pueblo, bajar el ritmo también es parte de la experiencia. Leer, contemplar el paisaje o simplemente estar sucede de forma natural. Complementamos esa pausa con actividades de bienestar como yoga, meditación y masajes.",
    img: "https://puebloladehesa.cl/cdn/shop/files/Jardin_07A9818_1.webp"
  },
  {
    kicker: "Comunidad",
    title: "Comparte con otros",
    text: "La vida de Pueblo se construye en los encuentros cotidianos: el café de la mañana, algo rico para comer, las conversaciones en el parque, los momentos compartidos. Desde La Casita organizamos catas, talleres y encuentros para tejer comunidad.",
    img: "https://puebloladehesa.cl/cdn/shop/files/IMG_3510_1.webp"
  }
];

export default function Experiencias() {
  const img = imageForPage("es__pages_experiencias") || "https://puebloladehesa.cl/cdn/shop/files/amplios_horizontes_1.webp";
  return (
    <>
      {/* Section 1: Hero */}
      <section className="relative h-[60vh] min-h-[420px] -mt-20 lg:-mt-24">
        <Image src={img} alt="Experiencias en Pueblo La Dehesa" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs uppercase tracking-widest opacity-90 mb-3">Experiencias en Pueblo La Dehesa</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">Más que un lugar</h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl opacity-95">Una forma de vivir experiencias todos los días.</p>
        </div>
      </section>

      {/* Section 2: Intro narrativa */}
      <section className="py-section bg-brand-soft">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-brand-ink leading-tight">
            En Pueblo, creemos que la vida de un lugar no ocurre sola.
          </h2>
          <p className="mt-6 text-brand-muted leading-relaxed text-lg">
            Por eso, además de lo cotidiano que nace del entorno, organizamos y activamos experiencias que conectan con la naturaleza, el bienestar y la vida en comunidad. Tres dimensiones para habitar Pueblo de forma plena.
          </p>
        </div>
      </section>

      {/* Sections 3, 4, 5: Tres pilares (Naturaleza / Pausa / Comunidad) */}
      {PILLARS.map((p, i) => (
        <section key={p.kicker} className="py-section">
          <div className="max-w-container mx-auto px-6 lg:px-10">
            <div className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={p.img} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" loading={i === 0 ? "eager" : "lazy"} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">{p.kicker}</p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-brand-ink leading-tight">{p.title}</h2>
                <p className="mt-6 text-brand-muted leading-relaxed text-lg">{p.text}</p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
