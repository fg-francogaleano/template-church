import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";
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

import Form from "../components/Form";

function Contact() { 
  const [info, setInfo] = useState(null);

  const { palette } = useTheme();
  
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const query = `*[_type == "contact"][0]{
          numero, calle, localidad, provincia, whatsapp, email, redes
        }`;
        const result = await sanityClient.fetch(query);
        setInfo(result);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchInfo();
  }, []);

  if (!info) return <Typography>Cargando...</Typography>;

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
          padding: { md: 4  },
          boxSizing: "border-box",
        }}
      >
        <Box margin="auto" width={{ xs: "100%", md: "70%" }}>
          <Typography
            variant="h2"
            component="p"
            fontSize={{ xs: "2rem", md: "3rem" }}
            color={palette.primary[800]}
            fontWeight="bold"
            letterSpacing="-0.02em"
            textAlign="center"
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
                    avatar={<LocationOnIcon fontSize="small" color={"grey"} />}
                    title={<Typography variant="h6">Dirección</Typography>}
                    subheader={`${info.calle} ${info.numero}, ${info.localidad}, ${info.provincia}`}
                  />
                </Card>
                <Card>
                  <CardHeader
                    avatar={<WhatsAppIcon fontSize="small" color="action" />}
                    title={<Typography variant="h6">WhatsApp</Typography>}
                    subheader={info.whatsapp}
                  />
                </Card>
                <Card>
                  <CardHeader
                    avatar={<MailOutlineIcon fontSize="small" color="action" />}
                    title={<Typography variant="h6">Email</Typography>}
                    subheader={info.email}
                  />
                </Card>
              </Box>
              <Box sx={{ mt: 4, display: { xs: "none", md: "block" } }}>
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
                    {info.redes?.map((red, index) => {
                      const iconMap = {
                        instagram: (
                          <InstagramIcon fontSize="medium" color="action" />
                        ),
                        facebook: (
                          <FacebookIcon fontSize="medium" color="grey" />
                        ),
                        tiktok: <TikTokIcon fontSize="medium" color="grey" />,
                        x: <XIcon fontSize="medium" color="action" />,
                        youtube: (
                          <YouTubeIcon fontSize="medium" color="action" />
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
