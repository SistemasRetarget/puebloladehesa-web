import type { Metadata } from "next";
import Link from "next/link";
import Features from "@/components/sections/Features";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pueblo La Dehesa | Luxury Homes in La Dehesa, Santiago",
  description: "Discover luxury homes surrounded by nature in La Dehesa. Design, tranquility and refuge in the city. Explore our exclusive properties.",
  keywords: "houses La Dehesa, Santiago properties, luxury homes, house rentals",
  openGraph: {
    title: "Pueblo La Dehesa | Luxury Homes in La Dehesa",
    description: "Homes surrounded by nature, design and tranquility in La Dehesa.",
    type: "website",
    locale: "en_US",
    url: "https://puebloladehesa.cl/en"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pueblo La Dehesa | Luxury Homes in La Dehesa",
    description: "Homes surrounded by nature, design and tranquility in La Dehesa."
  }
};

export default function HomeEn() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] overflow-hidden -mt-20 lg:-mt-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/amplios_horizontes_1.webp"
          alt="Pueblo La Dehesa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Your refuge in the city
          </h1>
          <p className="mt-4 text-sm md:text-base max-w-xl opacity-90">
            Furnished home rentals immersed in nature with views of the Andes and the La Dehesa valley.
          </p>
        </div>
      </section>

      {/* Brand narrative */}
      <section className="py-section bg-brand-soft">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-brand-ink leading-tight">
            Pueblo was born from the idea of returning to the essentials.
          </h2>
          <p className="mt-6 text-brand-muted leading-relaxed text-lg">
            A place where nature, design and calm come together to create a new sense of living in the city. Every home is conceived as a refuge integrated into the landscape, with the Andes as its horizon and the rhythm of the valley as its backdrop.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <Features locale="en" />

      {/* A place to stay */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 font-light">A place to stay as long as you need</h2>
            <div className="space-y-5 text-brand-muted leading-relaxed text-lg">
              <p>
                Furnished house rentals integrated into the landscape, with natural light and views of the Andes.
              </p>
              <p>
                Like every town, there&apos;s a meeting point: La Casita, a space for a coffee, something delicious to eat, to work calmly or simply cross paths with others naturally.
              </p>
              <p>
                With an attentive team, flexible rentals and a privileged location — close to everything, wrapped in silence — Pueblo offers a simple, connected and peaceful way of living from day one.
              </p>
            </div>
          </div>
          <div className="relative h-[480px] overflow-hidden bg-brand-soft hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://puebloladehesa.cl/cdn/shop/files/Locacion_AEREA_1_1_38dd9d39-992c-4897-9b6f-cd9711ae23fb.webp"
              alt="Aerial view of La Dehesa valley"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Houses grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl mb-4 font-light">Our houses</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Each property offers a distinct experience, united by light, design and the calm of the surroundings.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              slug: "casa-doble-altura",
              name: "Casa Doble Altura",
              specs: "2 BEDROOMS / 2.5 BATHROOMS",
              desc: "Two levels and double height, designed for living with greater space and privacy between areas.",
              img: "https://puebloladehesa.cl/cdn/shop/files/07A1871_870b59a3-cea5-46af-a04f-16711cf0bdd6_1.webp",
            },
            {
              slug: "casa-parque",
              name: "Casa Parque",
              specs: "2 BEDROOMS / 2 BATHROOMS",
              desc: "A ground floor that opens onto the park, with a terrace as the natural extension of the home.",
              img: "https://puebloladehesa.cl/cdn/shop/files/07A9319_9e57ed7b-b137-4536-ae8e-abfc85a8aeec_1.webp",
            },
            {
              slug: "casa-panoramica",
              name: "Casa Panorámica",
              specs: "2 BEDROOMS / 2 BATHROOMS",
              desc: "A second floor with open views of the Andes and a heightened sense of perspective.",
              img: "https://puebloladehesa.cl/cdn/shop/files/07A0248.jpg",
            },
            {
              slug: "casa-suite",
              name: "Casa Suite",
              specs: "1 BEDROOM / 1.5 BATHROOMS",
              desc: "One bedroom with the greatest interior space and a more open, expansive experience.",
              img: "https://puebloladehesa.cl/cdn/shop/files/IMG_0011_1.webp",
            },
          ].map((casa) => (
            <Link
              key={casa.slug}
              href={`/en/houses/${casa.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-soft mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={casa.img}
                  alt={casa.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-brand-ink mb-2">
                {casa.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">
                {casa.specs}
              </p>
              <p className="text-sm text-brand-muted leading-relaxed mb-4">
                {casa.desc}
              </p>
              <span className="inline-flex items-center text-sm text-brand-ink group-hover:text-brand-accent transition-colors">
                view more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flexible stays promo bar */}
      <section className="py-section bg-brand-ink text-white">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light">Flexible stays</h2>
              <p className="mt-3 text-white/80 text-lg max-w-2xl">
                Book for short, medium and long-term stays.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/en/stays" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-accent text-white font-medium hover:bg-brand-accent/90 transition-colors">
                Book
              </Link>
              <Link href="/en/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition-colors">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences gallery */}
      <section className="bg-brand-soft py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-12">
            <div className="max-w-3xl">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-brand-ink leading-tight mb-6">
                Experiences that bring Pueblo to life
              </h2>
              <p className="text-brand-muted text-lg leading-relaxed">
                Beyond enjoying Pueblo itself, we organise experiences across three worlds — nature,
                pause and community — that start at Pueblo and expand into its surroundings: from
                hikes, yoga classes, to explorations connecting the Andes, ski resorts and the coast.
              </p>
            </div>
            <Link
              href="/en/experiences"
              className="hidden lg:inline-flex items-center gap-3 text-sm uppercase tracking-widest text-brand-ink hover:text-brand-accent transition-colors whitespace-nowrap"
            >
              See all <span className="text-2xl">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "https://puebloladehesa.cl/cdn/shop/files/Cabalgata.png", tag: "Nature", title: "Horseback riding at sunset" },
              { src: "https://puebloladehesa.cl/cdn/shop/files/trekking_1.webp", tag: "Nature", title: "Trekking in the Andes" },
              { src: "https://puebloladehesa.cl/cdn/shop/files/Jardin_07A9818_1.webp", tag: "Pause", title: "Garden and silence" },
              { src: "https://puebloladehesa.cl/cdn/shop/files/vida_en_comunidad_07A0078_1_7bdc8b09-9b68-4924-a72c-3bea87f72e31.webp", tag: "Community", title: "Shared living" },
            ].map((exp, i) => (
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
              href="/en/experiences"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-brand-ink hover:text-brand-accent transition-colors"
            >
              See all experiences <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote parallax */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://puebloladehesa.cl/cdn/shop/files/07A1871_870b59a3-cea5-46af-a04f-16711cf0bdd6_1.webp"
          alt="Pueblo La Dehesa with views of the Andes"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="relative h-full flex items-center px-6 lg:px-16">
          <div className="max-w-2xl">
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
              The village life we seek today, with nature and calm, without leaving the city
            </p>
          </div>
        </div>
      </section>

      {/* Life in Pueblo — 2 large images */}
      <section className="py-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Life in Pueblo</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              Spaces designed for calm living, integrated into the landscape of La Dehesa.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { src: "https://puebloladehesa.cl/cdn/shop/files/07A0373_1_9306cd35-d2d4-4c49-b3de-55aa005f487c.webp", alt: "Interior with views of the Andes" },
              { src: "https://puebloladehesa.cl/cdn/shop/files/07A9353_1_1.webp", alt: "Terrace and park at Pueblo La Dehesa" },
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

      {/* Contact form with info column */}
      <section className="py-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-ink mb-6">
                We&apos;re here to help you
              </h2>
              <p className="text-brand-muted leading-relaxed mb-10">
                If you&apos;d like more details or to arrange a visit, get in touch.
              </p>
              <div className="space-y-6 text-brand-muted">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-ink mb-1">Address</p>
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
                  <input name="name" required placeholder="Name" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                  <input name="email" type="email" required placeholder="Email address" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                </div>
                <input name="phone" type="tel" placeholder="Phone" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                <textarea name="message" required rows={4} placeholder="Message" className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                <button type="submit" className="justify-self-start px-8 py-4 rounded-full bg-brand-accent text-white font-medium hover:bg-brand-accent/90 transition-colors">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
