"use client";

export default function Roadmap({
  roadmap,
}: any) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-10 text-3xl font-bold">
        30-Day Roadmap
      </h2>

      <div className="space-y-8">

        {roadmap?.map(
          (
            week: any,
            index: number,
          ) => (
            <div
              key={index}
              className="rounded-2xl bg-zinc-800 p-6"
            >
              <div className="text-xl font-bold text-cyan-400">

                {week.week}

              </div>

              <div className="mt-2 text-2xl">

                {week.title}

              </div>

              <div className="mt-5 flex flex-wrap gap-3">

                {week.topics?.map(
                  (
                    topic: string,
                    i: number,
                  ) => (
                    <span
                      key={i}
                      className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300"
                    >
                      {topic}
                    </span>
                  ),
                )}

              </div>

            </div>
          ),
        )}

      </div>

    </div>
  );
}