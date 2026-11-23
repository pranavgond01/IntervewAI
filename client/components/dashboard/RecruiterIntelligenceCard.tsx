"use client";

import { motion } from "framer-motion";
import {
Building2,
BadgeCheck,
CircleDollarSign,
Sparkles,
ArrowRight,
} from "lucide-react";

type Props = {
report?: {
hireDecision?: string;
hiringConfidence?: number;
recruiterSummary?: string;
recommendedCompanies?: string[];
expectedSalary?: string;
};
};

export default function RecruiterIntelligenceCard({ report }: Props) {
if (!report) {
return ( <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"> <h2 className="text-2xl font-bold">Recruiter Intelligence</h2> <p className="mt-3 text-zinc-400">
Complete an interview to generate recruiter-level insights. </p> </div>
);
}

const confidence = report.hiringConfidence ?? 0;

return ( <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"> <div className="mb-6 flex items-center justify-between"> <div> <h2 className="text-2xl font-bold">Recruiter Intelligence</h2> <p className="mt-1 text-zinc-400">
AI hiring signal based on your latest interview </p> </div>

 
    <div className="rounded-2xl bg-cyan-400/10 px-4 py-2 text-cyan-300">
      Recruiter View
    </div>
  </div>

  <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
      <div className="mb-4 flex items-center gap-2 text-cyan-300">
        <BadgeCheck size={18} />
        Hiring Confidence
      </div>

      <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-cyan-400/30 bg-[#0b1220]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="text-5xl font-black text-cyan-300">
            {confidence}%
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            Hire Probability
          </div>
        </motion.div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-zinc-400">Recruiter Verdict</div>
        <div className="mt-2 text-xl font-bold text-white">
          {report.hireDecision || "Pending"}
        </div>
      </div>
    </div>

    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          <CircleDollarSign size={18} />
          Expected Salary
        </div>

        <div className="text-3xl font-black text-white">
          {report.expectedSalary || "Not available"}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          <Sparkles size={18} />
          Recruiter Summary
        </div>

        <p className="leading-8 text-zinc-300">
          {report.recruiterSummary ||
            "Complete more interviews to generate a recruiter summary."}
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          <Building2 size={18} />
          Recommended Companies
        </div>

        <div className="flex flex-wrap gap-3">
          {(report.recommendedCompanies || []).length === 0 ? (
            <span className="text-zinc-400">
              Company recommendations will appear after your interview analysis.
            </span>
          ) : (
            report.recommendedCompanies!.map((company) => (
              <motion.div
                key={company}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-cyan-300"
              >
                {company}
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6">
        <div className="mb-3 text-lg font-semibold text-white">
          Priority Next Steps
        </div>

        <div className="space-y-3">
          {[
            "Complete another mock interview in the same role",
            "Improve technical depth in detected weak areas",
            "Raise hiring confidence above 85%",
            "Apply to the recommended companies this week",
          ].map((step) => (
            <div
              key={step}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="text-zinc-300">{step}</span>
              <ArrowRight className="text-cyan-300" size={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
 

);
}
    