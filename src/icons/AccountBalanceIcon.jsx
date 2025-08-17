import { useTheme } from '@mui/material';

function AccountBalanceIcon({ fontSize = "medium" }) {
    const theme = useTheme();
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };
  const finalSize = iconSizes[fontSize] || iconSizes.medium;
  return <i className="bi bi-bank" style={{ fontSize: finalSize, color:"grey" }}></i>;
}

export default AccountBalanceIcon;