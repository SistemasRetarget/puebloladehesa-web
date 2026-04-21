export const metadata = { title: "Contacto" };

export default function Contacto() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="font-serif text-5xl mb-6">Contacto</h1>
      <p className="text-brand-muted mb-10">
        Escríbenos por WhatsApp o envíanos un mensaje y te responderemos pronto.
      </p>
      {wa && (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener"
          className="inline-block px-8 py-3 bg-green-500 text-white hover:bg-green-600 transition mb-8"
        >
          Escribir por WhatsApp
        </a>
      )}
      <form className="space-y-4" action="/api/contact" method="post">
        <input name="nombre" required placeholder="Nombre" className="w-full border border-brand-soft px-4 py-3 bg-white" />
        <input name="email" type="email" required placeholder="Email" className="w-full border border-brand-soft px-4 py-3 bg-white" />
        <textarea name="mensaje" required rows={5} placeholder="Mensaje" className="w-full border border-brand-soft px-4 py-3 bg-white" />
        <button type="submit" className="px-8 py-3 bg-brand-ink text-white hover:bg-brand-accent transition">Enviar</button>
      </form>
    </div>
  );
}
