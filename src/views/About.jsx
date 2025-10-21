import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import image from "../assets/apostoles.png";
import { GiBullseye } from "react-icons/gi";
import { LiaTelegramPlane } from "react-icons/lia";
import { TbFishChristianity } from "react-icons/tb";

const values = [
  {
    icon: PersonAddAlt1OutlinedIcon,
    title: "Ganar",
    description:
      "Presentamos el Evangelio para que las personas puedan recibir a Jesucristo como su Señor y Salvador.",
  },
  {
    icon: AutoStoriesIcon,
    title: "Consolidar",
    description:
      "Acompañamos al nuevo creyente en sus primeros pasos, resolviendo dudas y ofreciéndole cuidado pastoral.",
  },
  {
    icon: PeopleIcon,
    title: "Discipular",
    description:
      "Formamos carácter cristiano mediante estudio bíblico, oración y comunión para fortalecer la fe.",
  },
  {
    icon: DirectionsWalkOutlinedIcon,
    title: "Enviar",
    description:
      "Enviamos líderes maduros a su contexto para multiplicar la misión: ganar, consolidar, discipular y enviar a otros.",
  },
];

const About = () => {
  const { palette } = useTheme();

  return (
    <Box>
      <Box>
        {/* ENCABEZADO PRINCIPAL */}
        <Box textAlign="center">
          <Box  width={{ xs: "160px", md: "190px" }} mx={"auto"}>
            <Divider>
              <Typography variant="caption" letterSpacing={5} color={palette.primary[500]} >
                SOBRE
              </Typography>
            </Divider>
          </Box>
          <Typography
            variant="h2"
            component="p"
            fontSize={{ xs: "2.5rem", md: "3rem" }}
            textAlign="center"
            color={palette.primary[800]}
            // marginTop={6}
          >
            Nosotros
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "text.secondary",
              maxWidth: 900,
              mx: "auto",
              mt: 2,
              lineHeight: 1.6,
              px: 1,
              fontWeight : 300
            }}
          >
            Somos una iglesia comprometida a compartir el amor de Cristo,
            edificar vidas y transformar nuestra comunidad a través del poder
            del Evangelio.
          </Typography>
        </Box>

        <Container maxWidth={false} disableGutters>
          {/* VALORES, MISION Y VISION */}
          <Grid
            container
            spacing={4}
            alignItems="stretch"
            my={10}
            sx={{
              // mb: { xs: 6, md: 10 },
              bgcolor: palette.primary[50],
              // border: "solid 1px black",
            }}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 3, md: 6 },
                }}
                aria-labelledby="mision-heading"
              >
                <Box
                  sx={{
                    mb: "10px",
                    color: palette.secondary.main,
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "55px",
                  }}
                >
                  <LiaTelegramPlane />
                </Box>
                <Typography
                  id="mision-heading"
                  variant="h4"
                  sx={{
                    color: palette.primary[800],
                    mb: 1,
                    textAlign: "center",
                  }}
                >
                  Misión
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  Nuestra misión se articula en cuatro pilares:{" "}
                  <strong>Ganar</strong>, <strong>Consolidar</strong>,{" "}
                  <strong>Discipular</strong> y <strong>Enviar</strong>.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 3, md: 6 },
                }}
                aria-labelledby="mision-heading"
              >
                <Box
                  sx={{
                    mb: "10px",
                    color: palette.secondary.main,
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "55px",
                  }}
                >
                  <GiBullseye style={{ textAlign: "center" }} />
                </Box>
                <Typography
                  id="mision-heading"
                  variant="h4"
                  sx={{
                    color: palette.primary[800],
                    mb: 1,
                    textAlign: "center",
                  }}
                >
                  Visión
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  Nuestra visión en Puerta de Paz es simple y profundamente
                  transformadora: <strong>Jesus</strong>.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 3, md: 6 },
                }}
                aria-labelledby="vision-heading"
              >
                <Box
                  sx={{
                    mb: "10px",
                    color: palette.secondary.main,
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "55px",
                  }}
                >
                  <TbFishChristianity />
                </Box>

                <Typography
                  id="vision-heading"
                  variant="h4"
                  // fontSize={{ xs: "2rem", md: "2.5rem" }}
                  sx={{
                    color: palette.primary[800],
                    mb: 1,
                    textAlign: "center",
                  }}
                >
                  Valores
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    textAlign: "center",
                  }}
                >
                  Nuestros valores nacen del amor de <strong>Cristo</strong> y
                  de la verdad de Su <strong>Palabra</strong>.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Box sx={{ mb: { xs: 6, md: 10 } }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      color: palette.primary[800],
                      mb: 2,
                      maxWidth: 900,
                      mx: "auto",
                    }}
                  >
                    Una Familia de Fe
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mb: 2,
                      lineHeight: 1.6,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      maxWidth: 900,
                      mx: "auto",
                    }}
                  >
                    Por más de 25 años, hemos sido un refugio espiritual para
                    familias de todas las edades y trasfondos. Creemos que cada
                    persona tiene un propósito único en el plan de Dios y
                    trabajamos para ver vidas transformadas.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mb: 2,
                      maxWidth: 900,
                      mx: "auto",
                      fontSize: { xs: "1rem", md: "1.125rem" },
                    }}
                  >
                    Nuestra historia nace como un llamado de servicio y
                    compasión. Empezamos como un grupo pequeño que, con el
                    tiempo, se convirtió en una congregación comprometida con el
                    crecimiento espiritual y la restauración familiar.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Box textAlign="center">
                  <Box
                    component="img"
                    src={image}
                    alt="Apóstoles Miño"
                    loading="lazy"
                    sx={{ objectFit: "cover" }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      Nuestros Apóstoles
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        mb: 1,
                        maxWidth: 900,
                        mx: "auto",
                      }}
                    >
                      Apóstol Armando Miño y Profeta Priscila Miño han liderado
                      la iglesia con visión apostólica, enseñanzas bíblicas
                      claras y un corazón por la comunidad.
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
