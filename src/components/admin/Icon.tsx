import React from "react";

/**
 * Icono del step-nav (top-left). Acts as "back to admin home" button
 * shown in every CMS view.
 */
const Icon: React.FC = () => (
  <div
    role="img"
    aria-label="Volver al inicio del admin"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.4rem 0.75rem",
      borderRadius: 8,
      background: "var(--pld-surface, #fff)",
      border: "1.5px solid var(--pld-border, #e5e7eb)",
      color: "var(--pld-text, #1f1f1f)",
      fontWeight: 600,
      fontSize: "0.82rem",
      letterSpacing: "0.005em",
      transition: "transform 0.15s ease, border-color 0.15s ease, color 0.15s ease",
      whiteSpace: "nowrap"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateX(-2px)";
      e.currentTarget.style.borderColor = "var(--pld-orange, #D7632C)";
      e.currentTarget.style.color = "var(--pld-orange, #D7632C)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateX(0)";
      e.currentTarget.style.borderColor = "var(--pld-border, #e5e7eb)";
      e.currentTarget.style.color = "var(--pld-text, #1f1f1f)";
    }}
  >
    <span aria-hidden="true" style={{ fontSize: "1rem", lineHeight: 1 }}>←</span>
    <span>Admin</span>
  </div>
);

export default Icon;
