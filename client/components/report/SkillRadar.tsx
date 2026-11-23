"use client";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

interface Props {
    report: any;
}

export default function SkillRadar({
    report,
}: Props) {

    const data = [

        {
            skill: "Communication",
            score: report.communication,
        },

        {
            skill: "Technical",
            score: report.technical,
        },

        {
            skill: "Problem Solving",
            score: report.problemSolving,
        },

        {
            skill: "Confidence",
            score: report.confidence,
        },

        {
            skill: "Clarity",
            score: report.clarity,
        },

        {
            skill: "Vocabulary",
            score: report.vocabulary,
        },

    ];

    return (

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">

                Skill Radar 

            </h2>

            <div className="h-[420px]">

                <ResponsiveContainer>

                    <RadarChart data={data}>

                        <PolarGrid />

                        <PolarAngleAxis dataKey="skill" />

                        <PolarRadiusAxis
                            domain={[0, 100]}
                        />

                        <Radar
                            dataKey="score"
                            fill="#06b6d4"
                            fillOpacity={0.45}
                        />

                    </RadarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}