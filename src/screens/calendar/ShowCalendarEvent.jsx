import React, { useState, forwardRef } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import * as FirestoreService from '../../services/firebase-config';
import { useAuth } from '../../hooks/use-auth';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close';
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  Chip,
  Container,
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  DialogTitle,
  Switch,
  Slider,
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

export const CustomDialog = ({ isOpen, handleClose }) => (
  <>
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Hello world</DialogTitle>
    </Dialog>
  </>
);

const ShowCalendarEvent = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const auth = useAuth();
  const moods = [
    'Happy',
    'Mood swings',
    'High energy',
    'Anxiety',
    'Sad',
    'Menstrual cramps',
    'Tiredness',
    'Acne',
    'Headache',
    'Sore breasts',
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={isOpen}
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
              View Calendar Event
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

            <div className={classes.root}>
              <FormGroup row>
                <FormControlLabel control={<Switch/>} label="Menstruation"/>
              </FormGroup>
            </div>

            <Box paddingTop={5}/>

            <div className={classes.root}>
              <PrettoSlider valueLabelDisplay="auto" defaultValue={0}/>
              <Typography>Menstruation Flow</Typography>
            </div>

            <Box paddingTop={5}/>

            <div className={classes.root}>
              {moods.map((mood, index) => {
                const labelId = `checkbox-list-label-${mood}`;
                return <Chip label={mood} clickable color="primary"/>;
              })}
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
                handleClose();
                FirestoreService.createCalendarEvent(
                  {
                    title: title,
                    notes: notes,
                    // moods: [],
                    date: selectedDate,
                  },
                  auth.user.uid,
                );
              }}
            >
              UPDATE
            </Button>
          </Grid>
          <Grid item md={4} sm={2}/>
        </Grid>

        <Container component="main" maxWidth="sm"/>
      </Dialog>
    </>
  );
};

export default ShowCalendarEvent;
