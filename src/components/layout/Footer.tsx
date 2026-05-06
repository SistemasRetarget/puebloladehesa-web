"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type FooterProps = {
  locale?: "es" | "en";
};

export default function Footer({ locale = "es" }: FooterProps) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@puebloladehesa.com";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56984148269";
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/puebloladehesa/";
  const fb = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://web.facebook.com/profile.php?id=61570670461777";

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const pushEvent = (name: string, params: Record<string, unknown> = {}) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: name, ...params });
    }
  };

  const submitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      if (res.ok) {
        setNewsletterStatus("ok");
        setNewsletterEmail("");
        pushEvent("newsletter_subscribe", { location: "footer" });
      } else {
        setNewsletterStatus("error");
      }
    } catch {
      setNewsletterStatus("error");
    }
  };

  const exploreLinks = locale === "en"
    ? [
        { label: "About", href: "/en/about" },
        { label: "Stays", href: "/en/stays" },
        { label: "Experiences", href: "/en/experiences" },
        { label: "La Casita Gourmet", href: "/en/la-casita" },
        { label: "Location", href: "/en/location" }
      ]
    : [
        { label: "Nosotros", href: "/nosotros" },
        { label: "Estadías", href: "/estadias" },
        { label: "Experiencias", href: "/experiencias" },
        { label: "La Casita Salón Gourmet", href: "/la-casita" },
        { label: "Ubicación", href: "/ubicacion" }
      ];

  const legalLinks = locale === "en"
    ? [
        { label: "Terms & Conditions", href: "/en/terms" },
        { label: "Privacy Policy", href: "/en/privacy" }
      ]
    : [
        { label: "Términos y condiciones", href: "/legal/terminos-y-condiciones" },
        { label: "Políticas de privacidad", href: "/legal/politicas-de-privacidad" }
      ];

  return (
    <footer className="bg-black text-white">

      {/* Sección logo centrado — fila propia, fondo negro */}
      <div className="py-16 flex justify-center items-center border-b border-white/10">
        <Image
          src="/logo-pueblo.svg"
          alt="Pueblo La Dehesa"
          width={120}
          height={120}
          className="w-28 h-auto invert"
        />
      </div>

      {/* Columnas principales */}
      <div className="max-w-container mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Dirección + contacto + redes */}
          <div>
            <p className="text-sm text-white/70 leading-relaxed">
              Santa Blanca 550, Lo Barnechea,<br />
              Región Metropolitana, Chile
            </p>
            <p className="text-sm text-white/70 mt-4">
              <a href={`mailto:${email}`} onClick={() => pushEvent("click_email", { location: "footer" })} className="hover:text-white transition-colors">{email}</a><br />
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" onClick={() => pushEvent("click_whatsapp", { location: "footer" })} className="hover:text-white transition-colors">
                +{whatsapp.slice(0, 2)} {whatsapp.slice(2, 3)} {whatsapp.slice(3, 7)} {whatsapp.slice(7)}
              </a>
            </p>
            <div className="mt-6 flex gap-4">
              <a href={fb} target="_blank" rel="noopener" aria-label="Facebook" onClick={() => pushEvent("click_social", { network: "facebook" })} className="hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"/>
                </svg>
              </a>
              <a href={ig} target="_blank" rel="noopener" aria-label="Instagram" onClick={() => pushEvent("click_social", { network: "instagram" })} className="hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Explora */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-5">{locale === "en" ? "Explore" : "Explora"}</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-sm font-medium mb-5 leading-snug">
              {locale === "en"
                ? "Join our newsletter and be the first to know"
                : "Únete a nuestro newsletter y sé el primero en enterarte de todo"}
            </h4>
            <form onSubmit={submitNewsletter} className="flex items-end border-b border-white/40 pb-1 gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={locale === "en" ? "Email address" : "Correo electrónico"}
                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-white/40 py-2"
                aria-label={locale === "en" ? "Email" : "Correo electrónico"}
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="text-xs uppercase tracking-widest font-medium py-2 hover:opacity-70 transition-opacity shrink-0"
              >
                {newsletterStatus === "loading" ? "…" : locale === "en" ? "Subscribe" : "Enviar"}
              </button>
            </form>
            {newsletterStatus === "ok" && (
              <p className="text-xs text-green-400 mt-2">
                {locale === "en" ? "Thanks! You're subscribed." : "¡Gracias! Quedaste suscrito."}
              </p>
            )}
            {newsletterStatus === "error" && (
              <p className="text-xs text-red-400 mt-2">
                {locale === "en" ? "Something went wrong. Try again." : "Algo falló. Intenta de nuevo."}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-6 text-xs text-white/50">
          <div className="mb-3">
            <Link href={locale === "en" ? "/" : "/en"} className="inline-flex items-center gap-1 hover:text-white transition-colors">
              {locale === "en" ? "English" : "Español"}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M5 7L1 3h8L5 7z"/>
              </svg>
            </Link>
          </div>
          <p>
            Copyright © {new Date().getFullYear()}, <Link href="/" className="hover:text-white transition-colors">Pueblo La Dehesa</Link>.{" "}
            {locale === "en" ? "All rights reserved" : "Todos los derechos reservados"}
          </p>
          <p className="mt-1">
            {locale === "en" ? "Made by" : "Creado por"}{" "}
            <a href="https://lab51.cl" target="_blank" rel="noopener" className="hover:text-white transition-colors text-white/70">Lab51</a>
          </p>
        </div>
      </div>

    </footer>
  );
}
