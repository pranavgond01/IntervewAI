"use client";

import { motion } from "framer-motion";
import {
Brain,
FileText,
Mic,
Sparkles,
TrendingUp,
} from "lucide-react";

export default function AuthPreview() {
return ( <div className="relative"> <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" /> <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />

 
  <div className="relative rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
    <div className="mb-8 flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
        <span className="text-xl font-black text-cyan-300">AI</span>
      </div>

      <div>
        <div className="text-2xl font-black">Sarah AI</div>
        <div className="text-sm text-cyan-300">
          Senior Technical Recruiter
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5"
      >
        <div className="mb-2 flex items-center gap-2 text-cyan-300">
          <Brain size={18} />
          AI Interview
        </div>

        <p className="text-lg font-semibold">
          Tell me about a challenging React performance problem you solved.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-white/10 bg-[#0b1220] p-5"
      >
        <div className="mb-2 flex items-center gap-2 text-zinc-300">
          <Mic size={18} />
          Candidate
        </div>

        <p className="text-zinc-200">
          I reduced initial render time by 38% using memoization, lazy loading,
          and bundle splitting across our dashboard...
        </p>
      </motion.div>
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <StatCard
        icon={FileText}
        label="Resume ATS"
        value="92/100"
        accent="text-cyan-300"
      />

      <StatCard
        icon={TrendingUp}
        label="Interview Score"
        value="89%"
        accent="text-green-300"
      />

      <StatCard
        icon={Sparkles}
        label="Communication"
        value="Excellent"
        accent="text-cyan-300"
      />

      <StatCard
        icon={Brain}
        label="Hire Probability"
        value="87%"
        accent="text-cyan-300"
      />
    </div>

    <div className="mt-8 rounded-2xl border border-white/10 bg-[#0b1220] p-5">
      <div className="text-sm text-zinc-400">Trusted by candidates preparing for</div>
      <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-zinc-300">
        <span className="rounded-full border border-white/10 px-3 py-1">Google</span>
        <span className="rounded-full border border-white/10 px-3 py-1">Amazon</span>
        <span className="rounded-full border border-white/10 px-3 py-1">Microsoft</span>
        <span className="rounded-full border border-white/10 px-3 py-1">Meta</span>
      </div>
    </div>
  </div>
</div>
 

);
}

function StatCard({
icon: Icon,
label,
value,
accent,
}: {
icon: any;
label: string;
value: string;
accent: string;
}) {
return ( <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4"> <div className="mb-3 flex items-center gap-2 text-zinc-300"> <Icon size={18} className={accent} />
{label} </div>

 
  <div className={`text-2xl font-black ${accent}`}>
    {value}
  </div>
</div>
 

);
}
