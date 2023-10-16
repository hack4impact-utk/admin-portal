import { addMemberToProject } from '@/server/actions/Member';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params: { projectId } }: { params: { projectId: string } }
) {
  const { memberId, role } = await request.json();

  await addMemberToProject(memberId, projectId, role);

  return NextResponse.json({ success: true });
}
