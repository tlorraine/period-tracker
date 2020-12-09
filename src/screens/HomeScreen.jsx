import React from 'react';
import iosButton from '../assets/apple-store.svg';
import androidButton from '../assets/google-play-button.svg';
import HomeScreenLogo from '../assets/home_screen1.png';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import OpacityIcon from '@material-ui/icons/Opacity';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import {
  Avatar,
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
}));

const CustomListItem = (props) => {
  const { icon, title, subtitle } = props;
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="h6">{title}</Typography>}
        secondary={subtitle}
      />
    </ListItem>
  );
};

const HomeScreen = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" justify="space-between">
        <Paper
          className={classes.paper}
          style={{
            backgroundColor: theme.palette.secondary.main,
            paddingLeft: theme.spacing(15),
            paddingRight: theme.spacing(15),
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(10),
          }}
        >
          <Grid container direction="row" spacing={3}>
            <Grid item xs={6}>
              <Typography
                variant="h2"
                align="left"
                fontWeight="fontWeightBold"
                gutterBottom
              >
                My Cycles
              </Typography>
              <Typography variant="h5" align="left" gutterBottom>
                Track your period and ovulation with My Cycles to understand how
                your body works.
              </Typography>
              <Box align="left">
                <Rating name="read-only" value={5} readOnly/>
              </Box>
              <Box mt={2}/>
              <img
                align="left"
                src={androidButton}
                height="60"
                width="150"
                alt="android-icon"
              />
              <img
                align="left"
                src={iosButton}
                height="60"
                width="140"
                alt="ios-icon"
              />
            </Grid>
            <Grid item xs={6}>
              <img src={HomeScreenLogo} alt="logo"/>
            </Grid>
          </Grid>
        </Paper>
        <Box mt={3}/>
        <Paper
          className={classes.paper}
          style={{
            paddingLeft: theme.spacing(15),
            paddingRight: theme.spacing(15),
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(10),
          }}
        >
          <Grid container direction="row" spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h4" align="left">
                Key Features
              </Typography>
              <List>
                <CustomListItem
                  title="Period tracker and ovulation calendar"
                  subtitle="Log symptoms and activities to keep track of your menstrual cycle."
                  icon={<OpacityIcon/>}
                />
                <CustomListItem
                  title="Learn about your body"
                  subtitle="Learn about your personal health patterns to gain a better understanding of how your body works."
                  icon={<EmojiObjectsIcon/>}
                />
                <CustomListItem
                  title="Overview"
                  subtitle="See your tracked data in a clear overview."
                  icon={<AssessmentIcon/>}
                />
              </List>
            </Grid>
          </Grid>
        </Paper>
        <Box mt={3}/>
        <Paper
          className={classes.paper}
          style={{ backgroundColor: theme.palette.primary.main }}
        >
          <Grid container direction="row" justify="space-between">
            <Grid item xs={3}/>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default HomeScreen;
