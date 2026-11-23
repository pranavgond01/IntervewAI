"use client";

import { Building2 } from "lucide-react";

export default function Companies({
  companies,
}: any) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">

        Best Matching Companies

      </h2>

      <div className="flex flex-wrap gap-4">

        {companies?.map(
          (
            company: string,
            index: number,
          ) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-full bg-cyan-500/20 px-6 py-3"
            >
              <Building2 size={18} />

              {company}

            </div>
          ),
        )}

      </div>

    </div>
  );
}