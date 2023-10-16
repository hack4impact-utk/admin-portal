import {
  CreateMemberRequest,
  MemberResponse,
  UpdateMemberRequest,
} from '@/types/dto/member';
import { IFetchService } from '../types';
import { getCurrentTerm } from '@/util/term';
import { Term } from '@/types/models';

export default class ApiMemberService
  implements
    IFetchService<CreateMemberRequest, UpdateMemberRequest, MemberResponse>
{
  async create(
    member: import('@/types/dto/member').CreateMemberRequest
  ): Promise<import('@/types/dto/member').MemberResponse> {
    const res = await fetch(`/api/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  async get(
    memberId: string
  ): Promise<import('@/types/dto/member').MemberResponse> {
    const res = await fetch(`/api/members/${memberId}`);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  async getAll(
    term?: Term
  ): Promise<import('@/types/dto/member').MemberResponse[]> {
    let res;

    if (term) {
      res = await fetch(`http://localhost:3000/api/members?term=${term}`);
    } else {
      res = await fetch(`http://localhost:3000/api/members`);
    }

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  async update(
    memberId: string,
    member: import('@/types/dto/member').CreateMemberRequest
  ): Promise<import('@/types/dto/member').MemberResponse> {
    const res = await fetch(`/api/members/${memberId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  async delete(memberId: string): Promise<void> {
    const res = await fetch(`/api/members/${memberId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
  }
}
