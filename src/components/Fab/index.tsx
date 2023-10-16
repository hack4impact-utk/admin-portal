'use client';
import { Fab, FabProps, makeStyles, useTheme } from '@mui/material';

export interface H4iFabProps extends FabProps {
  horizontal?: 'left' | 'right';
  vertical?: 'top' | 'bottom';
}

export default function H4iFab({
  horizontal,
  vertical,
  children,
  sx,
  ...props
}: H4iFabProps) {
  const theme = useTheme();
  sx = {
    position: 'fixed',
    ...(horizontal === 'left'
      ? { left: theme.spacing(4) }
      : { right: theme.spacing(4) }),
    ...(vertical === 'top'
      ? { top: theme.spacing(4) }
      : { bottom: theme.spacing(4) }),
    ...sx,
  };
  return (
    <>
      <Fab {...props} sx={sx}>
        {children}
      </Fab>
    </>
  );
}
