// src/components/WhatsappInvitationButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsappInvitationButton = ({ phoneNumber= "541154718471", message, buttonText, sx, ...props }) => {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <Button
      variant="outlined"
      startIcon={<WhatsAppIcon />}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
         flexGrow: 1    
      }}
      {...props}
    >
      {buttonText}
    </Button>
  );
};

WhatsappInvitationButton.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  sx: PropTypes.object,
};

WhatsappInvitationButton.defaultProps = {
  buttonText: 'Enviar invitación por WhatsApp',
  sx: {},
};

export default WhatsappInvitationButton;