import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  generate(interview: any) {
    const average =
      interview.scores.length === 0
        ? 0
        : Math.round(
            interview.scores.reduce(
              (a: number, b: number) => a + b,
              0,
            ) / interview.scores.length,
          );

    return {
      overallScore: average,
      completedQuestions:
        interview.answers.length,
      strengths: interview.strengths,
      weaknesses: interview.weaknesses,
      feedback: interview.feedback,
    };
  }
}