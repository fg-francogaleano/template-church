import { createTheme } from "@mui/material/styles";

const theme = createTheme({
   shape: {
    borderRadius: 1, // Por defecto es 4. Puedes poner cualquier valor.
  },
 palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#434343',
      dark: '#262626',
      800: '#262626',
      700: '#434343',
      600: '#555555',
      500: '#7b7b7b',
      400: '#9d9d9d',
      300: '#c4c4c4',
      200: '#d9d9d9',
      100: '#e9e9e9',
      50:  '#f5f5f5'
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