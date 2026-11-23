"use client";

import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
  title: string;
  items: string[];
};

export default function StrengthWeaknessCard({
  title,
  items,
}: Props) {
  const isStrength = title.toLowerCase().includes("strength");

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      <div className="space-y-4">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl bg-zinc-800 p-4"
            >
              {isStrength ? (
                <CheckCircle2
                  className="mt-1 text-green-400"
                  size={20}
                />
              ) : (
                <XCircle
                  className="mt-1 text-red-400"
                  size={20}
                />
              )}

              <p>{item}</p>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">No data available.</p>
        )}
      </div>
    </div>
  );
}