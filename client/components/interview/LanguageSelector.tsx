"use client";

import {
  ChevronDown,
} from "lucide-react";

type Props = {
  language: string;

  onChange: (
    language: string,
  ) => void;
};

const languages = [
  {
    name: "Java",
    icon: "☕",
  },
  {
    name: "Python",
    icon: "🐍",
  },
  {
    name: "C++",
    icon: "⚙️",
  },
  {
    name: "JavaScript",
    icon: "🟨",
  },
  {
    name: "TypeScript",
    icon: "🔷",
  },
  {
    name: "C#",
    icon: "💜",
  },
  {
    name: "Go",
    icon: "🐹",
  },
  {
    name: "Rust",
    icon: "🦀",
  },
];

export default function LanguageSelector({
  language,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-3">

      <span className="text-sm font-semibold text-zinc-400">

        Language

      </span>

      <div className="relative">

        <select
          value={language}
          onChange={(e) =>
            onChange(
              e.target.value,
            )
          }
          className="appearance-none rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 pr-10 font-semibold text-white outline-none transition hover:border-cyan-500 focus:border-cyan-500"
        >
          {languages.map(
            (lang) => (
              <option
                key={lang.name}
                value={lang.name}
              >
                {lang.icon} {lang.name}
              </option>
            ),
          )}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

      </div>

    </div>
  );
}