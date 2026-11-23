"use client";

import { motion } from "framer-motion";

import {
  User,
  Clock3,
  Trophy,
  CheckCircle2,
  SkipForward,
  Circle,
  Brain,
  Mic,
  Gauge,
  Activity,
} from "lucide-react";

type Props = {

  candidate?: string;

  role?: string;

  company?: string;

  elapsed: number;

  secondsLeft: number;

  currentQuestion: number;


  
  totalQuestions: number;

  answered: number;

  words?: number;
  characters?: number;

  skipped: number;

  score: number;

  confidence?: number;

  communication?: number;

  technical?: number;

  problemSolving?: number;
  violations: number;
  violationReason: string;
  lastViolation?: string;

};

export default function InterviewSidebar({

  candidate = "John",

  role = "Frontend Developer",

  company = "Google",

  elapsed,

  secondsLeft,

  currentQuestion,

  totalQuestions,

  answered,

  skipped,

  score,

  confidence = 94,

  communication = 92,

  technical = 95,

  problemSolving = 90,
  words = 0,
  characters = 0,
  violations,
  violationReason,
}: Props) {

const remaining =
totalQuestions -
answered -
skipped;

const progress =
(currentQuestion /
totalQuestions) *
100;

const elapsedMin =
Math.floor(elapsed / 60);

const elapsedSec =
elapsed % 60;

const questionMin =
Math.floor(secondsLeft / 60);

const questionSec =
secondsLeft % 60;

const stats = [

{

title:"Communication",

value:communication,

icon:Mic,

color:"text-cyan-400",

},

{

title:"Technical",

value:technical,

icon:Brain,

color:"text-green-400",

},

{

title:"Problem Solving",

value:problemSolving,

icon:Activity,

color:"text-yellow-400",

},

{

title:"Confidence",

value:confidence,

icon:Gauge,

color:"text-pink-400",

},

];
  return (

    <div className="space-y-6">

      {/* Candidate Card */}

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
      >

        <div className="mb-5 flex items-center gap-3">

          <User className="h-5 w-5 text-cyan-400" />

          <h2 className="text-xl font-bold">

            Candidate

          </h2>

        </div>

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-3xl font-bold text-black">

            {(candidate || "J").charAt(0).toUpperCase()}

          </div>

          <div>

            <h3 className="text-xl font-bold">

              {candidate}

            </h3>

            <p className="text-zinc-400">

              {role}

            </p>

            <p className="mt-1 text-sm text-cyan-400">

              {company}

            </p>

          </div>

        </div>

      </motion.div>

      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
  <div className="space-y-2">
  <p className="text-red-400 text-sm">
    Violations: {violations}
  </p>
</div>





</div>

      {/* Timer */}

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
      >

        <div className="mb-6 flex items-center gap-3">

          <Clock3 className="text-cyan-400" />

          <h2 className="text-xl font-bold">

            Interview Timer

          </h2>

        </div>

        <div className="space-y-6">

          <div>

            <p className="mb-2 text-sm text-zinc-400">

              Elapsed

            </p>

            <p className="text-5xl font-bold text-white">

              {String(elapsedMin).padStart(2, "0")}:

              {String(elapsedSec).padStart(2, "0")}

            </p>

          </div>

          <div>

            <p className="mb-2 text-sm text-zinc-400">

              Question Time Left

            </p>

            <p className="text-4xl font-bold text-cyan-400">

              {String(questionMin).padStart(2, "0")}:

              {String(questionSec).padStart(2, "0")}

            </p>

          </div>

        </div>

      </motion.div>

      {/* Progress */}

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
      >

        <h2 className="mb-6 text-2xl font-bold">

          Progress

        </h2>

        <div className="mb-3 flex justify-between">

          <span>

            Question

          </span>

          <span className="font-bold">

            {currentQuestion}/{totalQuestions}

          </span>

        </div>

        

        <div className="mb-8 h-3 overflow-hidden rounded-full bg-zinc-800">

          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            className="h-full rounded-full bg-cyan-500"
          />

        </div>

        <div className="grid grid-cols-3 gap-3">

          <div className="rounded-2xl bg-zinc-800 p-4 text-center">

            <CheckCircle2 className="mx-auto mb-2 text-green-400" />

            <p className="text-3xl font-bold">

              {answered}

            </p>

            <p className="text-xs text-zinc-400">

              Answered

            </p>

          </div>

          <div className="rounded-2xl bg-zinc-800 p-4 text-center">

            <SkipForward className="mx-auto mb-2 text-yellow-400" />

            <p className="text-3xl font-bold">

              {skipped}

            </p>

            <p className="text-xs text-zinc-400">

              Skipped

            </p>

          </div>

          <div className="rounded-2xl bg-zinc-800 p-4 text-center">

            <Circle className="mx-auto mb-2 text-cyan-400" />

            <p className="text-3xl font-bold">

              {remaining}

            </p>

            <p className="text-xs text-zinc-400">

              Remaining

            </p>

          </div>

        </div>

      </motion.div>

      

      {/* Overall Score */}

      <motion.div
        initial={{
          opacity: 0,
          x: 30,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.4,
        }}
        className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
      >

        <h2 className="mb-6 text-2xl font-bold">

          Overall Score

        </h2>

        <div className="flex justify-center">

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="flex h-36 w-36 items-center justify-center rounded-full border-8 border-cyan-500 bg-zinc-950"
          >

            <span className="text-5xl font-extrabold text-cyan-400">

              {score}

            </span>

          </motion.div>

        </div>

      </motion.div>

      {/* Interview Health */}

      <motion.div
        initial={{
          opacity: 0,
          x: 30,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.5,
        }}
        className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl"
      >

        <h2 className="mb-6 text-2xl font-bold">

          Interview Health

        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <span className="text-zinc-400">

              Speaking Speed

            </span>

            <span className="font-semibold text-green-400">

              Normal

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-zinc-400">

              Confidence

            </span>

            <span className="font-semibold text-cyan-400">

              High

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-zinc-400">

              Grammar

            </span>

            <span className="font-semibold text-yellow-400">

              Good

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-zinc-400">

              AI Status

            </span>

            <span className="font-semibold text-green-400">

              Active

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-zinc-400">

              Connection

            </span>

            <span className="font-semibold text-cyan-400">

              Stable

            </span>

          </div>

        </div>

      </motion.div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

  <h2 className="mb-5 text-xl font-bold">

    Interview Statistics

  </h2>

  <div className="space-y-4">

  <div className="flex justify-between">
  <span>Words Spoken</span>
  <span>{words}</span>
</div>

<div className="flex justify-between">
  <span>Characters</span>
  <span>{characters}</span>
</div>

<div className="flex justify-between">
  <span>Confidence</span>
  <span>{confidence}%</span>
</div>

<div className="flex justify-between">
  <span>Score</span>
  <span>{score}</span>
</div>

  </div>

</div>


    </div>

  );

}