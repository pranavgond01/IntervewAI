import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume, ResumeDocument } from "../resume/schemas/resume.schema";

import { AIService } from '../ai/ai.service';
import {
  TOTAL_QUESTIONS,
} from './constants';

import {
  Interview,
  InterviewDocument,
} from './schemas/interview.schema';

import {
  CreateInterviewDto,
} from './dto';
import { Candidate } from '@/candidate/schemas/candidate.schema';
const MAX_QUESTIONS = 10;

@Injectable()
export class InterviewService {
  constructor(
  @InjectModel(Interview.name)
  private readonly interviewModel: Model<InterviewDocument>,

  @InjectModel(Resume.name)
  private readonly resumeModel: Model<ResumeDocument>,

  private readonly aiService: AIService,
) {}

  async create(
    
    dto: CreateInterviewDto,
    userId: string,
  ) {
    const firstQuestion =
      await this.aiService.generateQuestion(
        dto.role,
        dto.difficulty ?? 'Easy',
        [],
        [],
      );

    const interview =
      await this.interviewModel.create({

        


        userId,
        resumeId: dto.resumeId,
        role: dto.role,
        difficulty: dto.difficulty ?? 'Easy',
        status: 'running',
        currentQuestion: 1,

        questions: [
  {
    text: firstQuestion.text,
    type: firstQuestion.type,
    difficulty: firstQuestion.difficulty,
  },
],
        answers: [],
        scores: [],
        strengths: [],
        weaknesses: [],
        recommendation: '',
        feedback: '',
        overallScore: 0,
        completed: false,
        startedAt: new Date(),
      });

      console.log("===============");
      console.log("Interview Saved");
      console.log(interview);
      console.log("Interview ID:", interview.id);
      console.log("Mongo ID:", interview._id);
      console.log("===============");

    return {
      success: true,
      interviewId: interview.id,
      question: firstQuestion.text,
questionType: firstQuestion.type,
difficulty: firstQuestion.difficulty,
    };
  }

  async getInterview(id: string) {
    const interview =
      await this.interviewModel.findById(id);

    if (!interview) {
      throw new NotFoundException(
        'Interview not found.',
      );
    }

    return interview;
  }

