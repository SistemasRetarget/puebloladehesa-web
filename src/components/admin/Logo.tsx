import React from "react";

const Logo: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0" }}>
    <img
      src="https://retarget.cl/wp-content/uploads/2026/01/logotipo-scaled.png"
      alt="Retarget"
      style={{ height: 36, width: "auto", objectFit: "contain" }}
    />
    <div style={{ lineHeight: 1.1 }}>
      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#6AB5AF" }}>
        Pueblo La Dehesa
      </div>
      <div style={{ fontSize: "0.7rem", color: "#D7632C", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
        Panel CMS
      </div>
    </div>
  </div>
);

export default Logo;
