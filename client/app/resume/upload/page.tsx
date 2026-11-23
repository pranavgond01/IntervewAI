import {
ShieldCheck,
Sparkles,
FileText,
Brain,
TrendingUp,
CheckCircle,
} from "lucide-react";

import ResumeUploader from "@/components/resume/ResumeUploader";

export default function UploadResumePage() {
return ( <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_45%)]" /> <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" /> <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />


  <div className="relative mx-auto max-w-7xl px-6 py-12">
    <div className="mb-10">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
        <Sparkles size={16} />
        AI Resume Intelligence
      </div>

      <h1 className="text-5xl font-black leading-tight md:text-6xl">
        Upload Your Resume
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-zinc-400">
        Get an instant ATS score, recruiter feedback, missing skill analysis,
        and a personalized interview roadmap before you apply to top
        companies.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[32px] border border-cyan-400/20 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.08)]">
        <ResumeUploader />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoPill
            icon={FileText}
            title="PDF / DOCX"
            subtitle="Supported formats"
          />

          <InfoPill
            icon={ShieldCheck}
            title="Secure Upload"
            subtitle="Encrypted processing"
          />

          <InfoPill
            icon={CheckCircle}
            title="Instant Analysis"
            subtitle="Results in seconds"
          />
        </div>
      </div>

      <div className="space-y-5">
        <FeatureCard
          icon={Brain}
          title="AI Resume Analysis"
          description="Deep analysis of experience, projects, education, and recruiter impact."
        />

        <FeatureCard
          icon={TrendingUp}
          title="ATS Optimization"
          description="See how well your resume performs against modern applicant tracking systems."
        />

        <FeatureCard
          icon={Sparkles}
          title="Smart Suggestions"
          description="Identify missing skills, stronger bullet points, and better keyword coverage."
        />

        <FeatureCard
          icon={CheckCircle}
          title="Interview Ready Report"
          description="Generate a personalized roadmap and AI interview strategy based on your resume."
        />

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
          <div className="flex items-center gap-3 text-cyan-300">
            <ShieldCheck size={22} />
            <h3 className="text-lg font-bold">Privacy First</h3>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Your resume is processed securely and used only to generate your
            AI analysis, recruiter insights, and interview preparation
            recommendations.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>


);
}

function FeatureCard({
icon: Icon,
title,
description,
}: {
icon: any;
title: string;
description: string;
}) {
return ( <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/10"> <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300"> <Icon size={22} /> </div>


  <h3 className="text-xl font-bold">{title}</h3>
  <p className="mt-3 leading-7 text-zinc-400">{description}</p>
</div>


);
}

function InfoPill({
icon: Icon,
title,
subtitle,
}: {
icon: any;
title: string;
subtitle: string;
}) {
return ( <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4"> <div className="mb-3 flex items-center gap-2 text-cyan-300"> <Icon size={18} />
{title} </div>


  <div className="text-sm text-zinc-400">{subtitle}</div>
</div>


);
}
