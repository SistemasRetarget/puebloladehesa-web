import React from "react";

const Icon: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      width: 32, height: 32, borderRadius: 8,
      background: "linear-gradient(135deg, #6AB5AF 0%, #D7632C 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: 16
    }}
  >
    P
  </div>
);

export default Icon;
