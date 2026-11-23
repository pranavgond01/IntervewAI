"use client";

import { Brain, Sparkles, Clock, ShieldCheck } from "lucide-react";
import CandidateProfileForm from "@/components/interview/CandidateProfileForm";

export default function NewInterviewPage() {
return ( <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
{/* Background glow */} <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_45%)]" /> <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" /> <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />


  <div className="relative mx-auto max-w-7xl px-6 py-12">
    {/* Hero */}
    <div className="mb-10">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
        <Sparkles size={16} />
        AI Interview Preparation
      </div>

      <h1 className="text-5xl font-black leading-tight md:text-6xl">
        Prepare Your AI Interview
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-zinc-400">
        Configure your profile, resume, and target role before launching a
        realistic AI-powered interview with recruiter-level feedback and
        personalized coaching.
      </p>
    </div>

    {/* Quick Info Cards */}
    <div className="mb-10 grid gap-4 md:grid-cols-3">
      <InfoCard
        icon={Brain}
        title="AI Recruiter"
        value="Sarah AI will conduct your interview"
      />

      <InfoCard
        icon={Clock}
        title="Estimated Duration"
        value="15-20 minutes"
      />

      <InfoCard
        icon={ShieldCheck}
        title="Private Session"
        value="Your interview remains confidential"
      />
    </div>

    {/* Step Indicator */}
    <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {[
          "Resume",
          "Personal Info",
          "Professional Info",
          "Interview",
        ].map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                index === 0
                  ? "bg-cyan-400 text-black"
                  : "border border-white/10 bg-[#0b1220] text-zinc-300"
              }`}
            >
              {index + 1}
            </div>

            <div className="text-sm font-medium text-zinc-300">
              {step}
            </div>

            {index < 3 && (
              <div className="hidden h-px w-10 bg-white/10 md:block" />
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Main Form */}
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        <CandidateProfileForm />
      </div>

      <div className="space-y-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
              <span className="text-xl font-black text-cyan-300">AI</span>
            </div>

            <div>
              <div className="text-2xl font-black">Sarah AI</div>
              <div className="text-sm text-cyan-300">
                Senior Technical Recruiter
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <PreviewItem
              label="Interview Format"
              value="Adaptive AI conversation"
            />

            <PreviewItem
              label="Question Types"
              value="Technical, Behavioral, Situational"
            />

            <PreviewItem
              label="Difficulty"
              value="Dynamic based on your answers"
            />

            <PreviewItem
              label="Report"
              value="Recruiter summary, strengths, weaknesses, roadmap"
            />
          </div>
        </div>

        <div className="rounded-[32px] border border-cyan-400/20 bg-cyan-400/10 p-8">
          <h3 className="text-xl font-bold text-cyan-300">
            Before You Begin
          </h3>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-200">
            <li>• Upload your latest resume for personalized questions</li>
            <li>• Choose the role you are actively applying for</li>
            <li>• Answer naturally as if speaking to a real recruiter</li>
            <li>• You will receive a detailed AI evaluation report afterward</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</main>


);
}

function InfoCard({
icon: Icon,
title,
value,
}: {
icon: any;
title: string;
value: string;
}) {
return ( <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"> <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300"> <Icon size={22} /> </div>


  <div className="text-sm text-zinc-400">{title}</div>
  <div className="mt-2 text-lg font-bold text-white">{value}</div>
</div>


);
}

function PreviewItem({
label,
value,
}: {
label: string;
value: string;
}) {
return ( <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4"> <div className="text-sm text-zinc-400">{label}</div> <div className="mt-1 font-semibold text-white">{value}</div> </div>
);
}
