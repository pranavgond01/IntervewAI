"use client";

import CandidateProfileForm from "@/components/interview/CandidateProfileForm";

export default function InterviewSetupPage() {
  return (
    <main className="mx-auto max-w-7xl p-10">

      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Interview Setup
        </h1>

        <p className="mt-3 text-zinc-400 text-lg">
          Complete your profile before starting your AI Interview.
        </p>

      </div>

      <CandidateProfileForm />

    </main>
  );
}