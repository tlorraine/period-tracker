import React, { useState, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.js';
import logo from '../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuDrawer from './MenuDrawer.jsx';
import {
  Button, IconButton, AppBar, Link, Toolbar, Typography, Badge, Menu, MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
  },
  menuButtonStyles: {
    color: 'white',
  },
  badgeStyles: {
    color: 'red',
  },
}));

const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} />
));

export default function NavBar() {
  const classes = useStyles();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem component={RouterLink} to="/settings" onClick={handleMenuClose}>
        Settings
      </MenuItem>
      <MenuItem onClick={() => auth.signout()}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuDrawer/>
          <Typography variant="h6" color="secondary" className={classes.title}>
            <Link component={LinkBehavior}>
              <img src={logo} alt="logo" width="175" height="50"/>
            </Link>
          </Typography>
          {auth.user ? (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton>
                  <Badge badgeContent={3} color="secondary">
                    <NotificationsIcon className={classes.menuButtonStyles}/>
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
              </div>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/signin">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
