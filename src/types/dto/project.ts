import { Project, Term } from '../models';
import { MemberResponse } from './member';

export type CreateProjectRequest = Omit<Project, 'members'>;

export type UpdateProjectRequest = Partial<CreateProjectRequest>;

export interface ProjectResponse {
  _id: string;
  name: string;
  members: MemberResponse[];
  terms: Term[];
  createdAt: Date;
  updatedAt: Date;
}
