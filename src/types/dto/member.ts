import { z } from 'zod';
import {
  Member,
  Project,
  ProjectMember,
  ProjectRole,
  memberSchema,
  projectRoleSchema,
} from '../models';
import { ProjectResponse } from './project';

export type CreateMemberRequest = Omit<
  Member,
  'projects' | 'activeProject' | 'activeTerms' | 'active' | 'currentTerm'
>;

export const createMemberRequestSchema: z.ZodType<CreateMemberRequest> = z.lazy(
  () =>
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
    })
);

export type UpdateMemberRequest = Partial<CreateMemberRequest>;
export const updateMemberRequestSchema: z.ZodType<UpdateMemberRequest> = z.lazy(
  () =>
    z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
    })
);

export type ProjectMemberResponse = Omit<ProjectResponse, 'members'> & {
  role: ProjectRole;
};
export type MemberResponse = Omit<Member, 'projects'> & {
  _id: string;
  projects: ProjectMemberResponse[];
  createdAt: Date;
  updatedAt: Date;
};

// export const memberResponseSchema: z.ZodType<MemberResponse> = z.lazy(() =>
//   z.object({
//     _id: z.string(),
//     firstName: z.string(),
//     lastName: z.string(),
//     email: z.string().email(),
//     // projects: z.array(projectSchema),
//   })
// );

export const addMemberToProjectRequestSchema = z.object({
  memberId: z.string(),
  projectId: z.string(),
  role: projectRoleSchema,
});
export type AddMemberToProjectRequest = z.infer<
  typeof addMemberToProjectRequestSchema
>;
