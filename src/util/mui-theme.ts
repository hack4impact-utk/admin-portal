import { PaletteOptions, createTheme } from '@mui/material';

export const buildTheme = (dark: boolean) =>
  createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      primary: {
        main: '#ff8400',
      },
      text: {
        primary: dark ? '#fafafa' : '#000000',
        secondary: dark ? '#ebebeb' : '#444444',
      },
      background: {
        default: dark ? '#191a1c' : '#ffffff',
        paper: dark ? '#1a1a1a' : '#ffffff',
      },
    },
  });

export default buildTheme;
