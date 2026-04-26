import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Pueblo La Dehesa",
  description: "Contáctanos por WhatsApp o envíanos un mensaje. Estamos aquí para responder tus preguntas sobre nuestras casas en La Dehesa.",
  keywords: "contacto Pueblo La Dehesa, WhatsApp, consultas propiedades",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Pueblo La Dehesa",
    description: "Ponte en contacto con nosotros para más información sobre nuestras propiedades.",
    type: "website",
    locale: "es_CL",
    url: "/contacto",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pueblo La Dehesa — Contacto" }]
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] }
};

export default async function Contacto({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const sp = await searchParams;
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <header className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">Contacto</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-brand-ink">Estamos aquí para ayudarte</h1>
        <p className="mt-4 text-brand-muted leading-relaxed">
          Si quieres conocer más detalles o coordinar una visita, escríbenos por WhatsApp o envía un mensaje.
        </p>
      </header>
      {sp.ok && (
        <div role="status" className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200">Gracias, hemos recibido tu mensaje.</div>
      )}
      {sp.error && (
        <div role="alert" className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200">Revisa los campos: {decodeURIComponent(sp.error)}</div>
      )}
      {wa && (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener" className="inline-block px-8 py-3 bg-green-500 text-white hover:bg-green-600 transition mb-8">
          Escribir por WhatsApp
        </a>
      )}
      <form className="space-y-4" action="/api/contact" method="post" noValidate>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px]" />
        <input name="nombre" required minLength={2} maxLength={100} placeholder="Nombre" className="w-full border border-brand-soft px-4 py-3 bg-white" />
        <input name="email" type="email" required placeholder="Email" className="w-full border border-brand-soft px-4 py-3 bg-white" />
        <textarea name="mensaje" required minLength={10} maxLength={2000} rows={5} placeholder="Mensaje" className="w-full border border-brand-soft px-4 py-3 bg-white" />
        <button type="submit" className="px-8 py-3 bg-brand-ink text-white hover:bg-brand-accent transition">Enviar</button>
        <p className="text-xs text-brand-muted mt-3">
          Este sitio está protegido por las políticas de privacidad y términos del sitio.
        </p>
      </form>

      {/* Feature bar de garantías (matches prod footer block) */}
      <ul className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center pt-12 border-t border-brand-line">
        <li>
          <p className="text-xs uppercase tracking-widest text-brand-muted mb-1">Reserva</p>
          <p className="font-serif text-base text-brand-ink">Por semanas o meses</p>
        </li>
        <li>
          <p className="text-xs uppercase tracking-widest text-brand-muted mb-1">Entorno</p>
          <p className="font-serif text-base text-brand-ink">Barrio seguro</p>
        </li>
        <li>
          <p className="text-xs uppercase tracking-widest text-brand-muted mb-1">Vista</p>
          <p className="font-serif text-base text-brand-ink">Cordillera</p>
        </li>
        <li>
          <p className="text-xs uppercase tracking-widest text-brand-muted mb-1">Calidad</p>
          <p className="font-serif text-base text-brand-ink">Aire limpio</p>
        </li>
      </ul>
    </div>
  );
}
