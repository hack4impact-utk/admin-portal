import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import AvatarMenu from './AvatarMenu';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import AppBarTermSelector from '../AppBarTermSelector';

interface H4IAppBarProps {
  children?: React.ReactNode;
}

export default function H4IAppBar({ children }: H4IAppBarProps) {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      variant="outlined"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box sx={{ width: 280 }} />
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
        <Box sx={{ flexGrow: 1 }} />
        <AvatarMenu />
      </Toolbar>
    </AppBar>
  );
}
