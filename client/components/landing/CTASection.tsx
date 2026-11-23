"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
return ( <section className="mx-auto max-w-7xl px-6 py-24">
<motion.div
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="overflow-hidden rounded-[32px] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 p-10 backdrop-blur-xl md:p-14"
> <div className="grid gap-8 md:grid-cols-[1.4fr_auto] md:items-center"> <div> <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
Start your interview journey </div>


        <h2 className="mt-5 text-4xl font-black md:text-5xl">
          Ready to Land Your Dream Job?
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
          Join InterviewAI today and start practicing realistic AI interviews,
          improving your resume, and receiving recruiter-level feedback.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:items-end">
        <Link href="/register">
          <button className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">
            Create Free Account
            <ArrowRight className="h-5 w-5" />
          </button>
        </Link>

        <Link href="/login">
          <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
            Login
          </button>
        </Link>
      </div>
    </div>
  </motion.div>
</section>


);
}
