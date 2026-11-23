"use client";

interface Props {
    title: string;
    value: number;
}

export default function SkillBar({
    title,
    value,
}: Props) {

    return (

        <div>

            <div className="mb-2 flex justify-between">

                <span>{title}</span>

                <span>{value}%</span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-500 transition-all duration-1000"
                    style={{
                        width: `${value}%`,
                    }}
                />

            </div>

        </div>

    );
}