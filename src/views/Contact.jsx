import React from "react";
import Form from "../components/Form";
import { Box } from "@mui/material";

function Contact() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form />
    </Box>
  );
}

export default Contact;
