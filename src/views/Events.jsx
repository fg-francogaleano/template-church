// src/components/Events.jsx (Tu archivo principal)

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  Typography,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
// Asegúrate de que los imports de Sanity y EventModal sean correctos
import { styled } from "@mui/system";
import { sanityClient } from "../../lib/sanityClient";
import EventModal from "../components/EventModal";
import EventSlide from "../views/EventSlide"; 

// Componentes estilizados
const StyledSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(4, 0), // Aumentamos el padding para mejor espaciado
  backgroundColor: theme.palette.background.default,
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1400, // Aumentamos el max-width para acomodar el nuevo diseño de slide
  margin: "0 auto",
  padding: theme.spacing(0, 2),
  textAlign: "center",
}));

// Componentes de flecha personalizados (sin cambios)
const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: -15,
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
      right: -15,
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

  // Lógica de fetching de Sanity (sin cambios, es correcta)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // La consulta de Sanity está bien, trae los campos necesarios.
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

  // Configuración de react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Mantenemos 1 para el diseño de tarjeta grande
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: false,
    centerPadding: "0",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <StyledSection id="eventos">
      <StyledContainer>
        {events.length > 0 ? (
          <Box sx={{ maxWidth: 1000, margin: "0 auto" }}> {/* Aumentamos el ancho máximo para el slider */}
            <Box
              sx={{
                maxWidth: 1000,
                margin: "0 auto",
                overflow: "hidden", // Mantenemos la solución para el scroll horizontal
              }}
            >
              <Slider {...sliderSettings}>
                {events.map((event) => (
                  <Box
                    key={event._id} // Usamos _id de Sanity como key
                    sx={{
                      width: "100%",
                      padding: "10px 8px",
                      mb: 1,
                    }}
                  >
                    <EventSlide event={event} onOpenModal={handleOpenModal} />
                  </Box>
                ))}
              </Slider>
            </Box>
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