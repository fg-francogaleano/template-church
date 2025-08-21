import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";
import Form from "../components/Form";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  CssBaseline,
  Grid,
  Link,
  CardHeader,
  Card,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "../icons/FacebookIcon";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import TikTokIcon from "../icons/TiktokIcon";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "../icons/LocationOnIcon";

function Contact() {
  const [redes, setRedes] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchRedes = async () => {
      try {
        const query = `*[_type == "contact"][0].redes`;
        const result = await sanityClient.fetch(query);
        if (result) {
          setRedes(result);
        }
      } catch (error) {
        console.error("Error fetching social media links:", error);
      }
    };
    fetchRedes();
  }, []);

  const gridPaddingCompensation = isMobile ? 2 : 4;

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: gridPaddingCompensation,
          boxSizing: "border-box",
        }}
      >
        <Box margin="auto" width={{ xs: "100%", md: "70%" }}>
          <Typography
            variant="h3"
            component="h1"
            textAlign="center"
            fontWeight="bold "
            gutterBottom
            marginTop={6}
          >
            Contáctanos
          </Typography>
          <Typography
            align="center"
            fontSize={{ xs: "16px", sm: "18px" }}
            color="text.secondary"
            mb={4}
          >
            Estamos aquí para servirte. No dudes en contactarnos para cualquier
            pregunta, oración, o si necesitas apoyo pastoral.
          </Typography>
        </Box>

        <Grid container spacing={6} flexGrow={1} mt={2} width={"100%"}>
          {/* Grid Izquierdo: Información de Contacto */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="h4"
                component="p"
                textAlign={"center"}
                gutterBottom
              >
                Información de Contacto
              </Typography>
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Card>
                  <CardHeader
                    avatar={<LocationOnIcon fontSize="small" />}
                    title={<Typography variant="h6">Dirección</Typography>}
                    subheader="Blas Parera 1206, Castelar, Buenos Aires"
                  />
                </Card>
                <Card>
                  <CardHeader
                    avatar={<WhatsAppIcon fontSize="small" />}
                    title={<Typography variant="h6">WhatsApp</Typography>}
                    subheader="1231231234"
                  />
                </Card>
                <Card>
                  <CardHeader
                    avatar={<MailOutlineIcon fontSize="small" />}
                    title={<Typography variant="h6">Email</Typography>}
                    subheader="puertadepaz@gmail.com"
                  />
                </Card>
              </Box>
              <Box sx={{ mt: 4,   display: { xs: "none", md: "block" }, }}>
                <Typography
                  variant="h4"
                  component="p"
                  textAlign={"center"}
                  gutterBottom
                >
                  Seguinos en nuestras redes
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Box>
                    {redes.instagram && (
                      <IconButton
                        color="inherit"
                        aria-label="Instagram"
                        component={Link}
                        href={redes.instagram}
                        target="_blank"
                        rel="noopener"
                      >
                        <InstagramIcon fontSize="medium" />
                      </IconButton>
                    )}
                    {redes.facebook && (
                      <IconButton
                        color="inherit"
                        aria-label="Facebook"
                        component={Link}
                        href={redes.facebook}
                        target="_blank"
                        rel="noopener"
                      >
                        <FacebookIcon fontSize="medium" />
                      </IconButton>
                    )}
                    {redes.tiktok && (
                      <IconButton
                        color="inherit"
                        aria-label="TikTok"
                        component={Link}
                        href={redes.tiktok}
                        target="_blank"
                        rel="noopener"
                      >
                        <TikTokIcon fontSize="medium" />
                      </IconButton>
                    )}
                    {redes.x && (
                      <IconButton
                        color="inherit"
                        aria-label="X"
                        component={Link}
                        href={redes.x}
                        target="_blank"
                        rel="noopener"
                      >
                        <XIcon fontSize="medium" />
                      </IconButton>
                    )}
                    {redes.youtube && (
                      <IconButton
                        color="inherit"
                        aria-label="YouTube"
                        component={Link}
                        href={redes.youtube}
                        target="_blank"
                        rel="noopener"
                      >
                        <YouTubeIcon fontSize="medium" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Grid Derecho: Formulario */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              component="p"
              gutterBottom
              textAlign={"center"}
            >
              Envíanos un Mensaje
            </Typography>
            <Form />
          </Grid>
        </Grid>

        {/* Mapa que abarca el 100% del ancho */}
        <Box
          sx={{
            width: "100%",
            height: 300,
            bgcolor: "grey.300",
            mt: 8,
            overflow: "hidden",
            borderRadius: 1,
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.411641042557!2d-58.64756598476149!3d-34.61315188046187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbee5c546e8c7%3A0xc3b446f2e245b63!2sBlas%20Parera%201206%2C%20B1712GUD%20Castelar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1628178123456!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de la iglesia"
          ></iframe>
        </Box>
      </Box>
    </>
  );
}

export default Contact;
