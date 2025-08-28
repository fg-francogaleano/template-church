import React from "react";
import { Box } from "@mui/material";
import Home from "./views/Home";
import About from "./views/About";
import Sermons from "./views/Sermons";
import Donate from "./views/Donate";
import Contact from "./views/Contact";
import Footer from "./components/Footer";
import NavBar from "./components/NavBAr";
import Events from "./views/Events";

function App() {
  return (
    <>
      <Box component="header">
        <NavBar />
      </Box>
      <Box component="main">
        <Box component="section" id="inicio">
          <Home />
        </Box>
        <Box component="section" id="nosotros">
          <About />
        </Box>
        <Box component="section" id="eventos">
          <Events />
        </Box>
        <Box component="section" id="predicas">
          <Sermons />
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
  );
}

export default App;
