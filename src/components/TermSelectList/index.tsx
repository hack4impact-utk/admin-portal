import useTermQuery from '@/hooks/use-term-query';
import { Term } from '@/types/models';
import { DEFAULT_END_TERM } from '@/util/constants';
import { getCurrentTerm } from '@/util/term';
import { List, ListItem, ListItemButton, Popover } from '@mui/material';
import React from 'react';

interface TermSelectListProps {
  start: Term;
  end?: Term;
  open: boolean;
  anchorEl: HTMLElement | null;
  onSelect: (term: Term) => void;
  onClose: () => void;
}

function computeTermList(start: Term, end: Term) {
  let [startSem, startYear] = start.split(' ');
  let [endSem, endYear] = end.split(' ');

  const terms: Term[] = [];

  while (startSem !== endSem || startYear !== endYear) {
    terms.push(`${startSem} ${startYear}`);

    if (startSem === 'Fall') {
      startSem = 'Spring';
      startYear = `${parseInt(startYear) + 1}`;
    } else {
      startSem = 'Fall';
    }
  }

  terms.push(`${endSem} ${endYear}`);

  return terms;
}

const currentTerm = getCurrentTerm();

export default function TermSelectList({
  start,
  end = DEFAULT_END_TERM,
  open,
  anchorEl,
  onSelect,
  onClose,
}: TermSelectListProps) {
  const terms = React.useMemo(() => computeTermList(start, end), [start, end]);
  const { term, setTerm } = useTermQuery(currentTerm);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{ paper: { sx: { width: 280, maxHeight: 200 } } }}
      onClose={onClose}
      disableRestoreFocus
    >
      {/* todo: we can probably use a ref for this indtead of id */}
      <List id="term-select-list" sx={{ maxHeight: '200' }}>
        {terms.map((t) => (
          <ListItemButton
            key={t}
            selected={term === t}
            autoFocus={term === t}
            onClick={() => onSelect(t)}
          >
            {t}
          </ListItemButton>
        ))}
      </List>
    </Popover>
  );
}
