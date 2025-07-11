import React, { useRef, useState, useEffect } from "react";
import { Formik } from "formik"; // Asegúrate de que Formik esté instalado

import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import validations from "../utils/validations";
import emailjs from "@emailjs/browser";

function Form() {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const refForm = useRef();

  const handleSubmit = (values) => {
    console.log(refForm.current);

    const serviceId = "service_x1taarf";
    const templateId = "template_7oua2tr";
    const apiKey = "pxGg36sd8xaftbeW3";
    emailjs
      .sendForm(serviceId, templateId, refForm.current, apiKey)
      .then((res) => {
        console.log(res.text);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Formik
        initialValues={initialValues}
        validate={(values) => validations(values)}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          handleSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Box
              sx={{
                margin: "auto",
                borderRadius: "3px",
                outline: "1px solid",
                width: "300px",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  margin: "auto",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
                ref={refForm}
                component="form"
                onSubmit={handleSubmit}
              >
                {/* NAME */}
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  autoComplete="off"
                  label="Nombre"
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  required
                  fullWidth
                  margin="normal"
                />

                {/* EMAIL */}
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  label="Correo electrónico"
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  required
                  fullWidth
                  margin="normal"
                />

                {/* SUBJECT */}
                <TextField
                  type="text"
                  id="subject"
                  name="subject"
                  value={values.subject}
                  label="Asunto"
                  helperText={touched.subject && errors.subject}
                  error={touched.subject && Boolean(errors.subject)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  required
                  fullWidth
                  margin="normal"
                />

                {/* MESSAGE */}
                <TextField
                  type="text"
                  id="message"
                  name="message"
                  value={values.message}
                  label="Mensaje"
                  helperText={touched.message && errors.message}
                  error={touched.message && Boolean(errors.message)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={4}
                  variant="standard"
                  required
                  fullWidth
                  margin="normal"
                />
                <Box>
                  <Button variant="contained" type="submit" fullWidth>
                    Enviar
                  </Button>
                </Box>
              </Box>

              {/* Snackbar */}
              {/* <Stack spacing={2} sx={{ width: "100%" }}>
                  <Snackbar
                    open={openSnackbar} // Usar el estado interno
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar} // Usar el handler interno
                  >
                    <Alert
                      onClose={handleCloseSnackbar}
                      severity={success ? "success" : "error"}
                      sx={{ width: "100%" }}
                    >
                      {success ? alertSuccess : alertError}
                    </Alert>
                  </Snackbar>
                </Stack> */}
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default Form;
