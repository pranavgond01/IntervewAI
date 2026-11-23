"use client";

import { motion } from "framer-motion";
import { Upload, Mic, FileCheck2 } from "lucide-react";
import TiltCard from "./TiltCard";

const steps = [
{
icon: Upload,
title: "Upload Resume",
desc: "Upload your PDF or DOCX resume and let AI analyze your ATS score, strengths, and missing skills.",
},
{
icon: Mic,
title: "Take an AI Interview",
desc: "Answer adaptive technical and behavioral questions with voice and webcam proctoring enabled.",
},
{
icon: FileCheck2,
title: "Receive Recruiter Report",
desc: "Get hiring probability, salary estimation, company recommendations, and a personalized roadmap.",
},
];

export default function HowItWorks() {
return ( <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24"> <div className="mb-14 text-center">
<motion.h2
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="text-4xl font-black md:text-5xl"
>
How InterviewAI Works
</motion.h2>


    <motion.p
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mx-auto mt-4 max-w-3xl text-lg text-zinc-400"
    >
      Prepare for interviews in three simple steps.
    </motion.p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    {steps.map((step, index) => {
      const Icon = step.icon;

      return (
        <TiltCard>
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
            <Icon className="h-7 w-7 text-cyan-300" />
          </div>

          <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Step {index + 1}
          </div>

          <h3 className="mt-3 text-2xl font-bold">{step.title}</h3>

          <p className="mt-3 leading-7 text-zinc-400">{step.desc}</p>
        </motion.div>
        </TiltCard>
      );
    })}
  </div>
</section>


);
}
