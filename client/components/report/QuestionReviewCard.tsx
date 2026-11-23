"use client";

import {
  Brain,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Star,
} from "lucide-react";

type Props = {
  index: number;
  question: any;
  answer: string;
  score: number;

  idealAnswer?: string;
  feedback?: string;
  resources?: string[];
};

export default function QuestionReviewCard({
  index,
  question,
  answer,
  score,
  idealAnswer,
  feedback,
  resources,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Question {index + 1}
          </h2>

          <div className="mt-2 flex gap-3">

            <span className="rounded-full bg-cyan-500/20 px-4 py-1 text-cyan-400">
              {question.type}
            </span>

            <span className="rounded-full bg-purple-500/20 px-4 py-1 text-purple-400">
              {question.difficulty}
            </span>

          </div>

        </div>

        <div className="text-right">

          <div className="flex justify-end gap-1">

            {Array.from({
              length: Math.round(score / 20),
            }).map((_, i) => (
              <Star
                key={i}
                size={18}
                fill="#facc15"
                color="#facc15"
              />
            ))}

          </div>

          <h1 className="mt-2 text-4xl font-black text-cyan-400">
            {score}/100
          </h1>

        </div>

      </div>

      <div className="space-y-6">

        {/* Question */}

        <Section
          icon={<HelpCircle />}
          title="Question"
        >
          {question.text}
        </Section>

        {/* Candidate */}

        <Section
          icon={<MessageSquare />}
          title="Your Answer"
        >
          {answer || (
            <span className="text-red-400">
              Question Skipped
            </span>
          )}
        </Section>

        {/* Ideal */}

        <Section
          icon={<Brain />}
          title="Ideal Answer"
        >
          {idealAnswer || "Not generated"}
        </Section>

        {/* Feedback */}

        <Section
          icon={<Brain />}
          title="Sarah Feedback"
        >
          {feedback || "No feedback"}
        </Section>

        {/* Resources */}

        <Section
          icon={<BookOpen />}
          title="Learning Resources"
        >
          {resources?.length ? (
            <ul className="space-y-2">

              {resources.map((item, index) => (
                <li key={index}>
                  • {item}
                </li>
              ))}

            </ul>
          ) : (
            "No resources."
          )}
        </Section>

      </div>

    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: any) {
  return (
    <div>

      <div className="mb-3 flex items-center gap-2 text-cyan-400">

        {icon}

        <h3 className="font-semibold">
          {title}
        </h3>

      </div>

      <div className="rounded-xl bg-zinc-800 p-5 whitespace-pre-wrap">
        {children}
      </div>

    </div>
  );
}