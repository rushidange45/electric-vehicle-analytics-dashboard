import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#282c34',
        color: 'white',
        height: '60px', // Keep footer height fixed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Typography variant="body2" align="center">
        © 2024 MapUp Analytics
      </Typography>
    </Box>
  );
}

export default Footer;
