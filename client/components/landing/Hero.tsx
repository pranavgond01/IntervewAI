"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FloatingStats from "./FloatingStats";
import FloatingCards from "./FloatingCards";
import TypingDemo from "./TypingDemo";
import MagneticButton from "./MagneticButton";

export default function Hero() {
return ( <section className="relative overflow-hidden px-6 pt-4 pb-16">
      <FloatingCards />

{/* Background glow */} <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_45%)]" /> <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" /> <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

                

  <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pt-8 pb-12 md:grid-cols-2 md:items-center md:pt-12 md:pb-16">
    {/* Left Content */}
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300"
      >
        AI-Powered Interview Preparation
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl font-black leading-tight md:text-7xl"
      >
        Ace Your Dream Job with{' '}
        <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
          AI Mock Interviews
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-xl text-lg leading-8 text-zinc-300"
      >
        Practice realistic interviews with an AI recruiter, receive instant
        feedback, analyze your resume, improve communication, confidence,
        technical skills, and generate a personalized career roadmap before
        applying to top companies.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <MagneticButton>
        <Link
          href="/register"
          className="rounded-2xl bg-cyan-400 px-7 py-4 font-semibold text-black shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
        >
          Start Free Interview
        </Link>
        </MagneticButton>



        <MagneticButton>
        <a
          href="#demo"
          className="rounded-2xl border border-white/10 px-7 py-4 font-semibold text-zinc-200 transition hover:border-cyan-400/40 hover:text-white"
        >
          Watch Demo
        </a>
        </MagneticButton>
      </motion.div>
      <TypingDemo />

      <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-400">
        <span>Resume ATS Analysis</span>
        <span>AI Voice Interview</span>
        <span>Recruiter Report</span>
        <span>Career Roadmap</span>
      </div>
    </div>

    

    {/* Right Interview Preview */}
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
            <span className="text-xl font-black text-cyan-300">AI</span>
          </div>

          <div>
            <div className="text-xl font-bold">Sarah AI</div>
            <div className="text-sm text-cyan-300">
              Senior Technical Recruiter
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
            <div className="text-sm text-cyan-300">Sarah</div>
            <p className="mt-2 text-lg">
              Tell me about a React project you're most proud of.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
            <div className="text-sm text-zinc-400">You</div>
            <p className="mt-2 text-zinc-200">
              I built a full-stack dashboard with React, Node.js, and
              MongoDB that handled authentication, analytics, and real-time
              updates...
            </p>
          </div>
        </div>

        <div className="mt-6">
          <FloatingStats />
        </div>
      </div>

      {/* Floating decorative cards */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-8 top-10 hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:block"
      >
        <div className="text-sm text-zinc-400">AI Accuracy</div>
        <div className="text-2xl font-black text-cyan-300">95%</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-8 bottom-8 hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:block"
      >
        <div className="text-sm text-zinc-400">Hire Probability</div>
        <div className="text-2xl font-black text-cyan-300">87%</div>
      </motion.div>
    </motion.div>
  </div>
</section>


);
}
