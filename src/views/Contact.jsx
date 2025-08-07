import { useEffect, useState } from "react";
import { sanityClient } from "../../lib/sanityClient";
import Form from "../components/Form";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  CssBaseline,
  Grid,
  Link,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "../icons/FacebookIcon";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import TikTokIcon from "../icons/TiktokIcon";

function Contact() {
  const [redes, setRedes] = useState({});

  useEffect(() => {
    const fetchRedes = async () => {
      const query = `*[_type == "contact"][0].redes`;
      const result = await sanityClient.fetch(query);
      setRedes(result);
    };
    fetchRedes();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const gridPaddingCompensation = isMobile ? 0 : 2;

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? 2 : gridPaddingCompensation,
          boxSizing: "border-box",
        }}
      >
        {isMobile ? (
          <Form />
        ) : (
          <Box width={"100%"}>
            {/* Lado Izquierdo: Ubicación y Redes Sociales */}
            <Box>
              <Typography variant="h4" textAlign={"center"}>
                Contacto
              </Typography>
              <Form />
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" gutterBottom>
                Ubicación
              </Typography>
              <Typography variant="body1" paragraph>
                Blas Parera 1206, Castelar, Buenos Aires
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  bgcolor: "grey.300",
                  mb: 4,
                  overflow: "hidden",
                  borderRadius: 1,
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.75899990847!2d-58.64731882414771!3d-34.66173006093863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbe04a44d8527%3A0x6b8401340156d64d!2sBlas%20Parera%201206%2C%20Castelar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                ></iframe>
              </Box>
              {/* <Typography variant="h4">Síguenos</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {redes.instagram && (
                  <IconButton
                    color="inherit"
                    aria-label="Instagram"
                    component={Link}
                    href={redes.instagram}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                )}
                {redes.facebook && (
                  <IconButton
                    color="inherit"
                    aria-label="Facebook"
                    component={Link}
                    href={redes.facebook}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                )}
                {redes.tiktok && (
                  <IconButton
                    color="inherit"
                    aria-label="TikTok"
                    component={Link}
                    href={redes.tiktok}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <TikTokIcon fontSize="small" />
                  </IconButton>
                )}
                {redes.x && (
                  <IconButton
                    color="inherit"
                    aria-label="X"
                    component={Link}
                    href={redes.x}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <XIcon fontSize="small" />
                  </IconButton>
                )}
                {redes.youtube && (
                  <IconButton
                    color="inherit"
                    aria-label="YouTube"
                    component={Link}
                    href={redes.youtube}
                    target="_blank"
                    rel="noopener"
                    sx={{ padding: "0px" }}
                  >
                    <YouTubeIcon fontSize="small" />
                  </IconButton>
                )}
              </Box> */}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Contact;
