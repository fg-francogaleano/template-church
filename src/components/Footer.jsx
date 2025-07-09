import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TikTokIcon from "@mui/icons-material/MusicNote";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1c1c1c",
        color: "#ffffff",
        padding: "10px 0 5px 0px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Redes Sociales */}
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h6" gutterBottom>
                Puerta de Paz
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}
              >
                Seguinos en nuestras redes.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  gap: 1,
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="Instagram"
                  component={Link}
                  href="https://www.instagram.com/tu_instagram"
                  target="_blank"
                  rel="noopener"
                >
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Facebook"
                  component={Link}
                  href="https://www.facebook.com/tu_facebook"
                  target="_blank"
                  rel="noopener"
                >
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="TikTok"
                  component={Link}
                  href="https://www.tiktok.com/@tu_tiktok"
                  target="_blank"
                  rel="noopener"
                >
                  <TikTokIcon fontSize="large" />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="YouTube"
                  component={Link}
                  href="https://www.youtube.com/tu_youtube"
                  target="_blank"
                  rel="noopener"
                >
                  <YouTubeIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Información de contacto */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Contacto</Typography>
            <List dense>
              <ListItem disablePadding>
                <WhatsAppIcon fontSize="small" sx={{ marginRight: "10px" }} />
                <ListItemText primary="+54 9 11 0000 0000" />
              </ListItem>
              <ListItem disablePadding>
                <LocationOnIcon fontSize="small" sx={{ marginRight: "10px" }} />

                <ListItemText primary="Av. Fe 1234, Buenos Aires" />
              </ListItem>
              <ListItem disablePadding>
                <EmailIcon fontSize="small" sx={{ marginRight: "10px" }} />

                <ListItemText primary="contacto@iglesiaejemplo.org" />
              </ListItem>
            </List>
          </Grid>

          {/* Horarios */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Reuniones
            </Typography>
            <Typography variant="body2" gutterBottom>
              Domingos - 10:00 hs (Celebración)
            </Typography>
            <Typography variant="body2" gutterBottom>
              martes - 17:00 hs (Mujeres)
            </Typography>
            <Typography variant="body2" gutterBottom>
              Miércoles - 19:30 hs (Reu. Familia)
            </Typography>
            <Typography variant="body2" gutterBottom>
              Jueves - 20:00 hs (Varones)
            </Typography>
          </Grid>
        </Grid>
        {/* Copyright */}
        <Box mt={1} textAlign={"center"}>
          <Typography variant="caption" color="inherit" alignSelf={"center"}>
            Copyright © 2025 Iglesia | Made with ♥️ by Franco Galeano
          </Typography>
          {/* <Stack direction="row" spacing={0}>
            <IconButton
              color="inherit"
              aria-label="Facebook"
              href="https://facebook.com"
              target="_blank"
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Instagram"
              href="https://instagram.com"
              target="_blank"
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="TikTok"
              href="https://tiktok.com"
              target="_blank"
            >
              <TikTokIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="YouTube"
              href="https://youtube.com"
              target="_blank"
            >
              <YouTubeIcon fontSize="small" />
            </IconButton>
          </Stack> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
