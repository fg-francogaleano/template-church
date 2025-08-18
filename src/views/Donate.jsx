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
import AccountBalanceIcon from "../icons/AccountBalanceIcon";
import QrCodeIcon from "../icons/QrCodeIcon";
import PersonIcon from "../icons/PersonIcon";
import ContentCopyIcon from "../icons/ContentCopyIcon";
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
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        margin: "auto",
      }}
    >
      <Box margin="auto" width="80%">
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          fontWeight="bold "
          gutterBottom
        >
          Ofrendas y Diezmos
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" mb={4}>
          Tu generosidad nos permite continuar con nuestra misión de servir a la
          comunidad y extender el amor de Dios. Elige el método que más te
          convenga.
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        flexGrow={1}
        marginTop={0}
      >
        {/* Método 1: Transferencia Bancaria */}
        <Grid size={{ xs: 12, md: 4 }}>
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
                avatar={<AccountBalanceIcon fontSize="small" />}
                title={
                  <Typography variant="h6">Transferencia Bancaria</Typography>
                }
                subheader="Realiza tu ofrenda mediante transferencia bancaria."
              />
            </Box>
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="outlined" onClick={handleOpenBank}>
                Ver Detalles
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Método 2: Mercado Pago */}
        <Grid size={{ xs: 12, md: 4 }}>
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
                avatar={<QrCodeIcon fontSize="small" />}
                title={<Typography variant="h6">Mercado Pago</Typography>}
                subheader="Escanea el código QR para ofrendar digitalmente."
              />
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
                variant="outlined"
                sx={{ borderRadius: "1px" }}
                onClick={handleOpenMp}
              >
                Ver Código QR
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Método 3: En Persona */}
        <Grid size={{ xs: 12, md: 4 }}>
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
                subheader="Entrega tu ofrenda durante nuestras celebraciones."
              />
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

      <Box sx={{ textAlign: 'center', py: 4, mt:4 }}> 
      <Box
        sx={{
          outline:`solid 1px grey`,
          p: 4, 
          maxWidth: { xs: '90%', sm: 500, md: 900 },
          mx: 'auto', 
          borderRadius:"1px"
        }}
      >
        <Typography
          variant="h5" 
          component="h4"
          sx={{ fontWeight: 'bold', mb: 2 }} 
        >
          Palabra de Gratitud
        </Typography>
        <Typography variant="body1" color="text.secondary" fontStyle="italic" sx={{ mb: 2 }}> 
          "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad,
          porque Dios ama al dador alegre." - 2 Corintios 9:7
        </Typography>
        <Typography variant="body2" color="text.secondary"> 
          Todas las ofrendas son voluntarias y se utilizan para el mantenimiento del templo,
          programas comunitarios y obras de caridad.
        </Typography>
      </Box>
    </Box>

      {/* Modal para Transferencia Bancaria */}
      <Modal
        open={openBank}
        onClose={handleCloseBank}
        aria-labelledby="modal-bank-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "450px" },
            bgcolor: "background.paper",
            borderRadius: "3px",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            border:"solid 1px red"
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseBank}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey.700",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" component="span" textAlign="center">
            Transferencia Bancaria
          </Typography>
          <Typography
            variant="caption"
            textAlign="center"
            gutterBottom
            color="text.secondary"
          >
            Información para realizar tu ofrenda
          </Typography>
          <Typography
            id="modal-bank-title"
            variant="h6"
            textAlign="start"
            color="text.primary"
            gutterBottom
          >
            Datos Bancarios
          </Typography>

          <Box
            sx={{
              background: (theme) => theme.palette.grey[200],
              borderRadius: "3px",
              padding:{xs: 2, sm: 4},
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Banco:
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1">Banco Nacional</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard("Banco Nacional", "Banco")
                  }
                  aria-label="copiar banco"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Cuenta:
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" fontWeight="bold">
                  1234567890
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard("1234567890", "Número de cuenta")
                  }
                  aria-label="copiar número de cuenta"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="medium"
              >
                CBU:
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" fontWeight="bold">
                  1234567890123456789012
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard("1234567890123456789012", "CBU")
                  }
                  aria-label="copiar CBU"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="medium"
              >
                Alias:
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" fontWeight="bold">
                  puertadepaz
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard("1234567890123456789012", "Alias")
                  }
                  aria-label="copiar Alias"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Titular:
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" fontWeight="medium">
                  Iglesia Nueva Esperanza
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard("Iglesia Nueva Esperanza", "Titular")
                  }
                  aria-label="copiar titular"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" mt={2}>
            Por favor, incluye tu nombre en el concepto de la transferencia.
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
        aria-labelledby="qr-modal-title"
        aria-describedby="qr-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseMp}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "grey.700",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography
              id="qr-modal-title"
              variant="h6"
              component="h4"
              sx={{ color: "primary.main" }}
            >
              Código QR
            </Typography>
            <Typography
              id="qr-modal-description"
              variant="body2"
              color="text.secondary"
            >
              Escaneá este código con la app de Mercado Pago
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              component="img"
              src={qrImage}
              alt="Código QR Mercado Pago"
              sx={{
                width: 256, // Equivalente a w-64
                height: 256, // Equivalente a h-64
                border: "1px solid #e0e0e0", // Equivalente a border
                borderRadius: "8px", // Equivalente a rounded-lg
              }}
            />
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            También puedes buscar: iglesia.nuevaesperanza@gmail.com
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default Donate;
