"use client";

interface Props {
  current: number;
  total: number;
}

export default function InterviewProgress({
  current,
  total,
}: Props) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-zinc-400">
        <span>
          Question {current} / {total}
        </span>

        <span>
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}