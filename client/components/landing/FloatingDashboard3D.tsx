"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BarChart3, FileText, TrendingUp, Brain } from "lucide-react";
import { MouseEvent } from "react";

export default function FloatingDashboard3D() {
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
stiffness: 180,
damping: 18,
});

const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
stiffness: 180,
damping: 18,
});

function handleMove(e: MouseEvent<HTMLDivElement>) {
const rect = e.currentTarget.getBoundingClientRect();
const x = (e.clientX - rect.left) / rect.width - 0.5;
const y = (e.clientY - rect.top) / rect.height - 0.5;


mouseX.set(x);
mouseY.set(y);


}

function handleLeave() {
mouseX.set(0);
mouseY.set(0);
}

return ( <section className="px-6 py-28"> <div className="mx-auto max-w-7xl"> <div className="mb-14 text-center"> <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
Interactive 3D Dashboard </div>


      <h2 className="text-4xl font-black md:text-5xl">
        Your Recruiter Report in 3D
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
        Move your cursor across the dashboard to explore a realistic AI
        interview report with recruiter insights, analytics, and hiring
        signals.
      </p>
    </div>

    <div className="perspective-[1400px]">
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative mx-auto rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        <div className="absolute -left-16 top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-16 bottom-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
                  <Brain className="text-cyan-300" />
                </div>

                <div>
                  <div className="font-semibold">AI Recruiter Summary</div>
                  <div className="text-sm text-cyan-300">
                    Senior Frontend Evaluation
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                <div className="mb-2 text-sm text-cyan-300">
                  Final Verdict
                </div>

                <div className="text-4xl font-black text-white">
                  Hire
                </div>

                <p className="mt-3 leading-7 text-zinc-200">
                  The candidate demonstrates strong JavaScript fundamentals,
                  clear communication, and practical frontend experience.
                  Recommended for frontend and React-focused engineering
                  roles.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Communication", "88%"],
                  ["Technical", "91%"],
                  ["Problem Solving", "85%"],
                  ["Confidence", "89%"],
                ].map(([label, value]) => (
                  <div
                    key={label as string}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-sm text-zinc-400">{label as string}</div>
                    <div className="mt-2 text-2xl font-black text-cyan-300">
                      {value as string}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-2 text-cyan-300">
                <FileText size={18} />
                Recruiter Notes
              </div>

              <ul className="space-y-3 text-zinc-300">
                <li>• Strong React and JavaScript fundamentals</li>
                <li>• Good communication under pressure</li>
                <li>• Practical examples from real projects</li>
                <li>• Should deepen system design knowledge</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-2 text-cyan-300">
                <BarChart3 size={18} />
                Performance Trend
              </div>

              <div className="flex h-44 items-end gap-3">
                {[52, 61, 70, 78, 86, 91].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.08 }}
                    className="flex-1 rounded-t-2xl bg-gradient-to-t from-cyan-500 to-sky-400"
                  />
                ))}
              </div>

              <div className="mt-3 flex justify-between text-xs text-zinc-500">
                <span>Q1</span>
                <span>Q2</span>
                <span>Q3</span>
                <span>Q4</span>
                <span>Q5</span>
                <span>Q6</span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-2 text-cyan-300">
                <TrendingUp size={18} />
                Career Roadmap
              </div>

              <div className="space-y-3">
                {[
                  "Advanced React Patterns",
                  "TypeScript Mastery",
                  "System Design Basics",
                  "Frontend Performance",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1220] p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-bold text-cyan-300">
                      {index + 1}
                    </div>
                    <span className="text-zinc-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


);
}
