"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

interface Message {
  role: string;
  content: string;
}

interface Props {
  history: Message[];
}

export default function ConversationHistory({
  history,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold">
        Interview Transcript
      </h2>

      <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">

        {history.map((msg, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-4 ${
              msg.role === "assistant"
                ? "bg-cyan-500/10 border border-cyan-500/30"
                : "bg-zinc-800"
            }`}
          >

            <div className="mb-2 flex items-center gap-3">

              {msg.role === "assistant" ? (
                <>
                  <Bot className="text-cyan-400" />
                  <span className="font-bold text-cyan-400">
                    Sarah
                  </span>
                </>
              ) : (
                <>
                  <User className="text-green-400" />
                  <span className="font-bold text-green-400">
                    You
                  </span>
                </>
              )}

            </div>

            <p className="leading-7">
              {msg.content}
            </p>

          </motion.div>

        ))}

      </div>

    </div>
  );
}