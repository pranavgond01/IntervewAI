import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  generate(interview: any) {
    const average =
      interview.scores.length > 0
        ? Math.round(
            interview.scores.reduce(
              (a: number, b: number) => a + b,
              0,
            ) / interview.scores.length,
          )
        : 0;

    return {
      overallScore: average,
      strengths: interview.strengths,
      weaknesses: interview.weaknesses,
      feedback: interview.feedback,
    };
  }
}