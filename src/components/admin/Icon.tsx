"use client";

import React from "react";

/**
 * Icono del step-nav (top-left). Acts as "back to admin home" button
 * shown in every CMS view.
 */
const Icon: React.FC = () => (
  <span
    role="img"
    aria-label="Volver al inicio del admin"
    className="pld-back-admin"
  >
    <span aria-hidden="true" style={{ fontSize: "0.95rem", lineHeight: 1 }}>←</span>
    <span>Admin</span>
  </span>
);

export default Icon;
