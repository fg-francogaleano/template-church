import React from "react";
import Form from "../components/Form";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  CssBaseline,
} from "@mui/material"; // Importa CssBaseline
import Grid from "@mui/material/Grid";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import TikTokIcon from "../icons/TiktokIcon"; // Asegúrate de que este componente exista y funcione

function Contact() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const gridPaddingCompensation = isMobile ? 0 : 2;
  // return (
  //   <>
  //     <div style={{ width: "100%", height: "100vh", display: "flex" }}>
  //       <div
  //         style={{
  //           width: "100%",
  //           height: "100vh",
  //           alignItems: "center",
  //           display: "flex",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <Box sx={{ p: 2, border: "red solid 1px" }}>
  //           <Typography variant="h4" gutterBottom>
  //             Ubicación
  //           </Typography>
  //           <Typography variant="body1" paragraph>
  //             Blas Parera 1206, Castelar, Buenos Aires
  //           </Typography>
  //           <Box
  //             sx={{
  //               width: "100%",
  //               height: 300,
  //               bgcolor: "grey.300",
  //               mb: 4,
  //               overflow: "hidden",
  //               borderRadius: 1,
  //             }}
  //           >
  //             <iframe
  //               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.75899990847!2d-58.64731882414771!3d-34.66173006093863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbe04a44d8527%3A0x6b8401340156d64d!2sBlas%20Parera%201206%2C%20Castelar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar" // Reemplaza con tu código de incrustación de Google Maps
  //               width="100%"
  //               height="100%"
  //               style={{ border: 0 }}
  //               allowFullScreen=""
  //               loading="lazy"
  //               referrerPolicy="no-referrer-when-downgrade"
  //               title="Google Maps Location"
  //             ></iframe>
  //           </Box>
  //           <Typography variant="h4" gutterBottom>
  //             Síguenos
  //           </Typography>
  //           <Box sx={{ display: "flex", gap: 1 }}>
  //             <IconButton color="primary" aria-label="Instagram">
  //               <InstagramIcon fontSize="large" />
  //             </IconButton>
  //             <IconButton color="primary" aria-label="Facebook">
  //               <FacebookIcon fontSize="large" />
  //             </IconButton>
  //             <IconButton color="primary" aria-label="TikTok">
  //               <TikTokIcon fontSize="large" />
  //             </IconButton>
  //             <IconButton color="primary" aria-label="X (formerly Twitter)">
  //               <TwitterIcon fontSize="large" />
  //             </IconButton>
  //             <IconButton color="primary" aria-label="YouTube">
  //               <YouTubeIcon fontSize="large" />
  //             </IconButton>
  //           </Box>
  //         </Box>
  //       </div>
  //       <div
  //         style={{
  //           width: "100%",
  //           height: "100vh",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Form />
  //       </div>
  //     </div>
  //   </>
  // );

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
          <Grid
            container
            spacing={4}
            sx={{ flexGrow: 1 }}
            justifyContent={"space-evenly"}
          >
            {/* Lado Izquierdo: Ubicación y Redes Sociales */}
            <Grid size={{ xs: 12, sm: 6 }}>
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.75899990847!2d-58.64731882414771!3d-34.66173006093863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbe04a44d8527%3A0x6b8401340156d64d!2sBlas%20Parera%201206%2C%20Castelar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar" // Reemplaza con tu código de incrustación de Google Maps
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                  ></iframe>
                </Box>
                <Typography variant="h4" gutterBottom>
                  Síguenos
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <IconButton
                    color="inherit"
                    aria-label="Instagram"
                    sx={{ padding: 0 }}
                  >
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label="Facebook"
                    sx={{ padding: 0 }}
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label="TikTok"
                    sx={{ padding: 0 }}
                  >
                    <TikTokIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label="X"
                    sx={{ padding: 0 }}
                  >
                    <XIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label="YouTube"
                    sx={{ padding: 0 }}
                  >
                    <YouTubeIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            {/* Lado Derecho: Formulario */}
            <Grid
              size={{ xs: 12, sm: 6 }}
              // sx={{ border: "yellow solid 1px", width: "40%" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box>
                <Typography variant="h4" gutterBottom textAlign={"center"}>
                  Contacto
                </Typography>
                <Form />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Contact;
