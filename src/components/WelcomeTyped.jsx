// src/components/WelcomeTyped.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { ReactTyped } from 'react-typed';

const WelcomeTyped = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        // backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          // Reservamos un espacio fijo para ambas frases
          minHeight: "150px", // Ajusta este valor si el texto es más grande
          // paddingLeft: { xs: 2, sm: 4, md: 8 }
        }}
      >
        <Typography variant="h2" sx={{ color: "white" }}>
          <ReactTyped
            strings={["Bienvenido"]}
            typeSpeed={50}
            showCursor={false}
          />
        </Typography>
        <Typography variant="h3" sx={{ color: "white", mt: 1 }}>
          <ReactTyped
            strings={["a casa"]}
            typeSpeed={50}
            startDelay={1500}
            showCursor={false}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeTyped;