import {
  Modal,
  Box,
  IconButton,
  Typography,
  Grid,
  Button,
  Alert,
  CardHeader,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../MUI/Theme";
import CalendarIcon from "../icons/CalendarIcon";
import ClockIcon from "../icons/ClockIcon";
import LocationOnIcon from "../icons/LocationOnIcon";
import PeopleIcon from "../icons/PeopleIcon";
import PersonIcon from "../icons/PersonIcon";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsappInvitationButton from "../components/WhatsappInvitationButton";
import WalletIcon from "../icons/WalletIcon";
import { RiPhoneFill, RiTimeFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { IoCalendarNumberSharp, IoPeopleSharp, IoPerson, IoWallet } from "react-icons/io5";
import { BsFillPersonFill, BsPeopleFill } from "react-icons/bs";

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

const EventModal = ({ open, handleClose, selectedEvent }) => {

  const { palette } = useTheme()

  if (!selectedEvent) {
    return null;
  }

  const eventData = [
    {
      icon: <IoCalendarNumberSharp size={25}  color={palette.secondary.main} />,
      label: "Fecha",
      content: `${formatDate(selectedEvent.startDate)}${
        selectedEvent.endDate ? ` al ${formatDate(selectedEvent.endDate)}` : ""
      }`,
    },
    {
      icon: <RiTimeFill size={25} color={palette.secondary.main} />,
      label: "Horario",
      content: `${selectedEvent.time} hs`,
    },
    {
      icon: <HiLocationMarker size={25} color={palette.secondary.main} />,
      label: "Ubicación",
      content: selectedEvent.location,
    },
    {
      icon: <BsPeopleFill size={25} color={palette.secondary.main} />,
      label: "Destinado",
      content: selectedEvent.attendees,
    },
  ];

  if (selectedEvent.cost) {
    eventData.push({
      icon: <IoWallet size={25} color={palette.secondary.main} />,
      label: "Inversión",
      content: selectedEvent.costValue
        ? `$${selectedEvent.costValue}`
        : selectedEvent.cost,
    });
  }

  if (selectedEvent.contactPhone) {
    eventData.push({
      icon: <RiPhoneFill size={25} color={palette.secondary.main} />,
      label: "Contacto",
      content: selectedEvent.contactPhone,
    });
  }

  if (selectedEvent.guestName) {
    eventData.push({
      icon: <BsFillPersonFill size={25} color={palette.secondary.main} />,
      label: "Invitado",
      content: selectedEvent.guestName,
    });
  }

  const midPoint = Math.ceil(eventData.length / 2);
  const firstHalf = eventData.slice(0, midPoint);
  const secondHalf = eventData.slice(midPoint);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="event-title"
      aria-describedby="event-detailed-description"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {firstHalf.map((item, index) => (
                  <Box key={index} >
                    <CardHeader
                      avatar={item.icon}
                      title={
                        <Typography variant="body2">{item.label}</Typography>
                      }
                      subheader={
                        <Typography
                          fontWeight={200}
                          color={theme.palette.primary[700]}
                          variant="body1"
                        >
                          {item.content}
                        </Typography>
                      }
                      sx={{ padding: 0.5 }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {secondHalf.map((item, index) => (
                  <Box key={index} >
                    <CardHeader
                      avatar={item.icon}
                      title={
                        <Typography variant="body2">{item.label}</Typography>
                      }
                      subheader={
                        <Typography
                          fontWeight={200}
                          color={theme.palette.primary[700]}
                          variant="body1"
                        >
                          {item.content}
                        </Typography>
                      }
                      sx={{ padding: 0.5 }}
                    />
                  </Box>
                ))}
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
            flexDirection: { xs: "column", sm: "inherit" },
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
          ) : null}
          <WhatsappInvitationButton
            message={selectedEvent.invitationText}
            buttonText="Compartir"
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default EventModal;
