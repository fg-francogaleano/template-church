// src/components/EventSlide.jsx (Crear este nuevo archivo)

import React from "react";
import {
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Chip,
  useTheme,
  Link,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarIcon from "../icons/CalendarIcon"; // Asumo que aún usas estos iconos
import ClockIcon from "../icons/ClockIcon";
import PeopleIcon from "../icons/PeopleIcon";
import { fontSize, styled } from "@mui/system";
import CountdownTimer from "../components/CountdownTimer"; // Importamos el nuevo componente
import FeaturedBanner from "../components/FeaturedBanner";

// Componentes estilizados
const StyledCard = styled("div")(({ theme, isFeatured }) => ({
  position: "relative",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  margin: "0 auto",
  border: `solid 1px ${theme.palette.primary[300]}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "3px",
  padding: "0 15px",
  maxWidth: 800,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
  ...(isFeatured && {
    border: `1px solid ${theme.palette.secondary.main}`,
    background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.secondary.light}15)`,
  }),
  [theme.breakpoints.down("md")]: {
    width: "85%",
    minWidth: 200,
  },
}));

/**
 * Función auxiliar para formatear la fecha
 */
const formatDate = (dateString) => {
  if (!dateString) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [y, m, d] = dateString.split("-");
    return `${d}/${m}/${y}`;
  }
  const date = new Date(dateString + "T00:00:00Z");
  return date.toLocaleDateString("es-ES", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const EventSlide = ({ event, onOpenModal }) => {
  const { palette } = useTheme();

  // Extraemos la información de la fecha para el diseño del bloque lateral
  const eventDate = event.startDate
    ? new Date(event.startDate + "T00:00:00Z")
    : null;
  const eventDay = eventDate ? eventDate.getUTCDate() : "--";
  const eventMonth = eventDate
    ? eventDate
        .toLocaleDateString("es-ES", { month: "short", timeZone: "UTC" })
        .toUpperCase()
        .replace(".", "")
    : "---";

  return (
    <StyledCard isFeatured={event.featured}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          p: { xs: 2, lg: 3 },
        }}
      >
        {/* Bloque de Fecha (event_date) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: { lg: 100 },
            p: 1,
            bgcolor: event.featured ? "secondary.light" : "primary.main", // Estilo de fecha destacado
            borderRadius: 1,
            color: "primary.contrastText",
          }}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: "bold", lineHeight: 1 }}
          >
            {eventDay}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ textTransform: "uppercase" }}
          >
            {eventMonth}
          </Typography>
        </Box>

        {/* Bloque de Contenido y Datos (event_content) */}
        <Box
          sx={{
            flexGrow: 1,
            textAlign: { xs: "center", lg: "left" },
            px: { xs: 0, lg: 2 },
          }}
        >
          {/* {event.featured && (
            <Chip
              label="DESTACADO"
              size="small"
              color="secondary"
              sx={{ mb: 1, fontWeight: "bold", fontSize: '0.7rem' }}
            />
          )} */}
          {event.featured && (
            <Box
              sx={{
                position: "absolute",
                top: 5, // Posicionamos un poco debajo del borde superior
                left: 5, // Posicionamos al borde izquierdo
                zIndex: 10, // Aseguramos que esté por encima de otros elementos
              }}
            >
              <FeaturedBanner label="DESTACADO" sx={{ fontSize: { xs: "0.7rem", sm: "1.2rem" } }}/>
            </Box>
          )}

          {/* Título del Evento */}
          <Typography
            variant="h5"
            component="h3"
            sx={{ color: "primary.dark", mb: 1, fontWeight: "bold" }}
          >
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onOpenModal(event);
              }}
              color="primary.main"
              underline="hover"
            >
              {event.title}
            </Link>
          </Typography>

          {/* Fila de Datos (event_row) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
            {/* Horario */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
              }}
            >
              <ClockIcon
                fontSize="small"
                color={
                  event.featured ? palette.secondary.main : palette.primary[600]
                }
              />
              <Typography variant="body2">{event.time} hs</Typography>
            </Box>
            {/* Ubicación */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
              }}
            >
              <LocationOnIcon
                fontSize="small"
                sx={{
                  color: event.featured
                    ? palette.secondary.main
                    : palette.primary[600],
                }}
              />
              <Typography variant="body2">{event.location}</Typography>
            </Box>
            {/* Destinado (Opcional, si quieres incluirlo del componente original) */}
            {/* {event.attendees && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <PeopleIcon fontSize="small" color={palette.secondary.main} />
                <Typography variant="body2">
                  {event.attendees}
                </Typography>
              </Box>
            )} */}
          </Box>
        </Box>

        {/* Bloque de Cuenta Regresiva (event_timer_container) */}
        <Box
          sx={{
            mt: { xs: 2, lg: 0 },
            minWidth: { lg: 250 },
          }}
        >
          <CountdownTimer endDate={event.startDate} />
          <Button
            variant="contained"
            color={event.featured ? "secondary" : "primary"}
            onClick={() => onOpenModal(event)}
            sx={{ mt: 2, width: "100%" }}
          >
            Más Información
          </Button>
        </Box>
      </Box>
    </StyledCard>
  );
};

export default EventSlide;
