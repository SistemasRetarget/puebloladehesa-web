import type { Metadata } from "next";
import Image from "next/image";
import { getPage, imageForPage, extractParagraphs } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Location | Pueblo La Dehesa",
  description: "Discover where Pueblo La Dehesa is located. Located in the heart of the La Dehesa valley, Santiago, surrounded by nature.",
  openGraph: {
    title: "Location | Pueblo La Dehesa",
    description: "Find Pueblo La Dehesa in the La Dehesa valley, Santiago",
    type: "website",
    locale: "en_US"
  }
};

export default function Location() {
  const locContent = getPage("es", "ubicacion");
  const description = locContent
    ? extractParagraphs(locContent, 1)[0]
    : "Located in the heart of the La Dehesa valley, Pueblo La Dehesa is a unique place where nature and the city coexist in harmony.";

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden -mt-20 lg:-mt-24">
        <Image
          src="https://puebloladehesa.cl/cdn/shop/files/ubicacion.webp"
          alt="Location"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            Location
          </h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl opacity-95">
            In the heart of the La Dehesa valley
          </p>
        </div>
      </section>

      {/* Location Info */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl font-light mb-6">How to Get There</h2>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              {description}
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-brand-ink mb-2">Address</h3>
                <p className="text-brand-muted">
                  Pueblo La Dehesa, La Dehesa, Santiago, Metropolitan Region, Chile
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-brand-ink mb-2">From Downtown Santiago</h3>
                <p className="text-brand-muted">
                  Approximately 25-30 minutes by car. An oasis of tranquility just minutes from the city.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-brand-ink mb-2">Access</h3>
                <p className="text-brand-muted">
                  Located in a safe and easily accessible area. We have private parking for our guests.
                </p>
              </div>

              <div className="pt-6 border-t border-brand-line">
                <a
                  href="https://maps.google.com/?q=Pueblo+La+Dehesa+Santiago"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-accent/90 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.7123456789!2d-70.5!3d-33.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPueblo%20La%20Dehesa!5e0!3m2!1sen!2scl!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-brand-soft py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-light mb-8">What You'll Find Nearby</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-brand-ink mb-3">Nature</h3>
              <p className="text-sm text-brand-muted">
                Forests, trails and views of the Andes. A refuge in nature.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-ink mb-3">Services</h3>
              <p className="text-sm text-brand-muted">
                Restaurants, cafés and shops in the surrounding area.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-ink mb-3">City</h3>
              <p className="text-sm text-brand-muted">
                Just minutes from downtown Santiago. Best of both worlds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
