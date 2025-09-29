import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import Home from "./views/Home";
import About from "./views/About";
import Sermons from "./views/Sermons";
import Donate from "./views/Donate";
import Contact from "./views/Contact";
import Footer from "./components/Footer";
import Events from "./views/Events";
import Landing from "./views/Landing";
import { sanityClient } from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import NavBar from "./components/NavBAr";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function App() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [showLanding, setShowLanding] = useState(true);
  const [logoPosition, setLogoPosition] = useState(null);
  const [activeSection, setActiveSection] = useState("inicio"); // 👈 Nuevo estado para la sección activa
  const navLogoRef = useRef(null);
  // console.log(logoPosition);

  // Este useEffect maneja la lógica de la animación
  // useEffect(() => {
  //   const timer = setTimeout(() => setShowLanding(false), 9000);
  //   return () => clearTimeout(timer);
  // }, []);

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

  // 🚀 Lógica para detectar la sección activa usando Intersection Observer
  // Lógica para el IntersectionObserver, se ha modificado la forma en que se maneja la intersección
  useEffect(() => {
    const sections = ["inicio", "nosotros", "eventos", "ofrendar", "contacto"];

    // Almacena las referencias a los observadores para poder limpiarlos
    const observers = sections
      .map((id) => {
        const section = document.getElementById(id);
        if (!section) return null;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
              }
            });
          },
          // Usamos un umbral pequeño para detectar la entrada al viewport más rápido
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.2, // Se dispara cuando el 20% de la sección es visible
          }
        );
        observer.observe(section);
        return observer;
      })
      .filter(Boolean);

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

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

  const handleFinish = () => {
    setTimeout(() => {
      setShowLanding(false);
    }, 0);
  };

  return (
    <>
      <>
        <Box component="header">
          {/* 👈 Pasamos el estado de la sección activa como prop */}
          <NavBar
            ref={navLogoRef}
            hidden={showLanding}
            activeSection={activeSection}
          />
        </Box>
      </>
      {showLanding ? (
        <>
          <Landing logoPosition={logoPosition} onFinish={handleFinish} />
        </>
      ) : (
        <>
          <Box component="main">
            <Box component="section" id="inicio" sx={{border: "solid 1px red"}}>
              <Home
                carouselImages={carouselImages}
                setCarouselImages={setCarouselImages}
              />
            </Box>
            <Box component="section" id="nosotros" >
              <About />
            </Box>

            <Box component="section" id="eventos" >
              <Events />
            </Box>
            <Box component="section" id="ofrendar"  >
              <Donate />
            </Box>
            <Box component="section" id="contacto" >
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
