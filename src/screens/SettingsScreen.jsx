import React, { useState } from 'react';
import * as FirestoreService from '../services/firebase-config';
import useUser from '../hooks/use-user';
import { SnackiBar } from '../components/SnackiBar';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  CircularProgress, Avatar, Button, Container, CssBaseline, Grid, TextField, Typography,
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

const SettingsScreen = () => {
  const classes = useStyles();
  const currentUser = useUser();
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(28);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return !currentUser ? (
    <CircularProgress/>
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Settings
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                defaultValue={
                  currentUser.periodLength !== null
                    ? currentUser.periodLength
                    : periodLength
                }
                onChange={(e) => setPeriodLength(e.target.value)}
                id="periodLength"
                label="Period Length"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={
                  currentUser.cycleLength !== null
                    ? currentUser.cycleLength
                    : cycleLength
                }
                onChange={(e) => setCycleLength(e.target.value)}
                id="cycleLength"
                label="Cycle Length"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            onClick={(e) => {
              e.preventDefault();
              FirestoreService.updateUserSettings(currentUser.id, {
                cycleLength,
                periodLength,
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
            Save Settings
          </Button>
          <Grid container justify="flex-end"/>
        </form>
      </div>
      <SnackiBar
        isOpen={open}
        handleClose={handleClose}
        message="Updated user settings"
      />
    </Container>
  );
};

export default SettingsScreen;
