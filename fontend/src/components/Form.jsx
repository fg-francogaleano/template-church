import React, { useRef, useState, useEffect } from "react";
import { Formik } from "formik";
import MuiAlert from "@mui/material/Alert";

import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  CircularProgress,
  Grid,
} from "@mui/material";
import validations from "../utils/validations";
import emailjs from "@emailjs/browser";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function Form() {
  const initialValues = {
    name: "",

    lastName: "",
    email: "",
    subject: "",
    message: "",
  };

  const alertSuccess = "Mensaje enviado con éxito";
  const alertError = "Ocurrió un error vuelva a intertar";

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const refForm = useRef();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = () => {
    console.log(refForm.current);
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const apiKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, refForm.current, apiKey)
      .then((res) => {
        console.log(res.text);
        setLoading(false);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSuccess(false);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
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
                width: "90%",
                minWidth: { xs: "350px", md: "400px" },
                maxWidth: { xs: "500px", md: "800px" },
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
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
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
                      variant="filled"
                      required
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    {/* LAST NAME */}
                    <TextField
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      label="Apellido"
                      helperText={touched.lastName && errors.lastName}
                      error={touched.lastName && Boolean(errors.lastName)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="filled"
                      required
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                </Grid>

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
                  variant="filled"
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
                  variant="filled"
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
                  variant="filled"
                  required
                  fullWidth
                  margin="normal"
                />
                <Box>
                  <Button
                    variant="outlined"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: "10px" }}
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: "white" }} size="24px" />
                    ) : (
                      "Enviar"
                    )}
                  </Button>
                </Box>
              </Box>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={success ? "success" : "error"}
                    sx={{ width: "100%" }}
                  >
                    {success ? alertSuccess : alertError}
                  </Alert>
                </Snackbar>
              </Stack>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default Form;
