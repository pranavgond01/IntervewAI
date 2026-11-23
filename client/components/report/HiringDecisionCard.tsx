"use client";

import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Briefcase,
  Building2,
  BadgeDollarSign,
  UserCheck,
} from "lucide-react";

type Props = {
  decision?: string;
  confidence?: number;
  summary?: string;
  companies?: string[];
  salary?: string;
};

export default function HiringDecisionCard({
  decision = "No Decision",
  confidence = 0,
  summary = "",
  companies = [],
  salary = "",
}: Props) {
  const latestDecision =
  Array.isArray(decision)
    ? decision[decision.length - 1] || "No Decision"
    : decision || "No Decision";

const positive =
  latestDecision
    .toLowerCase()
    .includes("hire");

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">

      <div className="flex items-center gap-4">

        <div
          className={`rounded-2xl p-4 ${
            positive
              ? "bg-green-500/20"
              : "bg-red-500/20"
          }`}
        >
          {positive ? (
            <CheckCircle2
              className="text-green-400"
              size={34}
            />
          ) : (
            <XCircle
              className="text-red-400"
              size={34}
            />
          )}
        </div>

        <div>

          <h2 className="text-3xl font-bold">
            AI Hiring Decision
          </h2>

          <p className="text-zinc-400">
            Recruiter Simulation
          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">

        <div className="rounded-2xl bg-zinc-800 p-5">

          <p className="text-zinc-400">
            Verdict
          </p>

          <h3
            className={`mt-3 text-4xl font-bold ${
              positive
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {decision}
          </h3>

        </div>

        <div className="rounded-2xl bg-zinc-800 p-5">

          <p className="text-zinc-400">
            Hiring Confidence
          </p>

          <h3 className="mt-3 text-4xl font-bold text-cyan-400">
            {confidence}%
          </h3>

        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-zinc-800 p-6">

        <div className="mb-3 flex items-center gap-2">

          <UserCheck className="text-cyan-400"/>

          <h3 className="text-xl font-bold">
            Recruiter Summary
          </h3>

        </div>

        <p className="leading-8 text-zinc-300">
          {summary}
        </p>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-zinc-800 p-6">

          <div className="mb-4 flex items-center gap-2">

            <Building2 className="text-purple-400"/>

            <h3 className="font-bold">
              Recommended Companies
            </h3>

          </div>

          <div className="flex flex-wrap gap-3">

            {companies.length ? (
              companies.map((company,index)=>(
                <span
                  key={index}
                  className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-400"
                >
                  {company}
                </span>
              ))
            ) : (
              <span className="text-zinc-500">
                No recommendation
              </span>
            )}

          </div>

        </div>

        <div className="rounded-2xl bg-zinc-800 p-6">

          <div className="mb-4 flex items-center gap-2">

            <BadgeDollarSign className="text-green-400"/>

            <h3 className="font-bold">
              Expected Salary
            </h3>

          </div>

          <div className="text-3xl font-bold text-green-400">

            {salary || "--"}

          </div>

        </div>

      </div>

    </div>
  );
}