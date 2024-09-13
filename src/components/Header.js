import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton  } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import LogoutIcon from '@mui/icons-material/Logout'; 

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">To-Do App</Typography>
          {user && (
            <Typography variant="subtitle1" sx={{ marginLeft: 2, alignItems: 'end' }}>
              Welcome, {user.name}
            </Typography>
          )}
        </Box>
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              My To-do
            </Button>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon sx={{ fontSize: 'small', marginRight: 1 }} />
              <Typography variant="body2">Logout</Typography>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
