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
import MenuIcon from "@mui/icons-material/Menu"; // Icono de hamburguesa
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"; // Icono para el botón "volver arriba"
import HomeIcon from "@mui/icons-material/Home"; // Icono para la parte izquierda de la barra

// --- Componente auxiliar para el botón "volver arriba" ---
// Se muestra u oculta según el scroll y te lleva al inicio de la página
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100, // El botón aparece cuando se scrollean 100px o más
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor" // Este ID debe coincidir con un elemento en tu layout
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth", // Desplazamiento suave (se mantiene)
        block: "center",
      });
    }
  };

  // Solo renderizamos el Box si 'trigger' es true
  // Si trigger es false, el Box no se renderiza, haciéndolo desaparecer.
  return (
    <>
      {/* Usamos un Fragment para envolver */}
      {trigger && ( // Condición para renderizar el botón solo si se ha scrolleado
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
// --- Componente principal NavBar ---
function NavBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false); // Estado para el menú hamburguesa
  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Predicas", href: "#predicas" },
    { name: "Ofrendar", href: "#ofrendar" },
    { name: "Contacto", href: "#contacto" },
  ]; // Elementos de navegación con sus hrefs

  // Función para abrir/cerrar el menú móvil
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // useScrollTrigger para detectar el scroll y cambiar el estilo de la barra
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0, // Cambia el estilo tan pronto como se hace scroll
  });

  return (
    <>
      {/* back-to-top-anchor es el punto al que el botón de scroll volverá */}
      <Toolbar
        id="back-to-top-anchor"
        sx={{ minHeight: "0px !important", height: "0px !important" }}
      />

      <AppBar
        component="nav"
        sx={{
          // Estilo condicional basado en el scroll
          backgroundColor: trigger ? "primary.main" : "transparent", // Por ejemplo, azul primario cuando scrolleas, transparente al inicio
          boxShadow: trigger ? 3 : 0, // Sombra cuando scrolleas
          transition:
            "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Transición suave
          position: "fixed", // Asegura que la barra se quede fija
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100, // Z-index estándar para AppBar en Material-UI
        }}
      >
        <Toolbar>
          {/* Icono en la parte izquierda */}
          <IconButton
            color="inherit"
            aria-label="home icon"
            edge="start"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>

          {/* Título de la aplicación o logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Mi Aplicación
          </Typography>

          {/* Botón de hamburguesa para móviles */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end" // Alineado a la derecha
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", display: { sm: "none" } }} // Solo visible en pantallas pequeñas
          >
            <MenuIcon />
          </IconButton>

          {/* Botones de navegación para pantallas grandes */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: "#fff" }} href={item.href}>
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
            keepMounted: true, // Para un mejor rendimiento en móviles
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 }, // Ancho del drawer
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

      {/* Botón "Volver Arriba" */}
      <ScrollTop {...props}>
        <Button
          variant="contained"
          color="secondary" // Puedes elegir el color que prefieras
          size="large"
          aria-label="scroll back to top"
          sx={{
            minWidth: 0, // Para que el botón sea cuadrado
            width: 56, // Ancho y alto para que sea un círculo con border-radius
            height: 56,
            borderRadius: "50%", // Para que sea un círculo
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
