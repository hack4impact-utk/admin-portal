'use client';
import { Term } from '@/types/models';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import {
  IconButton,
  Button,
  Typography,
  Popover,
  useTheme,
} from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import TermSelectList from '../TermSelectList';
import useTermQuery from '@/hooks/use-term-query';
import { getCurrentTerm, getTermAfter, getTermBefore } from '@/util/term';
import { EARLIEST_TERM } from '@/util/constants';

// todo: move to constant file

export default function AppBarTermSelector() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { term, setTerm } = useTermQuery(getCurrentTerm());

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleNextTerm = () => {
    const nextTerm = getTermAfter(term);
    setTerm(nextTerm);
  };

  const handlePreviousTerm = () => {
    const previousTerm = getTermBefore(term);
    setTerm(previousTerm);
  };

  const open = Boolean(anchorEl);

  const handleSelectTerm = (term: Term) => {
    setTerm(term);
    handlePopoverClose();
  };

  const theme = useTheme();

  return (
    <>
      <IconButton
        size="small"
        onClick={handlePreviousTerm}
        disabled={term === EARLIEST_TERM}
      >
        <ArrowBackIosNew sx={{ width: 15, height: 15 }} />
      </IconButton>
      <Button
        variant="text"
        size="large"
        sx={{ width: '10rem', color: theme.palette.text.primary }}
        onClick={handlePopoverOpen}
      >
        <Typography variant="h6">{term}</Typography>
      </Button>
      <TermSelectList
        start="Fall 2020"
        onSelect={handleSelectTerm}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
      />

      <IconButton size="small" onClick={handleNextTerm}>
        <ArrowForwardIos sx={{ width: 15, height: 15 }} />
      </IconButton>
    </>
  );
}
