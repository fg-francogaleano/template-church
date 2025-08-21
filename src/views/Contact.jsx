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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const query = `*[_type == "contact"][0]{
          numero, calle, localidad, provincia, whatsapp, email, redes
        }`;
        const result = await sanityClient.fetch(query);
        console.log(result);
        setInfo(result);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchInfo();
  }, []);

  console.log(info);
  if (!info) return <Typography>Cargando...</Typography>;
  

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
                    subheader={`${info.calle} ${info.numero}, ${info.localidad}, ${info.provincia}`}
                  />
                </Card>
                <Card>
                  <CardHeader
                    avatar={<WhatsAppIcon fontSize="small" />}
                    title={<Typography variant="h6">WhatsApp</Typography>}
                    subheader={info.whatsapp}
                  />
                </Card>
                <Card>
                  <CardHeader
                    avatar={<MailOutlineIcon fontSize="small" />}
                    title={<Typography variant="h6">Email</Typography>}
                    subheader={info.email}
                  />
                </Card>
              </Box>
              <Box
                sx={{ mt: 4, display: { xs: "none", md: "block" } }}
              >
                <Typography
                  variant="h4"
                  component="p"
                  textAlign={"center"}
                  gutterBottom
                >
                  Seguinos en nuestras redes
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <Box>
                    {info.redes?.map((red, index) => {
                      const iconMap = {
                        instagram: <InstagramIcon fontSize="medium" />,
                        facebook: <FacebookIcon fontSize="medium" />,
                        tiktok: <TikTokIcon fontSize="medium" />,
                        x: <XIcon fontSize="medium" />,
                        youtube: <YouTubeIcon fontSize="medium" />,
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
      </Box>
    </>
  );
}

export default Contact;
