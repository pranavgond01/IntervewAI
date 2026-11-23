import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  calculate(scores: number[]) {
    if (!scores.length) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
      };
    }

    return {
      average: Math.round(
        scores.reduce((a, b) => a + b, 0) /
          scores.length,
      ),
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
    };
  }
}