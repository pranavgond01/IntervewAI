"use client";

export default function InterviewerAvatar() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">

      <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-cyan-500 text-6xl">
        🤖
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        InterviewAI
      </h2>

      <p className="mt-2 text-zinc-400">
        Senior Technical Interviewer
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">

        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"/>

        <span className="text-green-400">
          Listening
        </span>

      </div>

    </div>
  );
}
