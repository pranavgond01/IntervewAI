"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

type Props = {
  resumeId: string;
};

export default function CreateInterviewForm({
  resumeId,
}: Props) {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] =
    useState("Medium");

  const [loading, setLoading] =
    useState(false);

  async function createInterview() {
    if (!role) {
      alert("Enter a role");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        "/interview/create",
        {
          resumeId,
          role,
          difficulty,
        },
      );

      router.push(
        `/interview/${data.interviewId}`,
      );
    } catch (err) {
      console.error(err);
      alert("Failed to create interview.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Interview Settings
      </h2>

      <input
        placeholder="Frontend Developer"
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        className="mb-5 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4"
      />

      <select
        value={difficulty}
        onChange={(e) =>
          setDifficulty(e.target.value)
        }
        className="mb-6 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button
        onClick={createInterview}
        disabled={loading}
        className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-white"
      >
        {loading
          ? "Creating..."
          : "Start Interview"}
      </button>

    </div>
  );
}