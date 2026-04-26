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

export default function Experiencias() {
  const p = getPage("es", "/pages/experiencias");
  const paras = p ? extractParagraphs(p, 6) : [];
  const img = p ? imageForPage(`es__pages_experiencias`) : "/media//media/placeholder.svg";
  return (
    <div>
      <section className="relative h-[50vh] min-h-[320px]">
        <Image src={img} alt="Experiencias" fill priority sizes="100vw" className="object-cover" />
      </section>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-5 text-brand-muted leading-relaxed">
        <h1 className="font-serif text-5xl text-brand-ink mb-8">Experiencias</h1>
        {paras.length > 0 ? paras.map((t, i) => <p key={i}>{t}</p>) : <p>Bienestar, outdoor y comunidad en un entorno único.</p>}
      </div>
    </div>
  );
}
