import React from "react";

function XIcon({ fontSize = "medium" }) {
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };
  const finalSize = iconSizes[fontSize] || iconSizes.medium;
  return (
    <i
      className="bi bi-twitter-x"
      style={{ fontSize: finalSize, background: "white" }}
    ></i>
  );
}

export default XIcon;
