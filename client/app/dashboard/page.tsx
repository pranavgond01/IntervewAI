"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
Brain,
Calendar,
FileText,
Trophy,
TrendingUp,
Clock,
ArrowRight,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import CareerRoadmapCard from "@/components/dashboard/CareerRoadmapCard";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import RecruiterIntelligenceCard from "@/components/dashboard/RecruiterIntelligenceCard";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import AIRecruiterAssistant from "@/components/dashboard/AIRecruiterAssistant";
import CareerTimeline from "@/components/dashboard/CareerTimeline";




type InterviewHistoryItem = {
_id: string;
role: string;
difficulty: string;
overallScore: number;
completed: boolean;
createdAt: string;
completedAt?: string;
};

type ResumeHistoryItem = {
_id: string;
originalName: string;
atsScore: number;
overallScore: number;
createdAt: string;
};

export default function DashboardPage() {
const [user, setUser] = useState<any>(null);
const [interviews, setInterviews] = useState<InterviewHistoryItem[]>([]);
const [resumes, setResumes] = useState<ResumeHistoryItem[]>([]);
const [loading, setLoading] = useState(true);
const [careerRoadmap, setCareerRoadmap] = useState<any>(undefined);
const [recruiterReport, setRecruiterReport] = useState<any>(undefined);



useEffect(() => {
const stored = localStorage.getItem("user");
if (stored) {
try {
setUser(JSON.parse(stored));
} catch {}
}

 
async function load() {
  try {
    const [historyRes, resumeRes] = await Promise.all([
      api.get("/interview/history/all"),
      api.get("/resume/history"),
    ]);

    const history = Array.isArray(historyRes.data)
      ? historyRes.data
      : [];

    setInterviews(history);

    const resumeHistory = Array.isArray(resumeRes.data)
      ? resumeRes.data
      : [];

    setResumes(resumeHistory);

    // Load career roadmap from the latest interview
    if (history.length > 0) {
  try {
    const reportRes = await api.get(
      `/interview/${history[0]._id}/report`
    );

    setCareerRoadmap(
      reportRes.data.careerRoadmap || undefined
    );

    setRecruiterReport({
      hireDecision: reportRes.data.hireDecision,
      hiringConfidence: reportRes.data.hiringConfidence,
      recruiterSummary: reportRes.data.recruiterSummary,
      recommendedCompanies: reportRes.data.recommendedCompanies,
      expectedSalary: reportRes.data.expectedSalary,
    });
  } catch (e) {
    console.error("Failed to load recruiter report", e);
  }
}
  } catch (err) {
    console.error("Dashboard load failed", err);
  } finally {
    setLoading(false);
  }
}

load();
 

}, []);

const latestInterview = interviews[0];
const latestResume = resumes[0];

const overallScore =
latestInterview?.overallScore ??
latestResume?.overallScore ??
0;

const interviewCount = interviews.length;

const resumeAts = latestResume?.atsScore ?? 0;

const streak = useMemo(() => {
if (interviews.length === 0) return 0;

 
const uniqueDays = new Set(
  interviews.map((i) =>
    new Date(i.createdAt).toDateString(),
  ),
);

return uniqueDays.size;
 

}, [interviews]);

return ( <main className="min-h-screen bg-[#050816] text-white"> 

<div className="mx-auto max-w-7xl px-6 py-8"> 

<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-4xl font-black">
      Welcome back, {user?.firstName || "Candidate"}
    </h1>


<p className="mt-2 text-zinc-400">
  Your interview progress is synced in real time from MongoDB.
</p>


  </div>

  <div className="flex flex-wrap gap-3">
    <Link
      href="/resume/upload"
      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/10"
    >
      <FileText size={18} className="text-cyan-300" />
      Upload Resume
    </Link>


<Link
  href="/interview/new"
  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
>
  <Brain size={18} />
  Start Interview
</Link>


  </div>
</div>


    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          title: "Overall Score",
          value: `${overallScore}%`,
          icon: Brain,
        },
        {
          title: "Interviews Completed",
          value: String(interviewCount),
          icon: Calendar,
        },
        {
          title: "Resume ATS",
          value: String(resumeAts),
          icon: FileText,
        },
        {
          title: "Current Streak",
          value: `${streak} Days`,
          icon: Trophy,
        },
      ].map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <card.icon className="text-cyan-300" />
            <TrendingUp className="text-green-400" />
          </div>

          <div className="text-sm text-zinc-400">{card.title}</div>
          <div className="mt-2 text-3xl font-black text-white">
            {card.value}
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Interviews</h2>

          <Link
            href="/history"
            className="text-sm text-cyan-300 hover:text-cyan-200"
          >
            View all
          </Link>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-zinc-400">Loading interviews...</div>
          ) : interviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b1220] p-8 text-center text-zinc-400">
              No interviews yet. Start your first mock interview.
            </div>
          ) : 






    interviews.slice(0, 5).map((interview) => (

  <Link
    key={interview._id}
    href={`/interview/${interview._id}/replay`}
    className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1220] p-5 transition hover:border-cyan-400/30 hover:bg-white/5"
  >
    <div>
      <div className="font-semibold">{interview.role}</div>
      <div className="mt-1 text-sm text-zinc-400">
        {interview.difficulty} • {new Date(interview.createdAt).toLocaleDateString()}
      </div>
    </div>

 
<div className="text-right">
  <div className="text-2xl font-black text-cyan-300">
    {interview.overallScore}%
  </div>
  <div className="text-sm text-zinc-400">
    Replay Interview
  </div>
</div>
 

  </Link>
))}






        </div>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="mb-6 text-2xl font-bold">Resume Analytics</h2>

        {latestResume ? (
          <>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6">
              <div className="text-sm text-cyan-300">Latest ATS Score</div>

              <div className="mt-2 text-4xl font-black">
                {latestResume.atsScore}
              </div>

              <div className="mt-2 text-zinc-300">
                {latestResume.originalName}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {resumes.slice(0, 3).map((resume) => (
                <div
                  key={resume._id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1220] p-4"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-cyan-300" />

                    <div>
                      <div className="font-medium">
                        {resume.originalName}
                      </div>

                      <div className="text-xs text-zinc-500">
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="font-bold text-cyan-300">
                    {resume.atsScore}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b1220] p-8 text-center text-zinc-400">
            Upload a resume to unlock ATS analysis and career insights.
          </div>
        )}
      </div>
    </div>

    <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Activity</h2>

        

        <Clock className="text-cyan-300" />

        
      </div>

      

      <div className="space-y-4">
        {interviews.slice(0, 5).map((interview) => (
          <div
            key={interview._id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1220] p-4"
          >
            <div>
              <div className="font-medium">
                Completed {interview.role} interview
              </div>

              <div className="text-sm text-zinc-500">
                {new Date(interview.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center gap-2 text-cyan-300">
              {interview.overallScore}% <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
      
    </div>
    <div className="mt-8">
        <CareerRoadmapCard roadmap={careerRoadmap} />
      </div>

    <div className="mt-8">
  <AchievementsCard
    interviews={interviews}
    streak={streak}
  />
</div>


<div className="mt-8">
  <RecruiterIntelligenceCard report={recruiterReport} />
</div>

<div className="mt-8">
  <AnalyticsDashboard interviews={interviews} />
</div>


<div className="mt-8">
  <CareerTimeline
    interviews={interviews}
    resumes={resumes}
    roadmap={careerRoadmap}
  />
</div>

  </div>

<AIRecruiterAssistant
  userName={user?.firstName || "Candidate"}
  interviews={interviews}
  careerRoadmap={careerRoadmap}
/>
</main>
 

);
}
