interface Props {
  report: any;
}

export default function PerformanceInsights({
  report,
}: Props) {

  const scores = report.scores || [];

  const average =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (a: number, b: number) => a + b,
            0,
          ) / scores.length,
        )
      : 0;

  const highest =
    scores.length > 0
      ? Math.max(...scores)
      : 0;

  const lowest =
    scores.length > 0
      ? Math.min(...scores)
      : 0;

  const consistency =
    highest - lowest < 15
      ? "Excellent"

      : highest - lowest < 30

      ? "Good"

      : "Needs Improvement";

  const strongestSkill = [

    {
      name: "Communication",
      score: report.communication,
    },

    {
      name: "Technical",
      score: report.technical,
    },

    {
      name: "Problem Solving",
      score: report.problemSolving,
    },

    {
      name: "Confidence",
      score: report.confidence,
    },

    {
      name: "Clarity",
      score: report.clarity,
    },

    {
      name: "Vocabulary",
      score: report.vocabulary,
    },

  ].sort(
    (a, b) => b.score - a.score,
  );

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">

        AI Performance Insights

      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <InsightCard
          title="Average Score"
          value={`${average}%`}
        />

        <InsightCard
          title="Highest Score"
          value={`${highest}%`}
        />

        <InsightCard
          title="Lowest Score"
          value={`${lowest}%`}
        />

        <InsightCard
          title="Consistency"
          value={consistency}
        />

      </div>

      <div className="mt-10">

        <h3 className="mb-5 text-xl font-bold">

          Top Skills

        </h3>

        <div className="space-y-5">

          {strongestSkill
            .slice(0, 3)
            .map((skill) => (

              <div key={skill.name}>

                <div className="mb-2 flex justify-between">

                  <span>

                    {skill.name}

                  </span>

                  <span>

                    {skill.score}%

                  </span>

                </div>

                <div className="h-3 rounded-full bg-zinc-800">

                  <div
                    className="h-full rounded-full bg-cyan-500"
                    style={{
                      width: `${skill.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>

  );

}

function InsightCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (

    <div className="rounded-2xl bg-zinc-800 p-6">

      <p className="text-zinc-400">

        {title}

      </p>

      <h2 className="mt-3 text-4xl font-black">

        {value}

      </h2>

    </div>

  );

}