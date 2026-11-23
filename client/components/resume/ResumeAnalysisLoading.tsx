"use client";

import { motion } from "framer-motion";
import {
Brain,
FileText,
Scan,
Sparkles,
ShieldCheck,
TrendingUp,
} from "lucide-react";

const steps = [
{
icon: FileText,
title: "Parsing resume structure",
delay: 0,
},
{
icon: Scan,
title: "Scanning ATS keywords",
delay: 0.8,
},
{
icon: Brain,
title: "Evaluating technical skills",
delay: 1.6,
},
{
icon: TrendingUp,
title: "Calculating recruiter score",
delay: 2.4,
},
{
icon: Sparkles,
title: "Generating AI recommendations",
delay: 3.2,
},
];

export default function ResumeAnalysisLoading() {
return ( <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050816]/95 backdrop-blur-2xl"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_45%)]" />


  <div className="relative mx-auto w-full max-w-4xl rounded-[36px] border border-cyan-400/20 bg-white/5 p-8 backdrop-blur-2xl md:p-10">
    <div className="mb-8 flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
        <span className="text-xl font-black text-cyan-300">AI</span>
      </div>

      <div>
        <div className="text-2xl font-black">Sarah AI</div>
        <div className="text-cyan-300">
          Resume Intelligence Engine
        </div>
      </div>
    </div>

    <h2 className="text-3xl font-black">
      Analyzing your resume
    </h2>

    <p className="mt-3 max-w-2xl text-zinc-400">
      We're scanning your resume against ATS systems, recruiter patterns,
      technical skills, and hiring benchmarks used by top companies.
    </p>

    <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] p-8">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-xl" />

      <motion.div
        animate={{ x: ["-10%", "110%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
      />

      <div className="space-y-5">
        {steps.map((step) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: step.delay,
              duration: 0.4,
            }}
            className="flex items-center gap-4"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <step.icon size={20} />
            </div>

            <div className="flex-1">
              <div className="font-semibold text-white">
                {step.title}
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    delay: step.delay,
                    duration: 1,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <MetricCard label="ATS Database" value="120+ templates" />
      <MetricCard label="Recruiter Signals" value="Real hiring patterns" />
      <MetricCard label="Estimated time" value="5-10 seconds" />
    </div>

    <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
      <div className="mb-2 flex items-center gap-2 text-cyan-300">
        <ShieldCheck size={18} />
        Secure AI Processing
      </div>

      <p className="text-sm leading-6 text-zinc-300">
        Your resume is encrypted during processing and analyzed only for ATS,
        recruiter insights, and interview preparation recommendations.
      </p>
    </div>
  </div>
</div>


);
}

function MetricCard({
label,
value,
}: {
label: string;
value: string;
}) {
return ( <div className="rounded-2xl border border-white/10 bg-white/5 p-5"> <div className="text-sm text-zinc-400">{label}</div> <div className="mt-2 text-xl font-black text-cyan-300">
{value} </div> </div>
);
}
