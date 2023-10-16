import Project from '@/server/models/Project';
import ProjectMember from '@/server/models/ProjectMember';
import { CreateProjectRequest } from '@/types/dto/project';
import Member from '../models/Member';

const projectMembersAggregate = [
  {
    $lookup: {
      from: ProjectMember.collection.name,
      let: { id: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$projectId', '$$id'],
            },
          },
        },
        {
          $lookup: {
            from: Member.collection.name,
            let: { memberId: '$memberId', role: '$role' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$memberId'],
                  },
                },
              },
              { $set: { role: '$$role' } },
            ],
            as: 'members',
          },
        },
        { $unwind: '$members' },
        { $replaceRoot: { newRoot: '$members' } },
      ],
      as: 'members',
    },
  },
];

export async function getProjects() {
  return await Project.aggregate(projectMembersAggregate);
}

export async function getProject(projectId: string) {
  return await Project.findById(projectId).populate({
    path: 'members',
    populate: {
      path: 'memberId',
    },
  });
}

export async function createProject(project: CreateProjectRequest) {
  return await Project.create(project);
}
