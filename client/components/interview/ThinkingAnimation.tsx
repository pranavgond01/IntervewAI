"use client";

import { motion } from "framer-motion";

type Props = {
  visible: boolean;
};

export default function ThinkingAnimation({
  visible,
}: Props) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div className="w-full max-w-xl rounded-3xl border border-cyan-500/30 bg-zinc-900 p-10">

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500 text-3xl">
            🤖
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Sarah
            </h2>

            <p className="text-zinc-400">
              Senior Software Engineer
            </p>

          </div>

        </div>

        <div className="mt-10 space-y-7">

          <div>

            <h3 className="mb-3 text-xl font-bold">
              AI is analysing your answer...
            </h3>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

              <motion.div
                className="h-full bg-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2.5,
                }}
              />

            </div>

          </div>

          <div className="space-y-5">

            <ThinkingRow
              label="Communication Skills"
            />

            <ThinkingRow
              label="Technical Knowledge"
            />

            <ThinkingRow
              label="Problem Solving"
            />

            <ThinkingRow
              label="Generating next question"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

function ThinkingRow({
  label,
}: {
  label: string;
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between">

        <span>{label}</span>

        <span>...</span>

      </div>

      <motion.div
        className="h-2 rounded-full bg-cyan-500"
        initial={{
          width: "0%",
        }}
        animate={{
          width: "100%",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

    </div>
  );
}