"use client";

import ScoreCircle from "./ScoreCircle";

type Props = {
  report: any;
};

export default function ScoreCard({
  report,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <ScoreCircle
        title="Overall"
        value={report.overallScore}
        color="#22c55e"
      />

      <ScoreCircle
        title="Technical"
        value={report.technical}
        color="#06b6d4"
      />

      <ScoreCircle
        title="Communication"
        value={report.communication}
        color="#8b5cf6"
      />

      <ScoreCircle
        title="Problem Solving"
        value={report.problemSolving}
        color="#f59e0b"
      />

      <ScoreCircle
        title="Confidence"
        value={report.confidence}
        color="#ec4899"
      />

      <ScoreCircle
        title="Clarity"
        value={report.clarity}
        color="#14b8a6"
      />

      <ScoreCircle
        title="Fluency"
        value={report.fluency}
        color="#3b82f6"
      />

      <ScoreCircle
        title="Vocabulary"
        value={report.vocabulary}
        color="#ef4444"
      />

    </div>
  );
}