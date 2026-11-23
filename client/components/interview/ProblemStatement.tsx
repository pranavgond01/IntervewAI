"use client";

import { motion } from "framer-motion";
import {
  Code2,
  CircleDot,
  Tag,
} from "lucide-react";

type Props = {
  title: string;
  difficulty: string;
  type: string;
  description: string;
};

export default function ProblemStatement({
  title,
  difficulty,
  type,
  description,
}: Props) {
  const difficultyColor = () => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";

      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";

      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";

      default:
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl"
    >
      <div className="mb-6 flex items-center justify-between">

        <div>

          <div className="mb-3 flex items-center gap-3">

            <Code2 className="h-7 w-7 text-cyan-400" />

            <h2 className="text-3xl font-bold">
              {title}
            </h2>

          </div>

          <div className="flex gap-3">

            <div
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${difficultyColor()}`}
            >
              {difficulty}
            </div>

            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">

              <Tag className="mr-2 inline h-4 w-4" />

              {type}

            </div>

          </div>

        </div>

        <CircleDot className="h-8 w-8 text-green-400" />

      </div>

      <div className="rounded-2xl border border-zinc-700 bg-zinc-950 p-6">

        <h3 className="mb-4 text-lg font-bold text-cyan-400">
          Problem Statement
        </h3>

        <p className="whitespace-pre-line leading-8 text-zinc-300">
          {description}
        </p>

      </div>
    </motion.div>
  );
}