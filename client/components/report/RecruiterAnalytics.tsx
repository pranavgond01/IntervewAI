interface Props {
  report: any;
}

export default function RecruiterAnalytics({
  report,
}: Props) {

  const resumeMatch = Math.min(
    100,
    Math.round(
      report.overallScore * 0.9 +
      report.communication * 0.1
    )
  );

  const cultureFit = Math.round(
    (report.communication +
      report.confidence +
      report.clarity) / 3
  );

  const leadership = Math.round(
    (report.confidence +
      report.problemSolving) / 2
  );

  const dsa = Math.round(
    (report.technical +
      report.problemSolving) / 2
  );

  const systemDesign = Math.round(
    report.technical * 0.8
  );

  const risk =
    100 - report.overallScore;

  const cards = [

    {
      title: "ATS Resume Match",
      value: resumeMatch,
      color: "cyan",
    },

    {
      title: "Culture Fit",
      value: cultureFit,
      color: "green",
    },

    {
      title: "Leadership",
      value: leadership,
      color: "yellow",
    },

    {
      title: "DSA Readiness",
      value: dsa,
      color: "purple",
    },

    {
      title: "System Design",
      value: systemDesign,
      color: "orange",
    },

    {
      title: "Hiring Risk",
      value: risk,
      color: "red",
    },

  ];

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">

        AI Recruiter Dashboard

      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => (

          <div
            key={card.title}
            className="rounded-2xl bg-zinc-800 p-5"
          >

            <p className="text-zinc-400">

              {card.title}

            </p>

            <h2 className="mt-4 text-4xl font-black">

              {card.value}%

            </h2>

            <div className="mt-4 h-3 rounded-full bg-zinc-700">

              <div
                className="h-full rounded-full bg-cyan-500"
                style={{
                  width: `${card.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}