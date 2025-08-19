import React from "react";

function FacebookIcon({ fontSize = "medium" }) {
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };
  const finalSize = iconSizes[fontSize] || iconSizes.medium;
  return <i className="bi bi-facebook" style={{ fontSize: finalSize }}></i>;
}

export default FacebookIcon;
