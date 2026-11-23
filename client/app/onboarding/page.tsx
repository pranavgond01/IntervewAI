"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
ArrowRight,
Briefcase,
Building2,
GraduationCap,
Sparkles,
} from "lucide-react";

const goals = [
"Software Engineer",
"Frontend Developer",
"Backend Developer",
"Full Stack Developer",
"Data Analyst",
"Product Manager",
];

const companies = [
"Google",
"Amazon",
"Microsoft",
"Meta",
"Netflix",
"Adobe",
];

const experienceLevels = [
"Freshers",
"0-1 Years",
"1-3 Years",
"3-5 Years",
"5+ Years",
];

export default function OnboardingPage() {
const router = useRouter();

const [step, setStep] = useState(1);
const [goal, setGoal] = useState("");
const [company, setCompany] = useState("");
const [experience, setExperience] = useState("Freshers");

const progress = useMemo(() => (step / 3) * 100, [step]);

function next() {
if (step < 3) {
setStep((s) => s + 1);
return;
}

 
const onboarding = {
  goal,
  company,
  experience,
};

localStorage.setItem(
  "onboarding",
  JSON.stringify(onboarding),
);

router.push("/dashboard");
 

}

return ( <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_45%)]" /> <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-10"> <div className="w-full rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl md:p-10"> <div className="mb-8 flex items-center justify-between"> <div> <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
Personalized onboarding </div>

 
          <h1 className="mt-4 text-3xl font-black md:text-4xl">
            Let's personalize your AI recruiter
          </h1>

          <p className="mt-2 text-zinc-400">
            We'll tailor interviews, resume feedback, and your career roadmap
            in under a minute.
          </p>
        </div>

        <div className="text-right">
          <div className="text-sm text-zinc-400">Step</div>
          <div className="text-2xl font-black text-cyan-300">
            {step}/3
          </div>
        </div>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <Briefcase className="text-cyan-300" />
              <h2 className="text-2xl font-bold">
                What role are you preparing for?
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {goals.map((item) => (
                <button
                  key={item}
                  onClick={() => setGoal(item)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    goal === item
                      ? "border-cyan-400 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-[#0b1220] text-zinc-300 hover:border-cyan-400/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <Building2 className="text-cyan-300" />
              <h2 className="text-2xl font-bold">
                Which company are you targeting?
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {companies.map((item) => (
                <button
                  key={item}
                  onClick={() => setCompany(item)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    company === item
                      ? "border-cyan-400 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-[#0b1220] text-zinc-300 hover:border-cyan-400/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="text-cyan-300" />
              <h2 className="text-2xl font-bold">
                What's your experience level?
              </h2>
            </div>

            <div className="space-y-3">
              {experienceLevels.map((item) => (
                <button
                  key={item}
                  onClick={() => setExperience(item)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    experience === item
                      ? "border-cyan-400 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-[#0b1220] text-zinc-300 hover:border-cyan-400/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <div className="mb-2 flex items-center gap-2 text-cyan-300">
                <Sparkles size={18} />
                AI Personalization Preview
              </div>

              <p className="leading-7 text-zinc-200">
                Sarah AI will generate {goal || "Software Engineer"}
                interviews, optimize your resume for {company || "top tech companies"}, and build a personalized roadmap for {experience}.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex justify-end">
        <button
          onClick={next}
          disabled={
            (step === 1 && !goal) || (step === 2 && !company)
          }
          className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {step === 3 ? "Launch Dashboard" : "Continue"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  </div>
</main>
 

);
}