  async getHistory(userId: string) {
    return this.interviewModel
      .find({
        userId,
      })
      .sort({
        createdAt: -1,
      });
  }
    async submitAnswer(
    interviewId: string,
    answer: string,
  ) {
    const interview =
      await this.interviewModel.findById(
        interviewId,
      );

    if (!interview) {
      throw new NotFoundException(
        'Interview not found.',
      );
    }

    if (interview.completed) {
      return {
        completed: true,
        overallScore:
          interview.overallScore,
        message:
          'Interview already completed.',
      };
    }

    const currentQuestion =
  interview.questions[
    interview.questions.length - 1
  ].text;

    const evaluation =
      await this.aiService.evaluateAnswer(
        currentQuestion,
        answer,
      );

    interview.answers.push(answer);

    interview.conversationHistory.push({
    role: "user",
    content: answer,
});

    
interview.feedback =
  evaluation.feedback;

interview.communication =
  evaluation.communication ?? 0;

interview.technical =
  evaluation.technical ?? 0;

interview.problemSolving =
  evaluation.problemSolving ?? 0;

interview.confidence =
  evaluation.confidence ?? 0;

interview.clarity =
  evaluation.clarity ?? 0;

interview.fluency =
  evaluation.fluency ?? 0;

interview.vocabulary =
  evaluation.vocabulary ?? 0;

    interview.scores.push(
      evaluation.score,
    );
    interview.idealAnswers.push(
  evaluation.idealAnswer ?? "",
);

interview.learningResources.push(
  evaluation.learningResources ?? [],
);



    if (
      Array.isArray(
        evaluation.strengths,
      )
    ) {
      interview.strengths.push(
        ...evaluation.strengths,
      );
    }

    if (
      Array.isArray(
        evaluation.weaknesses,
      )
    ) {
      interview.weaknesses.push(
        ...evaluation.weaknesses,
      );
    }

    interview.feedback +=
      '\n\n' + evaluation.feedback;

      interview.communication =
      evaluation.communication;

      interview.technical =
      evaluation.technical;

      interview.problemSolving =
      evaluation.problemSolving;

      interview.confidence =
      evaluation.confidence;

      interview.clarity =
      evaluation.clarity;

      interview.fluency =
      evaluation.fluency;

      interview.vocabulary =
      evaluation.vocabulary;

    

    const totalScore =
      interview.scores.reduce(
        (a, b) => a + b,
        0,
      );

    interview.overallScore =
      Math.round(
        totalScore /
          interview.scores.length,
      );

    

    if (
    interview.questions.length >=
    TOTAL_QUESTIONS
)
     {
      interview.completed = true;

      interview.status =
        'completed';

      interview.completedAt =
        new Date();

      await interview.save();

      return {
        completed: true,
        overallScore:
          interview.overallScore,
        feedback:
          interview.feedback,
        strengths:
          interview.strengths,
        weaknesses:
          interview.weaknesses,
      };
    }

    const nextDifficulty =
      evaluation.nextDifficulty ??
      interview.difficulty;

    const nextQuestion =
      await this.aiService.generateFollowUpQuestion(
     interview.role,
      evaluation.nextDifficulty,
      currentQuestion,
      answer,
      evaluation.feedback,
  );

  console.log("========== FOLLOW UP ==========");
console.log(nextQuestion);
console.log("===============================");


  interview.conversationHistory.push({
  role: "assistant",
  content: nextQuestion.text,
});

interview.questions.push({
  text: nextQuestion.text,
  type: nextQuestion.type,
  difficulty: nextQuestion.difficulty,
});


    

    interview.currentQuestion++;

    interview.difficulty =
      nextDifficulty;

    await interview.save();

    return {
  completed: false,

  score: evaluation.score,

  overallScore: interview.overallScore,

  feedback: evaluation.feedback,

  communication:
    evaluation.communication,

  technical:
    evaluation.technical,

  problemSolving:
    evaluation.problemSolving,

  confidence:
    evaluation.confidence,

  clarity:
    evaluation.clarity,

  fluency:
    evaluation.fluency,

  vocabulary:
    evaluation.vocabulary,

  question: {
  text: nextQuestion.text,
  type: nextQuestion.type,
  difficulty: nextQuestion.difficulty,
},

  currentQuestion:
    interview.currentQuestion,

  totalQuestions:
    MAX_QUESTIONS,

    conversationHistory:
  interview.conversationHistory,
};
  }
    async finishInterview(id: string) {
    const interview =
      await this.interviewModel.findById(id);

      if (!interview) {
      throw new NotFoundException(
        'Interview not found.',
      );
    }
    
      const resume =
  await this.resumeModel.findById(interview.resumeId);

const candidateName =
  resume?.extractedText
    ?.split("\n")[0]
    ?.trim() || "Candidate";


    

    if (interview.completed) {
  return this.getReport(id);
}

    interview.completed = true;
    interview.status = 'completed';
    interview.completedAt = new Date();

    if (interview.scores.length > 0) {
      interview.overallScore = Math.round(
        interview.scores.reduce(
          (a, b) => a + b,
          0,
        ) / interview.scores.length,
      );
    }

    const conversation =
      interview.questions
        .map((question, index) => {
          const answer =
            interview.answers[index] ?? '';

         return `Question ${index + 1}

${question.text}

Answer

${answer}`;
        })
        .join('\n\n');

    const report =
      await this.aiService.generateFinalReport(
        conversation,
      );

      console.log("========== FINAL REPORT ==========");
console.dir(report, { depth: null });
console.log("==================================");

    const roadmap =
    await this.aiService.generateCareerRoadmap(
    conversation,
    );
    interview.overallScore = report.overallScore;

 
    interview.communication = report.communication;

    interview.technical = report.technical;

    interview.problemSolving = report.problemSolving;

    interview.confidence = report.confidence;

    interview.clarity = report.clarity;

    interview.fluency = report.fluency;

    interview.vocabulary = report.vocabulary;

    


    interview.hireDecision = report.hireDecision;
    interview.hiringConfidence = report.hiringConfidence;
    interview.recruiterSummary = report.recruiterSummary;
    interview.recommendedCompanies = report.recommendedCompanies;
    interview.expectedSalary = report.expectedSalary;

    interview.careerRoadmap=
    roadmap;

    interview.overallScore =
      report.overallScore;

    interview.strengths =
      report.strengths;

    interview.weaknesses =
      report.weaknesses;

    interview.recommendation =
      report.recommendation;

    interview.feedback =
      report.feedback;

    await interview.save();
console.log({
  hireDecision: report.hireDecision,
  hiringConfidence: report.hiringConfidence,
  recruiterSummary: report.recruiterSummary,
  recommendedCompanies: report.recommendedCompanies,
  expectedSalary: report.expectedSalary,
});
    return {
  success: true,

  candidate: {
  name: candidateName,
  role: interview.role,
  difficulty: interview.difficulty,
  startedAt: interview.startedAt,
  completedAt: interview.completedAt,
},

  report: {
    overallScore: interview.overallScore,

    communication:
      interview.communication,

    technical:
      interview.technical,

    problemSolving:
      interview.problemSolving,

    confidence:
      interview.confidence,

    clarity:
      interview.clarity,

    fluency:
      interview.fluency,

    vocabulary:
      interview.vocabulary,

    strengths:
      interview.strengths,

    weaknesses:
      interview.weaknesses,

    recommendation:
      interview.recommendation,

    feedback:
      interview.feedback,

    careerRoadmap:
      interview.careerRoadmap,
  },

  questions:
    interview.questions,

  answers:
    interview.answers,

  scores:
    interview.scores,
};
  }

