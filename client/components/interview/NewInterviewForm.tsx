"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Resume {
  _id: string;
  originalName: string;
  role?: string;
  overallScore?: number;
}

export default function NewInterviewForm() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  const [resumeId, setResumeId] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {
  try {
    const res = await api.get("/resume/history");;

    console.log("========== RESUME RESPONSE ==========");
    console.log(res);
    console.log(res.data);

    setResumes(res.data);

    if (res.data.length > 0) {
      setResumeId(res.data[0]._id);

      if (res.data[0].role) {
        setRole(res.data[0].role);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

  async function startInterview() {
  try {
    setLoading(true);

    const res = await api.post("/interview/create", {
      resumeId,
      role,
      difficulty,
    });

    console.log("Create Interview Response:", res.data);

    if (!res.data.interviewId) {
      alert("Interview ID not returned from server.");
      return;
    }

    router.push(`/interview/${res.data.interviewId}`);
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.log(error.response.data);
    }

    alert("Failed to create interview.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="space-y-6">

      <div>
        <label className="mb-2 block font-semibold">
          Resume
        </label>

        <select
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
        >
          <option value="">
            Select Resume
          </option>

          {resumes.map((resume) => (
            <option
              key={resume._id}
              value={resume._id}
            >
              {resume.originalName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Job Role
        </label>

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Frontend Developer"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <button
        disabled={loading}
        onClick={startInterview}
        className="w-full rounded-xl bg-cyan-500 py-4 text-lg font-bold hover:bg-cyan-600 disabled:opacity-50"
      >
        {loading ? "Creating Interview..." : "Start Interview"}
      </button>

    </div>
  );
}