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
  Divider,
  CardContent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RiPhoneFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { IoIosMail } from "react-icons/io";
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
          // background: palette.background.default1
        }}
      >
        {/* ENCABEZADO PRINCIPAL */}
        <Box margin="auto" width={{ xs: "100%", md: "70%" }}>
          <Box width={{ xs: "230px", md: "280px" }} mx={"auto"}>
            <Divider>
              <Typography
                variant="caption"
                letterSpacing={5}
                color={palette.primary[500]}
              >
                CONTACTO
              </Typography>
            </Divider>
          </Box>
          <Typography
            variant="h2"
            component="p"
            fontSize={{ xs: "2.5rem", md: "3rem" }}
            color={palette.primary[800]}
            textAlign={"center"}
            gutterBottom
          >
            CONTACTANOS
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

        <Grid container flexGrow={1} width={"100%"}>
          <Grid
            size={{ xs: 12, lg: 6 }}
            display={{ xs: "none", md: "flex" }}
            justifyContent={"center"}
          >
            <Box
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row", lg: "column" }}
              justifyContent={"center"}
              // border={"solid 1px black"}
              my={{ xs: 4, lg: 0 }}
            >
              <CardHeader
                avatar={
                  <Box
                    sx={{
                      bgcolor: palette.secondary.main,
                      padding: { xs: 1.5, md: 1.5 },
                      borderRadius: "50%",
                    }}
                  >
                    <Box fontSize={{ xs: 20, md: 20 }}>
                      <HiLocationMarker color={palette.primary[100]} />
                    </Box>
                  </Box>
                }
                title={
                  <Typography
                    variant="p"
                    fontSize={18}
                    fontWeight={300}
                    color={theme.palette.primary}
                  >
                    Dirección
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body2"
                    color={theme.palette.primary[500]}
                  >
                    {`${info.calle} ${info.numero}, ${info.localidad}, ${info.provincia}`}
                  </Typography>
                }
              />
              <CardHeader
                avatar={
                  <Box
                    sx={{
                      bgcolor: palette.secondary.main,
                      padding: { xs: 1.5, md: 1.5 },
                      borderRadius: "50%",
                    }}
                  >
                    <Box fontSize={{ xs: 20, md: 20 }}>
                      <IoIosMail color={palette.primary[100]} />
                    </Box>
                  </Box>
                }
                title={
                  <Typography
                    variant="p"
                    fontSize={18}
                    fontWeight={300}
                    color={theme.palette.primary}
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
                    <Typography
                      variant="body2"
                      color={theme.palette.primary[500]}
                    >
                      {info.email}
                    </Typography>
                  </Link>
                }
              />
              <CardHeader
                avatar={
                  <Box
                    sx={{
                      bgcolor: palette.secondary.main,
                      padding: { xs: 1.5, md: 1.5 },
                      borderRadius: "50%",
                    }}
                  >
                    <Box fontSize={{ xs: 20, md: 20 }}>
                      <RiPhoneFill color={palette.primary[100]} />
                    </Box>
                  </Box>
                }
                title={
                  <Typography
                    variant="p"
                    fontSize={18}
                    fontWeight={300}
                    color={theme.palette.primary}
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
                    <Typography
                      variant="body2"
                      color={theme.palette.primary[500]}
                    >
                      {info.whatsapp}
                    </Typography>
                  </Link>
                }
              />
            </Box>
          </Grid>

          <Grid display={{ xs: "flex", md: "none" }} size={{ xs: 12, lg: 6 }}>
            <Grid
              container
              flexGrow={1}
              width={"100%"}
            >
              <Grid size={{ xs: 12, sm: 4 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Apila los elementos verticalmente
                      alignItems: "center", // Centra todo horizontalmente
                      textAlign: "center", // Asegura que el texto esté centrado
                      py: 2,
                    }}
                  >
                    {/* 1. AVATAR */}
                    <Box
                      sx={{
                        bgcolor: palette.secondary.main,
                        padding: { xs: 1.5, md: 1.5 },
                        borderRadius: "50%",
                        mb: 2,
                      }}
                    >
                      <Box fontSize={{ xs: 20, md: 20 }}>
                        <HiLocationMarker color={palette.primary[100]} />
                      </Box>
                    </Box>

                    {/* 2. TITLE */}
                    <Typography
                      variant="h6"
                      fontSize={18}
                      fontWeight={300}
                      color={theme.palette.primary}
                      mb={0.5}
                    >
                      Dirección
                    </Typography>

                    {/* 3. SUBHEADER */}
                    <Typography
                      variant="body2"
                      color={theme.palette.primary[500]}
                    >
                      {`${info.calle} ${info.numero}, ${info.localidad}, ${info.provincia}`}
                    </Typography>
                  </Box>
                </CardContent>
              </Grid>

              {/* ---------------------------------------------------------------------- */}

              {/* BLOQUE 2: EMAIL (NUEVO) */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      py: 2,
                    }}
                  >
                    {/* 1. AVATAR */}
                    <Box
                      sx={{
                        bgcolor: palette.secondary.main,
                        padding: { xs: 1.5, md: 1.5 },
                        borderRadius: "50%",
                        mb: 2,
                      }}
                    >
                      <Box fontSize={{ xs: 20, md: 20 }}>
                        <IoIosMail color={palette.primary[100]} />
                      </Box>
                    </Box>

                    {/* 2. TITLE */}
                    <Typography
                      variant="h6"
                      fontSize={18}
                      fontWeight={300}
                      color={theme.palette.primary}
                      mb={0.5}
                    >
                      Email
                    </Typography>

                    {/* 3. SUBHEADER (CON LINK 'mailto:') */}
                    <Link
                      href={`mailto:${info.email}`}
                      color="inherit"
                      underline="hover"
                    >
                      <Typography
                        variant="body2"
                        color={theme.palette.primary[500]}
                      >
                        {info.email}
                      </Typography>
                    </Link>
                  </Box>
                </CardContent>
              </Grid>

              {/* ---------------------------------------------------------------------- */}

              {/* BLOQUE 3: TELÉFONO (NUEVO) */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      py: 2,
                    }}
                  >
                    {/* 1. AVATAR */}
                    <Box
                      sx={{
                        bgcolor: palette.secondary.main,
                        padding: { xs: 1.5, md: 1.5 },
                        borderRadius: "50%",
                        mb: 2,
                      }}
                    >
                      <Box fontSize={{ xs: 20, md: 20 }}>
                        <RiPhoneFill color={palette.primary[100]} />
                      </Box>
                    </Box>

                    {/* 2. TITLE */}
                    <Typography
                      variant="h6"
                      fontSize={18}
                      fontWeight={300}
                      color={theme.palette.primary}
                      mb={0.5}
                    >
                      Teléfono
                    </Typography>

                    {/* 3. SUBHEADER (CON LINK DE WHATSAPP) */}
                    <Link
                      href={`https://wa.me/${info.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                      underline="hover"
                    >
                      <Typography
                        variant="body2"
                        color={theme.palette.primary[500]}
                      >
                        {info.whatsapp}
                      </Typography>
                    </Link>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="h4" component="p" textAlign={"center"} my={4}>
              ENVIÁ UN MENSAJE
            </Typography>
            <Box display={"flex"}>
              {/* FORMULARIO */}
              <Box paddingLeft={5} pb={4} width={"100%"} mx={"auto"}>
                <Form />
              </Box>

              {/* SOCIAL MEDIA */}
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

        {/* MAPA */}
        <Box
          sx={{
            width: "100%",
            height: "350px",
            bgcolor: "grey.300",
            overflow: "hidden",
            position: "relative",
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
