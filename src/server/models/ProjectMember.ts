import { ProjectMember } from '@/types/models';
import { Model, Schema, model, models } from 'mongoose';

const ProjectMemberSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    role: {
      type: String,
      enum: ['Developer', 'Designer', 'Tech Lead', 'Product Manager'],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export interface ProjectMemberDocument extends ProjectMember, Document {}

export default (models.ProjectMember as Model<ProjectMemberDocument>) ||
  model<ProjectMemberDocument>(
    'ProjectMember',
    ProjectMemberSchema,
    'projectMembers'
  );
