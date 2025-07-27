import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HomeIcon from "@mui/icons-material/Home";

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <>
      {trigger && (
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
}

function NavBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Predicas", href: "#predicas" },
    { name: "Ofrendar", href: "#ofrendar" },
    { name: "Contacto", href: "#contacto" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0, // El umbral 0 significa que se activa tan pronto como el scroll no es 0
  });

  // Define los colores para el gradiente y el fondo oscuro
  const transparentBackground = "transparent";
  const darkSolidBackground = "rgba(0, 0, 0, 0.9)"; // Un negro casi opaco

  // Define el gradiente para cuando no hay scroll
  const gradientBackground = `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)`; // De negro opaco a transparente

  return (
    <>
      <Toolbar
        id="back-to-top-anchor"
        sx={{ minHeight: "0px !important", height: "0px !important" }}
      />

      <AppBar
        component="nav"
        // Aquí aplicamos el fondo condicionalmente
        sx={{
          // Si hay scroll (trigger es true), usa el fondo sólido oscuro.
          // Si no hay scroll (trigger es false), usa el gradiente.
          backgroundColor: trigger
            ? darkSolidBackground
            : transparentBackground,
          backgroundImage: trigger ? "none" : gradientBackground, // Aplica el gradiente solo cuando no hay scroll
          boxShadow: trigger ? 3 : 0, // Sombra cuando hay scroll
          transition:
            "background-color 1s ease-in-out, background-image 1s ease-in-out, box-shadow 1s ease-in-out", // Transición para el fondo y la sombra
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="home icon"
            edge="start"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Iglesia
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Botones de navegación para pantallas grandes */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: "15px",
              marginRight: { sm: "20px" },
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{
                  color: "#fff",
                  position: "relative",
                  padding: "6px 0px", // Ajustado para un mejor espaciado y subrayado
                  minWidth: "auto",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "1px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "currentColor",
                    transition: "width 0.4s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                href={item.href}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (menú lateral) para dispositivos móviles */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              Navegación
            </Typography>
            <List>
              {navItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }} href={item.href}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>

      <ScrollTop {...props}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          aria-label="scroll back to top"
          sx={{
            minWidth: 0,
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowUpIcon />
        </Button>
      </ScrollTop>
    </>
  );
}

export default NavBar;
