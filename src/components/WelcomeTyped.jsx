// src/components/WelcomeTyped.jsx
import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { ReactTyped } from "react-typed";

const WelcomeTyped = () => {
  const { palette } = useTheme();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "150px",
          paddingLeft: { xs: 1, sm: 4, md: 8 },
          zIndex: 9999,
        }}
      >
        <Typography
          variant="h2"
          color={palette.primary[100]}
          fontWeight={600}
          fontSize={60}
          fontFamily={"sans-serif"}
        >
          <ReactTyped
            strings={["BIENVENIDO"]}
            typeSpeed={50}
            showCursor={false}
          />
        </Typography>
        {/* <Typography
          variant="h3"
          color={palette.primary[100]}
          fontWeight={200}
          letterSpacing={1}
          fontSize={36}
        >
          <ReactTyped
            strings={["Estas en casa"]}
            typeSpeed={50}
            startDelay={1500}
            showCursor={false}
          />
        </Typography> */}
      </Box>
    </Box>
  );
};

export default WelcomeTyped;
