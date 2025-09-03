import { useTheme } from '@mui/material';

function Calculator ({ fontSize = "medium", color }) {
    const theme = useTheme();
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };
  const finalSize = iconSizes[fontSize] || iconSizes.medium;
  return <i className="bi bi-calculator" style={{ fontSize: finalSize, color }}></i>;
}

export default Calculator;