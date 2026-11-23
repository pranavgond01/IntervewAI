"use client";

import { XCircle } from "lucide-react";

export default function MissingSkills({
  skills,
}: any) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">

        Missing Skills

      </h2>

      <div className="flex flex-wrap gap-4">

        {skills?.map(
          (
            skill: string,
            index: number,
          ) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-full bg-red-500/15 px-5 py-3 text-red-300"
            >
              <XCircle size={18} />
              {skill}
            </div>
          ),
        )}

      </div>

    </div>
  );
}