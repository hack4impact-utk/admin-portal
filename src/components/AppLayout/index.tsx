'use client';

import H4IAppBar from '@/components/AppBar';
import NavigationDrawer from '@/components/NavigationDrawer';
import { AppContext, AppContextType } from '@/util/app-context';
import buildTheme from '@/util/mui-theme';
import {
  Box,
  CssBaseline,
  Dialog,
  ThemeProvider,
  Toolbar,
  createTheme,
} from '@mui/material';
import React from 'react';

export interface AppLayoutProps {
  children: React.ReactNode;
  dialog: React.ReactNode;
  appbar: React.ReactNode;
}

export default function AppLayout({
  children,
  dialog,
  appbar,
}: AppLayoutProps) {
  const { darkMode } = React.useContext(AppContext) as AppContextType;
  const theme = React.useMemo(() => buildTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <H4IAppBar>{appbar}</H4IAppBar>
      <NavigationDrawer open={true} setDrawerOpen={async (status) => {}} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <main>{children}</main>
      </Box>
      {dialog}
    </ThemeProvider>
  );
}
