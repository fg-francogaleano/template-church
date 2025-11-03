import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";

// --- Styled Components para el carrusel ---
// Usamos `styled` para aplicar estilos complejos y estados de hover al contenedor de la imagen
const CarouselImageWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "120vh", // Altura fija para el carrusel
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", // Oculta partes de la imagen que excedan el contenedor
  position: "relative", // Para posicionar las flechas
  borderRadius: theme.shape.borderRadius, // Opcional: bordes redondeados
  boxShadow: theme.shadows[3], // Opcional: sombra para el carrusel
  // Nuevo: corte oblicuo en la parte inferior
  // clipPath: "polygon(0% 0%, 100% 0%, 100% 90%, 70% 100%, 0% 90%)",
  [theme.breakpoints.down("sm")]: {
    height: "250px", // Altura más pequeña en móviles
    // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 98%)",
  },
}));

const CarouselImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover", // Cubre el área manteniendo la relación de aspecto
  transition: "opacity 0.7s ease-in-out", // Suave transición de opacidad
  display: "block",
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.4)", // Fondo semitransparente para las flechas
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Oscurece al pasar el ratón
  },
  zIndex: 1, // Asegura que las flechas estén por encima de la imagen
}));

const DotContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  bottom: "50px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
  backgroundColor: "rgba(0,0,0,0.3)", // Fondo semitransparente para los puntos
  borderRadius: "15px", // Bordes redondeados para el fondo de los puntos
  padding: "5px ", // Padding interno
});

const Dot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active", // Evita que 'active' se pase al DOM
})(({ theme, active }) => ({
  width: active ? "25px" : "5px",
  height: "5px",
  borderRadius: active ? "8px" : "30px",
  outline: "solid 1px grey",
  margin: "0 4px",
  cursor: "pointer",
  transition: "width 0.5s ease-in-out",
}));

// --- Componente principal del carrusel ---
function Carousel({ images, autoPlay = true, autoPlayInterval = 3000 }) {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para avanzar a la siguiente imagen
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Función para retroceder a la imagen anterior
  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Efecto para el auto-play
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const intervalId = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(intervalId); // Limpiar al desmontar
    }
  }, [autoPlay, autoPlayInterval, goToNext, images.length]);

  if (!images || images.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        No hay imágenes para mostrar en el carrusel.
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: "100%", minHeight: "120vh" }}>
        <CarouselImageWrapper>
          {/* Botón de navegación anterior */}
          {/* <NavigationButton onClick={goToPrevious} sx={{ left: 8 }}>
            <ArrowBackIosNewIcon />
          </NavigationButton> */}

          {/* Imagen actual del carrusel */}
          {images.map((image, index) => (
            <CarouselImage
              key={index}
              src={image}
              alt={`Carousel Image ${index + 1}`}
              sx={{
                position: "absolute", // Superpone todas las imágenes
                opacity: currentIndex === index ? 1 : 0, // Solo la imagen actual es visible
              }}
            />
          ))}

          {/* Botón de navegación siguiente */}
          {/* <NavigationButton onClick={goToNext} sx={{ right: 8 }}>
            <ArrowForwardIosIcon />
          </NavigationButton> */}
        </CarouselImageWrapper>

        {/* Indicadores de puntos (dots) */}
        {images.length > 1 && (
          <DotContainer>
            {images.map((_, index) => (
              <Dot
                key={index}
                active={currentIndex === index}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </DotContainer>
        )}
      </Box>
    </>
  );
}

export default Carousel;
