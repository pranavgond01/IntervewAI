"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
};

export default function InterviewThinkingModal({
  open,
}: Props) {
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
              scale: 0.9,
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
              duration: 0.3,
            }}
            className="w-full max-w-lg rounded-3xl border border-cyan-500/30 bg-zinc-900 p-10 text-center shadow-2xl"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="mx-auto mb-8 h-20 w-20 rounded-full border-4 border-cyan-500 border-t-transparent"
            />

            <h2 className="text-3xl font-bold">
              Sarah is Thinking...
            </h2>

            <p className="mt-5 text-zinc-400">
              Evaluating your answer using AI,
              generating personalized feedback and
              preparing your next interview question.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}