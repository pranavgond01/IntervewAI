export const RESUME_ANALYSIS_PROMPT = `
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Schema:

{
  "atsScore": number,
  "summary": "",
  "skills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "improvements": []
}

Rules:

ATS Score must be between 0 and 100.

Do not return markdown.

Do not explain anything.

Only return JSON.

Resume:

`;