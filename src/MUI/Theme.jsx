import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shape: {
    // ... (Tu configuración actual) ...
    borderRadius: 1,
  },
  palette: {
    // ... (Tu configuración actual de paleta) ...
    mode: "light",
    primary: {
      main: "#0a0a0a",
      light: "#434343",
      dark: "#262626",
      800: "#262626",
      700: "#434343",
      600: "#555555",
      500: "#7b7b7b",
      400: "#9d9d9d",
      300: "#c4c4c4",
      200: "#d9d9d9",
      100: "#e9e9e9",
      50: "#f5f5f5",
    },
    secondary: {
      main: "#ba835a",
    },
    background: {
      default: "#f0edff",
      default1: "#e7e7e6",
      paper: "#f8f6ff",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "rgba(0,0,0,0.6)",
    },
  },
  typography: {
    // 👇 AÑADE ESTO PARA CONFIGURAR POPPINS GLOBALMENTE
    fontFamily: [
      "Poppins", // La fuente principal
      "sans-serif", // Fuente de reserva estándar
    ].join(","),
    // -----------------------------------------------------

    h1: {
      letterSpacing: "-0.05em",
    },
    // Opcional: También podrías definir el h1, h2, etc., individualmente si lo deseas
    // h2: {
    //    fontFamily: 'Poppins',
    // },
  },
});

export default theme;
