import React, { useState, forwardRef } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import * as FirestoreService from '../../services/firebase-config';
import { useAuth } from '../../hooks/use-auth';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Typography,
  Button,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Chip,
  Container,
  Grid,
  Box,
  FormControlLabel,
  Switch,
  Slider,
  Fab,
  AppBar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconStyles: {
    color: '#00517a',
  },
  switch: {
    justifyContent: 'flex-start',
  },
  slider: {
    justifyContent: 'flex-start',
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: '#ffcdd2',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#ffcdd2',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const CalendarEventScreen = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [menstruation, setMenstruation] = useState(false);
  const [flow, setFlow] = useState(0);
  const [notes, setNotes] = useState('');
  const auth = useAuth();
  const [moods, setMoods] = useState([
    { key: 0, label: 'Happy' },
    { key: 1, label: 'Mood swings' },
    { key: 2, label: 'High energy' },
    { key: 3, label: 'Anxiety' },
    { key: 4, label: 'Sad' },
    { key: 5, label: 'Menstrual cramps' },
    { key: 6, label: 'Tiredness' },
    { key: 7, label: 'Acne' },
    { key: 8, label: 'Headache' },
    { key: 9, label: 'Sore breasts' },

  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelect = (chipToSelect) => () => {
    setMoods((chips) => chips.filter((chip) => chip.key === chipToSelect.key));
  };

  return (
    <div>
      <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon className={classes.iconStyles}/>
      </Fab>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title} align="center">
              Create Calendar Event
            </Typography>
          </Toolbar>
        </AppBar>

        <Box paddingTop={10}/>

        <Grid container direction="row">
          <Grid item md={4} sm={2}/>
          <Grid item md={4} sm={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose Date"
                value={selectedDate}
                fullWidth
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            <Box paddingTop={5}/>

            <TextField
              onChange={(e) => {
                const val = e.target.value;
                setTitle(val);
              }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
            />

            <Box paddingTop={5}/>

            <FormControlLabel
              onChange={() => {
                setMenstruation(!menstruation);
              }}
              control={<Switch/>}
              label="Menstruation"
              labelPlacement="Left"
              checked={menstruation}
            />

            <Box paddingTop={5}/>

            <div className={classes.slider}>
              <Typography>Menstruation Flow</Typography>
              <PrettoSlider
                onChange={(e) => {
                  const val = e.target.value;
                  setFlow(val);
                }}
                valueLabelDisplay="auto"
                defaultValue={0}
                max="10"
              />
            </div>

            <Box paddingTop={5}/>

            <div className={classes.root}>
              {moods.map((mood) => <Chip label={mood.label} key={mood.key} clickable color="primary"
                                         onClick={handleSelect}/>)}
            </div>

            <Box paddingTop={5}/>

            <TextField
              onChange={(e) => {
                const val = e.target.value;
                setNotes(val);
              }}
              id="outlined-multiline-static"
              label="Notes"
              multiline
              fullWidth
              rows="4"
              variant="outlined"
            />

            <Box paddingTop={5}/>

            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                setOpen(false);
                FirestoreService.createCalendarEvent(
                  {
                    title,
                    // menstruation: menstruation,
                    // flow: flow,
                    // moods: moods,
                    notes,
                    date: selectedDate,
                  },
                  auth.user.uid,
                );
              }}
            >
              CREATE
            </Button>
          </Grid>
          <Grid item md={4} sm={2}/>
        </Grid>

        <Container component="main" maxWidth="sm"/>
      </Dialog>
    </div>
  );
};

export default CalendarEventScreen;
