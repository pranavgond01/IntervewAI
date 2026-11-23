"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Mic,
  Gauge,
  Activity,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface Props {
  confidence: number;
  communication: number;
  technical: number;
  fluency: number;
  vocabulary: number;
  clarity: number;
  problemSolving: number;
  score: number;
  difficulty: string;
}

export default function LiveAnalytics({
  confidence,
  communication,
  technical,
  fluency,
  vocabulary,
  clarity,
  problemSolving,
  score,
  difficulty,
}: Props) {

  const stats = [
    {
      title: "Confidence",
      value: confidence,
      icon: Gauge,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Communication",
      value: communication,
      icon: Mic,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Technical",
      value: technical,
      icon: Brain,
      color: "from-purple-400 to-fuchsia-500",
    },
    {
      title: "Problem Solving",
      value: problemSolving,
      icon: Activity,
      color: "from-orange-400 to-red-500",
    },
    {
      title: "Vocabulary",
      value: vocabulary,
      icon: BookOpen,
      color: "from-pink-400 to-rose-500",
    },
    {
      title: "Clarity",
      value: clarity,
      icon: Sparkles,
      color: "from-yellow-400 to-amber-500",
    },
  ];

  function recommendation() {
    if (technical < 70)
      return "Explain concepts with more technical depth.";

    if (confidence < 70)
      return "Speak more confidently.";

    if (communication < 70)
      return "Structure your answers better.";

    if (clarity < 70)
      return "Keep your explanation clearer.";

    return "Excellent answer. Keep going!";
  }

  function interviewLevel() {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
    >
      <h2 className="mb-6 text-2xl font-bold">
        AI Live Analysis
      </h2>

      <div className="space-y-5">

        {stats.map((item) => {

          const Icon = item.icon;

          return (
            <div key={item.title}>

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <Icon className="h-5 w-5 text-cyan-400" />

                  <span>{item.title}</span>

                </div>

                <span className="font-bold">

                  {item.value}%

                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${item.value}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                />

              </div>

            </div>
          );

        })}

      </div>

      <div className="mt-8 space-y-4 rounded-2xl bg-zinc-800 p-5">

        <div className="flex justify-between">

          <span className="text-zinc-400">
            Interview Rating
          </span>

          <span className="font-bold text-cyan-400">

            {interviewLevel()}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-zinc-400">
            Difficulty
          </span>

          <span className="font-bold text-yellow-400">

            {difficulty}

          </span>

        </div>

        <div>

          <p className="mb-2 text-zinc-400">

            AI Recommendation

          </p>

          <div className="rounded-xl bg-zinc-900 p-4 text-sm leading-7">

            {recommendation()}

          </div>

        </div>

      </div>

    </motion.div>
  );
}