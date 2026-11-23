"use client";

interface Props {
  company: string;
  role: string;
  question: number;
  totalQuestions: number;
  difficulty: string;
}

export default function InterviewHeader({
  company,
  role,
  question,
  totalQuestions,
  difficulty,
}: Props) {
  const percentage =
    (question / totalQuestions) * 100;

  return (
    <div className="mb-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <div className="mb-2 flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-2xl">

              🤖

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                {company}

              </h1>

              <p className="text-zinc-400">

                AI Mock Interview

              </p>

            </div>

          </div>

          <h2 className="mt-6 text-4xl font-bold">

            {role}

          </h2>

          <div className="mt-3 flex gap-3">

            <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-400">

              {difficulty}

            </span>

            <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm">

              Question {question}/{totalQuestions}

            </span>

          </div>

        </div>

        <div className="text-right">

          <h3 className="text-zinc-400">

            Progress

          </h3>

          <p className="mt-2 text-5xl font-bold text-cyan-400">

            {Math.round(percentage)}%

          </p>

        </div>

      </div>

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-zinc-800">

        <div
          style={{
            width: `${percentage}%`,
          }}
          className="h-full rounded-full bg-cyan-500 transition-all duration-500"
        />

      </div>

    </div>
  );
}