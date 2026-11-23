"use client";

import {
  Sparkles,
  Award,
} from "lucide-react";

type Props = {
  report: any;
};

export default function AISummaryCard({
  report,
}: Props) {
  const score =
    report.overallScore ?? 0;

  const hire =
    score >= 85
      ? "Strong Hire"
      : score >= 70
      ? "Hire"
      : score >= 50
      ? "Consider"
      : "Needs Improvement";

  const color =
    score >= 85
      ? "text-green-400"
      : score >= 70
      ? "text-cyan-400"
      : score >= 50
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 via-zinc-900 to-purple-900/20 p-10">

      <div className="flex items-center gap-3">

        <Sparkles className="text-cyan-400" />

        <h2 className="text-3xl font-bold">

          Sarah AI Executive Summary

        </h2>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <div>

          <div className="text-7xl font-black text-cyan-400">
            {score}
          </div>

          <div className="mt-3 text-zinc-400">
            Overall Performance
          </div>

        </div>

        <div>

          <div className="flex items-center gap-3">

            <Award
              className={color}
            />

            <span
              className={`text-4xl font-black ${color}`}
            >
              {hire}
            </span>

          </div>

          <p className="mt-6 whitespace-pre-wrap text-zinc-300 leading-8">

            {report.feedback}

          </p>

        </div>

      </div>

    </div>
  );
}