import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as mammoth from 'mammoth';

import { AIService } from '../ai/ai.service';
import {
  Resume,
  ResumeDocument,
} from './schemas/resume.schema';

import { extractPdfText } from '../common/utils/pdf.util';


@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name)
    private readonly resumeModel: Model<ResumeDocument>,

    private readonly aiService: AIService,
  ) {}

  async extractText(
  file: Express.Multer.File,
): Promise<string> {
  if (!file) {
    throw new BadRequestException(
      'Resume not uploaded.',
    );
  }

  const extension = file.originalname
    .split('.')
    .pop()
    ?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return await extractPdfText(file.path);

    case 'docx': {
      const result =
        await mammoth.extractRawText({
          path: file.path,
        });

      return result.value;
    }

    default:
      throw new BadRequestException(
        'Only PDF and DOCX files are supported.',
      );
  }
}

  async analyzeResume(
    file: Express.Multer.File,
    userId: string,
  ) {
    console.log("STEP 1");
    const extractedText =
      await this.extractText(file);
      

    console.log("STEP 2");
    const analysis =
      await this.aiService.analyzeResume(
        extractedText,
      );
//=====================








      console.log("STEP 3");
    const resume =
    await this.resumeModel.create({

        userId,

        originalName:file.originalname,

        fileName:file.filename,

        fileUrl:file.path,

        extractedText,

        atsScore:analysis.atsScore,

        summary:analysis.summary,

        skills:analysis.skills,

        missingSkills:analysis.missingSkills,

        strengths:analysis.strengths,

        weaknesses:analysis.weaknesses,

        improvements:analysis.improvements,

        recommendedRoles:
        analysis.recommendedRoles,

        experienceLevel:
        analysis.experienceLevel,

        communicationScore:
        analysis.communicationScore,

        technicalScore:
        analysis.technicalScore,

        overallScore:
        analysis.overallScore,

        status:'completed'
});
    console.log("STEP 4");

    return {
      success: true,

      message:
        'Resume analyzed successfully.',

      analysis,

      resume,
    };
  }

  async getHistory(
    userId: string,
  ) {
    return this.resumeModel
      .find({
        userId,
      })
      .sort({
        createdAt: -1,
      });
  }

    async getOne(id: string) {
  return this.resumeModel.findById(id);
}

    async delete(id: string) {
  return this.resumeModel.findByIdAndDelete(id);
}
}