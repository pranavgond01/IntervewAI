"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import VoiceRecorder from "@/components/interview/VoiceRecorder";

export default function InterviewPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [progress, setProgress] = useState(1);
  const [completed, setCompleted] = useState(false);

  async function loadInterview() {
    try {
      const { data } = await api.get(`/interview/${id}`);

      if (data.questions.length > 0) {
        setQuestion(data.questions[data.questions.length - 1]);
      }

      setProgress(data.currentQuestion);
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!answer.trim()) return;

    const { data } = await api.post(
      `/interview/${id}/answer`,
      {
        answer,
      },
    );

    if (data.completed) {
      setCompleted(true);
      return;
    }

    setQuestion(data.nextQuestion);
    setAnswer("");
    setProgress(progress + 1);
  }

  useEffect(() => {
    loadInterview();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading Interview...
      </div>
    );

  if (completed)
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Interview Completed 🎉
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl p-10">

      <div className="mb-8">

        <div className="flex justify-between">

          <h1 className="text-3xl font-bold">
            AI Interview
          </h1>

          <span>
            Question {progress}/10
          </span>

        </div>

        <div className="mt-3 h-3 rounded-full bg-zinc-800">

          <div
            className="h-full rounded-full bg-cyan-500 transition-all"
            style={{
              width: `${progress * 10}%`,
            }}
          />

        </div>

      </div>

      <div className="rounded-2xl bg-zinc-900 p-8">

        <h2 className="mb-6 text-xl font-semibold">
          {question}
        </h2>

        <textarea
            rows={10}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none"
            placeholder="Speak or type your answer..."
            />
        <VoiceRecorder
            value={answer}
            onChange={(text) => setAnswer(text)}
            />

        <button
          onClick={submitAnswer}
          className="mt-6 rounded-xl bg-cyan-500 px-8 py-3 font-semibold"
        >
          Submit Answer
        </button>

      </div>

    </div>
  );
}