// src/pages/Home.jsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ImageCarousel from "../components/Carousel"; // Asegúrate de que la ruta sea correcta

// Tus imágenes de ejemplo (pueden ser URLs o importaciones si están en tu proyecto)
const carouselImages = [
  "https://images.unsplash.com/photo-1579975096649-e773152b04cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWRvcmFjaSVDMyVCM24lMjBkZSUyMGxhJTIwaWdsZXNpYXxlbnwwfHwwfHx8MA%3D%3D",
  "https://i.pinimg.com/originals/8b/e8/60/8be86059e88824b17e1bacc0619d0b77.jpg",
  "https://w7.pngwing.com/pngs/947/809/png-transparent-people-inside-the-building-dancing-worship-church-service-christian-church-pastor-event-christianity-performance-stage.png",
  "https://images.unsplash.com/photo-1503978581482-e06dc278d5c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9uZG8lMjBkZSUyMGFkb3JhY2lvbnxlbnwwfHwwfHx8MA%3D%3D",
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
