"use client";

import { motion } from "framer-motion";
import { Brain, Mic, Activity } from "lucide-react";

const messages = [
{
role: "ai",
text: "Welcome! Let's begin with a frontend question.",
},
{
role: "ai",
text: "Explain the difference between null and undefined in JavaScript.",
},
{
role: "user",
text: "Null is an intentional absence of value, while undefined means a variable hasn't been assigned yet...",
},
{
role: "ai",
text: "Great answer. Can you provide a practical example?",
},
];

export default function AIInterviewExperience() {
return ( <section className="px-6 py-24"> <div className="mx-auto max-w-7xl"> <div className="mb-14 text-center"> <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
Live Interview Experience </div>

 
      <h2 className="text-4xl font-black md:text-5xl">
        Meet Your AI Recruiter
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
        Experience a realistic interview with an AI recruiter that asks
        adaptive questions, listens to your answers, and evaluates your
        performance in real time.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 rgba(34,211,238,0.15)",
                "0 0 40px rgba(34,211,238,0.35)",
                "0 0 0 rgba(34,211,238,0.15)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-40 w-40 items-center justify-center rounded-full bg-cyan-400/20 ring-1 ring-cyan-400/30"
          >
            <Brain className="h-16 w-16 text-cyan-300" />
          </motion.div>

          <h3 className="mt-6 text-3xl font-bold">Sarah AI</h3>
          <p className="text-cyan-300">
            Senior Frontend Interviewer
          </p>

          <div className="mt-8 w-full rounded-3xl border border-white/10 bg-[#0b1220] p-5">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <Mic size={18} />
              Voice Activity
            </div>

            <div className="flex h-14 items-end justify-center gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [10, 28, 14, 34, 12],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.04,
                  }}
                  className="w-1 rounded-full bg-cyan-400"
                />
              ))}
            </div>

            <div className="mt-3 text-sm text-zinc-400">
              Listening and transcribing in real time
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Interview Timeline</h3>

          <div className="flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
            <Activity size={14} />
            Live
          </div>
        </div>

        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: message.role === "ai" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`rounded-3xl p-5 ${
                message.role === "ai"
                  ? "border border-cyan-400/20 bg-cyan-400/10"
                  : "border border-white/10 bg-[#0b1220]"
              }`}
            >
              <div className="mb-2 text-sm font-semibold">
                {message.role === "ai" ? "Sarah AI" : "You"}
              </div>

              <p className="leading-8 text-zinc-200">{message.text}</p>
            </motion.div>
          ))}

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <div className="mb-2 text-sm font-semibold text-cyan-300">
              AI Typing...
            </div>

            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                  className="h-2.5 w-2.5 rounded-full bg-cyan-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 

);
}
