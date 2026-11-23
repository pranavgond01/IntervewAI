"use client";

import RadarChart from "./RadarChart";
import SkillBar from "./SkillBar";


export default function SkillAnalytics({
    report,
}: any) {

    return (

        <div className="grid gap-8 xl:grid-cols-2">

            <RadarChart report={report} />

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                <h2 className="mb-8 text-2xl font-bold">

                    Skill Breakdown

                </h2>

                <div className="space-y-6">

                    <SkillBar
                        title="Technical"
                        value={report.technical}
                    />

                    <SkillBar
                        title="Communication"
                        value={report.communication}
                    />

                    <SkillBar
                        title="Confidence"
                        value={report.confidence}
                    />

                    <SkillBar
                        title="Problem Solving"
                        value={report.problemSolving}
                    />

                    <SkillBar
                        title="Clarity"
                        value={report.clarity}
                    />

                    <SkillBar
                        title="Fluency"
                        value={report.fluency}
                    />

                    <SkillBar
                        title="Vocabulary"
                        value={report.vocabulary}
                    />

                </div>

            </div>

        </div>

    );

}