import React from "react";

function FacebookIcon({ fontSize = "medium", color }) {
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };
  const finalSize = iconSizes[fontSize] || iconSizes.medium;
  return <i className="bi bi-facebook" style={{ fontSize: finalSize, color }}></i>;
}

export default FacebookIcon;
