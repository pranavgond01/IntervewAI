interface Props {
    report: any;
}

export default function RecruiterReasoning({
    report,
}: Props) {

    const positives = [];

    if (report.communication >= 80)
        positives.push(
            "Excellent communication throughout the interview."
        );

    if (report.technical >= 80)
        positives.push(
            "Strong technical knowledge."
        );

    if (report.problemSolving >= 80)
        positives.push(
            "Excellent problem solving ability."
        );

    if (report.confidence >= 80)
        positives.push(
            "Confident while answering questions."
        );

    const negatives = [];

    if (report.communication < 60)
        negatives.push(
            "Communication needs improvement."
        );

    if (report.technical < 60)
        negatives.push(
            "Technical depth was below expectations."
        );

    if (report.problemSolving < 60)
        negatives.push(
            "Problem solving needs improvement."
        );

    if (report.confidence < 60)
        negatives.push(
            "Candidate lacked confidence."
        );

    const potential =
        report.overallScore >= 90
            ? "Exceptional"

            : report.overallScore >= 75
            ? "High"

            : report.overallScore >= 60
            ? "Moderate"

            : "Low";

    return (

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-3xl font-bold mb-8">

                Recruiter Explanation

            </h2>

            <div className="grid gap-8 lg:grid-cols-2">

                <div>

                    <h3 className="text-green-400 text-xl font-bold mb-4">

                        Why Hire

                    </h3>

                    <ul className="space-y-3">

                        {positives.length === 0 &&

                            <li>No major hiring strengths detected.</li>

                        }

                        {positives.map((item) => (

                            <li key={item}>
                                ✅ {item}
                            </li>

                        ))}

                    </ul>

                </div>

                <div>

                    <h3 className="text-red-400 text-xl font-bold mb-4">

                        Concerns

                    </h3>

                    <ul className="space-y-3">

                        {negatives.length === 0 &&

                            <li>No major concerns.</li>

                        }

                        {negatives.map((item) => (

                            <li key={item}>
                                ❌ {item}
                            </li>

                        ))}

                    </ul>

                </div>

            </div>

            <div className="mt-10 rounded-2xl bg-zinc-800 p-6">

                <h3 className="text-xl font-bold">

                    Promotion Potential

                </h3>

                <p className="mt-3 text-zinc-300">

                    {potential}

                </p>

            </div>

        </div>

    );

}