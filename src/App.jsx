import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import Home from "./views/Home";
import About from "./views/About";
import Sermons from "./views/Sermons";
import Donate from "./views/Donate";
import Contact from "./views/Contact";
import Footer from "./components/Footer";
import NavBar from "./components/NavBAr";
import Events from "./views/Events";
import Landing from "./views/Landing";
import { sanityClient } from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function App() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [showLanding, setShowLanding] = useState(true);
  const [logoPosition, setLogoPosition] = useState(null);
  const navLogoRef = useRef(null);
// console.log(logoPosition);

  // Este useEffect maneja la lógica de la animación
  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {   
      const logoEl = document.getElementById("logo");
      if (logoEl) {
        const rect = logoEl.getBoundingClientRect();
        setLogoPosition({
          y: rect.top,
          x: rect.left,
        });
      }
    
  }, [showLanding]);

  // La lógica para la carga de imágenes se mantiene igual
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const query = `*[_type == "carousel"] | order(orderRank)`;
        const result = await sanityClient.fetch(query);
        if (!result) {
          setCarouselImages([]);
          return;
        }
        const urls = result.map((img) => {
          try {
            return urlFor(img.image).width(1600).url();
          } catch (e) {
            console.error("Error al generar la URL de la imagen:", img, e);
            return null;
          }
        });
        setCarouselImages(urls.filter(Boolean));
      } catch (error) {
        console.error("Error fetching carousel images:", error);
        setCarouselImages([]);
      }
    };
    fetchImages();
  }, []);
  // console.log(logoPosition);

  return (
    <>
      <>
        <Box component="header">
          <NavBar ref={navLogoRef} hidden={showLanding} />
        </Box>
      </>
      {showLanding ? (
        <>
          <Landing logoPosition={logoPosition} />
        </>
      ) : (
        <>
          <Box component="main">
            <Box component="section" id="inicio">
              <Home
                carouselImages={carouselImages}
                setCarouselImages={setCarouselImages}
              />
            </Box>
            <Box component="section" id="nosotros">
              <About />
            </Box>
            <Box component="section" id="eventos">
              <Events />
            </Box>
            <Box component="section" id="ofrendar">
              <Donate />
            </Box>
            <Box component="section" id="contacto">
              <Contact />
            </Box>
          </Box>
          <Box component="footer">
            <Footer />
          </Box>
        </>
      )}
    </>
  );
}

export default App;
