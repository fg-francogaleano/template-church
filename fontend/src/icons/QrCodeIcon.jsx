function QrCodeIcon({ fontSize = "medium" }) {
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };
  const finalSize = iconSizes[fontSize] || iconSizes.medium;
  <i class="bi bi-qr-code"></i>
  return <i className="bi bi-qr-code" style={{ fontSize: finalSize, color:"grey" }}></i>
}

export default QrCodeIcon;