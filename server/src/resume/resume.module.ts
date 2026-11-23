import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AIModule } from '../ai/ai.module';

import {
  Resume,
  ResumeSchema,
} from './schemas/resume.schema';

import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [
    AIModule,

    MongooseModule.forFeature([
      {
        name: Resume.name,
        schema: ResumeSchema,
      },
    ]),
  ],

  controllers: [
    ResumeController,
  ],

  providers: [
    ResumeService,
  ],

  exports: [
    ResumeService,
  ],
})
export class ResumeModule {}