  async getProgress(id: string) {
    const interview =
      await this.interviewModel.findById(id);

    if (!interview) {
      throw new NotFoundException(
        'Interview not found.',
      );
    }

    return {
      currentQuestion:
        interview.currentQuestion,
      totalQuestions: TOTAL_QUESTIONS,
      completed:
        interview.completed,
      overallScore:
        interview.overallScore,
      status:
        interview.status,
    };
  }

  async deleteInterview(id: string) {
    const interview =
      await this.interviewModel.findById(id);

    if (!interview) {
      throw new NotFoundException(
        'Interview not found.',
      );
    }

    await interview.deleteOne();

    return {
      success: true,
      message:
        'Interview deleted successfully.',
    };
  }

  async askCoach(
    interviewId: string,
    question: string,
) {

    const interview =
        await this.interviewModel.findById(
            interviewId,
        );

    if (!interview)
        throw new NotFoundException(
            "Interview not found",
        );

    const report = JSON.stringify({
        overallScore:
            interview.overallScore,

        communication:
            interview.communication,

        technical:
            interview.technical,

        problemSolving:
            interview.problemSolving,

        confidence:
            interview.confidence,

        strengths:
            interview.strengths,

        weaknesses:
            interview.weaknesses,

        recommendation:
            interview.recommendation,

        feedback:
            interview.feedback,
    });

    const answer =
        await this.aiService.askInterviewCoach(
            report,
            question,
        );

    return {
        answer,
    };

}

async addViolation(
  id: string,
  reason: string,
) {

  const interview =
    await this.interviewModel.findById(id);

  if (!interview) {
    throw new NotFoundException(
      "Interview not found",
    );
  }

  interview.violations.push(
    `${new Date().toLocaleTimeString()} - ${reason}`,
  );

  interview.violationCount++;

  let autoSubmit = false;

  if (interview.violationCount >= 3) {

    interview.autoSubmitted = true;

    interview.completed = true;

    interview.status = "completed";

    interview.completedAt = new Date();

    autoSubmit = true;

  }

  await interview.save();

  return {

    success: true,

    autoSubmit,

    violations: interview.violations,

    violationCount:
      interview.violationCount,

  };

}


  async getReport(id: string) {
  try {
    console.log("========== GET REPORT ==========");
    console.log("Interview ID:", id);
    const interview =
      await this.interviewModel.findById(id);

      if (!interview) {
      console.log("Interview not found");
      throw new NotFoundException(
        "Interview not found",
      );
    }
   



    const resume =
  await this.resumeModel.findById(interview.resumeId);

const candidateName =
  resume?.extractedText
    ?.split("\n")[0]
    ?.trim()
    ?.replace(/\s+/g, " ")
    .substring(0, 40) || "Candidate";

      

    console.log(interview.questions);
    console.log("Interview loaded successfully");

    return {
      candidate: {
  name: candidateName,
  role: interview.role,
  difficulty: interview.difficulty,
  startedAt: interview.startedAt,
  completedAt: interview.completedAt,

  violations:
  interview.violations,

violationCount:
  interview.violationCount,

autoSubmitted:
  interview.autoSubmitted,
},


     

      overallScore: interview.overallScore,

      communication: interview.communication,
      technical: interview.technical,
      problemSolving: interview.problemSolving,
      confidence: interview.confidence,
      clarity: interview.clarity,
      fluency: interview.fluency,
      vocabulary: interview.vocabulary,
      careerRoadmap:
      interview.careerRoadmap,

      strengths: interview.strengths,
      weaknesses: interview.weaknesses,

      recommendation: interview.recommendation,
      feedback: interview.feedback,

      questions: interview.questions,
      answers: interview.answers,
      scores: interview.scores,

      idealAnswers: interview.idealAnswers,
      learningResources: interview.learningResources,
      hireDecision: interview.hireDecision,

      
      hiringConfidence: interview.hiringConfidence,
      recruiterSummary: interview.recruiterSummary,
      recommendedCompanies: interview.recommendedCompanies,
      expectedSalary: interview.expectedSalary,
      
    };
  } catch (err) {
    console.log("========== GET REPORT ERROR ==========");
    console.error(err);
    throw err;
  }
}
}