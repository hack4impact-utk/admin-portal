'use client';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import useTermQuery from '@/hooks/use-term-query';
import { getCurrentTerm } from '@/util/term';
import { usePathname } from 'next/navigation';
// props for the list
interface ListProps {
  text: string;
  icon?: React.ReactNode;
  collapsable?: boolean;
  route: string;
  setDrawerOpen: (status: boolean) => void;
}

function NavigationDrawerListItem({
  collapsable,
  icon,
  text,
  route,
  setDrawerOpen,
}: ListProps) {
  const { term } = useTermQuery(getCurrentTerm());
  const routeWithTerm = route.concat(`?t=${term.replaceAll(' ', '+')}`);
  const pathname = usePathname(); // do we need to compute this for every list?

  return (
    <ListItemButton
      component={Link}
      href={routeWithTerm}
      selected={pathname === route}
      onClick={() => setDrawerOpen(false)}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{ variant: collapsable ? 'body2' : 'body1' }}
      />
    </ListItemButton>
  );
}
export default NavigationDrawerListItem;
