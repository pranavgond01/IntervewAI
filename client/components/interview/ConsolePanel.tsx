"use client";

import { Terminal } from "lucide-react";

type Props = {
  output?: string;

  error?: string;

  executionTime?: string;

  memory?: string;

  input?: string;
};

export default function ConsolePanel({
  output = "Run your code to see the output.",
  error = "",
  executionTime = "--",
  memory = "--",
  input = "",
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-5 py-3">

        <div className="flex items-center gap-3">

          <Terminal className="h-5 w-5 text-cyan-400" />

          <h2 className="font-bold text-white">
            Console
          </h2>

        </div>

        <div className="flex gap-6 text-sm">

          <div>
            <span className="text-zinc-500">
              Time
            </span>

            <span className="ml-2 font-semibold text-green-400">
              {executionTime}
            </span>
          </div>

          <div>
            <span className="text-zinc-500">
              Memory
            </span>

            <span className="ml-2 font-semibold text-cyan-400">
              {memory}
            </span>
          </div>

        </div>

      </div>

      {/* Input */}

      <div className="border-b border-zinc-800 p-5">

        <p className="mb-2 font-semibold text-cyan-400">
          Custom Input
        </p>

        <div className="rounded-xl bg-zinc-900 p-4 font-mono text-sm text-zinc-300">

          {input || "No custom input"}

        </div>

      </div>

      {/* Output */}

      <div className="border-b border-zinc-800 p-5">

        <p className="mb-2 font-semibold text-green-400">
          Output
        </p>

        <pre className="min-h-[120px] rounded-xl bg-black p-4 font-mono text-sm text-green-300 overflow-auto whitespace-pre-wrap">

{output}

        </pre>

      </div>

      {/* Errors */}

      <div className="p-5">

        <p className="mb-2 font-semibold text-red-400">
          Errors
        </p>

        <pre className="min-h-[90px] rounded-xl bg-black p-4 font-mono text-sm text-red-300 overflow-auto whitespace-pre-wrap">

{error || "No Errors"}

        </pre>

      </div>

    </div>
  );
}