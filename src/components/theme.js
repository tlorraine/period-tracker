import React from 'react';
import { createMuiTheme } from '@material-ui/core';

export const customTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#ACBCBF',
      main: '#00517a',
      dark: '#638D9C',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffcdd2',
      dark: '#cb9ca1',
      contrastText: '#000',
    },
  },
});
