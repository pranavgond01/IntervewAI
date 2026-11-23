"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;

  communication: number;

  technical: number;

  problemSolving: number;

  confidence: number;

  score: number;

  feedback: string;

  onFinish: () => void;
};

export default function EvaluationModal({
  open,
  communication,
  technical,
  problemSolving,
  confidence,
  score,
  feedback,
  onFinish,
}: Props) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!open) return;

    setDisplayScore(0);

    let current = 0;

    const interval = setInterval(() => {
      current++;

      setDisplayScore(current);

      if (current >= score) {
        clearInterval(interval);
      }
    }, 15);

    const timeout = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open]);

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >

          <motion.div
            initial={{
              scale: 0.85,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="w-full max-w-2xl rounded-3xl border border-cyan-500/30 bg-zinc-900 p-10 shadow-2xl"
          >

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500 text-4xl">

                🤖

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  Sarah

                </h2>

                <p className="text-zinc-400">

                  Interview Evaluation

                </p>

              </div>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">

              <ScoreCard
                title="Communication"
                score={communication}
              />

              <ScoreCard
                title="Technical"
                score={technical}
              />

              <ScoreCard
                title="Problem Solving"
                score={problemSolving}
              />

              <ScoreCard
                title="Confidence"
                score={confidence}
              />

            </div>

            <div className="mt-10 flex justify-center">

              <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[12px] border-cyan-500">

                <div className="text-center">

                  <div className="text-5xl font-bold">

                    {displayScore}

                  </div>

                  <div className="text-zinc-400">

                    Overall

                  </div>

                </div>

              </div>

            </div>

            <motion.div
              className="mt-10 rounded-2xl bg-zinc-800 p-6"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1,
              }}
            >

              <div className="mb-3 text-lg font-bold">

                Sarah says

              </div>

              <p className="leading-8 text-zinc-300">

                {feedback}

              </p>

            </motion.div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

function ScoreCard({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5"
    >

      <div className="mb-3 text-zinc-400">

        {title}

      </div>

      <div className="text-3xl font-bold text-cyan-400">

        {score}/10

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-700">

        <motion.div
          className="h-full bg-cyan-500"
          initial={{
            width: 0,
          }}
          animate={{
            width: `${score * 10}%`,
          }}
          transition={{
            duration: 1,
          }}
        />

      </div>

    </motion.div>
  );
}