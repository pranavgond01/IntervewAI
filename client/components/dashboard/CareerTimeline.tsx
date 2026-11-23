"use client";

import { motion } from "framer-motion";
import {
FileText,
Mic,
Trophy,
Target,
TrendingUp,
} from "lucide-react";

type Interview = {
_id: string;
role: string;
overallScore: number;
createdAt: string;
};

type Resume = {
_id: string;
originalName: string;
atsScore: number;
createdAt: string;
};

type Roadmap = {
readiness?: number;
currentLevel?: string;
};

export default function CareerTimeline({
interviews,
resumes,
roadmap,
}: {
interviews: Interview[];
resumes: Resume[];
roadmap?: Roadmap;
}) {
const events = [
...resumes.map((resume) => ({
id: `resume-${resume._id}`,
date: resume.createdAt,
type: "resume" as const,
title: "Resume analyzed by AI",
description: `${resume.originalName} • ATS ${resume.atsScore}`,
icon: FileText,
})),
...interviews.map((interview) => ({
id: `interview-${interview._id}`,
date: interview.createdAt,
type: "interview" as const,
title: `${interview.role} interview completed`,
description: `Overall score ${interview.overallScore}%`,
icon: Mic,
})),
...(roadmap
? [
{
id: "roadmap",
date: new Date().toISOString(),
type: "roadmap" as const,
title: "Career roadmap generated",
description: `${roadmap.currentLevel || "Candidate"} • ${roadmap.readiness || 0}% readiness`,
icon: Target,
},
]
: []),
...(interviews.some((i) => i.overallScore >= 90)
? [
{
id: "achievement-90",
date: new Date().toISOString(),
type: "achievement" as const,
title: "Achievement unlocked",
description: "90+ Club unlocked",
icon: Trophy,
},
]
: []),
].sort(
(a, b) =>
new Date(b.date).getTime() - new Date(a.date).getTime(),
);

return ( <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"> <div className="mb-6 flex items-center justify-between"> <div> <h2 className="text-2xl font-bold">AI Career Timeline</h2> <p className="mt-1 text-zinc-400">
Your complete interview and career growth journey </p> </div>

 
    <TrendingUp className="text-cyan-300" />
  </div>

  <div className="relative">
    <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

    <div className="space-y-6">
      {events.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-[#0b1220] p-8 text-center text-zinc-400">
          Start your first interview or upload a resume to build your AI career timeline.
        </div>
      ) : (
        events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative flex gap-5"
          >
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/30">
              <event.icon className="h-5 w-5 text-cyan-300" />
            </div>

            <div className="flex-1 rounded-3xl border border-white/10 bg-[#0b1220] p-5">
              <div className="mb-1 text-sm text-zinc-500">
                {new Date(event.date).toLocaleString()}
              </div>

              <div className="text-lg font-semibold text-white">
                {event.title}
              </div>

              <p className="mt-2 leading-7 text-zinc-300">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))
      )}
    </div>
  </div>
</div>
 

);
}
