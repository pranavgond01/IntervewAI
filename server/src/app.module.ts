import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { ResumeModule } from './resume/resume.module';
import { AIModule } from './ai/ai.module';

import { InterviewModule } from './interview/interview.module';
import { CandidateModule } from "./candidate/candidate.module";
import { CodeModule } from "./code/code.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      process.env.MONGODB_URI!
        
    ),

    UsersModule,
    ResumeModule,
    AuthModule,
    AIModule,
    InterviewModule,
    CandidateModule,
    CodeModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}