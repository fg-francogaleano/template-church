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
  Modal,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import CalendarIcon from "../icons/CalendarIcon";
import ClockIcon from "../icons/ClockIcon";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import { styled } from "@mui/system";
import PeopleIcon from "../icons/PeopleIcon";
import LocationOnIcon from "../icons/LocationOnIcon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupIcon from "@mui/icons-material/Group";

import theme from "../MUI/Theme";
import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";
import PersonIcon from "../icons/PersonIcon";
import Calculator from "../icons/Calculator";
import WhatsappInvitationButton from "../components/WhatsappInvitationButton";

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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "80vh",
  overflowY: "auto",
};

const iconStyle = {
  color: "primary.main",
  fontSize: "1rem",
  mt: "2px",
};

const labelStyle = {
  fontWeight: "fontWeightSemiBold",
  color: "text.secondary",
};

const contentStyle = {
  color: "text.secondary",
  ml: 1,
};

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
        console.log(data);
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
                        {`${formatDate(event.startDate)}${
                          event.endDate ? ` - ${formatDate(event.endDate)}` : ""
                        }`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ClockIcon fontSize="small" color="primary" />
                      <Typography color={theme.palette.primary[700]}>
                        {event.time} hs
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
                </CardContent>
                <Button
                  variant="outlined"
                  color={event.featured ? "secondary" : "primary"}
                  sx={{ marginBottom: 3 }}
                  onClick={() => handleOpenModal(event)}
                >
                  Más Información
                </Button>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>

      {/* ✅ CORRECCIÓN CLAVE: El Modal se renderiza solo si hay un evento seleccionado.
        Esto asegura que no haya un componente `Modal` sin contenido o con `props` nulas,
        evitando el error.
      */}
      {selectedEvent && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="event-title"
          aria-describedby="event-detailed-description"
        >
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "grey.700",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography
              id="event-title"
              variant="h4"
              component="h2"
              color="primary"
              gutterBottom
            >
              {selectedEvent.title}
            </Typography>
            <Typography
              id="event-detailed-description"
              variant="body1"
              color="text.secondary"
              paragraph
            >
              {selectedEvent.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarIcon fontSize="small" />
                      <Typography
                        sx={{ fontWeight: "bold", color: "secondary.main" }}
                      >
                        {`${formatDate(selectedEvent.startDate)}${
                          selectedEvent.endDate
                            ? ` - ${formatDate(selectedEvent.endDate)}`
                            : ""
                        }`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ClockIcon fontSize="small" color="primary" />
                      <Typography variant="body2">Horario:</Typography>
                      <Typography
                        variant="body2"
                        color={theme.palette.primary[700]}
                      >
                        {selectedEvent.time} hs
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOnIcon fontSize="small" color="primary" />
                      <Typography variant="body2">Lugar:</Typography>
                      <Typography
                        variant="body2"
                        color={theme.palette.primary[700]}
                      >
                        {selectedEvent.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PeopleIcon fontSize="small" color="primary" />
                      <Typography variant="body2">Dirigido a:</Typography>
                      <Typography
                        variant="body2"
                        color={theme.palette.primary[700]}
                      >
                        {selectedEvent.attendees}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {selectedEvent.guestName ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <PersonIcon fontSize="small" color="primary" />
                        <Typography variant="body2">Invitado:</Typography>
                        <Typography color={theme.palette.primary[700]}>
                          {selectedEvent.guestName}
                        </Typography>
                      </Box>
                    ) : null}
                    {selectedEvent.cost ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Calculator fontSize="small" color="primary" />
                        <Typography variant="body2">Inversion:</Typography>
                        <Typography variant="body2" sx={contentStyle}>
                          {selectedEvent.costValue
                            ? `$ ${selectedEvent.costValue}`
                            : selectedEvent.cost}
                        </Typography>
                      </Box>
                    ) : null}
                    {selectedEvent.contact ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                        }}
                      >
                        <PhoneIcon sx={iconStyle} />
                        <Box>
                          <Typography variant="body2" sx={labelStyle}>
                            Contacto:
                          </Typography>
                          <Typography variant="body2" sx={contentStyle}>
                            {selectedEvent.contact}
                          </Typography>
                        </Box>
                      </Box>
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 4,
                pt: 2,
                justifyContent: "center",
                flexDirection:{xs: "column" , sm:"inherit"}
              }}
            >
              {selectedEvent.registrationLink ? (
              <Button
                variant="contained"
                color="primary"
                href={selectedEvent.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flexGrow: 1 }}
              >
                Inscribirme
              </Button>
            ) : (
              <Alert severity="info" >
                No es necesario inscribirse para este evento.
              </Alert>
            )}
              <WhatsappInvitationButton
                message={selectedEvent.invitationText}
                buttonText="Compartir"
              />
            </Box>
          </Box>
        </Modal>
      )}
    </StyledSection>
  );
};

export default Events;
