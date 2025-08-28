import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import CalendarIcon from "../icons/CalendarIcon";
import ClockIcon from "../icons/ClockIcon";
import { border, styled } from "@mui/system";
import PeopleIcon from "../icons/PeopleIcon";
import LocationOnIcon from "../icons/LocationOnIcon";
import theme from "../MUI/Theme";
import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";

const StyledSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.default,
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(0, 2),
  textAlign: "center",
}));

const StyledCard = styled("div")(({ theme, isFeatured }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  border: `solid 1px ${theme.palette.primary[300]}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "3px",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
  ...(isFeatured && {
    border: `1px solid ${theme.palette.secondary.main}`,
    background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.secondary.light}15)`,
  }),
}));

const Events = () => {
//   const events = [
//     {
//       title: "Conferencia de Matrimonios",
//       date: "15-17 Marzo 2024",
//       time: "Viernes 7:00 PM - Domingo 12:00 PM",
//       location: "Salón Principal",
//       description:
//         "Tres días para fortalecer tu matrimonio con enseñanzas bíblicas y actividades prácticas.",
//       attendees: "Parejas casadas",
//       featured: true,
//     },
//     {
//       title: "Retiro de Jóvenes",
//       date: "22-24 Marzo 2024",
//       time: "Viernes 6:00 PM - Domingo 5:00 PM",
//       location: "Campo Esperanza",
//       description:
//         "Un fin de semana de crecimiento espiritual, diversión y nuevas amistades.",
//       attendees: "Jóvenes 13-25 años",
//     },
//     {
//       title: "Noche de Testimonios",
//       date: "5 Abril 2024",
//       time: "7:00 PM - 9:00 PM",
//       location: "Santuario",
//       description:
//         "Una noche especial para compartir cómo Dios ha obrado en nuestras vidas.",
//       attendees: "Toda la familia",
//     },
//     {
//       title: "Escuela Bíblica de Verano",
//       date: "15-19 Julio 2024",
//       time: "9:00 AM - 12:00 PM",
//       location: "Aulas educativas",
//       description:
//         "Una semana llena de diversión, aprendizaje y aventuras bíblicas para niños.",
//       attendees: "Niños 4-12 años",
//     },
//   ];

  const [events, setEvents] = useState([]);

useEffect(() => {
    const query = `*[_type == "event" && date >= now()] 
      | order(featured desc, date asc)[0...4] {
        _id,
        title,
        date,
        time,
        location,
        description,
        attendees,
        featured
      }`;

    sanityClient.fetch(query).then((data) => {
      setEvents(data);
    });
  }, []);

  // ✅ Aseguramos que no reste días
  function formatDate(dateString) {
    if (!dateString) return "";
    // Si Sanity guarda "YYYY-MM-DD"
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [y, m, d] = dateString.split("-");
      return `${d}/${m}/${y}`; // dd/mm/aaaa
    }
    // fallback: datetime ISO → UTC
    const date = new Date(dateString + "T00:00:00Z");
    return date.toLocaleDateString("es-ES", {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <StyledSection id="eventos">
      <StyledContainer>
        <Box mb={8}>
          <Typography
            variant="h3"
            component="h1"
            textAlign="center"
            gutterBottom
            marginTop={6}
          >
            Próximos Eventos
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: 800, margin: "0 auto", color: "text.secondary" }}
          >
            Mantente conectado con nuestra comunidad a través de eventos
            especiales, conferencias y actividades que fortalecen la fe y la
            amistad.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {events.map((event, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <StyledCard isFeatured={event.featured}>
                <CardHeader
                  sx={{ pb: 0, pt: 3 }}
                  title={
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ color: "primary.main" }}
                      >
                        {event.title}
                      </Typography>
                      {event.featured && (
                        <Chip
                          label="Evento Destacado"
                          size="small"
                          color="secondary"
                          sx={{ mb: 1, fontWeight: "bold" }}
                        />
                      )}
                    </Box>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      textAlign: "left",
                      color: "text.secondary",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarIcon fontSize="small" />
                      <Typography
                        sx={{ fontWeight: "bold", color: "secondary.main" }}
                      >
                        {formatDate(event.date)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ClockIcon fontSize="small" color="primary" />
                      <Typography color={theme.palette.primary[700]}>
                        {event.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOnIcon fontSize="small" color="primary" />
                      <Typography color={theme.palette.primary[700]}>
                        {event.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PeopleIcon fontSize="small" color="primary" />
                      <Typography color={theme.palette.primary[700]}>
                        {event.attendees}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{ mb: 2 }}
                    color={theme.palette.primary[700]}
                  >
                    {event.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="outlined"
                  color={event.featured ? "secondary" : "primary"}
                  sx={{ marginBottom: 3 }}
                >
                  Más Información
                </Button>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </StyledSection>
  );
};

export default Events;
