'use client';

import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';

export default function ProjectsView() {
  return (
    <>
      <h1>Projects</h1>
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        onClick={() => {
          console.log('here');
        }}
      >
        <Add />
        Add Project
      </Fab>
    </>
  );
}
