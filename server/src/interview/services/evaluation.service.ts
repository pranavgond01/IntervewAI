import { Injectable } from '@nestjs/common';
import { AIService } from '../../ai/ai.service';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly ai: AIService,
  ) {}

  async evaluate(
    question: string,
    answer: string,
  ) {
    return this.ai.evaluateAnswer(
      question,
      answer,
    );
  }
}