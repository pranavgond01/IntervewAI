"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, BookOpen, Briefcase } from "lucide-react";

type Roadmap = {
currentLevel?: string;
readiness?: number;
missingSkills?: string[];
roadmap?: {
week: number;
title: string;
tasks: string[];
}[];
courses?: {
title: string;
platform: string;
url: string;
}[];
companies?: string[];
};

export default function CareerRoadmapCard({
roadmap,
}: {
roadmap?: Roadmap;
}) {
if (!roadmap || Object.keys(roadmap).length === 0) {
return ( <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"> <h2 className="text-2xl font-bold">AI Career Roadmap</h2> <p className="mt-3 text-zinc-400">
Complete an interview to generate a personalized roadmap. </p> </div>
);
}

return ( <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"> <div className="mb-6 flex items-center justify-between"> <div> <h2 className="text-2xl font-bold">AI Career Roadmap</h2> <p className="mt-1 text-zinc-400">
Personalized growth plan based on your latest interview </p> </div>

 
    <div className="rounded-2xl bg-cyan-400/10 px-4 py-2 text-cyan-300">
      {roadmap.currentLevel || "Candidate"}
    </div>
  </div>

  <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
    <div className="mb-3 flex items-center gap-2 text-cyan-300">
      <Target size={18} />
      Job Readiness
    </div>

    <div className="text-4xl font-black">
      {roadmap.readiness ?? 0}%
    </div>

    <div className="mt-4 h-3 rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${roadmap.readiness ?? 0}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
      />
    </div>
  </div>

  <div className="mb-8">
    <h3 className="mb-3 text-lg font-semibold">Missing Skills</h3>

    <div className="flex flex-wrap gap-2">
      {(roadmap.missingSkills || []).length === 0 ? (
        <span className="text-zinc-400">
          No missing skills detected.
        </span>
      ) : (
        roadmap.missingSkills!.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300"
          >
            {skill}
          </span>
        ))
      )}
    </div>
  </div>

  <div className="mb-8">
    <h3 className="mb-4 text-lg font-semibold">Weekly Roadmap</h3>

    <div className="space-y-4">
      {(roadmap.roadmap || []).length === 0 ? (
        <div className="text-zinc-400">
          Roadmap will appear after your interview analysis.
        </div>
      ) : (
        roadmap.roadmap!.map((week) => (
          <div
            key={week.week}
            className="rounded-3xl border border-white/10 bg-[#0b1220] p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                {week.week}
              </div>

              <div>
                <div className="font-semibold">Week {week.week}</div>
                <div className="text-zinc-300">{week.title}</div>
              </div>
            </div>

            <div className="space-y-2">
              {week.tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-zinc-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  </div>

  <div className="grid gap-6 lg:grid-cols-2">
    <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5">
      <div className="mb-3 flex items-center gap-2 text-cyan-300">
        <BookOpen size={18} />
        Recommended Courses
      </div>

      <div className="space-y-3">
        {(roadmap.courses || []).length === 0 ? (
          <div className="text-zinc-400">
            No course recommendations yet.
          </div>
        ) : (
          roadmap.courses!.map((course) => (
            <a
              key={course.title}
              href={course.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10"
            >
              <div className="font-semibold">{course.title}</div>
              <div className="text-sm text-zinc-400">
                {course.platform}
              </div>
            </a>
          ))
        )}
      </div>
    </div>

    <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5">
      <div className="mb-3 flex items-center gap-2 text-cyan-300">
        <Briefcase size={18} />
        Target Companies
      </div>

      <div className="flex flex-wrap gap-2">
        {(roadmap.companies || []).length === 0 ? (
          <div className="text-zinc-400">
            Company recommendations will appear after analysis.
          </div>
        ) : (
          roadmap.companies!.map((company) => (
            <span
              key={company}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300"
            >
              {company}
            </span>
          ))
        )}
      </div>
    </div>
  </div>
</div>
 

);
}
