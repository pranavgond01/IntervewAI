export interface ResumeResult {
  atsScore: number;

  summary: string;

  skills: string[];

  missingSkills: string[];

  strengths: string[];

  weaknesses: string[];

  improvements: string[];

  recommendedRoles: string[];

  experienceLevel: string;

  communicationScore: number;

  technicalScore: number;

  overallScore: number;
}