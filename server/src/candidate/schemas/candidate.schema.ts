import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CandidateDocument = HydratedDocument<Candidate>;

@Schema({
  timestamps: true,
})
export class Candidate {

  @Prop({ required: true })
  userId: string;

  @Prop()
  resumeId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  profession: string;

  @Prop()
  currentCompany: string;

  @Prop()
  previousCompany: string;

  @Prop()
  experience: number;

  @Prop()
  education: string;

  @Prop()
  college: string;

  @Prop()
  graduationYear: number;

  @Prop()
  targetRole: string;

  @Prop()
  expectedSalary: string;

  @Prop()
  preferredLocation: string;

  @Prop()
  noticePeriod: string;

  @Prop({
    type: [String],
    default: [],
  })
  skills: string[];

  @Prop({
    type: [String],
    default: [],
  })
  frameworks: string[];

  @Prop({
    type: [String],
    default: [],
  })
  databases: string[];

  @Prop({
    type: [String],
    default: [],
  })
  cloud: string[];

  @Prop({
    default: "Full Interview",
  })
  interviewType: string;

  @Prop({
    default: "Medium",
  })
  difficulty: string;

  @Prop({
    default: "English",
  })
  language: string;

  @Prop({
    default: "Professional",
  })
  interviewStyle: string;

  @Prop({
    default: "30",
  })
  duration: string;

  @Prop()
  company: string;

}

export const CandidateSchema =
SchemaFactory.createForClass(Candidate);