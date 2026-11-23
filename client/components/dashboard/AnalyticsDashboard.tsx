"use client";

import { motion } from "framer-motion";
import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
RadarChart,
PolarGrid,
PolarAngleAxis,
PolarRadiusAxis,
Radar,
BarChart,
Bar,
CartesianGrid,
} from "recharts";

type Interview = {
overallScore: number;
communication?: number;
technical?: number;
problemSolving?: number;
confidence?: number;
createdAt: string;
};

export default function AnalyticsDashboard({
interviews,
}: {
interviews: Interview[];
}) {
const trendData = interviews
.slice()
.reverse()
.map((interview, index) => ({
interview: `#${index + 1}`,
score: interview.overallScore,
}));

const latest = interviews[0];

const radarData = [
{
skill: "Communication",
value: latest?.communication || 0,
},
{
skill: "Technical",
value: latest?.technical || 0,
},
{
skill: "Problem Solving",
value: latest?.problemSolving || 0,
},
{
skill: "Confidence",
value: latest?.confidence || 0,
},
];

const monthlyMap: Record<string, number> = {};

interviews.forEach((interview) => {
const month = new Date(interview.createdAt).toLocaleString("default", {
month: "short",
});

 
monthlyMap[month] = (monthlyMap[month] || 0) + 1;
 

});

const monthOrder = [
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec",
];

const monthlyData = monthOrder.map((month) => ({
month,
interviews: monthlyMap[month] || 0,
}));

return ( <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"> <div className="mb-6"> <h2 className="text-2xl font-bold">Analytics Dashboard</h2> <p className="mt-1 text-zinc-400">
AI performance trends and skill analytics from your interview history. </p> </div>

 
  <div className="grid gap-8 lg:grid-cols-2">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-[#0b1220] p-6"
    >
      <h3 className="mb-4 text-lg font-semibold">
        Interview Score Trend
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="interview"
              stroke="#94a3b8"
            />
            <YAxis stroke="#94a3b8" domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ fill: "#22d3ee", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-white/10 bg-[#0b1220] p-6"
    >
      <h3 className="mb-4 text-lg font-semibold">
        Skill Profile
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.12)" />
            <PolarAngleAxis dataKey="skill" stroke="#e5e7eb" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  </div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.12 }}
    className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220] p-6"
  >
    <h3 className="mb-4 text-lg font-semibold">
      Monthly Interview Activity
    </h3>

    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="interviews" fill="#22d3ee" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
</div>
 

);
}
