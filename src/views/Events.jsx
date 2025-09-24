import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import CalendarIcon from "../icons/CalendarIcon";
import ClockIcon from "../icons/ClockIcon";
import PeopleIcon from "../icons/PeopleIcon";
import LocationOnIcon from "../icons/LocationOnIcon";
import { maxWidth, minWidth, styled } from "@mui/system";
import { sanityClient } from "../../lib/sanityClient";
import EventModal from "../components/EventModal";

// Componentes estilizados
const StyledSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(2, 0),
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
  margin: "0 auto",
  border: `solid 1px ${theme.palette.primary[300]}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "3px",
  padding: "0 15px",
  // Estilo por defecto (para pantallas grandes)
  maxWidth: 600,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
  ...(isFeatured && {
    border: `1px solid ${theme.palette.secondary.main}`,
    background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.secondary.light}15)`,
  }),
  // Estilo para el breakpoint sm y superior
  [theme.breakpoints.down("md")]: {
    width: "85%",
    minWidth: 300,
  },
}));

// Componentes de flecha personalizados
const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: -25,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      color: "grey",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      },
    }}
  >
    <ArrowBackIosNewIcon fontSize="large" />
  </IconButton>
);

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: -25,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      color: "grey",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      },
    }}
  >
    <ArrowForwardIosIcon fontSize="large" />
  </IconButton>
);

const Events = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event" && startDate >= now()] 
          | order(featured desc, startDate asc)[0...4] {
            _id,
            title,
            startDate,
            endDate,
            time,
            location,
            description,
            attendees,
            featured,
            cost,
            costValue,
            contactPhone,
            specialGuest,
            guestName,
            invitationText,
            registrationLink
          }`;
        const data = await sanityClient.fetch(query);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  function formatDate(dateString) {
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
  }

  // Configuración de react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

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

        {events.length > 0 ? (
          <Box
            sx={{ maxWidth: 900, margin: "0 auto"}}
          >
            <Slider {...sliderSettings}>
              {events.map((event, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    padding: "10px 8px",
                    mb: 1
                  }}
                >
                  <StyledCard isFeatured={event.featured}>
                    <CardHeader
                      sx={{ pb: 0, pt: 3 }}
                      title={
                        // <Box display={"flex"} justifyContent={"space-between"}>
                        //   <Typography
                        //     variant="h5"
                        //     component="h3"
                        //     sx={{ color: "primary.main" }}
                        //   >
                        //     {event.title}
                        //   </Typography>
                        //   {event.featured && (
                        //     <Chip
                        //       label="Evento Destacado"
                        //       size="small"
                        //       color="secondary"
                        //       sx={{ mb: 1, fontWeight: "bold" }}
                        //     />
                        //   )}
                        // </Box>
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            paddingTop: theme.spacing(4), // Asegura espacio para el Chip en la esquina
                          }}
                        >
                          {event.featured && (
                            <Chip
                              label="Destacado"
                              size="small"
                              color="secondary"
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                zIndex: 1, // Asegura que el chip esté encima de otros elementos
                                fontWeight: "bold",
                              }}
                            />
                          )}
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                              color: "primary.main",
                              textAlign: "left",
                              width: "100%",
                              fontSize: "1.5rem"
                            }}
                          >
                            {event.title}
                          </Typography>
                        </Box>
                      }
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: { xs: 0.6, sm: 1.5 },
                          textAlign: "left",
                          color: "text.secondary",
                          mb: { xs: 0, sm: 2 },
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CalendarIcon fontSize="small" />
                          <Typography
                            sx={{ fontWeight: "bold", color: "secondary.main" }}
                          >
                            {`${formatDate(event.startDate)}${
                              event.endDate
                                ? ` - ${formatDate(event.endDate)}`
                                : ""
                            }`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <ClockIcon fontSize="small" color="primary" />
                          <Typography color={theme.palette.primary[700]}>
                            {event.time} hs
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <LocationOnIcon fontSize="small" color="primary" />
                          <Typography color={theme.palette.primary[700]}>
                            {event.location}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <PeopleIcon fontSize="small" color="primary" />
                          <Typography color={theme.palette.primary[700]}>
                            {event.attendees}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <Button
                      variant="outlined"
                      color={event.featured ? "secondary" : "primary"}
                      sx={{ mb: { xs: 3, sm: 3 } }}
                      onClick={() => handleOpenModal(event)}
                    >
                      Más Información
                    </Button>
                  </StyledCard>
                </Box>
              ))}
            </Slider>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary" mt={4}>
            No hay próximos eventos disponibles en este momento.
          </Typography>
        )}
      </StyledContainer>

      <EventModal
        open={openModal}
        handleClose={handleCloseModal}
        selectedEvent={selectedEvent}
      />
    </StyledSection>
  );
};

export default Events;
