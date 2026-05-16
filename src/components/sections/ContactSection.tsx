type Props = {
  locale?: "es" | "en";
};

const T = {
  es: {
    title: "Estamos aquí para ayudarte",
    intro: "Si quieres conocer más detalles o coordinar una visita, escríbenos.",
    address: "Dirección",
    addressValue: "Av. Santa Blanca 550, Lo Barnechea,\nSantiago, Chile",
    email: "Email",
    whatsapp: "WhatsApp",
    name: "Nombre",
    emailField: "Correo electrónico",
    phone: "Teléfono",
    message: "Mensaje",
    submit: "Enviar mensaje",
  },
  en: {
    title: "We're here to help",
    intro: "If you'd like more details or want to schedule a visit, write to us.",
    address: "Address",
    addressValue: "Av. Santa Blanca 550, Lo Barnechea,\nSantiago, Chile",
    email: "Email",
    whatsapp: "WhatsApp",
    name: "Name",
    emailField: "Email",
    phone: "Phone",
    message: "Message",
    submit: "Send message",
  },
};

export default function ContactSection({ locale = "es" }: Props) {
  const t = T[locale];
  return (
    <section className="py-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-ink mb-6">
              {t.title}
            </h2>
            <p className="text-brand-muted leading-relaxed mb-10">{t.intro}</p>
            <div className="space-y-6 text-brand-muted">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-ink mb-1">{t.address}</p>
                <p className="whitespace-pre-line">{t.addressValue}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-ink mb-1">{t.email}</p>
                <a href="mailto:contacto@puebloladehesa.cl" className="hover:text-brand-accent transition-colors">
                  contacto@puebloladehesa.cl
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-ink mb-1">{t.whatsapp}</p>
                <a href="https://wa.me/56984148269" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                  +56 9 8414 8269
                </a>
              </div>
            </div>
          </div>
          <div>
            <form action="/api/contact" method="POST" className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="nombre" required placeholder={t.name} className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
                <input name="email" type="email" required placeholder={t.emailField} className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
              </div>
              <input name="phone" type="tel" placeholder={t.phone} className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
              <textarea name="mensaje" required rows={4} placeholder={t.message} className="w-full px-4 py-3 border border-brand-line rounded-md focus:outline-none focus:ring-1 focus:ring-brand-accent" />
              <button type="submit" className="justify-self-start px-8 py-4 rounded-full bg-brand-accent text-white font-medium hover:bg-brand-accent/90 transition-colors">
                {t.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
