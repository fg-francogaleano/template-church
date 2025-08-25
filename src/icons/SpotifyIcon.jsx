import { useTheme } from '@mui/material';

function SpotifyIcon({ fontSize = "medium", color }) {
    const theme = useTheme();
  const iconSizes = {
    small: "18px",
    medium: "24px",
    large: "32px",
  };
  const finalSize = iconSizes[fontSize] || iconSizes.medium;
  return <i className="bi bi-spotify" style={{ fontSize: finalSize, color }}></i>;
}

export default SpotifyIcon;