import type { Metadata } from "next";
import Image from "next/image";
import { getPage, imageForPage, extractParagraphs } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "La Casita Gourmet | Pueblo La Dehesa",
  description: "Discover La Casita, the heart of Pueblo La Dehesa. A space to share, work and enjoy.",
  openGraph: {
    title: "La Casita | Pueblo La Dehesa",
    description: "Gourmet Hall and gathering point at Pueblo La Dehesa",
    type: "website",
    locale: "en_US"
  }
};

export default function LaCasita() {
  const casitaContent = getPage("es", "la-casita");
  const description = casitaContent
    ? extractParagraphs(casitaContent, 1)[0]
    : "La Casita is the heart of Pueblo La Dehesa, a space designed for gathering, work and fine dining.";

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
            Gourmet Hall & Gathering Point
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-4xl font-light mb-8">Welcome to La Casita</h2>
          <p className="text-xl text-brand-muted leading-relaxed mb-8">
            {description}
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-16">
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">To Share</h3>
              <p className="text-brand-muted">
                A space designed for you to meet other guests, share stories and experiences around a good table.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">To Work</h3>
              <p className="text-brand-muted">
                WiFi connection, comfortable space and inspiring environment to work peacefully, away from city noise.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">To Enjoy</h3>
              <p className="text-brand-muted">
                Local gastronomy, selected beverages and unforgettable moments in a warm and welcoming atmosphere.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Private Events</h3>
              <p className="text-brand-muted">
                Available for meetings, celebrations and private events. Consult our personalized options.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t border-brand-line pt-12">
          <h3 className="font-serif text-3xl font-light mb-4">Want to know La Casita?</h3>
          <p className="text-brand-muted mb-8">
            Contact us to book your experience
          </p>
          <a
            href="/en/contact"
            className="inline-block bg-brand-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-accent/90 transition-colors"
          >
            Contact
          </a>
        </div>
      </section>
    </>
  );
}
