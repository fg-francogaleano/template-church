import React, { useEffect, useState } from "react";
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
import { useTheme } from "@mui/material/styles";
import { sanityClient } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

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
  const theme = useTheme();
  const [openMp, setOpenMp] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [bankDetail, setBankDetail] = useState(null);
  const [mpDetail, setMpDetail] = useState(null);

  const builder = imageUrlBuilder(sanityClient);
  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        const [bankDetail, mpDetail] = await Promise.all([
          sanityClient.fetch(`*[_type == "bankDetail"] | order(orderRank)[0]`),
          sanityClient.fetch(`*[_type == "MercadoPago"][0]`),
        ]);

        setBankDetail(bankDetail);

        if (mpDetail) {
          const url = urlFor(mpDetail.qrImage).url();
          setMpDetail({ url, email: mpDetail.mpEmail });
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        setBankDetail(null);
        setMpDetail(null);
      }
    };

    fetchAllDetails();
  }, []);

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

  const paymentMethods = [
    {
      id: "bank-transfer",
      title: "Transferencia Bancaria",
      subheader: "Realiza tu ofrenda mediante transferencia bancaria.",
      icon: (
        <AccountBalanceIcon
          fontSize="small"
          color={theme.palette.primary[800]}
        />
      ),
      buttonText: "Ver Detalles",
      onClick: handleOpenBank,
    },
    {
      id: "mercadopago",
      title: "Mercado Pago",
      subheader: "Escanea el código QR para ofrendar digitalmente.",
      icon: <QrCodeIcon fontSize="small" color={theme.palette.primary[800]} />,
      buttonText: "Ver Código QR",
      onClick: handleOpenMp,
    },
    {
      id: "in-person",
      title: "Ofrendá en Persona",
      subheader: "Entrega tu ofrenda durante nuestras celebraciones.",
      icon: <PersonIcon color={theme.palette.primary[800]} />,
      buttonText: "Conócenos",
      href: "#contacto",
    },
  ];

  if (!bankDetail || !mpDetail) return <p>Cargando...</p>;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // p: 3,
        margin: "auto",
        minHeight: "120vh", // Añadido para forzar el scroll y ver el efecto
      }}
    >
      {/* Contenedor con la imagen de fondo y efecto parallax */}
      <Box
        margin="auto"
        width={{ xs: "100%", md: "100%" }}
        sx={{
          backgroundImage:
            "url(https://lacorriente.com/wp-content/uploads/2022/09/generosidad-dar-sin-esperar.jpg)", // URL de ejemplo, reemplázala con tu imagen
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // ¡La clave para el efecto parallax!
          p: 4,
          borderRadius: 2,
          // Asegúrate de que este contenedor tenga una altura definida para que el efecto sea visible
          minHeight: { xs: "300px", sm: "400px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          gutterBottom
          marginTop={2}
          sx={{
            color: "white",
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            fontWeight: "bold",
          }}
        >
          Generosidad
        </Typography>
        <Typography
          align="center"
          fontSize={{ xs: "16px", md: "18px" }}
          color="white"
          mb={4}
          sx={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          Tu generosidad nos permite continuar con nuestra misión de servir a la
          comunidad y extender el amor de Dios. Elige el método que más te
          convenga.
        </Typography>
        <Grid container spacing={3} flexGrow={1} mt={2} justifyContent="center">
          {paymentMethods.map((method) => (
            <Grid key={method.id} size={{ xs: 12, md: 4 }}>
              <Card
                raised
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Box>
                  <CardHeader
                    avatar={method.icon}
                    title={<Typography variant="h6">{method.title}</Typography>}
                    subheader={method.subheader}
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
                    onClick={method.onClick}
                    href={method.href}
                  >
                    {method.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ textAlign: "center", py: 4, mt: 4 }}>
        <Box
          sx={{
            border: `solid 1px ${theme.palette.primary[300]}`,
            bgcolor: "background.paper",
            borderRadius: "3px",
            p: 4,
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            component="h4"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Palabra de Gratitud
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            fontStyle="italic"
            sx={{ mb: 2 }}
          >
            "Cada uno dé como propuso en su corazón: no con tristeza, ni por
            necesidad, porque Dios ama al dador alegre." - 2 Corintios 9:7
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Todas las ofrendas son voluntarias y se utilizan para el
            mantenimiento del templo, programas comunitarios y obras de caridad.
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
              border: `solid 1px ${theme.palette.primary[200]}`,
              borderRadius: "3px",
              padding: { xs: 2, sm: 4 },
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
                <Typography variant="body1">{bankDetail.bank}</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard(bankDetail.bank, "Banco")
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
                <Typography variant="body1">
                  {bankDetail.accountNumber}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard(
                      bankDetail.accountNumber,
                      "Número de cuenta"
                    )
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
                <Typography variant="body1" fontWeight="semibold">
                  {bankDetail.cbu}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleCopyToClipboard(bankDetail.cbu, "CBU")}
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
                <Typography variant="body1">{bankDetail.alias}</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard(bankDetail.alias, "Alias")
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
                  {bankDetail.holder}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleCopyToClipboard(bankDetail.holder, "Titular")
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
            {mpDetail && (
              <Box
                component="img"
                src={mpDetail.url}
                alt="Código QR Mercado Pago"
                sx={{
                  width: 256,
                  height: 256,
                  border: `solid 1px ${theme.palette.primary[200]}`,
                  borderRadius: "3px",
                }}
              />
            )}
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            También puedes buscar: {mpDetail.email}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default Donate;
