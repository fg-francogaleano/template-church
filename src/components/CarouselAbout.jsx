import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Stack,
  Grid,
} from "@mui/material";
import {
  ArrowBackIosNewOutlined as ArrowBackIosNewOutlinedIcon,
  ArrowForwardIosOutlined as ArrowForwardIosOutlinedIcon,
} from "@mui/icons-material";

const values = [
  {
    title: "Ganar",
    description:
      "Es la presentación del evangelio para que las personas reciban a Jesucristo como Señor y Salvador.",
    verse: "El fruto del justo es árbol de vida, y el que gana almas es sabio.",
    bibleQuote: "Proverbios 11:30",
  },
  {
    title: "Consolidar",
    description:
      "Es el cuidado del nuevo creyente, ayudándolo en sus primeros pasos y resolviendo sus dudas básicas.",
    verse:
      "Arraigados y sobreedificados en él, y confirmados en la fe, así como habéis sido enseñados, abundando en acciones de gracias.",
    bibleQuote: "Colosenses 2:7",
  },
  {
    title: "Díscipular",
    description:
      "Es la formación del carácter de Cristo por medio de la Biblia, la oración y la comunión, para fortalecer la fe.",
    verse:
      "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo;",
    bibleQuote: "Mateo 28:19",
  },
  {
    title: "Enviar",
    description:
      "Enviar al creyente maduro como líder para ganar, consolidar, discipular y enviar a otros.",
    verse:
      "Entonces Jesús les dijo otra vez: Paz a vosotros. Como me envió el Padre, así también yo os envío.",
    bibleQuote: "Juan 20:21",
  },
];

const CarouselAbout = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % values.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? values.length - 1 : prevIndex - 1
    );
  };

  // Efecto para la transición automática
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000); // Cambia de diapositiva cada 5 segundos
    return () => clearTimeout(timer);
  }, [activeIndex]); // Re-ejecuta el efecto cuando cambia el índice

  return (
    <Box
      sx={{
        border:"solid 1px blue",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        position: "relative",
        px: { xs: 2, sm: 4 },
        py: 1,
        overflow: "hidden",
        // border:"solid 1px red"
      }}
    >
      {/* Carrusel de tarjetas */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${activeIndex * 100}%)`,
          width: "100%",
        }}
      >
        {values.map((value, index) => (
          <Box key={index} sx={{ flexShrink: 0, width: "100%", p: 4 }}>
            <Card
              sx={{
                bgcolor:"inherit",
                textAlign: "center",
                boxShadow: "none",
                transition: "transform 0.3s, box-shadow 0.3s",
                my: "auto"
              }}
            >
              <CardContent
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "primary.main",
                    mb: 1.5,
                  }}
                >
                  {value.title}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    fontSize: "18px",
                    letterSpacing: 1,                   
                  }}
                >
                  {`"${value.verse}"`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "",
                    lineHeight: 1.6,
                    fontSize: "18px",
                    textTransform: 'uppercase',
                    fontWeight:600
                  }}
                >
                  {`${value.bibleQuote}`}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Botones de navegación (anterior/siguiente) */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          //   bgcolor: 'rgba(255, 255, 255, 0.7)',
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
          display: { xs: "none", md: "inline-flex" }, // Ocultar en dispositivos móviles
        }}
      >
        <ArrowBackIosNewOutlinedIcon onClick={handlePrev} />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          //   bgcolor: 'rgba(255, 255, 255, 0.7)',
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
          display: { xs: "none", md: "inline-flex" }, // Ocultar en dispositivos móviles
        }}
      >
        <ArrowForwardIosOutlinedIcon />
      </IconButton>

      {/* Indicadores de navegación (puntos) */}
      <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
        {values.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: 10,
              height: 10,
              p: 0,
              borderRadius: "50%",
              bgcolor: activeIndex === index ? "primary.main" : "text.disabled",
              "&:hover": {
                bgcolor:
                  activeIndex === index ? "primary.main" : "text.secondary",
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default CarouselAbout;
