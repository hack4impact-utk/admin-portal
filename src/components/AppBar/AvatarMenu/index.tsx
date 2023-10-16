'use client';

import { AppContext, AppContextType } from '@/util/app-context';
import { Avatar, Menu, MenuItem } from '@mui/material';
import React from 'react';

export default function AvatarMenu() {
  const { toggleDarkMode } = React.useContext(AppContext) as AppContextType;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <Avatar
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ cursor: 'pointer' }}
      />
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            toggleDarkMode();
            handleClose();
          }}
        >
          Toggle Dark Mode
        </MenuItem>
      </Menu>
    </>
  );
}
