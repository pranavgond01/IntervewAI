"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import {
CheckCircle2,
BookOpen,
Mic,
Bot,
Trophy,
} from "lucide-react";

export default function InterviewReplayPage() {
const params = useParams();
const id = params.id as string;

const [report, setReport] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
async function load() {
try {
const res = await api.get(`/interview/${id}/report`);
setReport(res.data);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
}

 
load();
 

}, [id]);

if (loading) {
return ( <main className="min-h-screen bg-[#050816] p-8 text-white">
Loading interview replay... </main>
);
}

if (!report) {
return ( <main className="min-h-screen bg-[#050816] p-8 text-white">
Interview not found. </main>
);
}

return ( <main className="min-h-screen bg-[#050816] text-white"> <div className="mx-auto max-w-5xl px-6 py-10"> <div className="mb-8 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"> <div className="mb-4 flex items-center justify-between"> <div> <h1 className="text-4xl font-black">
Interview Replay </h1> <p className="mt-2 text-zinc-400">
{report.candidate?.role} • {report.candidate?.difficulty} </p> </div>

 
        <div className="rounded-2xl bg-cyan-400/10 px-6 py-4 text-center">
          <div className="text-sm text-cyan-300">Final Score</div>
          <div className="text-4xl font-black text-cyan-300">
            {report.overallScore}%
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Communication", report.communication],
          ["Technical", report.technical],
          ["Problem Solving", report.problemSolving],
          ["Confidence", report.confidence],
        ].map(([label, value]) => (
          <div
            key={label as string}
            className="rounded-2xl border border-white/10 bg-[#0b1220] p-4 text-center"
          >
            <div className="text-sm text-zinc-400">{label as string}</div>
            <div className="mt-2 text-2xl font-black text-cyan-300">
              {value as number}%
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-6">
      {report.questions?.map((question: any, index: number) => (
        <div
          key={index}
          className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="text-cyan-300" />
              <div>
                <div className="font-semibold">
                  Question {index + 1}
                </div>
                <div className="text-sm text-zinc-400">
                  {question.type} • {question.difficulty}
                </div>
              </div>
            </div>

            <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-300">
              {report.scores?.[index] ?? 0}%
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <p className="text-lg leading-8">{question.text}</p>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-[#0b1220] p-5">
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <Mic size={18} />
              Your Answer
            </div>
            <p className="leading-8 text-zinc-300">
              {report.answers?.[index] || "No answer submitted."}
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-green-400/20 bg-green-400/10 p-5">
            <div className="mb-2 flex items-center gap-2 text-green-300">
              <CheckCircle2 size={18} />
              Ideal Answer
            </div>
            <p className="leading-8 text-zinc-200">
              {report.idealAnswers?.[index] ||
                "Ideal answer not available."}
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-[#0b1220] p-5">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <BookOpen size={18} />
              Learning Resources
            </div>

            {report.learningResources?.[index]?.length ? (
              <div className="space-y-2">
                {report.learningResources[index].map(
                  (resource: string, i: number) => (
                    <a
                      key={i}
                      href={resource}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cyan-300 transition hover:border-cyan-400/30 hover:bg-white/10"
                    >
                      {resource}
                    </a>
                  ),
                )}
              </div>
            ) : (
              <p className="text-zinc-400">
                No learning resources available.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-cyan-300">
        <Trophy size={20} />
        Recruiter Verdict
      </div>

      <div className="text-3xl font-black text-white">
        {report.hireDecision || "Pending"}
      </div>

      <p className="mt-4 leading-8 text-zinc-300">
        {report.recruiterSummary ||
          "Complete more interviews to generate a recruiter summary."}
      </p>
    </div>
  </div>
</main>
 

);
}
