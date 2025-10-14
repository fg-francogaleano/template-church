// src/components/FeaturedBanner.jsx (Crear este nuevo archivo)

import { Box, Typography, styled, useTheme } from "@mui/material";
import React from "react";

// Estilo del contenedor principal (replicando .time)
const StyledBannerContainer = styled(Box)(({ theme }) => ({
  // Estilos base de la etiqueta
  textTransform: "uppercase",
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '14px', // Ajustado para ser 'small' como el Chip original (0.7rem es approx 11.2px, 14px es más legible)
  lineHeight: 1.2,
  fontWeight: 700, // Lo hacemos más atrevido
  visibility: 'visible',
  boxSizing: 'border-box',
  display: 'inline-block',
  
  // Estilos visuales migrados:
  backgroundColor: theme.palette.secondary.main, // Usamos el color secundario
  color: theme.palette.common.white, // Texto blanco
  
  // Posicionamiento de la bandera:
  marginLeft: -15, // Mueve el bloque hacia la izquierda
  paddingLeft: 15, // Compensa el margen exterior para que el texto empiece en la posición deseada
  paddingRight: 10,
  paddingTop: 5,
  paddingBottom: 5,
  marginBottom: 0, // Quitamos el margen inferior, el posicionamiento absoluto lo anulará.
  position: 'relative', // Necesario para que el pseudo-elemento se posicione correctamente
  
  // Recreación del bisel inferior usando :after
  "&::after": {
    position: 'absolute',
    bottom: -10, // El tamaño del triángulo es 10px
    left: 0,
    content: '""',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '0 10px 10px 0', // [top] [right] [bottom] [left] -> solo queremos right/bottom
    
    // Color del borde: ligeramente más oscuro que el fondo (secondary.dark)
    borderColor: `transparent ${theme.palette.secondary.dark} transparent transparent`,
  },
}));

/**
 * Componente que renderiza la etiqueta "Destacado" con un estilo de banner biselado.
 */
const FeaturedBanner = ({ label = "Destacado", sx = {} }) => {
  return (
    <StyledBannerContainer sx={sx}>
      <Typography 
        variant="button" // usa la tipografía de botón (uppercase)
        component="span" 
        color="inherit" 
        sx={{ 
            fontSize: 'inherit',
            fontWeight: 'inherit',
        }}
      >
        {label}
      </Typography>
    </StyledBannerContainer>
  );
};

export default FeaturedBanner;