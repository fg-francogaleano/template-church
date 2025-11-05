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
  Divider,
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
import { FaQrcode } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";

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
  const { palette } = useTheme();
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
        <AccountBalanceIcon fontSize="small" color={palette.primary[500]} />
      ),
      buttonText: "Ver Detalles",
      onClick: handleOpenBank,
    },
    {
      id: "mercadopago",
      title: "Mercado Pago",
      subheader: "Escanea el código QR para ofrendar digitalmente.",
      icon: <QrCodeIcon fontSize="small" color={palette.primary[500]} />,
      buttonText: "Ver Código QR",
      onClick: handleOpenMp,
    },
    {
      id: "in-person",
      title: "Ofrendá en Persona",
      subheader: "Entrega tu ofrenda durante nuestras celebraciones.",
      icon: <PersonIcon color={palette.primary[500]} />,
      buttonText: "Conocenos",
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
        margin: "auto",
        minHeight: "120vh",
        mt: 4,
      }}
    >
      {/* CONTENEDOR IMAGEN DE FONDO - EFECTO PARALLAX*/}
      <Box
        margin="auto"
        width={{ xs: "100%", md: "100%" }}
        sx={{
          backgroundImage:
            "url(https://lacorriente.com/wp-content/uploads/2022/09/generosidad-dar-sin-esperar.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          borderRadius: 2,
          minHeight: { xs: 260, sm: 220, md: 250, lg: 340 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* CAPA SEMITRANSPARENTE OSCURA */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            borderRadius: 2,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {/* ENCABEZADO PRINCIPAL */}
          <Box width={{ xs: "230px", md: "280px" }} mx={"auto"}>
            <Divider
              sx={{
                "&::before, &::after": {
                  borderColor: palette.primary[600],
                },
              }}
            >
              <Typography
                variant="caption"
                letterSpacing={5}
                color={palette.primary[500]}
              >
                COMPARTIR
              </Typography>
            </Divider>
          </Box>
          <Typography
            variant="h2"
            component="p"
            fontSize={{ xs: "2.5rem", md: "3rem" }}
            color={palette.primary[100]}
            gutterBottom
          >
            GENEROSIDAD
          </Typography>
          <Typography
            align="center"
            variant="caption"
            fontSize={{ xs: "16px", md: "18px" }}
            color={palette.primary[400]}
            fontWeight={300}
            mb={4}
            sx={{
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            Tu generosidad nos permite continuar con nuestra misión de servir a
            la comunidad y extender el amor de Dios. Elige el método que más te
            convenga.
          </Typography>
        </Box>

        {/* TARJETAS DE METODOS DE PAGO */}
        <Grid
          container
          spacing={3}
          flexGrow={1}
          mt={4}
          justifyContent="center"
          display={{ xs: "none", lg: "flex" }}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            transform: "translateY(50%)",
            width: { xs: "90%", md: "80%" },
            margin: "0 auto",
            px: { xs: 2, md: 0 },
          }}
        >
          {paymentMethods.map((method) => (
            <Grid key={method.id} size={{ xs: 12, lg: 4 }}>
              <Card
                raised
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  // backgroundColor: "rgba(255, 255, 255, 0.15)",
                  // border: `solid 1px ${palette.primary[500]}`,
                  // backdropFilter: "blur(35px)",
                  bgcolor: "background.paper",
                }}
              >
                <Box>
                  <CardHeader
                    avatar={method.icon}
                    title={
                      <Typography
                        variant="h6"
                        fontWeight={300}
                        color={palette.primary[800]}
                      >
                        {method.title}
                      </Typography>
                    }
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

      {/* DISPOSITIVOS MOVILES */}
      <Grid
        container
        spacing={3}
        flexGrow={1}
        mt={3}
        mx={"auto"}
        justifyContent="center"
        display={{ xs: "flex", lg: "none" }}
        sx={{
          width: { xs: "90%", md: "60%" },
          maxWidth: 600,
          // margin: "0 auto",
          // px: { xs: 2, md: 0 },
        }}
      >
        {paymentMethods.map((method) => (
          <Grid key={method.id} size={12}>
            <Card
              raised
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: "background.paper",
              }}
            >
              <Box>
                <CardHeader
                  avatar={method.icon}
                  title={
                    <Typography
                      variant="h6"
                      fontWeight={300}
                      color={palette.primary[800]}
                    >
                      {method.title}
                    </Typography>
                  }
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

      {/* PALABRA DE GRATITUD */}
      <Box
        sx={{ textAlign: "center", px: 4, mt: { xs: "150px", sm: "150px" } }}
      >
        <Box
          sx={{
            border: `solid 1px ${palette.primary[400]}`,
            bgcolor: "background.paper",
            borderRadius: "3px",
            p: 4,
            mx: "auto",
            maxWidth: 750
          }}
        >
          <Typography
            variant="h5"
            component="h4"
            sx={{ fontWeight: 500, mb: 2 }}
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
            necesidad, porque Dios ama al dador alegre." 
          </Typography>
          <Typography textAlign={"center"} fontWeight={400}>
            2 Corintios 9:7
          </Typography>
        </Box>
      </Box>

      {/* MODAL TRANSFERENCIA BANCARIA */}
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
            // backgroundColor: "rgba(255, 255, 255, 0.1)",
            // backdropFilter: "blur(35px)",
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
              color: "grey.900",
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
              // border: `solid 1px ${palette.primary[600]}`,
              boxShadow: 2,
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

      {/* MODAL TRANSFERENCIA MERCADO PAGO */}
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
                color: "grey.900",
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
                  // border: `solid 1px ${palette.primary[200]}`,
                  boxShadow: 3,
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
            También podés buscar: {mpDetail.email}
          </Typography>
        </Box>
      </Modal>

      {/* Snackbar (Sin cambios) */}
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
    </Box>
  );
}

export default Donate;
