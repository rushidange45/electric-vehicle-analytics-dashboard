import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#3e50b4', height: '60px', textAlign:"center" }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Electric Vehicle Analytics Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
