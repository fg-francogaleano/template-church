import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  Link,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "../icons/FacebookIcon";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TikTokIcon from "../icons/TiktokIcon";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import LocationOnIcon from "../icons/LocationOnIcon";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Footer = () => {
  const [schedulesData, setSchedulesData] = useState(null);
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactQuery = '*[_type == "contact"][0]';
        const schedulesQuery = '*[_type == "schedules"][0]';

        const [schedulesResult, contactResult] = await Promise.all([
          sanityClient.fetch(schedulesQuery),
          sanityClient.fetch(contactQuery),
        ]);

        setSchedulesData(schedulesResult);
        setContactData(contactResult);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Si contactData o schedulesData son null (aún cargando o error), no renderizamos el contenido
  // del footer que depende de ellos. Podríamos mostrar un spinner o un esqueleto si quisiéramos.
  if (!contactData) {
    return null; // O un componente de carga si lo prefieres
  }

  // Desestructuración segura: solo si los datos están presentes
  const { telefono, email, calle, numero, localidad, provincia, redes } =
    contactData || {}; // Usamos un objeto vacío por defecto para evitar errores si contactData es null/undefined
  const { horarios } = schedulesData || {}; // Igual aquí

  return (
    <Box
      sx={{
        backgroundColor: "#1c1c1c",
        color: "#ffffff",
        padding: "10px 0 5px 0px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Redes Sociales */}
          <Grid sx={{ width: { xs: "100%", md: "auto" } }}>
            <Box
              sx={{ textAlign: { xs: "center", md: "left" }, width: "100%" }}
            >
              <Typography variant="h6">Puerta de Paz</Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Seguinos en nuestras redes.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 1,
                }}
              >
                {redes?.instagram && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.instagram}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                )}
                {redes?.facebook && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.facebook}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                )}
                {redes?.tiktok && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.tiktok}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <TikTokIcon fontSize="small" />
                  </IconButton>
                )}
                {redes?.x && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.x}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <XIcon fontSize="small" />
                  </IconButton>
                )}
                {redes?.youtube && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.youtube}
                    target="_blank"
                    rel="noopener"
                  >
                    <YouTubeIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Información de contacto */}
          <Grid sx={{ width: { xs: "100%", md: "auto" } }}>
            <Box
              sx={{
                textAlign: { xs: "center", sm: "left" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h6">Contacto</Typography>
              <List
                dense
                sx={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <ListItem
                  disablePadding
                  sx={{
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: "10px",
                  }}
                >
                  <WhatsAppIcon fontSize="small" />
                  <Typography variant="body1">{telefono}</Typography>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: "10px",
                  }}
                >
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ marginRight: "10px" }}
                  />
                  <Typography variant="body1">
                    {`${calle} ${numero}, ${localidad}, ${provincia}`}
                  </Typography>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: "10px",
                  }}
                >
                  <MailOutlineIcon fontSize="small" />
                  {/* Reemplazado ListItemText con Typography */}
                  <Typography variant="body1">{email}</Typography>
                </ListItem>
              </List>
            </Box>
          </Grid>

          {/* Horarios */}
          <Grid sx={{ width: { xs: "100%", md: "auto" } }}>
            <Box
              sx={{
                textAlign: { xs: "center", sm: "left" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Reuniones
              </Typography>
              {horarios?.map((item, idx) => (
                <Typography variant="body2" gutterBottom key={idx}>
                  {item.dia} - {item.hora} hs
                  {item.descripcion ? ` (${item.descripcion})` : ""}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign={"center"}>
          <Typography variant="caption" color="inherit">
            Copyright © 2025 Iglesia | Made with ♥️ by Franco Galeano
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
