"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

type Interview = {
_id: string;
role: string;
difficulty: string;
overallScore: number;
completed: boolean;
createdAt: string;
};

export default function HistoryPage() {
const [interviews, setInterviews] = useState<Interview[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
async function load() {
try {
const res = await api.get("/interview/history/all");
setInterviews(Array.isArray(res.data) ? res.data : []);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
}

 
load();
 

}, []);

return ( <main className="min-h-screen bg-[#050816] text-white"> <div className="mx-auto max-w-5xl px-6 py-10"> <div className="mb-8 flex items-center justify-between"> <h1 className="text-4xl font-black">Interview History</h1>

 
      <Link
        href="/dashboard"
        className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5"
      >
        Back to Dashboard
      </Link>
    </div>

    {loading ? (
      <p className="text-zinc-400">Loading interviews...</p>
    ) : interviews.length === 0 ? (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-zinc-400">
        No interviews found.
      </div>
    ) : (
      <div className="space-y-4">
        {interviews.map((interview) => (
          <Link
            key={interview._id}
            href={`/interview/${interview._id}/replay`}
            className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/10"
          >
            <div>
              <div className="text-xl font-semibold">{interview.role}</div>
              <div className="mt-1 text-sm text-zinc-400">
                {interview.difficulty} • {new Date(interview.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-black text-cyan-300">
                {interview.overallScore}%
              </div>
              <div className="text-sm text-zinc-400">
                {interview.completed ? "Completed" : "In Progress"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
</main>
 

);
}
