"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
Bot,
Sparkles,
ArrowRight,
X,
Mic,
Briefcase,
TrendingUp,
} from "lucide-react";
import Link from "next/link";

type Interview = {
overallScore: number;
role: string;
difficulty: string;
};

type Props = {
userName: string;
interviews: Interview[];
careerRoadmap?: {
readiness?: number;
currentLevel?: string;
};
};

export default function AIRecruiterAssistant({
userName,
interviews,
careerRoadmap,
}: Props) {
const [open, setOpen] = useState(false);

const latest = interviews[0];

const message = useMemo(() => {
if (!latest) {
return `Hi ${userName}! I'm Sarah AI, your personal recruiter. Upload a resume or start your first mock interview and I'll build a personalized hiring strategy for you.`;
}

 
const score = latest.overallScore;
const readiness = careerRoadmap?.readiness ?? 0;

if (score >= 90) {
  return `Excellent work, ${userName}! Your latest interview scored ${score}%. You're approaching recruiter-ready territory. I recommend a Senior ${latest.role} interview next.`;
}

if (score >= 75) {
  return `Great progress, ${userName}. Your score is ${score}% and your job readiness is ${readiness}%. Let's strengthen your technical depth and communication to push you above 90%.`;
}

return `You're improving, ${userName}. I'd focus on ${latest.difficulty} interview practice and resume optimization before applying to top companies.`;
 

}, [careerRoadmap?.readiness, latest, userName]);

return (
<> <AnimatePresence>
{open && (
<motion.div
initial={{ opacity: 0, y: 20, scale: 0.96 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: 20, scale: 0.96 }}
transition={{ duration: 0.25 }}
className="fixed bottom-24 right-6 z-50 w-[360px] rounded-3xl border border-white/10 bg-[#0b1220]/95 p-6 shadow-2xl backdrop-blur-xl"
> <div className="mb-5 flex items-center justify-between"> <div className="flex items-center gap-3"> <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/30"> <Bot className="text-cyan-300" /> </div>

 
            <div>
              <div className="font-semibold">Sarah AI</div>
              <div className="text-xs text-cyan-300">
                Senior Technical Recruiter
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
          <div className="mb-2 flex items-center gap-2 text-cyan-300">
            <Sparkles size={16} />
            AI Insight
          </div>

          <p className="leading-7 text-zinc-200">{message}</p>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/interview/new"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/30 hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <Mic size={16} className="text-cyan-300" />
              Start AI Interview
            </span>

            <ArrowRight size={16} className="text-cyan-300" />
          </Link>

          <Link
            href="/resume"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/30 hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <Briefcase size={16} className="text-cyan-300" />
              Improve Resume
            </span>

            <ArrowRight size={16} className="text-cyan-300" />
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/30 hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <TrendingUp size={16} className="text-cyan-300" />
              View Career Progress
            </span>

            <ArrowRight size={16} className="text-cyan-300" />
          </Link>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  <motion.button
    onClick={() => setOpen((v) => !v)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    animate={{
      boxShadow: [
        "0 0 0 rgba(34,211,238,0.25)",
        "0 0 24px rgba(34,211,238,0.45)",
        "0 0 0 rgba(34,211,238,0.25)",
      ],
    }}
    transition={{
      boxShadow: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
    className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-black shadow-2xl shadow-cyan-400/30"
  >
    <Bot size={28} />
  </motion.button>
</>
 

);
}
