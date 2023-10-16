'use client';
import ProjectsView from '@/hooks/views/ProjectsView';
import { Button } from '@mui/material';
import { Suspense } from 'react';

export default function ProjectPage() {
  return (
    <>
      <Button onClick={() => console.log('here')}>Test</Button>
    </>
  );
}
