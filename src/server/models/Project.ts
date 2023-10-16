import { Project } from '@/types/models';
import { Model, Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    term: {
      type: String,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
    timestamps: true,
  }
);

ProjectSchema.virtual('members', {
  ref: 'ProjectMember',
  localField: '_id',
  foreignField: 'projectId',
});

export interface ProjectDocument extends Omit<Project, '_id'>, Document {}

export default (models.Project as Model<ProjectDocument>) ||
  model<ProjectDocument>('Project', ProjectSchema);
