"use client";

import { BookOpen } from "lucide-react";

export default function Courses({
  courses,
}: any) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">

        Recommended Courses

      </h2>

      <div className="grid gap-4">

        {courses?.map(
          (
            course: string,
            index: number,
          ) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl bg-zinc-800 p-5"
            >
              <BookOpen className="text-cyan-400" />

              <div>{course}</div>

            </div>
          ),
        )}

      </div>

    </div>
  );
}