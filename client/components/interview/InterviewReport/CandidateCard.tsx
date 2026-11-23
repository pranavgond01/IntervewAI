"use client";

import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  Calendar,
  Clock3,
} from "lucide-react";

type Props = {
  candidate?: string;
  role: string;
  difficulty: string;
  startedAt: string;
  completedAt: string;
};

export default function CandidateCard({
  candidate = "Candidate",
  role,
  difficulty,
  startedAt,
  completedAt,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-cyan-950/30 p-8 shadow-2xl"
    >
      <div className="flex items-center gap-6">

        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-5xl font-black shadow-xl">
          {candidate.charAt(0).toUpperCase()}
        </div>

        <div className="space-y-2">

          <h1 className="text-5xl font-black">
            {candidate}
          </h1>

          <div className="flex items-center gap-2 text-zinc-400">
            <Briefcase size={18}/>
            {role}
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <User size={18}/>
            {difficulty}
          </div>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-5">

        <div className="rounded-2xl bg-zinc-800 p-5">

          <div className="flex items-center gap-2 text-cyan-400">

            <Calendar size={18}/>

            Interview Started

          </div>

          <p className="mt-3 text-lg">
            {new Date(startedAt).toLocaleString()}
          </p>

        </div>

        <div className="rounded-2xl bg-zinc-800 p-5">

          <div className="flex items-center gap-2 text-green-400">

            <Clock3 size={18}/>

            Interview Finished

          </div>

          <p className="mt-3 text-lg">
            {new Date(completedAt).toLocaleString()}
          </p>

        </div>

      </div>

    </motion.div>
  );
}