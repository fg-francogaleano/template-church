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
import { useTheme } from "@mui/material/styles";
import InstagramIcon from "../icons/InstagramIcon";
import FacebookIcon from "../icons/FacebookIcon";
import YouTubeIcon from "../icons/YouTubeIcon";
import TikTokIcon from "../icons/TiktokIcon";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import LocationOnIcon from "../icons/LocationOnIcon";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SpotifyIcon from "../icons/SpotifyIcon";
import Logo from "../icons/Logo";

const Footer = () => {
  const [schedulesData, setSchedulesData] = useState(null);
  const [contactData, setContactData] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactQuery = `*[_type == "contact"][0]{
          numero, calle, localidad, provincia, whatsapp, email, redes
        }`;
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
  const { whatsapp, email, calle, numero, localidad, provincia, redes } =
    contactData || {}; // Usamos un objeto vacío por defecto para evitar errores si contactData es null/undefined
  const { horarios } = schedulesData || {}; // Igual aquí
  console.log(contactData);

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 0 5px 0px",
        // Aquí se aplica el clip-path para el triángulo en la parte superior
        clipPath: "polygon(0 3vw, 50% 0, 100% 3vw, 100% 100%, 0 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
        <Grid container spacing={4} mt={5} justifyContent="space-between">
          {/* Redes Sociales */}
          <Grid sx={{ width: { xs: "100%", md: "auto" } }}>
            <Box
              sx={{ textAlign: { xs: "center", md: "left" }, width: "100%" }}
            >
              <Typography variant="h6" color={theme.palette.primary[100]}>
                VISITÁ NUESTRAS REDES
              </Typography>
              <Box
                display={"flex"}
                justifyContent={{ xs: "center", md: "flex-start" }}
                gap={1}
              >
                {contactData.redes?.map((red, index) => {
                  const iconMap = {
                    instagram: (
                      <InstagramIcon
                        fontSize="medium"
                        color={theme.palette.primary[700]}
                      />
                    ),
                    facebook: (
                      <FacebookIcon
                        fontSize="medium"
                        color={theme.palette.primary[700]}
                      />
                    ),
                    tiktok: (
                      <SpotifyIcon
                        fontSize="medium"
                        color={theme.palette.primary[700]}
                      />
                    ),
                    // x: <XIcon fontSize="medium" color="inherit" />,
                    youtube: (
                      <YouTubeIcon
                        fontSize="medium"
                        color={theme.palette.primary[700]}
                      />
                    ),
                  };

                  return (
                    <IconButton
                      key={index}
                      color="inherit"
                      aria-label={red.nombre}
                      component={Link}
                      href={red.url}
                      target="_blank"
                      rel="noopener"
                    >
                      {iconMap[red.nombre.toLowerCase()] || null}
                    </IconButton>
                  );
                })}
              </Box>
              {/* <Logo /> */}
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
              <Typography
                variant="h6"
                color={theme.palette.primary[100]}
                gutterBottom
              >
                CONTACTO
              </Typography>
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
                  <WhatsAppIcon
                    fontSize="small"
                    sx={{ color: theme.palette.primary[400] }}
                  />
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.primary[400]}
                  >
                    {whatsapp}
                  </Typography>
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
                    color={theme.palette.primary[400]}
                    sx={{ marginRight: "10px" }}
                  />
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.primary[400]}
                  >
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
                  <MailOutlineIcon
                    fontSize="small"
                    sx={{ color: theme.palette.primary[400] }}
                  />
                  {/* Reemplazado ListItemText con Typography */}
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.primary[400]}
                  >
                    {email}
                  </Typography>
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
                CELEBRACIONES
              </Typography>
              {horarios?.map((item, idx) => (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  key={idx}
                  color={theme.palette.primary[400]}
                >
                  {item.dia} {item.hora} hs
                  {/* {item.descripcion ? ` (${item.descripcion})` : ""} */}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign={"center"}>
          <Typography
            variant="caption"
            color={[theme.palette.primary[500]]}
            display={{ xs: "block", sm: "inline" }}
            mt={{ xs: 1, sm: 0 }}
          >
            Copyright © 2025 Puerta de Paz
          </Typography>
          <Typography
            variant="caption"
            color={[theme.palette.primary[500]]}
            display={{ xs: "none", sm: "inline" }}
            mx={{ sm: 1 }}
          >
            |
          </Typography>
          <Typography
            variant="caption"
            color={[theme.palette.primary[500]]}
            display={{ xs: "block", sm: "inline" }}
            mt={{ xs: 1, sm: 0 }}
            letterSpacing={{ xs: 1, sm: 0 }}
          >
            Made with ❤ by Franco Galeano
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
