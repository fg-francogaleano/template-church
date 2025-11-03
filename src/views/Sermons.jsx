import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  useTheme,
} from "@mui/material";
import { sanityClient } from "../../lib/sanityClient";

function Sermons() {
  const theme = useTheme();
  const palette = theme.palette;

  const [latestPredica, setLatestPredica] = useState(null);
  const [otherPredicas, setOtherPredicas] = useState([]);

  useEffect(() => {
    // 1️⃣ Query para obtener las últimas 4 predicas ordenadas por fecha descendente
    const query = `*[_type == "sermon"] | order(date desc)[0...4] {
      title,
      date,
      description,
      youtubeId,
      youtubeLink,
      minister->{
        name,
      }
    }`;

    sanityClient.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setLatestPredica(data[0]); // La más reciente
        setOtherPredicas(data.slice(1)); // Las 3 siguientes
      }
    });
  }, []);

  if (!latestPredica) return null; // evita render antes de cargar

  // ✅ Formato de fecha dd/mm/aaaa
  // ✅ Formato de fecha: "3 Octubre 2025"
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };

    // Formatear en español
    const formatted = new Intl.DateTimeFormat("es-ES", options).format(date);

    // Capitalizar la primera letra del mes
    return formatted.replace(
      /(\p{L}+)/u, // busca la primera palabra (el mes)
      (match) => match.charAt(0).toUpperCase() + match.slice(1)
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: palette.background.default,
        textAlign: "center",
        // py: 6,
      }}
    >
      {/* 1️⃣ ENCABEZADO */}
      <Box mb={4}>
        <Box width={{ xs: "230px", md: "280px" }} mx="auto">
          <Divider>
            <Typography
              variant="caption"
              letterSpacing={5}
              color={palette.primary[500]}
            >
              VER EN YOUTUBE
            </Typography>
          </Divider>
        </Box>
        <Typography
          variant="h2"
          component="h2"
          fontSize={{ xs: "2.5rem", md: "3rem" }}
          color={palette.text.primary}
          gutterBottom
        >
          ÚLTIMA PREDICA
        </Typography>
      </Box>

      {/* 2️⃣ ÚLTIMA PREDICA (sin modificar) */}
      <Box
        sx={{
          maxWidth: { xs: "95%", md: "800px" },
          mx: "auto",
          px: { xs: 1, md: 0 },
          mb: 10,
        }}
      >
        <Card
          sx={{
            border: "none",
            boxShadow: theme.shadows[6],
            overflow: "hidden",
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", // 16:9
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${latestPredica.youtubeId}`}
              title={latestPredica.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                border: 0,
              }}
            ></iframe>
          </Box>
        </Card>
      </Box>

      {/* 3️⃣ OTRAS 3 PREDICAS */}
      <Box maxWidth="1200px" mx="auto">
        <Typography
          variant="h4"
          component="h3"
          color={palette.text.primary}
          mb={3}
        >
          RECIENTES
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {otherPredicas.map((predica, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  position: "relative",
                  border: `solid 1px ${palette.primary[400]}`,
                }}
              >
                {/* Imagen de YouTube */}
                <CardMedia
                  component="img"
                  image={`https://i1.ytimg.com/vi/${predica.youtubeId}/hqdefault.jpg`}
                  alt={predica.title}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {predica.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {predica.minister?.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {formatDate(predica.date)}
                  </Typography>
                </CardContent>

                {/* Overlay con enlace */}
                <Link
                  href={predica.youtubeLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ver predica en YouTube"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Sermons;
