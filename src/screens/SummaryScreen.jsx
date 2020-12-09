import React from 'react';
import useRequireAuth from '../hooks/use-require-auth';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Grid, Paper, Typography, CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 3,
  },
}));

const cycleLength = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Cycle lenght',
      backgroundColor: '#638D9C',
      borderColor: '#00517a',
      borderWidth: 2,
      data: [28, 29, 28, 30, 29, 28, 31, 29, 28, 28, 29, 28],
    },
  ],
};

const periodLength = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Period lenght',
      backgroundColor: '#ffcdd2',
      borderColor: '#cb9ca1',
      borderWidth: 2,
      data: [2, 4, 3, 5, 4, 3, 4, 5, 3, 4, 5, 4],
    },
  ],
};

const SummaryScreen = () => {
  const classes = useStyles();
  const auth = useRequireAuth();

  return !auth ? (
    <CircularProgress/>
  ) : (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h1" color="secondary">Summary</Typography>
              <Bar
                data={cycleLength}
                options={{
                  title: {
                    display: true,
                    text: 'Cycle lenght',
                    fontsize: 20,
                  },
                  responsive: true,
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                  scales: {
                    yAxes: [
                      {
                        display: true,
                        ticks: {
                          suggestedMin: 20,
                          suggestedMax: 30,
                        },
                      },
                    ],
                  },
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Bar
                data={periodLength}
                options={{
                  title: {
                    display: true,
                    text: 'Period lenght',
                    fontsize: 20,
                  },
                  responsive: true,
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                  scales: {
                    yAxes: [
                      {
                        display: true,
                        ticks: {
                          suggestedMin: 0,
                          suggestedMax: 10,
                        },
                      },
                    ],
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SummaryScreen;
