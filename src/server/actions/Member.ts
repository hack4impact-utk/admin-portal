import MemberSchema from '@/server/models/Member';
import { Member, ProjectRole, Term } from '@/types/models';
import ProjectMemberSchema from '../models/ProjectMember';
import { CreateMemberRequest } from '@/types/dto/member';
import Project from '../models/Project';

const memberProjectsAggregate = [
  {
    $lookup: {
      from: ProjectMemberSchema.collection.name,
      let: { id: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$memberId', '$$id'],
            },
          },
        },
        {
          $lookup: {
            from: Project.collection.name,
            let: { projectId: '$projectId', role: '$role' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$projectId'],
                  },
                },
              },
              { $set: { role: '$$role' } },
            ],
            as: 'projects',
          },
        },
        { $unwind: '$projects' },
        { $replaceRoot: { newRoot: '$projects' } },
      ],
      as: 'projects',
    },
  },
];

export async function getMembers() {
  return await MemberSchema.aggregate(memberProjectsAggregate);
}

export async function getMembersForTerm(term: Term) {
  return await MemberSchema.aggregate([
    ...memberProjectsAggregate,
    {
      $match: {
        activeTerms: {
          $elemMatch: {
            term,
          },
        },
      },
    },
  ]);
}

export async function getMember(memberId: string) {
  // convert to aggregate
  return await MemberSchema.findById(memberId).populate({
    path: 'projects',
    populate: {
      path: 'projectId',
    },
  });
}

// TODO: fix
export async function createMember(member: CreateMemberRequest) {
  return await MemberSchema.create(member);
}

export async function addMemberToProject(
  memberId: string,
  projectId: string,
  role: ProjectRole
) {
  return await ProjectMemberSchema.create({
    memberId,
    projectId,
    role,
  });
}
