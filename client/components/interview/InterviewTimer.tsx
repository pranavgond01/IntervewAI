"use client";

import { useEffect, useState } from "react";

interface Props {
  minutes: number;
}

export default function InterviewTimer({
  minutes,
}: Props) {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
      <p className="text-zinc-400">
        Time Remaining
      </p>

      <h2 className="mt-3 text-4xl font-bold text-cyan-400">
        {String(mins).padStart(2, "0")}:
        {String(secs).padStart(2, "0")}
      </h2>
    </div>
  );
}