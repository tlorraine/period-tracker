import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.secondary.main,
  },
}));

const LoginControl = () => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogOutClick = () => {
    setIsLoggedIn(false);
  };

  let button;
  if (isLoggedIn) {
    button = (
      <Button className={classes.button} onClick={handleLogOutClick}>
        Logout
      </Button>
    );
  } else {
    button = (
      <Button
        component={RouterLink}
        to="/signin"
        className={classes.button}
        onClick={handleLoginClick}
      >
        Login
      </Button>
    );
  }
  return <div>{button}</div>;
};

export default LoginControl;
