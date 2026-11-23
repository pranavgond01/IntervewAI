"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";

import Lottie from "lottie-react";

import {
  Brain,
  Mic,
  Volume2,
  Sparkles,
} from "lucide-react";

import SarahAnimation from "@/public/lottie/ai motion.json";

type Props = {
  speaking: boolean;
  listening: boolean;
  thinking: boolean;
};

export default function AIAvatar({
  speaking,
  listening,
  thinking,
}: Props) {

  const status = useMemo(() => {

    if (thinking) {
      return {
        text: "Sarah is analyzing your answer...",
        color:
          "from-yellow-400 to-orange-500",
      };
    }

    if (speaking) {
      return {
        text: "Sarah is asking a question...",
        color:
          "from-cyan-400 to-blue-500",
      };
    }

    if (listening) {
      return {
        text: "Sarah is listening carefully...",
        color:
          "from-green-400 to-emerald-500",
      };
    }

    return {
      text: "Sarah is ready.",
      color:
        "from-zinc-500 to-zinc-700",
    };

  }, [
    speaking,
    listening,
    thinking,
  ]);

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.6,
      }}

      className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-zinc-900 shadow-2xl"

    >
          <div className="relative overflow-hidden">

        {/* Animated Background */}

        <motion.div
          animate={{
            rotate: speaking ? 360 : 0,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            rotate: speaking ? -360 : 0,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative flex flex-col items-center px-8 pt-10">

          {/* Avatar */}

          <div className="relative">

            {/* Speaking Glow */}

            <motion.div
              animate={{
                scale: speaking
                  ? [1, 1.12, 1]
                  : 1,

                opacity: speaking
                  ? [0.25, 0.8, 0.25]
                  : 0.25,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl"
            />

            {/* Outer Ring */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 18,
                ease: "linear",
              }}
              className="rounded-full border-4 border-cyan-500/40 p-3"
            >

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear",
                }}
                className="rounded-full border-2 border-cyan-300/40 p-3"
              >

                <motion.div
                  animate={{
                    scale: speaking
                      ? [1, 1.03, 1]
                      : 1,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                  }}
                  className="overflow-hidden rounded-full bg-zinc-950"
                >

                  <Lottie
                    animationData={SarahAnimation}
                    loop
                    autoplay
                    className="h-72 w-72"
                  />
                  <div className="mt-6 flex justify-center">

  <div
    className={`rounded-full px-5 py-2 text-sm font-semibold ${
      speaking
        ? "bg-cyan-500 text-black"
        : listening
        ? "bg-green-500 text-black"
        : thinking
        ? "bg-yellow-500 text-black"
        : "bg-zinc-800"
    }`}
  >

    {speaking
      ? "Sarah is Speaking..."
      : listening
      ? "Listening..."
      : thinking
      ? "Thinking..."
      : "Ready"}

  </div>

</div>

                </motion.div>

              </motion.div>

            </motion.div>

          </div>

          {/* AI Name */}

          <div className="mt-8 text-center">

            <h2 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-4xl font-extrabold text-transparent">

              Sarah AI

            </h2>

            <p className="mt-2 text-zinc-400">

              Senior Technical Interviewer

            </p>

          </div>

          {/* Status */}

          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className={`mt-8 rounded-2xl bg-gradient-to-r ${status.color} px-6 py-3 font-semibold text-black shadow-xl`}
          >

            {status.text}

          </motion.div>
                    {/* AI Modes */}

          <div className="mt-10 grid w-full grid-cols-3 gap-4">

            <motion.div
              animate={{
                scale: speaking ? [1, 1.05, 1] : 1,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className={`rounded-2xl p-4 text-center transition-all ${
                speaking
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/40"
                  : "bg-zinc-800"
              }`}
            >

              <Volume2 className="mx-auto mb-2" />

              <p className="text-sm font-bold">

                Speaking

              </p>

            </motion.div>

            <motion.div
              animate={{
                scale: listening ? [1, 1.05, 1] : 1,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className={`rounded-2xl p-4 text-center transition-all ${
                listening
                  ? "bg-green-500 text-black shadow-lg shadow-green-500/40"
                  : "bg-zinc-800"
              }`}
            >

              <Mic className="mx-auto mb-2" />

              <p className="text-sm font-bold">

                Listening

              </p>

            </motion.div>

            <motion.div
              animate={{
                scale: thinking ? [1, 1.05, 1] : 1,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className={`rounded-2xl p-4 text-center transition-all ${
                thinking
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/40"
                  : "bg-zinc-800"
              }`}
            >

              <Brain className="mx-auto mb-2" />

              <p className="text-sm font-bold">

                Thinking

              </p>

            </motion.div>

          </div>

          {/* Voice Wave */}

          <div className="mt-10 flex h-16 items-end justify-center gap-2">

            {Array.from({ length: 18 }).map((_, i) => (

              <motion.div
                key={i}
                animate={{
                  height: speaking
                    ? [10, 45, 20, 55, 12]
                    : 10,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.04,
                }}
                className="w-2 rounded-full bg-cyan-400"
              />

            ))}

          </div>

          {/* AI Skills */}

          <div className="mt-10 grid w-full gap-3">

            <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">

              <span>Technical Knowledge</span>

              <span className="font-bold text-green-400">

                100%

              </span>

            </div>

            <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">

              <span>Behavior Analysis</span>

              <span className="font-bold text-cyan-400">

                Active

              </span>

            </div>

            <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">

              <span>Speech Analysis</span>

              <span className="font-bold text-yellow-400">

                Live

              </span>

            </div>

            <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">

              <span>Emotion Detection</span>

              <span className="font-bold text-pink-400">

                Running

              </span>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-10 mb-10 rounded-2xl border border-cyan-500/20 bg-zinc-800/70 p-5">

            <div className="flex items-center gap-3">

              <Sparkles className="text-cyan-400" />

              <div>

                <h3 className="font-bold">

                  AI Interview Engine

                </h3>

                <p className="mt-1 text-sm text-zinc-400">

                  Sarah continuously evaluates your
                  communication, confidence,
                  technical depth, problem solving,
                  and reasoning to simulate a real
                  FAANG-style interview experience.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>

  );

}    