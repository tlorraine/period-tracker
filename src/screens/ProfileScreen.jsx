import React, { useState } from 'react';
import * as FirestoreService from '../services/firebase-config';
import useUser from '../hooks/use-user';
import { SnackiBar } from '../components/SnackiBar';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  CircularProgress,
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
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

const ProfileScreen = () => {
  const classes = useStyles();
  const currentUser = useUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (!currentUser) {
    return <CircularProgress/>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        {calendarEvents.map((val) => (
          <div>{val.comment}</div>
        ))}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorFirstName}
                helperText={errorFirstName ? 'Please insert first name' : ' '}
                defaultValue={currentUser.firstName}
                onChange={(e) => {
                  const val = e.target.value;
                  setFirstName(val);
                  if (!val || val === '') {
                    setErrorFirstName(true);
                  } else {
                    setErrorFirstName(false);
                  }
                }}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="fistName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorLastName}
                helperText={errorLastName ? 'Please insert last name' : ' '}
                defaultValue={currentUser.lastName}
                onChange={(e) => {
                  const val = e.target.value;
                  setLastName(val);
                  if (!val || val === '') {
                    setErrorLastName(true);
                  } else {
                    setErrorLastName(false);
                  }
                }}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorEmail}
                helperText={errorEmail ? 'Please insert email' : ' '}
                defaultValue={currentUser.email}
                onChange={(e) => {
                  const val = e.target.value;
                  setEmail(val);
                  if (!val || val === '') {
                    setErrorEmail(true);
                  } else {
                    setErrorEmail(false);
                  }
                }}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  const val = e.target.value;
                  setNewPassword(val);
                }}
                variant="outlined"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  const val = e.target.value;
                  setConfirmPassword(val);
                }}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
              />
            </Grid>
          </Grid>
          <Button
            onClick={(e) => {
              e.preventDefault();
              FirestoreService.updateUser(currentUser.id, {
                firstName: firstName || currentUser.firstName,
                lastName: lastName || currentUser.lastName,
                email: email || currentUser.email,
              }).finally(() => {
                setOpen(true);
              });
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Profile
          </Button>
          <Grid container justify="flex-end"/>
        </form>
      </div>
      <SnackiBar
        isOpen={open}
        handleClose={handleClose}
        message="Updated user profile"
      />
    </Container>
  );
};

export default ProfileScreen;
