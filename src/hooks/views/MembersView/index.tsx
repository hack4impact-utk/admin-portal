'use client';
import { MemberResponse } from '@/types/dto/member';
import { getMembersProjectForTerm } from '@/util/project';
import { Chip } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import Fab from '@/components/Fab';
import useTermQuery from '@/hooks/use-term-query';
import { getCurrentTerm } from '@/util/term';
import { useRouter } from 'next/navigation';
import MemberTable from '@/components/MemberTable';

interface MembersViewProps {
  members: MemberResponse[];
}

export default function MembersView({ members }: MembersViewProps) {
  const { term } = useTermQuery(getCurrentTerm());
  const router = useRouter();
  return (
    <>
      <MemberTable members={members} />
      <Fab
        color="primary"
        aria-label="add"
        size="large"
        onClick={() => router.push('/members/new')}
      >
        <Add />
      </Fab>
    </>
  );
}
