"use client";

import { Sparkles } from "lucide-react";

type Props = {
  recommendation: string;
  feedback: string;
};

export default function RecommendationCard({
  recommendation,
  feedback,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-6 flex items-center gap-3">

        <Sparkles className="text-yellow-400" />

        <h2 className="text-3xl font-bold">
          AI Recommendation
        </h2>

      </div>

      <div className="space-y-8">

        <div>

          <h3 className="mb-3 text-lg font-semibold text-cyan-400">
            Recommendation
          </h3>

          <div className="rounded-xl bg-zinc-800 p-5">
            {recommendation || "No recommendation generated."}
          </div>

        </div>

        <div>

          <h3 className="mb-3 text-lg font-semibold text-purple-400">
            Feedback
          </h3>

          <div className="rounded-xl bg-zinc-800 p-5 whitespace-pre-wrap">
            {feedback || "No feedback available."}
          </div>

        </div>

      </div>

    </div>
  );
}