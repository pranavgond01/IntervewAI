"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function PerformanceChart({
    report,
}: any) {

    const scores =
        report.scores || [];

    const data =
        scores.map(
            (
                score: number,
                index: number,
            ) => ({
                question: `Q${index + 1}`,
                score,
            }),
        );

    return (

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="mb-8 text-2xl font-bold">

                Performance Timeline 

            </h2>

            <div className="h-[420px]">

                <ResponsiveContainer>

                    <LineChart
                        data={data}
                    >

                        <CartesianGrid
                            stroke="#27272a"
                        />

                        <XAxis
                            dataKey="question"
                            stroke="#71717a"
                        />

                        <YAxis
                            stroke="#71717a"
                            domain={[0, 100]}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#06b6d4"
                            strokeWidth={4}
                            dot={{
                                r: 7,
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}