import React from "react";
import NavBar from "./components/NavBar";
import { Box } from "@mui/material";
import Home from "./views/Home";
import About from "./views/About";
import Sermons from "./views/Sermons";
import Donate from "./views/Donate";
import Contact from "./views/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Box component="header">
        <NavBar />
      </Box>
      <Box component="main">
        <Box component="section">
          <Home />
        </Box>
        <Box component="section">
          <About />
        </Box>
        <Box component="section">
          <Sermons />
        </Box>
        <Box component="section">
          <Donate />
        </Box>
        <Box component="section">
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
