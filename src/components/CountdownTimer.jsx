// src/components/CountdownTimer.jsx

import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";

/**
 * Calcula el tiempo restante hasta la fecha del evento.
 * @param {string} dateString - La fecha del evento en formato YYYY-MM-DD.
 * @returns {{days: number, hours: number, minutes: number, seconds: number, isEventHappening: boolean, hasEventEnded: boolean}}
 */
const calculateTimeLeft = (dateString) => {
  if (!dateString) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEventHappening: false,
      hasEventEnded: true,
    };
  }

  // 🔑 CORRECCIÓN CLAVE: Establece el límite al final del día local (23:59:59)
  const targetDate = new Date(`${dateString}T23:59:59`);

  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  let isEventHappening = false;
  let hasEventEnded = false;

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    hasEventEnded = true;
  }

  return { ...timeLeft, isEventHappening, hasEventEnded };
};

const CountdownTimer = ({ endDate }) => {
  const { palette } = useTheme();

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endDate));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(endDate));

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endDate);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.hasEventEnded) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const timerComponents = [
    { value: timeLeft.days, label: "días" },
    { value: timeLeft.hours, label: "hrs" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "seg" },
  ];

  if (timeLeft.hasEventEnded) {
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: "error.main",
          color: "error.contrastText",
          borderRadius: 1,
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Evento Finalizado
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 1, sm: 0 }, // Reducimos el gap aquí para que los divisores estén más cerca
        // border: "solid 1px red",
        p: 1,
      }}
    >
      {timerComponents.map((component, index) => (
        <React.Fragment key={index}>
          <Box
            sx={{
              textAlign: "center",
              minWidth: { xs: 40, sm: 50 },
              mx: { xs: 0.5, sm: 1.5 }, // Añadimos margen horizontal para separar del divisor
            //   border: "solid 1px red",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              color="primary.main" // Mantenemos el color primario para el texto
              sx={{
                borderRadius: 1,
                // p: 0.5,
                mb: 0.5,
                fontSize: { xs: "1.9rem" , md: "2.2rem" },
              }}
            >
              {String(component.value).padStart(2, "0")}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase" }}
            >
              {component.label}
            </Typography>
          </Box>

          {index < timerComponents.length - 1 && (
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                // height: 40,
                backgroundColor: "grey.400",
                mx: 0, // Eliminamos el margen horizontal en el divisor para que toque los ítems
                // display: { xs: "none", sm: "block" }, // Ocultar en móviles si el espacio es limitado
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default CountdownTimer;
