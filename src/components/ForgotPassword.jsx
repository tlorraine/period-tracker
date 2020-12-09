import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Loading } from './Loading';
import { SnackiBar } from './SnackiBar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, Button, Container, CssBaseline, TextField, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ForgotPassword() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const auth = useAuth();

  if (loading) {
    return <Loading/>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <SnackiBar
        open={isEmailSent}
        message="Follow the link sent to your email to change password."
      />
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <div className="form-group">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                setLoading(true);
                console.log('sending email ', email);
                auth.sendPasswordResetEmail(email).finally(() => {
                  setLoading(false);
                  setIsEmailSent(true);
                });
              }}
            >
              Reset My Password
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ForgotPassword;
