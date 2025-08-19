import { createTheme } from "@mui/material/styles";

const theme = createTheme({
   shape: {
    borderRadius: 1, // Por defecto es 4. Puedes poner cualquier valor.
  },
 palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ba835a',
    },
    background: {
      default: '#f0edff',
      paper: '#f8f6ff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.6)',
    },
  },
  typography: {
    h1: {
      letterSpacing: '-0.05em',
    },
  },

});

export default theme;