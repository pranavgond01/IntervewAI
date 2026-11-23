"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import DashboardHeader from "@/components/report/DashboardHeader";
import DashboardStats from "@/components/report/DashboardStats";
import AISummaryCard from "@/components/report/AISummaryCard";
import SkillAnalytics from "@/components/report/SkillAnalytics";
import ScoreCard from "@/components/report/ScoreCard";
import StrengthWeaknessCard from "@/components/report/StrengthWeaknessCard";
import RecommendationCard from "@/components/report/RecommendationCard";
import CandidateCard from "@/components/interview/InterviewReport/CandidateCard";
import QuestionReviewCard from "@/components/report/QuestionReviewCard";
import PerformanceChart from "@/components/report/PerformanceChart";
import SkillPieChart from "@/components/report/SkillPieChart";
import CareerSummary from "@/components/report/career/CareerSummary";
import ReadinessMeter from "@/components/report/career/ReadinessMeter";
import MissingSkills from "@/components/report/career/MissingSkills";
import Roadmap from "@/components/report/career/Roadmap";
import Courses from "@/components/report/career/Courses";
import Companies from "@/components/report/career/Companies";
import SkillRadar from "@/components/report/SkillRadar";
import HiringDecisionCard from "@/components/report/HiringDecisionCard";
import RecruiterOverview from "@/components/report/RecruiterOverview";
import RecruiterAnalytics from "@/components/report/RecruiterAnalytics";
import InterviewTimeline from "@/components/report/InterviewTimeline";
import PerformanceInsights from "@/components/report/PerformanceInsights";
import RecruiterReasoning from "@/components/report/RecruiterReasoning";
import AIInterviewCoach from "@/components/report/AIInterviewCoach";




export default function InterviewReportPage() {

  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [report, setReport] = useState<any>(null);

  useEffect(() => {

    loadReport();

  }, []);

  async function loadReport() {
  try {

    // Make sure interview is finished
    await api.post(`/interview/${id}/finish`);

    // Now load the saved report
    const res =
      await api.get(`/interview/${id}/report`);

    console.log("REPORT DATA");
console.log(res.data);

setReport(res.data);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }
}

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center bg-zinc-950">

        <div className="text-3xl">

          Generating AI Report...

        </div>

      </div>

    );

  }

  if (!report) {

    return (

      <div className="flex h-screen items-center justify-center bg-zinc-950">

        Failed to load report.

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-zinc-950 p-10">

      <div className="mx-auto max-w-7xl space-y-8">

        <DashboardHeader />
        
<RecruiterOverview report={report} />

<DashboardStats report={report} />


        <ScoreCard report={report} />
        <CandidateCard
    candidate={report.candidate.name}
    role={report.candidate.role}
    difficulty={report.candidate.difficulty}
    startedAt={report.candidate.startedAt}
    completedAt={report.candidate.completedAt}
/>

<div className="grid gap-8 xl:grid-cols-2">

  <SkillRadar report={report} />

  <PerformanceChart report={report} />

</div>

<div className="grid gap-8 xl:grid-cols-2">

  <AISummaryCard
    report={report}
  />

  <SkillAnalytics
    report={report}
  />
  <div className="grid gap-8 lg:grid-cols-2">

  


  

  <SkillPieChart
    report={report}
  />

</div>

</div>

        <div className="grid gap-8 lg:grid-cols-2">

          <StrengthWeaknessCard

            title="Strengths"

            items={report.strengths}

          />

          <StrengthWeaknessCard

            title="Weaknesses"

            items={report.weaknesses}

          />

        </div>

        <RecommendationCard
  recommendation={report.recommendation}
  feedback={report.feedback}
/>
<HiringDecisionCard
    decision={report.hireDecision}
    confidence={report.hiringConfidence}
    summary={report.recruiterSummary}
    companies={report.recommendedCompanies}
    salary={report.expectedSalary}
/>


<RecruiterAnalytics
    report={report}
/>
<PerformanceInsights
    report={report}
/>
<RecruiterReasoning
    report={report}
/>
<InterviewTimeline report={report} />
<div className="mt-10 space-y-6">

  <h2 className="text-3xl font-bold">
    Question Review
  </h2>

  {report.questions.map(
    (question: any, index: number) => (

      <QuestionReviewCard
    key={index}
    index={index}
    question={question}
    answer={report.answers[index]}
    score={report.scores[index]}

    idealAnswer={
      report.idealAnswers?.[index]
    }

    feedback={
      report.feedback
    }

    resources={
      report.learningResources?.[index]
    }
/>

    ),
  )}

</div>


<div className="mt-16 space-y-10">

  <h1 className="text-5xl font-black">
    AI Career Coach
  </h1>

  <CareerSummary
    roadmap={report.careerRoadmap}
  />

  <div className="grid gap-8 lg:grid-cols-2">

    <ReadinessMeter
      readiness={report.careerRoadmap.readiness}
    />

    <MissingSkills
      skills={report.careerRoadmap.missingSkills}
    />

  </div>

  <Roadmap
    roadmap={report.careerRoadmap.roadmap}
  />

  <div className="grid gap-8 lg:grid-cols-2">

    <Courses
      courses={report.careerRoadmap.courses}
    />

    <Companies
      companies={report.careerRoadmap.companies}
    />

  </div>

</div>
<AIInterviewCoach
    interviewId={id}
/>

</div>

</main>

     
  );

}