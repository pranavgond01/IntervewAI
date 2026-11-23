interface Props {
  report: any;
}

export default function RecruiterOverview({
  report,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-5">

      <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6">
        <p className="text-zinc-400">Overall Score</p>

        <h2 className="mt-4 text-5xl font-black text-cyan-400">
          {report.overallScore}
        </h2>
      </div>

      <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6">
        <p className="text-zinc-400">
          Hiring Decision
        </p>

        <h2 className="mt-4 text-3xl font-bold">
          {report.hireDecision}
        </h2>
      </div>

      <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6">
        <p className="text-zinc-400">
          Hiring Confidence
        </p>

        <h2 className="mt-4 text-4xl font-bold text-green-400">
          {report.hiringConfidence}%
        </h2>
      </div>

      <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6">
        <p className="text-zinc-400">
          Expected Salary
        </p>

        <h2 className="mt-4 text-2xl font-bold">
          {report.expectedSalary}
        </h2>
      </div>

      <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6">
        <p className="text-zinc-400">
          Companies
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(report.recommendedCompanies || []).map(
            (company: string) => (
              <span
                key={company}
                className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300"
              >
                {company}
              </span>
            )
          )}
        </div>
      </div>

    </div>
  );
}