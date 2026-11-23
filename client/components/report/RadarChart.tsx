"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  report: any;
}

export default function RadarChartComponent({
  report,
}: Props) {
  const data = [
    {
      subject: "Technical",
      A: report.technical || 0,
    },
    {
      subject: "Communication",
      A: report.communication || 0,
    },
    {
      subject: "Confidence",
      A: report.confidence || 0,
    },
    {
      subject: "Problem Solving",
      A: report.problemSolving || 0,
    },
    {
      subject: "Clarity",
      A: report.clarity || 0,
    },
    {
      subject: "Fluency",
      A: report.fluency || 0,
    },
    {
      subject: "Vocabulary",
      A: report.vocabulary || 0,
    },
  ];
return (

    <div>

      Radar Chart

    </div>

  );

}