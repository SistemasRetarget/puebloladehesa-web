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

export default function Nosotros() {
  const p = getPage("es", "/pages/nosotros");
  const paras = p ? extractParagraphs(p, 6) : [];
  const img = p ? imageForPage(`es__pages_nosotros`) : "/media//media/placeholder.svg";
  return (
    <div>
      <section className="relative h-[50vh] min-h-[320px]">
        <Image src={img} alt="Nosotros" fill priority sizes="100vw" className="object-cover" />
      </section>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-5 text-brand-muted leading-relaxed">
        <h1 className="font-serif text-5xl text-brand-ink mb-8">Nosotros</h1>
        {paras.length > 0 ? paras.map((t, i) => <p key={i}>{t}</p>) : <p>Pueblo La Dehesa es un proyecto de hospitalidad boutique donde naturaleza, diseño y calma se encuentran.</p>}
      </div>
    </div>
  );
}
