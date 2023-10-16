import {
  createMember,
  getMembers,
  getMembersForTerm,
} from '@/server/actions/Member';
import {
  CreateMemberRequest,
  createMemberRequestSchema,
} from '@/types/dto/member';
import { Term } from '@/types/models';
import { validatedApiRequest, zodValidator } from '@/util/api-validation';
import dbConnect from '@/util/db-connect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await dbConnect();

  if (request.nextUrl.searchParams.has('term')) {
    const term = request.nextUrl.searchParams.get('term') as Term;

    const members = await getMembersForTerm(term);

    return NextResponse.json(members);
  }

  const members = await getMembers();

  return NextResponse.json(members);
}

export const POST = validatedApiRequest(async (request) => {
  await dbConnect();

  const body = await request.json();

  const member: CreateMemberRequest = await createMember(body);

  return NextResponse.json(member);
}, zodValidator(createMemberRequestSchema));
