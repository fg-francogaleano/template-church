import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CardActions,
} from "@mui/material";
import CalendarIcon from "../icons/CalendarIcon";
import ClockIcon from "../icons/ClockIcon";
import { styled } from "@mui/system";
import PeopleIcon from "../icons/PeopleIcon";
import LocationOnIcon from "../icons/LocationOnIcon";
import theme from "../MUI/Theme";
import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

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
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event" && date >= now()] 
          | order(featured desc, date asc)[0...4] {
            _id,
            title,
            date,
            time,
            location,
            description,
            attendees,
            featured,
            detailedDescription,
            speakers,
            cost,
            contact,
            schedule,
            includes
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

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(true);
    setSelectedEvent(null);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' },
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '80vh',
    overflowY: 'auto',
  };
  
  const iconStyle = {
    color: 'primary.main',
    fontSize: '1rem',
    mt: '2px'
  };
  
  const labelStyle = {
    fontWeight: 'fontWeightSemiBold',
    color: 'text.secondary'
  };
  
  const contentStyle = {
    color: 'text.secondary',
    ml: 1
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

        <Grid container spacing={4} justifyContent="center">
          {events.map((event) => (
            <Grid item xs={12} md={6} key={event._id}>
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
                <CardActions sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
                  <Button
                    variant="outlined"
                    color={event.featured ? "secondary" : "primary"}
                    onClick={() => handleOpenModal(event)}
                  >
                    Más Información
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>

      {/* Modal integrado */}
      {/* {selectedEvent && ( */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="event-title"
          aria-describedby="event-detailed-description"
        >
          <Box sx={modalStyle}>
            <Typography id="event-title" variant="h4" component="h2" color="primary" gutterBottom>
              {selectedEvent.title}
            </Typography>
            <Typography id="event-detailed-description" variant="body1" color="text.secondary" paragraph>
              {selectedEvent.detailedDescription}
            </Typography>
            
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <CalendarTodayIcon sx={iconStyle} />
                      <Typography variant="body2" sx={labelStyle}>Fecha:</Typography>
                      <Typography variant="body2" sx={contentStyle}>{selectedEvent.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <AccessTimeIcon sx={iconStyle} />
                      <Typography variant="body2" sx={labelStyle}>Horario:</Typography>
                      <Typography variant="body2" sx={contentStyle}>{selectedEvent.time}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <LocationOnOutlinedIcon sx={iconStyle} />
                      <Typography variant="body2" sx={labelStyle}>Lugar:</Typography>
                      <Typography variant="body2" sx={contentStyle}>{selectedEvent.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <GroupIcon sx={iconStyle} />
                      <Typography variant="body2" sx={labelStyle}>Dirigido a:</Typography>
                      <Typography variant="body2" sx={contentStyle}>{selectedEvent.attendees}</Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid size={{xs:12, md:6}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <PersonIcon sx={iconStyle} />
                      <Box>
                        <Typography variant="body2" sx={labelStyle}>Facilitadores:</Typography>
                        <List dense disablePadding>
                          {selectedEvent.speakers?.map((speaker, idx) => (
                            <ListItem key={idx} disableGutters sx={{ py: 0, pl: 2 }}>
                              <ListItemText primary={speaker} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={labelStyle}>Costo:</Typography>
                      <Typography variant="body2" sx={contentStyle}>{selectedEvent.cost}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <MailOutlineIcon sx={iconStyle} />
                      <Box>
                        <Typography variant="body2" sx={labelStyle}>Contacto:</Typography>
                        <Typography variant="body2" sx={contentStyle}>{selectedEvent.contact}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Programación:
              </Typography>
              <List dense disablePadding>
                {selectedEvent.schedule?.map((item, idx) => (
                  <ListItem key={idx} disableGutters>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <FiberManualRecordIcon sx={{ fontSize: '0.5rem', color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                  </ListItem>
                ))}
              </List>
            </Box>
{/* 
            <Box sx={{ mt: 4, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Incluye:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedEvent.includes}
              </Typography>
            </Box> */}

            <Box sx={{ display: 'flex', gap: 2, mt: 4, pt: 2, justifyContent: 'center' }}>
              <Button variant="contained" color="primary" sx={{ flexGrow: 1 }}>
                Inscribirme
              </Button>
              <Button variant="outlined" color="primary" sx={{ flexGrow: 1 }}>
                Compartir
              </Button>
            </Box>
          </Box>
        </Modal>
    </StyledSection>
  );
};

export default Events;