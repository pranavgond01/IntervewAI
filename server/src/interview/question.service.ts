import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly aiService: AIService,
  ) {}

  async generateQuestion(
    role: string,
    difficulty: string,
    previousQuestions: string[],
    previousAnswers: string[],
  ) {
    return this.aiService.generateQuestion(
      role,
      difficulty,
      previousQuestions,
      previousAnswers,
    );
  }
}