// src/pages/Home.jsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ImageCarousel from "../components/Carousel"; // Asegúrate de que la ruta sea correcta

// Tus imágenes de ejemplo (pueden ser URLs o importaciones si están en tu proyecto)
const carouselImages = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGa7Kcri3BdGzts3SUv8f-Ji76zmKO02z8QnQuMQDdfhbZ9UsEhsyGxaKwtDCLe4n7XcdFtrSLKkiufmGJysY3CWln1vpuchKaq2lN4IFeCkQxBlV3v41s7n_Fe35keT_w-wkN6sgPhhQ/s1600/adorando2-520x245.jpg",
  "https://www.bibliatodo.com/Reflexiones-Cristianas/wp-content/uploads/2024/06/Que-prioridad-debe-tener-la-adoracion-en-la-iglesia.jpg",
  "https://noticiacristiana.com/wp-content/uploads/2021/07/es-la-adoracion-en-las-iglesias-mas-pagana-que-cristiana.jpg",
  "https://casadediosoasisdebendicion.com/wp-content/uploads/2023/05/bible-worship-christian-1948778-1024x682.jpg",
];

function Home() {
  return (
    <Box>
      <Box>
        <ImageCarousel
          images={carouselImages}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      </Box>
    </Box>
  );
}

export default Home;
