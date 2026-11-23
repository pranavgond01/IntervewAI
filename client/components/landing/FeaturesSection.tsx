"use client";

import { motion } from "framer-motion";
import {
BrainCircuit,
FileText,
Mic,
Shield,
LineChart,
Briefcase,
} from "lucide-react";
import TiltCard from "./TiltCard";

const features = [
{
icon: FileText,
title: "Resume ATS Analyzer",
desc:
"Upload your resume and receive ATS score, missing skills, strengths, and recruiter-level improvement suggestions.",
},
{
icon: Mic,
title: "AI Voice Interview",
desc:
"Practice realistic conversations with a human-like AI interviewer that adapts questions based on your answers.",
},
{
icon: BrainCircuit,
title: "Adaptive AI Questions",
desc:
"The AI changes difficulty and follow-up questions in real time, just like a real technical interview.",
},
{
icon: Shield,
title: "AI Proctoring",
desc:
"Detect tab switching, copy/paste attempts, multiple faces, and other interview violations automatically.",
},
{
icon: LineChart,
title: "Live Performance Analytics",
desc:
"Track communication, confidence, technical skills, fluency, clarity, and vocabulary while answering.",
},
{
icon: Briefcase,
title: "Recruiter Report",
desc:
"Get hiring probability, salary estimation, company recommendations, and a personalized career roadmap.",
},
];

export default function FeaturesSection() {
return ( <section id="features" className="mx-auto max-w-7xl px-6 py-24"> <div className="mb-12 text-center">
    
<motion.h2
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="text-4xl font-black md:text-5xl"
>
Why InterviewAI?
</motion.h2>

    
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mx-auto mt-4 max-w-3xl text-lg text-zinc-400"
    >
      Everything you need to prepare for technical interviews, improve your
      communication, and get recruiter-level feedback in one platform.
    </motion.p>
    
  </div>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {features.map((feature, index) => {
      const Icon = feature.icon;

      return (

        <TiltCard>
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30 transition group-hover:bg-cyan-400/30">
            <Icon className="h-7 w-7 text-cyan-300" />
          </div>

          <h3 className="text-2xl font-bold">{feature.title}</h3>

          <p className="mt-3 leading-7 text-zinc-400">{feature.desc}</p>
        </motion.div>

    </TiltCard>
      );
    })}
  </div>
</section>


);
}
