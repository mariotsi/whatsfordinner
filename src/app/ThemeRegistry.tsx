'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { FC, PropsWithChildren, memo } from 'react';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const ThemeRegistry: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default memo(ThemeRegistry);
