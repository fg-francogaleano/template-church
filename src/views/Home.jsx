// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import ImageCarousel from "../components/Carousel";
import { sanityClient } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Tus imágenes de ejemplo (pueden ser URLs o importaciones si están en tu proyecto)
// const carouselImages = [
//   "https://images.unsplash.com/photo-1579975096649-e773152b04cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWRvcmFjaSVDMyVCM24lMjBkZSUyMGxhJTIwaWdsZXNpYXxlbnwwfHwwfHx8MA%3D%3D",
//   "https://i.pinimg.com/originals/8b/e8/60/8be86059e88824b17e1bacc0619d0b77.jpg",
//   "https://w7.pngwing.com/pngs/947/809/png-transparent-people-inside-the-building-dancing-worship-church-service-christian-church-pastor-event-christianity-performance-stage.png",
//   "https://images.unsplash.com/photo-1503978581482-e06dc278d5c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9uZG8lMjBkZSUyMGFkb3JhY2lvbnxlbnwwfHwwfHx8MA%3D%3D",
// ];
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
function Home() {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const query = `*[_type == "carousel"][0]{ carrusel }`;
      const result = await sanityClient.fetch(query);

      const urls = result.carrusel.map((img) => {
        try {
          return urlFor(img).width(1600).url();
        } catch (e) {
          console.error("Imagen inválida en Sanity:", img, e);
          return null;
        }
      });

      setCarouselImages(urls.filter(Boolean)); // filtra los null
    };

    fetchImages();
  }, []);
  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <ImageCarousel
          images={carouselImages}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          minHeight: "100vh",
          zIndex: "999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h2" sx={{ color: "white" }}>
          Bienvenido
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
