"use client";

import { useState } from "react";
import api from "@/lib/api";

interface Props {
    interviewId: string;
}

export default function AIInterviewCoach({
    interviewId,
}: Props) {

    const [question, setQuestion] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function askCoach() {

        if (!question) return;

        setLoading(true);

        try {

            const res =
                await api.post(
                    `/interview/${interviewId}/coach`,
                    {
                        question,
                    },
                );

            setAnswer(res.data.answer);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-3xl font-bold mb-6">

                🤖 AI Interview Coach

            </h2>

            <textarea
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
                placeholder="Ask anything about your interview..."
                className="w-full rounded-xl bg-zinc-800 p-4"
                rows={4}
            />

            <button
                onClick={askCoach}
                className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-bold"
            >

                {loading
                    ? "Thinking..."
                    : "Ask Coach"}

            </button>

            {answer && (

                <div className="mt-8 rounded-xl bg-zinc-800 p-6 whitespace-pre-wrap">

                    {answer}

                </div>

            )}

        </div>

    );

}