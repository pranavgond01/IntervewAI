"use client";

interface Props {
  question: string;
  questionNo: number;
}

export default function QuestionCard({
  question,
  questionNo,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-zinc-900 shadow-xl">

      <div className="border-b border-zinc-800 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Current Question
            </h2>

            <p className="mt-1 text-zinc-400">
              Answer carefully. The AI will generate the next question based on your response.
            </p>

          </div>

          <div className="rounded-xl bg-cyan-500 px-5 py-3 text-lg font-bold text-black">

            Q{questionNo}

          </div>

        </div>

      </div>

      <div className="p-8">

        <div className="rounded-2xl bg-zinc-800 p-8">

          <p className="text-2xl leading-10">

            {question}

          </p>

        </div>

      </div>

    </div>
  );
}