"use client";

import {
  Play,
  CheckCircle2,
  RotateCcw,
  Save,
  Settings,
  Terminal,
} from "lucide-react";

type Props = {
  onRun?: () => void;

  onSubmit?: () => void;

  onReset?: () => void;

  onSave?: () => void;

  running?: boolean;

  submitting?: boolean;
};

export default function CodeToolbar({
  onRun,
  onSubmit,
  onReset,
  onSave,
  running = false,
  submitting = false,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-4 shadow-lg">

      <div className="flex items-center gap-3">

        <Terminal className="h-5 w-5 text-cyan-400" />

        <span className="font-semibold text-white">

          VS Code Workspace

        </span>

        <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">

          Ready

        </div>

      </div>

      <div className="flex flex-wrap items-center gap-3">

        <button
          onClick={onRun}
          disabled={running}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
        >
          <Play size={18} />

          {running ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={onSubmit}
          disabled={submitting}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold transition hover:bg-green-500 disabled:opacity-50"
        >
          <CheckCircle2 size={18} />

          {submitting
            ? "Submitting..."
            : "Submit"}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 font-semibold transition hover:bg-zinc-700"
        >
          <RotateCcw size={18} />

          Reset
        </button>

        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 font-semibold transition hover:bg-zinc-700"
        >
          <Save size={18} />

          Save Draft
        </button>

        <button
          className="rounded-xl bg-zinc-800 p-3 transition hover:bg-zinc-700"
        >
          <Settings size={20} />
        </button>

      </div>

    </div>
  );
}