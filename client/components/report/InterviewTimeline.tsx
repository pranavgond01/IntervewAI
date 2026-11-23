interface Props {
  report: any;
}

export default function InterviewTimeline({
  report,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">
        Interview Timeline
      </h2>

      <div className="space-y-6">

        {report.questions.map(
          (question: any, index: number) => {

            const score =
              report.scores[index] ?? 0;

            const difficulty =
              question.difficulty ?? "Easy";

            const color =
              difficulty === "Hard"
                ? "bg-red-500"
                : difficulty === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500";

            return (

              <div
                key={index}
                className="flex items-start gap-5"
              >

                <div
                  className={`mt-1 h-5 w-5 rounded-full ${color}`}
                />

                <div className="flex-1 rounded-2xl bg-zinc-800 p-5">

                  <div className="flex items-center justify-between">

                    <h3 className="text-xl font-bold">

                      Question {index + 1}

                    </h3>

                    <div className="flex gap-3">

                      <span className="rounded-full bg-zinc-700 px-3 py-1 text-sm">

                        {difficulty}

                      </span>

                      <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-300">

                        {score}/100

                      </span>

                    </div>

                  </div>

                  <p className="mt-4 text-zinc-300">

                    {question.text}

                  </p>

                  <div className="mt-5">

                    <div className="h-2 rounded-full bg-zinc-700">

                      <div
                        className="h-full rounded-full bg-cyan-500"
                        style={{
                          width: `${score}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            );

          },
        )}

      </div>

    </div>
  );
}