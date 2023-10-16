import { Model, Document, Schema, model, models } from 'mongoose';
import { Member } from '@/types/models';

const TermMemberSchema = new Schema(
  {
    term: {
      type: String,
      required: true,
    },
    orgRole: {
      type: String,
      required: true,
      enum: ['Director', 'Executive', 'Member', 'Alumni'],
    },
  },
  {
    _id: false,
  }
);

const MemberSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    activeTerms: [TermMemberSchema],
    active: {
      type: Boolean,
      required: true,
    },
    confirmedAt: {
      type: Date,
      required: true,
    },
    pronouns: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    preferredFirstName: {
      type: String,
      required: false,
      default: '',
    },
    githubUsername: {
      type: String,
      required: false,
      default: '',
    },
    linkedinUrl: {
      type: String,
      required: false,
      default: '',
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

MemberSchema.virtual('projects', {
  ref: 'ProjectMember',
  localField: '_id',
  foreignField: 'memberId',
});

MemberSchema.virtual('activeProject', {
  ref: 'ProjectMember',
  localField: '_id',
  foreignField: 'memberId',
  justOne: true,
  match: { active: true },
});

MemberSchema.index({ email: 1 }, { unique: true });

export interface MemberDocument extends Omit<Member, '_id'>, Document {}

export default (models.Member as Model<MemberDocument>) ||
  model<MemberDocument>('Member', MemberSchema);
