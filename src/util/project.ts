import { Member, Term } from '@/types/models';
import { getCurrentTerm } from './term';
import { MemberResponse } from '@/types/dto/member';

export function getMembersProjectForTerm(member: MemberResponse, term: Term) {
  return member.projects.find((project) => project.terms.includes(term));
}
