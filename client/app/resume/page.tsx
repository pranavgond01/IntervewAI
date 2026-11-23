"use client";

import ResumeUploader from "@/components/resume/ResumeUploader";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-8 py-20 text-white">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-12 text-5xl font-black">
          Resume Analysis
        </h1>

        <ResumeUploader />

      </div>

    </main>
  );
}