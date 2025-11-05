// src/components/OfflineAlert.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import WifiOffIcon from "@mui/icons-material/WifiOff";

const OfflineAlert = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        bgcolor: "error.main",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        py: 1,
        zIndex: 2000,
      }}
    >
      <WifiOffIcon fontSize="small" />
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        Sin conexión a internet
      </Typography>
    </Box>
  );
};

export default OfflineAlert;
