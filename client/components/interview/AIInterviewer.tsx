"use client";

import { useEffect } from "react";

interface Props {
  company: string;
  question: string;
}

export default function AIInterviewer({
  company,
  question,
}: Props) {

  useEffect(() => {

    if (!question) return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(question);

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    const voices =
      window.speechSynthesis.getVoices();

    const englishVoice =
      voices.find((v) =>
        v.lang.startsWith("en"),
      );

    if (englishVoice) {
      speech.voice = englishVoice;
    }

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };

  }, [question]);

  return (

    <div className="rounded-3xl border border-cyan-500/20 bg-zinc-900 p-8 shadow-xl">

      <div className="flex items-center gap-5">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500 text-5xl">

          🤖

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            Emily

          </h2>

          <p className="text-zinc-400">

            Senior Interviewer

          </p>

          <p className="text-cyan-400">

            {company}

          </p>

        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-zinc-800 p-6">

        <div className="mb-3 flex items-center gap-2">

          <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

          <span className="text-sm text-green-400">

            AI Speaking

          </span>

        </div>

        <p className="text-xl leading-9">

          {question}

        </p>

      </div>

      <div className="mt-6 flex gap-4">

        <div className="rounded-xl bg-zinc-800 px-4 py-3">

          🎤 Voice Enabled

        </div>

        <div className="rounded-xl bg-zinc-800 px-4 py-3">

          🧠 Memory Enabled

        </div>

        <div className="rounded-xl bg-zinc-800 px-4 py-3">

          ⚡ AI Adaptive

        </div>

      </div>

    </div>

  );
}