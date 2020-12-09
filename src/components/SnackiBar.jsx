import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(10),
    },
  },
}));

export const SnackiBar = ({ isOpen, message, handleClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
