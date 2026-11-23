import { Injectable } from '@nestjs/common';
import { AIService } from '../../ai/ai.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly ai: AIService,
  ) {}

  async generate(
    role: string,
    difficulty: string,
    previousQuestions: string[],
    previousAnswers: string[],
  ) {
    return this.ai.generateQuestion(
      role,
      difficulty,
      previousQuestions,
      previousAnswers,
    );
  }
}