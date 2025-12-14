import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Online Prescription Platform
        </Typography>
        {user ? (
          <Button color="inherit" onClick={() => { logout(); navigate('/'); }}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/doctor/signin')}>Doctor Login</Button>
            <Button color="inherit" onClick={() => navigate('/patient/signin')}>Patient Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;