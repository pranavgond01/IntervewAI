import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import {
  Resume,
  ResumeSchema,
} from "../resume/schemas/resume.schema";

import {
  Interview,
  InterviewSchema,
} from './schemas/interview.schema';

import { AIService } from '../ai/ai.service';
import { GroqService } from '../ai/groq.service';

@Module({
  imports: [
    MongooseModule.forFeature([
  {
    name: Interview.name,
    schema: InterviewSchema,
  },
  {
    name: Resume.name,
    schema: ResumeSchema,
  },
]),
  ],
  controllers: [
    InterviewController,
  ],
  providers: [
    InterviewService,
    AIService,
    GroqService,
  ],
  exports: [
    InterviewService,
  ],
})
export class InterviewModule {}