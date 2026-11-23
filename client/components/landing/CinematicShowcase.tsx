"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Mic, BarChart3, Shield } from "lucide-react";

export default function CinematicShowcase() {
const ref = useRef<HTMLDivElement>(null);

const { scrollYProgress } = useScroll({
target: ref,
offset: ["start start", "end end"],
});

const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.4, 1, 1]);
const y = useTransform(scrollYProgress, [0, 1], [120, -120]);

return ( <section
   ref={ref}
   className="relative h-[220vh] bg-[#050816]"
 > <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
<motion.div
style={{ scale, opacity }}
className="relative w-full max-w-6xl rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl"
>
<motion.div
style={{ y }}
className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
/>


      <motion.div
        style={{ y }}
        className="absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
      />

      <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
            AI Recruiter Engine
          </div>

          <h2 className="text-5xl font-black leading-tight md:text-6xl">
            Every Interview
            <br />
            Becomes
            <br />
            a Career Report
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            InterviewAI analyzes voice, confidence, communication,
            technical depth, problem solving, and recruiter signals in
            real time to generate a detailed hiring report and career
            roadmap.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Brain,
                title: "Adaptive Questions",
                desc: "AI changes difficulty dynamically.",
              },
              {
                icon: Mic,
                title: "Voice Analysis",
                desc: "Measure confidence and fluency.",
              },
              {
                icon: BarChart3,
                title: "Live Analytics",
                desc: "Track performance in real time.",
              },
              {
                icon: Shield,
                title: "AI Proctoring",
                desc: "Detect tab switching and violations.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <item.icon className="mb-3 text-cyan-300" />
                <div className="font-semibold text-white">
                  {item.title}
                </div>
                <div className="mt-1 text-sm text-zinc-400">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="rounded-[32px] border border-white/10 bg-[#0b1220] p-6 shadow-2xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
              <Brain className="text-cyan-300" />
            </div>

            <div>
              <div className="text-xl font-bold">Sarah AI</div>
              <div className="text-sm text-cyan-300">
                Senior Technical Recruiter
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <div className="mb-2 text-sm text-cyan-300">
                AI Evaluation
              </div>

              <div className="text-4xl font-black text-white">
                91%
              </div>

              <div className="mt-2 text-zinc-300">
                Overall Interview Score
              </div>
            </div>

            {[
              ["Communication", 88],
              ["Technical", 91],
              ["Problem Solving", 85],
              ["Confidence", 89],
            ].map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-zinc-300">{label as string}</span>
                  <span className="text-cyan-300">{value as number}%</span>
                </div>

                <div className="h-2 rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-5">
              <div className="text-sm text-green-300">
                Recruiter Verdict
              </div>

              <div className="mt-1 text-3xl font-black text-white">
                Hire
              </div>

              <div className="mt-2 text-sm leading-7 text-zinc-200">
                Strong frontend fundamentals, clear communication, and
                good problem-solving ability.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
</section>


);
}
