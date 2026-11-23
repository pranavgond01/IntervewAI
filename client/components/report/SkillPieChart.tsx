"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const colors = [
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

export default function SkillPieChart({
  report,
}: any) {

  const data = [
    {
      name: "Technical",
      value: report.technical,
    },
    {
      name: "Communication",
      value: report.communication,
    },
    {
      name: "Problem",
      value: report.problemSolving,
    },
    {
      name: "Confidence",
      value: report.confidence,
    },
    {
      name: "Clarity",
      value: report.clarity,
    },
    {
      name: "Fluency",
      value: report.fluency,
    },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">

        Skill Distribution

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >

            {data.map((_, index) => (

              <Cell
                key={index}
                fill={
                  colors[index]
                }
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}