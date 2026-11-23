import { Injectable } from '@nestjs/common';

import { GroqService } from './groq.service';

import { ResumeResult } from './interfaces/resume-result.interface';

import { RESUME_ANALYSIS_PROMPT } from './prompts/resume-analysis.prompt';
import { CAREER_ROADMAP_PROMPT }
from "./prompts/career-roadmap.prompt";
import { GENERATE_QUESTION_PROMPT } from '../interview/prompts/generate-question.prompt';
import { EVALUATE_ANSWER_PROMPT } from '../interview/prompts/evaluate-answer.prompt';
import { FINAL_REPORT_PROMPT } from '@/interview/prompts/final-report.prompt';
import { FOLLOW_UP_PROMPT } from '../interview/prompts/follow-up-question.prompt';
import { INTERVIEW_COACH_PROMPT } from "./prompts/interview-coach.prompt";


@Injectable()
export class AIService {
  constructor(
    private readonly groq: GroqService,
  ) {}

  async analyzeResume(
  text: string,
): Promise<ResumeResult> {
  try {
    const response = await this.groq.generate(
      RESUME_ANALYSIS_PROMPT + text,
    );

    console.log("========== RAW GEMINI ==========");
    console.log(response);
    console.log("================================");

    const clean = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("========== CLEAN ==========");
    console.log(clean);
    console.log("===========================");

    return JSON.parse(clean);
  } catch (err) {
    console.error("AI ANALYZE ERROR:", err);
    throw err;
  }
}
async generateQuestion(
  role: string,
  level: string,
  questions: string[],
  answers: string[],
) {
  const prompt =
    GENERATE_QUESTION_PROMPT
      .replace('{{ROLE}}', role)
      .replace('{{LEVEL}}', level)
      .replace('{{QUESTIONS}}', questions.join('\n'))
      .replace('{{ANSWERS}}', answers.join('\n'));

  const response =
    await this.groq.generate(prompt);

  const clean = response
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(clean);
}


async generateFollowUpQuestion(
  role: string,
  level: string,
  previousQuestion: string,
  answer: string,
  feedback: string,
) {
  const prompt =
    FOLLOW_UP_PROMPT
      .replace('{{ROLE}}', role)
      .replace('{{LEVEL}}', level)
      .replace('{{QUESTION}}', previousQuestion)
      .replace('{{ANSWER}}', answer)
      .replace('{{FEEDBACK}}', feedback);

  const response =
    await this.groq.generate(prompt);

  const clean = response
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(clean);
}


async evaluateAnswer(
  question: string,
  answer: string,
) {

  // Empty or skipped answer
  if (!answer || answer.trim().length === 0) {
    return {
      score: 0,
      communication: 0,
      technical: 0,
      problemSolving: 0,
      confidence: 0,
      clarity: 0,
      fluency: 0,
      vocabulary: 0,

      feedback:
        "The candidate skipped this question. No evaluation could be performed.",

      strengths: [],

      weaknesses: [
        "Question skipped",
        "No technical explanation provided",
        "No communication demonstrated",
      ],

      nextDifficulty: "Easy",

      idealAnswer: "",

      learningResources: [],

      hireDecision: "Reject",
    };
  }

  const prompt = EVALUATE_ANSWER_PROMPT
    .replace("{{QUESTION}}", question)
    .replace("{{ANSWER}}", answer);

  const response =
    await this.groq.generate(prompt);

  return this.parseJson(response);
}

    async generateFinalReport(
  conversation: string,
) {
  const prompt =
    FINAL_REPORT_PROMPT.replace(
      "{{CONVERSATION}}",
      conversation,
    );

  const response =
    await this.groq.generate(prompt);

  console.log("================================");
  console.log("RAW GROQ REPORT");
  console.log(response);
  console.log("================================");

  const clean = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const report = JSON.parse(clean);

  // Default values if AI leaves anything empty
  report.hireDecision ||= "Reject";

  report.hiringConfidence ??= 0;

  report.recruiterSummary ||=
    "The candidate requires additional preparation before being recommended for hiring.";

  report.expectedSalary ||= "₹3 LPA - ₹5 LPA";

  if (
    !Array.isArray(report.recommendedCompanies) ||
    report.recommendedCompanies.length === 0
  ) {
    report.recommendedCompanies = [
      "TCS",
      "Infosys",
      "Wipro",
    ];
  }

  return report;
}




    async askInterviewCoach(
    report: string,
    question: string,
) {

    const prompt =
        INTERVIEW_COACH_PROMPT
            .replace(
                "{{REPORT}}",
                report,
            )
            .replace(
                "{{QUESTION}}",
                question,
            );

    return await this.groq.generate(prompt);

}


      async generateCareerRoadmap(
  conversation: string,
) {
  const prompt =
    CAREER_ROADMAP_PROMPT.replace(
      "{{CONVERSATION}}",
      conversation,
    );

  const response =
    await this.groq.generate(prompt);

  console.log("========== CAREER ROADMAP RAW ==========");
  console.log(response);
  console.log("========================================");

  return this.parseJson(response);
}








  private parseJson(text: string): any {
  try {
    // Remove markdown code blocks if the AI returns them
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse AI JSON:");
    console.error(text);

    throw new Error("Invalid JSON returned by AI");
  }
}






}