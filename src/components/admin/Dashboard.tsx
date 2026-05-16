import React from "react";
import { Gutter } from "@payloadcms/ui";
import type { AdminViewServerProps } from "payload";

const SHORTCUTS = [
  { href: "/admin/collections/houses",  title: "Casas",                  desc: "Fichas, galerías y descripciones",            icon: "🏡" },
  { href: "/admin/collections/pages",   title: "Páginas",                desc: "Home, Nosotros, Experiencias, Contacto",      icon: "📄" },
  { href: "/admin/collections/media",   title: "Imágenes",               desc: "Sube fotos y vincúlalas al sitio",            icon: "🖼" },
  { href: "/admin/collections/users",   title: "Usuarios",               desc: "Administradores y editores",                  icon: "👤" },
  { href: "/",                          title: "Ver sitio",              desc: "Abre el sitio público en otra pestaña",       icon: "🌐" },
  { href: "/api/graphql-playground",    title: "GraphQL",                desc: "Consola para desarrolladores",                icon: "⚡" },
];

const Dashboard: React.FC<AdminViewServerProps> = ({ initPageResult }) => {
  const user = initPageResult.req.user as { name?: string; email?: string } | null;
  const userName = user?.name || user?.email || "editor";

  return (
    <Gutter>
      <div className="pld-welcome">
        <h2>Hola, {userName}</h2>
        <p>
          Panel de administración de Pueblo La Dehesa. Editá casas,
          páginas e imágenes — los cambios se reflejan en el sitio al guardar.
        </p>
      </div>

      <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", marginBottom: "0.875rem", fontWeight: 600 }}>
        Accesos rápidos
      </h3>

      <div className="pld-shortcuts">
        {SHORTCUTS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="pld-shortcut"
            target={s.href.startsWith("/admin") ? "_self" : "_blank"}
            rel="noopener"
          >
            <span className="pld-shortcut__icon" aria-hidden="true">{s.icon}</span>
            <div className="pld-shortcut__title">{s.title}</div>
            <p className="pld-shortcut__desc">{s.desc}</p>
          </a>
        ))}
      </div>

      <div className="pld-cache-section">
        <h3>Caché del sitio</h3>
        <p>Forzá la actualización de todas las páginas. Útil si un cambio no se refleja todavía.</p>
      </div>

      <div className="pld-footer">
        <img
          src="https://retarget.cl/wp-content/uploads/2026/01/logotipo-scaled.png"
          alt="Retarget"
          style={{ height: 26, width: "auto", objectFit: "contain" }}
        />
      </div>
    </Gutter>
  );
};

export default Dashboard;
