import z from 'zod';

export const projectRoleSchema = z.union([
  z.literal('Developer'),
  z.literal('Designer'),
  z.literal('Tech Lead'),
  z.literal('Product Manager'),
]);
export type ProjectRole = z.infer<typeof projectRoleSchema>;

export const organizationRoleSchema = z.union([
  z.literal('Director'),
  z.literal('Exec Board'),
  z.literal('Member'),
  z.literal('Alumni'),
]);
export type OrganizationRole = z.infer<typeof organizationRoleSchema>;

export const semesterSchema = z.union([z.literal('Fall'), z.literal('Spring')]);
export type Semester = z.infer<typeof semesterSchema>;

export const termSchema = z.string().regex(/^(Fall|Spring) \d{2}$/);
export type Term = z.infer<typeof termSchema>;

export const projectStatusSchema = z.union([
  z.literal('Planning'),
  z.literal('Active'),
  z.literal('Complete'),
]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export type Member = {
  firstName: string;
  lastName: string;
  email: string;
  projects: Project[];
  activeTerms: {
    term: Term;
    orgRole: OrganizationRole;
  }[];
  currentTerm: {
    term: Term;
    orgRole: OrganizationRole;
  };
  active: boolean;
};
export const memberSchema: z.ZodType<Member> = z.lazy(() =>
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    projects: z.array(projectSchema),
    currentTerm: z.object({
      term: termSchema,
      orgRole: organizationRoleSchema,
    }),
    activeTerms: z.array(
      z.object({
        term: termSchema,
        orgRole: organizationRoleSchema,
      })
    ),
    active: z.boolean(),
  })
);

export type Project = {
  name: string;
  members: Member[];
  terms: Term[];
  active: boolean;
};
export const projectSchema: z.ZodType<Project> = z.lazy(() =>
  z.object({
    name: z.string(),
    members: z.array(memberSchema),
    terms: z.array(termSchema),
    active: z.boolean(),
  })
);

export type ProjectMember = {
  project: Project;
  member: Member;
  role: ProjectRole;
};
export const projectMemberSchema: z.ZodType<ProjectMember> = z.lazy(() =>
  z.object({
    project: projectSchema,
    member: memberSchema,
    role: projectRoleSchema,
  })
);

export const termMemberSchema = z.object({
  term: termSchema,
  member: memberSchema,
  role: organizationRoleSchema,
});
export type TermMember = z.infer<typeof termMemberSchema>;
