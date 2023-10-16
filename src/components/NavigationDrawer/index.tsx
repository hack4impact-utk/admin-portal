'use client';

import React from 'react';
// MUI //
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
// other mui dependencies
import { Toolbar, useMediaQuery, useTheme } from '@mui/material';
// icons and text
import GroupOutline from '@mui/icons-material/GroupOutlined';
import FolderOutline from '@mui/icons-material/FolderOutlined';
// List component
import NavigationDrawerListItem from '@/components/NavigationDrawer/NavigationDrawerListItem';
import { AppContext, AppContextType } from '@/util/app-context';
import { DARK_MODE_LOGO_URL, LOGO_URL } from '@/util/constants';
import { DashboardOutlined, PersonAddAlt1Outlined } from '@mui/icons-material';

interface NavigationDrawerProps {
  open: boolean;
  setDrawerOpen: (status: boolean) => void;
}

export default function NavigationDrawer({
  open,
  setDrawerOpen,
}: NavigationDrawerProps) {
  // Params for the Drawer
  const { darkMode } = React.useContext(AppContext) as AppContextType;
  const drawerWidth = 280;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Logo definition
  const logo = (
    <img
      src={darkMode ? DARK_MODE_LOGO_URL : LOGO_URL}
      alt="CCAHT-logo"
      style={{
        objectFit: 'contain',
        width: '100%',
      }}
    />
  );
  // state handlers for expandable lists in drawer
  const [collapseOpen, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!collapseOpen);
  };
  // Drawer setup
  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        ['& .MuiDrawer-paper']: {
          width: drawerWidth,
          overflowX: 'hidden',
          boxSizing: 'border-box',
        },
      }}
      open={open}
      onClose={() => setDrawerOpen(false)}
    >
      <Box sx={{ width: drawerWidth }}>
        <Toolbar sx={{ mb: 1 }}>{logo}</Toolbar>
        {/* Drawer using ListItem functional component */}
        <NavigationDrawerListItem
          icon={<DashboardOutlined />}
          text="Dashboard"
          setDrawerOpen={setDrawerOpen}
          route={'/'}
        />
        <NavigationDrawerListItem
          icon={<GroupOutline />}
          text="Members"
          setDrawerOpen={setDrawerOpen}
          route={'/members'}
        />
        <NavigationDrawerListItem
          icon={<FolderOutline />}
          text="Projects"
          setDrawerOpen={setDrawerOpen}
          route={'/projects'}
        />
        <NavigationDrawerListItem
          icon={<PersonAddAlt1Outlined />}
          text="Applicants"
          setDrawerOpen={setDrawerOpen}
          route={'/applicants'}
        />
      </Box>
    </Drawer>
  );
}
