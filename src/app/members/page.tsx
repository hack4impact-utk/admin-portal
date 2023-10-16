import { MemberService } from '@/services';
import { Suspense } from 'react';
import { Term } from '@/types/models';
import MembersView from '@/hooks/views/MembersView';

export default async function Home({
  searchParams,
}: {
  searchParams: { t: string };
}) {
  const term = searchParams.t as Term;
  const members = await MemberService.getAll(term);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MembersView members={members} />
      </Suspense>
    </>
  );
}
