"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Mic, ArrowRight } from "lucide-react";
import Link from "next/link";

const question =
"Explain the difference between null and undefined in JavaScript, and give a practical example of when you would use each.";

export default function LiveInterviewSimulator() {
const [answer, setAnswer] = useState("");

const score = useMemo(() => {
const words = answer.trim().split(/\s+/).filter(Boolean).length;
if (words === 0) return 0;
if (words < 15) return 35;
if (words < 30) return 58;
if (words < 50) return 74;
if (words < 80) return 86;
return 93;
}, [answer]);

const verdict = useMemo(() => {
if (score === 0) return "Waiting for response";
if (score < 50) return "Needs Improvement";
if (score < 70) return "Average";
if (score < 85) return "Strong";
return "Hire Ready";
}, [score]);

return ( <section className="px-6 py-24"> <div className="mx-auto max-w-6xl rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10"> <div className="mb-8 text-center"> <div className="mb-3 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
No Signup Required </div>


      <h2 className="text-4xl font-black md:text-5xl">
        Try InterviewAI Right Now
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
        Answer one real interview question and instantly see how our AI
        evaluates communication, confidence, and technical depth.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
            <Brain className="text-cyan-300" />
          </div>

          <div>
            <div className="font-semibold">Sarah AI</div>
            <div className="text-sm text-cyan-300">
              Senior Frontend Interviewer
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
          <div className="mb-2 text-sm text-cyan-300">Question</div>
          <p className="text-lg leading-8 text-white">{question}</p>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-400">
            Your Answer
          </label>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="h-44 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-zinc-100 outline-none transition focus:border-cyan-400/40"
          />

          <div className="mt-4 flex items-center gap-2 text-cyan-300">
            <Mic size={16} />
            <span className="text-sm">
              Voice mode available after signup
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-3 text-sm uppercase tracking-[0.2em] text-zinc-500">
            Live Evaluation
          </div>

          <div className="text-5xl font-black text-cyan-300">
            {score}%
          </div>

          <div className="mt-4 h-3 rounded-full bg-zinc-800">
            <motion.div
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
            />
          </div>

          <div className="mt-5 space-y-3">
            {[
              ["Communication", Math.max(score - 4, 0)],
              ["Confidence", Math.max(score - 7, 0)],
              ["Technical Depth", Math.max(score - 2, 0)],
            ].map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-1 flex justify-between text-sm">
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
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
          <div className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
            Recruiter Verdict
          </div>

          <div className="text-3xl font-black text-white">
            {verdict}
          </div>

          <p className="mt-3 text-sm leading-7 text-zinc-200">
            {score === 0
              ? "Start typing to see a simulated recruiter evaluation."
              : score < 50
              ? "Your answer is too short and lacks technical detail. Expand your explanation with examples and reasoning."
              : score < 70
              ? "Good foundation, but you should include clearer distinctions and a practical example to strengthen the answer."
              : score < 85
              ? "Strong answer with solid understanding. A little more depth and edge-case discussion would make it interview-ready."
              : "Excellent explanation. You demonstrated strong communication and technical understanding similar to a successful frontend interview response."}
          </p>
        </div>

        <Link
          href="/register"
          className="flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-cyan-400 to-sky-400 px-6 py-4 font-semibold text-black transition hover:shadow-xl hover:shadow-cyan-400/30"
        >
          Unlock Full AI Interview
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </div>
</section>


);
}
