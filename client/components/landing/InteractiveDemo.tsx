"use client";

import { motion } from "framer-motion";
import { Mic, Brain, Activity, Shield } from "lucide-react";
import Link from "next/link";

export default function InteractiveDemo() {
return ( <section id="demo" className="relative px-6 py-24"> <div className="mx-auto max-w-7xl">
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="mb-14 text-center"
> <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
Live AI Interview Demo </div>


      <h2 className="text-4xl font-black md:text-5xl">
        Experience a Real AI Interview
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
        This is exactly how InterviewAI evaluates candidates using voice,
        technical reasoning, confidence analysis, and recruiter-level
        feedback.
      </p>
    </motion.div>

    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
            <Brain className="text-cyan-300" />
          </div>

          <div>
            <div className="text-xl font-bold">Sarah AI</div>
            <div className="text-sm text-cyan-300">
              Senior Frontend Interviewer
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <div className="mb-2 text-sm text-cyan-300">
              AI Question
            </div>

            <p className="text-lg leading-8 text-white">
              Explain the difference between <strong>null</strong> and
              <strong>undefined</strong> in JavaScript, and give a practical
              example of when you would use each.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
            <div className="mb-2 text-sm text-zinc-400">
              Candidate Response
            </div>

            <p className="leading-8 text-zinc-200">
              Null represents an intentional absence of a value, while
              undefined usually means a variable hasn't been assigned yet...
            </p>

            <div className="mt-4 flex items-center gap-2 text-cyan-300">
              <Mic size={16} />
              <span className="text-sm">Voice transcription active</span>
            </div>

            <div className="mt-3 flex gap-1">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [8, 18, 10, 22, 8],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                  className="w-1 rounded-full bg-cyan-400"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-cyan-300">
            <Activity size={18} />
            Live AI Analytics
          </div>

          {[
            ["Confidence", 92],
            ["Communication", 88],
            ["Technical Depth", 91],
            ["Problem Solving", 85],
          ].map(([label, value]) => (
            <div key={label as string} className="mb-4">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-zinc-300">{label as string}</span>
                <span className="text-cyan-300">{value as number}%</span>
              </div>

              <div className="h-2 rounded-full bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2 text-cyan-300">
            <Shield size={18} />
            AI Recruiter Verdict
          </div>

          <div className="mb-3 text-3xl font-black text-green-400">
            Hire
          </div>

          <p className="text-sm leading-7 text-zinc-300">
            Strong communication, clear understanding of JavaScript
            fundamentals, and practical examples indicate readiness for a
            frontend engineering role.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "React",
              "JavaScript",
              "TypeScript",
              "Frontend",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/register"
          className="block rounded-3xl bg-gradient-to-r from-cyan-400 to-sky-400 p-5 text-center font-bold text-black transition hover:shadow-xl hover:shadow-cyan-400/30"
        >
          Start Your AI Interview
        </Link>
      </motion.div>
    </div>
  </div>
</section>


);
}
