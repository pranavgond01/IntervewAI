"use client";

type Props = {
  readiness: number;
};

export default function ReadinessMeter({
  readiness,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">
        Interview Readiness
      </h2>

      <div className="h-7 overflow-hidden rounded-full bg-zinc-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
          style={{
            width: `${readiness}%`,
          }}
        />

      </div>

      <div className="mt-6 text-center">

        <div className="text-6xl font-black text-cyan-400">
          {readiness}%
        </div>

        <p className="mt-2 text-zinc-400">
          Ready for Interviews
        </p>

      </div>

    </div>
  );
}