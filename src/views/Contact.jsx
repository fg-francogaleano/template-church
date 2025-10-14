import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";
import {
  Box,
  Typography,
  IconButton,
  CssBaseline,
  Grid,
  Link,
  CardHeader,
  Card,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "../icons/LocationOnIcon";
import PhoneIcon from "@mui/icons-material/Phone";

import Form from "../components/Form";
import SocialMediaIcon from "../icons/SocialMediaIcon";

function Contact() {
  const theme = useTheme();
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
  console.log(info);

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
          // padding: { md: 4 },
          boxSizing: "border-box",
        }}
      >
        <Box margin="auto" width={{ xs: "100%", md: "70%" }}>
          <Typography
            variant="h2"
            component="p"
            fontSize={{ xs: "2.5rem", md: "3rem" }}
            color={palette.primary[800]}
            fontWeight="bold"
            letterSpacing="-0.02em"
            textAlign="center"
            gutterBottom
            marginTop={6}
          >
            Contactanos
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

        <Grid container flexGrow={1} mt={2} width={"100%"} boxShadow={2}>
          {/* Grid izquierdo: Formulario */}
          {/* <Grid size={{ xs: 12, md: 5 }} bgcolor={"background.paper"}>
            <Typography
              variant="h4"
              component="p"
              textAlign={"center"}
              marginTop={4}
            >
              Enviá un mensaje
            </Typography>
            <Box display={"flex"} width={"100%"}>
              <Box alignSelf={"center"} px={1}>
                {info.redes?.map((red, index) => {
                  return (
                    <Box display={"flex"} key={index}>
                      <IconButton
                        key={index}
                        color="inherit"
                        aria-label={red.nombre}
                        component={Link}
                        href={red.url}
                        target="_blank"
                        rel="noopener"
                      >
                        <SocialMediaIcon
                          color={theme.palette.primary[600]}
                          socialMedia={red.nombre}
                          fontSize="medium"
                        />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
              <Box paddingRight={3} pb={4} width={"100%"}>
                <Form />
              </Box>
            </Box>
          </Grid> */}

          {/* Grid derecho: mapa */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                // height: 300,
                bgcolor: "grey.300",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.25) 90%, rgba(0,0,0,0) 100%)`,
                  zIndex: 1, // Por encima del iframe
                  display: "flex",
                  alignItems: "center", // Centra verticalmente el contenido
                  pointerEvents: "none",
                }}
              >
                <Grid container spacing={2} zIndex={2}>
                  {/* Dirección */}
                  <Grid item size={{ xs: 12 }}>
                    <CardHeader
                      avatar={
                        <LocationOnIcon
                          color={theme.palette.secondary.main}
                          fontSize="large"
                        />
                      }
                      title={
                        <Typography
                          variant="h6"
                          color={theme.palette.primary[300]}
                        >
                          Dirección
                        </Typography>
                      }
                      subheader={
                        <Typography variant="body2" color={theme.palette.primary[400]}>
                          {`${info.calle} ${info.numero}, ${info.localidad}, ${info.provincia}`}
                        </Typography>
                      }
                    />
                  </Grid>
                  {/* Email */}
                  <Grid item size={{ xs: 12 }}>
                    <CardHeader
                      avatar={
                        <MailOutlineIcon
                          sx={{
                            color: theme.palette.secondary.main,
                            fontSize: "large",
                          }}
                        />
                      }
                      title={
                        <Typography
                          variant="h6"
                          color={theme.palette.primary[300]}
                        >
                          Email
                        </Typography>
                      }
                      subheader={
                        <Link
                          href={`mailto:${info.email}`}
                          color="inherit"
                          underline="hover"
                        >
                          <Typography variant="body2" color={theme.palette.primary[400]}>
                            {info.email}
                          </Typography>
                        </Link>
                      }
                    />
                  </Grid>
                  {/* WhatsApp */}
                  <Grid item size={{ xs: 12 }}>
                    <CardHeader
                      avatar={
                        <PhoneIcon
                          sx={{
                            color: theme.palette.secondary.main,
                            fontSize: "large",
                          }}
                        />
                      }
                      title={
                        <Typography
                          variant="h6"
                          color={theme.palette.primary[400]}
                        >
                          Teléfono
                        </Typography>
                      }
                      subheader={
                        <Link
                          href={`https://wa.me/${info.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                          underline="hover"
                        >
                          <Typography variant="body2" color={theme.palette.primary[500]}>
                            {info.whatsapp}
                          </Typography>
                        </Link>
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
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
          </Grid>

          <Grid size={{ xs: 12, md: 5 }} bgcolor={"background.paper"}>
            <Typography
              variant="h4"
              component="p"
              textAlign={"center"}
              marginTop={4}
            >
              Enviá un mensaje
            </Typography>
            <Box display={"flex"} width={"100%"}>
              <Box paddingLeft={5} pb={4} width={"100%"}>
                <Form />
              </Box>
              <Box alignSelf={"center"} px={1}>
                {info.redes?.map((red, index) => {
                  return (
                    <Box display={"flex"} key={index}>
                      <IconButton
                        key={index}
                        color="inherit"
                        aria-label={red.nombre}
                        component={Link}
                        href={red.url}
                        target="_blank"
                        rel="noopener"
                      >
                        <SocialMediaIcon
                          color={theme.palette.primary[600]}
                          socialMedia={red.nombre}
                          fontSize="medium"
                        />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Contact;
