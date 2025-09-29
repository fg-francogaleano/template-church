import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import CarouselAbout from "../components/CarouselAbout";
import image from "../assets/apostoles.png";

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
    <Box sx={{ bgcolor: palette.primary[100] }}>
      <Box maxWidth="100%" sx={{ py: { xs: 8, md: 6 } }}>
        {/* Encabezado principal 1 */}
        <Box textAlign="center" sx={{ mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h2"
            component="p"
            fontSize={{ xs: "2rem", md: "3rem" }}
            fontWeight="bold"
            letterSpacing="-0.02em"
            textAlign="center"
            color={palette.primary[800]}
            marginTop={6}
          >
            Sobre nosotros
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
            }}
          >
            Somos una iglesia comprometida a compartir el amor de Cristo,
            edificar vidas y transformar nuestra comunidad a través del poder
            del Evangelio.
          </Typography>
        </Box>

        {/* Encabezado principal 2 */}
        {/* <Box
          sx={{
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            mb: { xs: 6, md: 8 },
            boxShadow: 4,
          }}
        >
          <Box
            component="img"
            src="https://www.churchleadership.com/wp-content/uploads/2021/08/3-key-components-effective-visitor-follow-up.png"
            alt="Comunidad reunida"
            loading="lazy"
            sx={{
              width: "100%",
              height: { xs: 260, md: 300 },
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.25) 100%)",
              display: "flex",
              alignItems: "flex-end",
              p: { xs: 3, md: 6 },
            }}
            aria-hidden
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2rem", md: "5rem" },
                fontWeight: 700,
                color: theme.palette.primary[200],
                letterSpacing: "-0.02em",
                textShadow: 5,
              }}
            >
              Sobre nosotros
            </Typography>
          </Box>
        </Box> */}

        <Container maxWidth="lg">
          {/* Vision y Mision */}
          <Grid
            container
            spacing={4}
            alignItems="stretch"
            sx={{ mb: { xs: 6, md: 10 } }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 3, md: 6 },
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 3,
                  border: `solid 1px ${palette.primary[300]}`,
                }}
                aria-labelledby="vision-heading"
              >
                <Typography
                  id="vision-heading"
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: palette.primary[800],
                    mb: 1,
                  }}
                >
                  Visión
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  Nuestra visión en Puerta de Paz es simple y profundamente
                  transformadora: <strong>Cristo</strong> .
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 3, md: 6 },
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 3,
                  border: `solid 1px ${palette.primary[300]}`,
                }}
                aria-labelledby="mision-heading"
              >
                <Typography
                  id="mision-heading"
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: palette.primary[800],
                    mb: 1,
                  }}
                >
                  Misión
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.6, mb: 2 }}
                >
                  Nuestra misión se articula en cuatro pilares:{" "}
                  <strong>Ganar</strong>, <strong>Consolidar</strong>,{" "}
                  <strong>Discipular</strong> y <strong>Enviar</strong>.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {/*  Líderes */}
          <Grid
            container
            spacing={4}
            alignItems="center"
            // sx={{ mb: { xs: 6, md: 10 } }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Box sx={{ mb: { xs: 6, md: 10 } }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      fontWeight: 700,
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
