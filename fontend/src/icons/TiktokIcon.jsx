import React from "react";

function TiktokIcon({ fontSize = "medium" }) {
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };

  const finalSize = iconSizes[fontSize] || iconSizes.medium;

  return <i className="bi bi-tiktok" style={{ fontSize: finalSize }}></i>;
}

export default TiktokIcon;
