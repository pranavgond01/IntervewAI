"use client";

import {
  Clock3,
  FileQuestion,
  Trophy,
} from "lucide-react";

type Props = {
  report: any;
};

function Card({
  icon,
  title,
  value,
}: any) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center gap-3">

        {icon}

        <div>

          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="text-3xl font-bold">
            {value}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default function DashboardStats({
  report,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <Card
        title="Questions"
        value={report.questions?.length || 0}
        icon={<FileQuestion className="text-cyan-400" />}
      />

      <Card
        title="Overall Score"
        value={`${report.overallScore}%`}
        icon={<Trophy className="text-yellow-400" />}
      />

      <Card
        title="Interview Status"
        value="Completed"
        icon={<Clock3 className="text-green-400" />}
      />

    </div>
  );
}