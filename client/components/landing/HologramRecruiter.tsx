"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";

export default function HologramRecruiter() {
return ( <section className="relative px-6 py-32"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_55%)]" />


  <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-6 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300"
    >
      Meet Your AI Recruiter
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="text-5xl font-black md:text-7xl"
    >
      Sarah AI
    </motion.h2>

    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
      A recruiter trained to simulate real technical interviews, ask adaptive
      follow-up questions, analyze your voice, and generate recruiter-level
      hiring reports.
    </p>

    <div className="relative mt-16 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute h-[420px] w-[420px] rounded-full border border-cyan-400/20"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute h-[340px] w-[340px] rounded-full border border-cyan-400/10"
      />

      <motion.div
        animate={{
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 0 0 rgba(34,211,238,0.18)",
            "0 0 60px rgba(34,211,238,0.4)",
            "0 0 0 rgba(34,211,238,0.18)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-72 w-72 items-center justify-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/30 backdrop-blur-xl"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-56 w-56 flex-col items-center justify-center rounded-full border border-cyan-400/20 bg-[#0b1220]"
        >
          <div className="mb-4 flex gap-8">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut",
                }}
                className="h-4 w-4 rounded-full bg-cyan-300"
              />
            ))}
          </div>

          <motion.div
            animate={{ width: [64, 76, 64] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-1 rounded-full bg-cyan-300"
          />

          <div className="mt-6 text-sm uppercase tracking-[0.25em] text-cyan-300">
            AI Recruiter
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-[-48px] flex gap-1">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [8, 24, 12, 30, 10] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.04,
            }}
            className="w-1 rounded-full bg-cyan-400"
          />
        ))}
      </div>
    </div>

    <div className="mt-24 grid w-full gap-4 md:grid-cols-3">
      {[
        ["Adaptive Questions", "AI changes difficulty dynamically."],
        ["Voice Intelligence", "Confidence, clarity, and fluency analysis."],
        ["Recruiter Report", "Hiring verdict and personalized roadmap."],
      ].map(([title, desc], index) => (
        <motion.div
          key={title as string}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.08 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="text-lg font-semibold text-white">
            {title as string}
          </div>
          <p className="mt-2 text-sm leading-7 text-zinc-400">
            {desc as string}
          </p>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-12 flex flex-wrap justify-center gap-4"
    >
      <button className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-8 py-4 font-semibold text-black transition hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/30">
        <Mic size={18} />
        Talk to Sarah AI
      </button>

      <button className="flex items-center gap-2 rounded-2xl border border-white/10 px-8 py-4 font-semibold text-zinc-200 transition hover:border-cyan-400/40 hover:text-white">
        <Sparkles size={18} />
        Watch Live Demo
      </button>
    </motion.div>
  </div>
</section>


);
}
