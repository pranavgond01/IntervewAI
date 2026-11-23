import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Resume {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
  })
  originalName: string;

  @Prop({
    required: true,
  })
  fileName: string;

  @Prop({
    required: true,
  })
  fileUrl: string;

  @Prop({
    required: true,
  })
  extractedText: string;

  @Prop({
    default: 0,
  })
  atsScore: number;

  @Prop({
    type: [String],
    default: [],
  })
  skills: string[];

  @Prop({
    type: [String],
    default: [],
  })
  strengths: string[];

  @Prop({
    type: [String],
    default: [],
  })
  improvements: string[];

  @Prop({
    default: 'pending',
  })
  status: string;

  @Prop({
  default: '',
})
summary: string;

@Prop({
  type: [String],
  default: [],
})
missingSkills: string[];

@Prop({
  type: [String],
  default: [],
})
weaknesses: string[];

@Prop({
  type: [String],
  default: [],
})
recommendedRoles: string[];

@Prop({
  default: '',
})
experienceLevel: string;

@Prop({
  default: 0,
})
communicationScore: number;

@Prop({
  default: 0,
})
technicalScore: number;

@Prop({
  default: 0,
})
overallScore: number;
}

export const ResumeSchema =
  SchemaFactory.createForClass(Resume);