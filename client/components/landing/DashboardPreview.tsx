"use client";

import { motion } from "framer-motion";

export default function DashboardPreview() {
return ( <section className="px-6 py-24"> <div className="mx-auto max-w-7xl">
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="mb-12 text-center"
> <h2 className="text-4xl font-black md:text-5xl">
Your AI Interview Dashboard </h2>

```
      <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
        Track every interview, analyze performance trends, and receive
        recruiter-style insights after every session.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"
    >
      <div className="border-b border-white/10 bg-white/[0.04] px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="grid gap-6 p-8 lg:grid-cols-[260px_1fr]">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
          <div className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
            Navigation
          </div>

          <div className="space-y-3">
            {[
              "Dashboard",
              "Resume Analysis",
              "Mock Interviews",
              "Reports",
              "Career Roadmap",
            ].map((item, index) => (
              <div
                key={item}
                className={`rounded-2xl px-4 py-3 ${
                  index === 0
                    ? "bg-cyan-400/15 text-cyan-300"
                    : "text-zinc-400"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Overall Score", "91%"],
              ["Confidence", "88%"],
              ["Hire Chance", "87%"],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-sm text-zinc-400">{label as string}</div>
                <div className="mt-2 text-3xl font-black text-cyan-300">
                  {value as string}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 text-lg font-semibold">
              Recent Interview
            </div>

            <div className="space-y-4">
              {[
                ["Frontend Engineer", 92],
                ["React Developer", 88],
                ["Full Stack Developer", 84],
              ].map(([role, score]) => (
                <div
                  key={role as string}
                  className="rounded-2xl border border-white/10 bg-[#0b1220] p-4"
                >
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-300">{role as string}</span>
                    <span className="text-cyan-300">{score as number}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>


);
}
