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
import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";

import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TikTokIcon from "../icons/TiktokIcon";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "../icons/LocationOnIcon";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "footer"][0]`;
      const data = await sanityClient.fetch(query);
      setFooterData(data);
    };
    fetchData();
  }, []);

  if (!footerData) return null;

  const {
    telefono,
    email,
    calle,
    numero,
    localidad,
    provincia,
    horarios,
    redes,
  } = footerData;

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
          <Grid sx={{ width: { xs: "100%", md: "auto" } }}>
            <Box
              sx={{ textAlign: { xs: "center", md: "left" }, width: "100%" }}
            >
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
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 1,
                }}
              >
                {redes?.instagram && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.instagram}
                    target="_blank"
                    rel="noopener"
                  >
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                )}
                {redes?.facebook && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.facebook}
                    target="_blank"
                    rel="noopener"
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                )}
                {redes?.tiktok && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.tiktok}
                    target="_blank"
                    rel="noopener"
                  >
                    <TikTokIcon fontSize="small" />
                  </IconButton>
                )}
                {redes?.x && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.x}
                    target="_blank"
                    rel="noopener"
                  >
                    <XIcon fontSize="small" />
                  </IconButton>
                )}
                {redes?.youtube && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    href={redes.youtube}
                    target="_blank"
                    rel="noopener"
                  >
                    <YouTubeIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Información de contacto */}
          <Grid sx={{ width: { xs: "100%", md: "auto" } }}>
            <Box
              sx={{
                textAlign: { xs: "center", sm: "left" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h6">Contacto</Typography>
              <List
                dense
                sx={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <ListItem
                  disablePadding
                  sx={{
                    justifyContent: { xs: "center", sm: "flex-start" },
                    gap: "10px",
                  }}
                >
                  <WhatsAppIcon fontSize="small" />
                  <Typography variant="body1">{telefono}</Typography>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    justifyContent: { xs: "center", sm: "flex-start" },
                    gap: "10px",
                  }}
                >
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ marginRight: "10px" }}
                  />
                  <Typography variant="body1">
                    {`${calle} ${numero}, ${localidad}, ${provincia}`}
                  </Typography>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    justifyContent: { xs: "center", sm: "flex-start" },
                    gap: "10px",
                  }}
                >
                  <MailOutlineIcon fontSize="small" />
                  {/* Reemplazado ListItemText con Typography */}
                  <Typography variant="body1">{email}</Typography>
                </ListItem>
              </List>
            </Box>
          </Grid>

          {/* Horarios */}
          <Grid sx={{ width: { xs: "100%", md: "auto" } }}>
            <Box
              sx={{
                textAlign: { xs: "center", sm: "left" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Reuniones
              </Typography>
              {horarios?.map((item, idx) => (
                <Typography variant="body2" gutterBottom key={idx}>
                  {item.dia} - {item.hora} hs
                  {item.descripcion ? ` (${item.descripcion})` : ""}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign={"center"}>
          <Typography variant="caption" color="inherit">
            Copyright © 2025 Iglesia | Made with ♥️ by Franco Galeano
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
