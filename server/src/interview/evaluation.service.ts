import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly aiService: AIService,
  ) {}

  async evaluate(
    question: string,
    answer: string,
  ) {
    return this.aiService.evaluateAnswer(
      question,
      answer,
    );
  }
}