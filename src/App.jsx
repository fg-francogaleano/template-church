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
import { useOnlineStatus } from "./hooks/useOnlineStatus"; // 👈 nuevo hook
import OfflineBanner from "./views/OfflineAlert"; // 👈 componente que ya tenés

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function App() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [showLanding, setShowLanding] = useState(true);
  const [logoPosition, setLogoPosition] = useState(null);
  const [activeSection, setActiveSection] = useState("inicio");
  const navLogoRef = useRef(null);
  const isOnline = useOnlineStatus(); // 👈 Detecta conexión

  // Recalcular posición del logo
  useLayoutEffect(() => {
    const logoEl = document.getElementById("logo");
    if (logoEl) {
      const rect = logoEl.getBoundingClientRect();
      setLogoPosition({ y: rect.top, x: rect.left });
    }
  }, [showLanding]);

  // Detectar sección activa
  useEffect(() => {
    const sections = ["inicio", "nosotros", "eventos", "ofrendar", "contacto"];
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
          { threshold: 0.2 }
        );
        observer.observe(section);
        return observer;
      })
      .filter(Boolean);

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  // 👇 Fetch de imágenes de Sanity (con reintento cuando vuelva el internet)
  useEffect(() => {
    if (!isOnline) return; // No intentar si no hay internet

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
            console.error("Error al generar URL de imagen:", e);
            return null;
          }
        });

        setCarouselImages(urls.filter(Boolean));
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchImages();
  }, [isOnline]); // 👈 se vuelve a ejecutar cada vez que vuelva el internet

  const handleFinish = () => setTimeout(() => setShowLanding(false), 0);

  return (
    <>
      {!isOnline && <OfflineBanner />} {/* 👈 Banner cuando no hay internet */}

      <Box component="header">
        <NavBar ref={navLogoRef} hidden={showLanding} activeSection={activeSection} />
      </Box>

      {showLanding ? (
        <Landing logoPosition={logoPosition} onFinish={handleFinish} />
      ) : (
        <>
          <Box component="main">
            <Box component="section" id="inicio">
              <Home carouselImages={carouselImages} setCarouselImages={setCarouselImages} />
            </Box>
            <Box component="section" id="nosotros" sx={{ py: 10, my: 5 }}>
              <About />
            </Box>
            <Box component="section" id="eventos" sx={{ py: 10, my: 5 }}>
              <Events />
            </Box>
            <Box component="section" id="predicas" sx={{ py: 10, my: 5 }}>
              <Sermons />
            </Box>
            <Box component="section" id="ofrendar">
              <Donate />
            </Box>
            <Box component="section" id="contacto" sx={{ mt: 5, pt: 10 }}>
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
