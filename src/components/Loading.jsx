import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export function Loading() {
  return (
    <>
      <Box height={250} />
      <CircularProgress size={80} />
    </>
  );
}
