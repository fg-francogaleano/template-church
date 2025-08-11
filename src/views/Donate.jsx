import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Modal,
  IconButton,
  CardHeader,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PersonIcon from "@mui/icons-material/Person";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MuiAlert from "@mui/material/Alert";
import qrImage from "../assets/qrImage.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
};

const bankDetailsStyle = {
  ...style,
  textAlign: "left",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Donate() {
  const [openMp, setOpenMp] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenMp = () => setOpenMp(true);
  const handleCloseMp = () => setOpenMp(false);

  const handleOpenBank = () => setOpenBank(true);
  const handleCloseBank = () => setOpenBank(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCopyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`${label} copiado!`);
      setSnackbarOpen(true);
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        bgcolor: "#f0f2f5",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        ¡Apoya nuestra causa!
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" mb={4}>
        Elige tu método de donación preferido.
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        // alignItems="stretch"
        flexGrow={1}
      >
        {/* Método 1: Transferencia Bancaria */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            raised
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CardHeader
                avatar={<AccountBalanceIcon color="primary" />}
                title={
                  <Typography variant="h6">Transferencia Bancaria</Typography>
                }
                subheader="Podes enviar tu siembra de forma segura con una transferencia bancaria a nuestra cuenta."
              />
              {/* <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body1" color="">
                  Transferí tu siembra de forma segura desde tu banco.
                </Typography>
              </CardContent> */}
            </Box>
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" onClick={handleOpenBank}>
                Ver Detalles
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Método 2: Mercado Pago */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            raised
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CardHeader
                avatar={<QrCodeIcon sx={{ color: "#00a650" }} />}
                title={<Typography variant="h6">Mercado Pago</Typography>}
                subheader="Para ofrendar con Mercado Pago, abrí la aplicación y escaneá el código QR."
              />
              {/* <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Abrí la app de Mercado Pago y escaneá.
                </Typography>
              </CardContent> */}
            </Box>

            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={handleOpenMp}
                sx={{
                  backgroundColor: "#00a650",
                  "&:hover": { backgroundColor: "#008f44" },
                  color: "white",
                }}
              >
                Ver Código QR
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Método 3: En Persona */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            raised
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CardHeader
                avatar={<PersonIcon color="action" />}
                title={<Typography variant="h6">Ofrendá en Persona</Typography>}
                subheader="Acercate, conocenos y trae tu ofrenda. Nos encantará darte la bienvenida en persona."
              />
              {/* <CardContent>
                <Typography variant="body1">
                  Te invitamos a visitarnos en nuestras oficinas para realizar
                  tu donación.
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Ponte en contacto para coordinar tu visita.
                </Typography>
              </CardContent> */}
            </Box>
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="outlined" href="#contacto">
                conocenos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal para Transferencia Bancaria */}
      <Modal
        open={openBank}
        onClose={handleCloseBank}
        aria-labelledby="modal-bank-title"
      >
        <Box sx={bankDetailsStyle}>
          <IconButton
            aria-label="close"
            onClick={handleCloseBank}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-bank-title"
            variant="h4"
            component="h2"
            textAlign="center"
            mb={2}
          >
            Datos bancarios
          </Typography>
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Typography variant="body1" fontWeight="bold">
              CBU:{" "}
              <Typography component="span">1234567890123456789012</Typography>
            </Typography>
            <IconButton
              onClick={() =>
                handleCopyToClipboard("1234567890123456789012", "CBU")
              }
              size="small"
              sx={{ mb: 1 }}
              aria-label="copiar CBU"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" fontWeight="bold">
              ALIAS: <Typography component="span">puertadepaz</Typography>{" "}
            </Typography>
            <IconButton
              onClick={() => handleCopyToClipboard("puertadepaz", "Alias")}
              size="small"
              sx={{ ml: 1 }}
              aria-label="copiar Alias"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Titular de cuenta:{" "}
            <Typography component="span">Puerta de Paz</Typography>
          </Typography>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Cuit: <Typography component="span">20-99999999-6</Typography>
          </Typography>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Nº de Cuenta: <Typography component="span">987654321</Typography>
          </Typography>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Banco: <Typography component="span">Banco Nacion</Typography>
          </Typography>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Modal para Mercado Pago */}
      <Modal
        open={openMp}
        onClose={handleCloseMp}
        aria-labelledby="modal-qr-title"
        aria-describedby="modal-qr-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleCloseMp}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-qr-title" variant="h5" component="h2" mb={2}>
            Escanea para Donar con Mercado Pago
          </Typography>
          <Box
            component="img"
            src={qrImage}
            alt="Código QR de Mercado Pago"
            sx={{
              width: { xs: "100%", sm: 250 },
              height: "auto",
              alignSelf: "center",
              margin: "auto",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default Donate;
