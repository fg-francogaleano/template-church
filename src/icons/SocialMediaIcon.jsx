import React from "react";

function SocialMediaIcon({ fontSize = "medium", color, socialMedia }) {
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };
  const finalSize = iconSizes[fontSize] || iconSizes.medium;
  return <i className={`bi bi-${socialMedia}`} style={{ fontSize: finalSize, color, padding:"0px 7px" }}></i>;
}

export default SocialMediaIcon;
