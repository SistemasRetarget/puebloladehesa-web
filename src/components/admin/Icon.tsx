"use client";

import React from "react";

/**
 * Icono del step-nav (top-left). Acts as "back to admin home" button
 * shown in every CMS view.
 *
 * Uses inline styles directly so Payload's parent wrappers can't crop
 * or hide the content.
 */
const Icon: React.FC = () => {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    padding: "0.45rem 0.85rem",
    borderRadius: 8,
    background: "#ffffff",
    border: "1.5px solid #e5e7eb",
    color: "#1f1f1f",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
    fontWeight: 600,
    fontSize: "0.82rem",
    lineHeight: 1,
    letterSpacing: "0.005em",
    whiteSpace: "nowrap",
    width: "auto",
    minWidth: 92,
    height: "auto",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "transform 0.15s ease, border-color 0.15s ease, color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",
    textDecoration: "none",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };

  return (
    <span
      role="img"
      aria-label="Volver al inicio del admin"
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(-2px)";
        e.currentTarget.style.borderColor = "#D7632C";
        e.currentTarget.style.color = "#D7632C";
        e.currentTarget.style.background = "rgba(215,99,44,0.06)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(215,99,44,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.color = "#1f1f1f";
        e.currentTarget.style.background = "#ffffff";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "1rem", lineHeight: 1, display: "inline-block" }}>←</span>
      <span style={{ display: "inline-block", lineHeight: 1 }}>Admin</span>
    </span>
  );
};

export default Icon;
