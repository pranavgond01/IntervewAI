"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
User,
Mail,
Phone,
MapPin,
FileText,
Briefcase,
Building2,
Brain,
ChevronRight,
ChevronLeft,
Check,
} from "lucide-react";
import api from "@/lib/api";

interface Resume {
_id: string;
originalName: string;
role?: string;
}

const steps = [
"Resume",
"Personal Info",
"Professional Info",
"Interview",
];

export default function CandidateProfileForm() {
const router = useRouter();

const [step, setStep] = useState(0);
const [loading, setLoading] = useState(false);
const [resumes, setResumes] = useState<Resume[]>([]);

const [form, setForm] = useState({
resumeId: "",
firstName: "",
lastName: "",
email: "",
phone: "",
city: "",
country: "",
profession: "",
currentCompany: "",
previousCompany: "",
experience: 0,
targetRole: "",
company: "Google",
interviewType: "Full Interview",
difficulty: "Medium",
duration: "30",
});

useEffect(() => {
loadResumes();
}, []);

async function loadResumes() {
try {
const res = await api.get("/resume/history");
const list = Array.isArray(res.data) ? res.data : [];
setResumes(list);


  if (list.length > 0) {
    setForm((prev) => ({
      ...prev,
      resumeId: list[0]._id,
      targetRole: list[0].role ?? "",
    }));
  }
} catch (err) {
  console.error(err);
}


}

function change(
e: React.ChangeEvent<
HTMLInputElement | HTMLSelectElement
>,
) {
setForm({
...form,
[e.target.name]: e.target.value,
});
}

async function launchInterview() {
try {
setLoading(true);


  await api.post("/candidate", form);

  const interview = await api.post(
    "/interview/create",
    {
      resumeId: form.resumeId,
      role:
        form.targetRole ||
        form.profession,
      difficulty: form.difficulty,
    },
  );

  router.push(
    `/interview/${interview.data.interviewId}`,
  );
} catch (err) {
  console.error(err);
  alert("Failed to create interview.");
} finally {
  setLoading(false);
}


}

return ( <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
{/* LEFT COLUMN */} <div className="space-y-6">
{/* Stepper */} <div className="sticky top-6 z-20 rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl">
 <div className="flex items-center justify-between gap-2">
{steps.map((label, i) => (
<button 
key={label}
type="button"
onClick={() => setStep(i)}
className="flex flex-1 items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/5"
>
<div
className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                    i < step 
                      ? "bg-green-400 text-black"
                      : i === step
                      ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.45)]"
                      : "border border-white/10 bg-[#0b1220] text-zinc-300"
                  }`}
>
{i < step ? ( <Check size={18} />
) : (
i + 1
)} </div>


            <div className="hidden text-left md:block">
              <div className="text-sm font-semibold text-white">
                {label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>

    <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.section
          key="resume"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30">
              <FileText size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Resume Selection
              </h2>
              <p className="text-sm text-zinc-400">
                Choose the resume Sarah AI will analyze
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
            <select
              name="resumeId"
              value={form.resumeId}
              onChange={change}
              className="w-full bg-transparent text-white outline-none"
            >
              {resumes.map((resume) => (
                <option
                  key={resume._id}
                  value={resume._id}
                  className="bg-[#0b1220]"
                >
                  {resume.originalName}
                </option>
              ))}
            </select>
          </div>
        </motion.section>
      )}

      {step === 1 && (
        <motion.section
          key="personal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30">
              <User size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Personal Information
              </h2>
              <p className="text-sm text-zinc-400">
                Help Sarah AI personalize your interview
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              icon={User}
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={change}
            />

            <InputField
              icon={User}
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={change}
            />

            <InputField
              icon={Mail}
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={change}
            />

            <InputField
              icon={Phone}
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={change}
            />

            <InputField
              icon={MapPin}
              name="city"
              placeholder="City"
              value={form.city}
              onChange={change}
            />

            <InputField
              icon={MapPin}
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={change}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <Brain size={18} />
              AI Personalization
            </div>

            <p className="text-sm leading-6 text-zinc-200">
              Sarah AI uses your name, location, and professional background to
              personalize behavioral questions and recruiter feedback.
            </p>
          </div>
        </motion.section>
      )}


      {step === 2 && (
        <motion.section
          key="professional"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30">
              <Briefcase size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Professional Information
              </h2>
              <p className="text-sm text-zinc-400">
                Configure the interview Sarah AI will conduct
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              icon={Briefcase}
              name="profession"
              placeholder="Current Profession"
              value={form.profession}
              onChange={change}
            />

            <InputField
              icon={Building2}
              name="currentCompany"
              placeholder="Current Company"
              value={form.currentCompany}
              onChange={change}
            />

            <InputField
              icon={Building2}
              name="previousCompany"
              placeholder="Previous Company"
              value={form.previousCompany}
              onChange={change}
            />

            <InputField
              icon={Briefcase}
              name="experience"
              placeholder="Years of Experience"
              value={form.experience}
              onChange={change}
            />
          </div>

          <div className="mt-8">
            <div className="mb-3 text-sm font-semibold text-zinc-300">
              Target Role
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "AI / ML Engineer",
                "DevOps Engineer",
                "Data Analyst",
              ].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      targetRole: role,
                    }))
                  }
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    form.targetRole === role
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-400/30"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 text-sm font-semibold text-zinc-300">
              Target Company
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "Google",
                "Amazon",
                "Microsoft",
                "Meta",
                "Netflix",
                "Adobe",
              ].map((company) => (
                <button
                  key={company}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      company,
                    }))
                  }
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    form.company === company
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-400/30"
                  }`}
                >
                  {company}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <Brain size={18} />
              Recruiter Matching
            </div>

            <p className="text-sm leading-6 text-zinc-200">
              Sarah AI will tailor technical questions to the selected role and
              company, simulating a real recruiter interview experience.
            </p>
          </div>
        </motion.section>
      )}


      {step === 3 && (
        <motion.section
          key="interview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30">
              <Brain size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Interview Preferences
              </h2>
              <p className="text-sm text-zinc-400">
                Final review before launching Sarah AI
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              label="Interview Type"
              name="interviewType"
              value={form.interviewType}
              onChange={change}
              options={[
                "Technical",
                "Behavioral",
                "Full Interview",
                "System Design",
              ]}
            />

            <SelectField
              label="Difficulty"
              name="difficulty"
              value={form.difficulty}
              onChange={change}
              options={[
                "Easy",
                "Medium",
                "Hard",
              ]}
            />

            <SelectField
              label="Duration"
              name="duration"
              value={form.duration}
              onChange={change}
              options={[
                "15",
                "30",
                "45",
                "60",
              ]}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <Brain size={18} />
              Sarah AI will conduct your interview
            </div>

            <p className="text-sm leading-6 text-zinc-200">
              Your resume, experience, and selected preferences will be used
              to generate adaptive questions and a recruiter-grade report.
            </p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>

    {/* Navigation */}
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={() =>
          setStep((s) => Math.max(0, s - 1))
        }
        disabled={step === 0}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-zinc-300 transition hover:border-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Back
      </button>

      {step < 3 ? (
        <button
          type="button"
          onClick={() =>
            setStep((s) => Math.min(3, s + 1))
          }
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-400 px-6 py-3 font-semibold text-black shadow-[0_0_24px_rgba(34,211,238,0.25)] transition hover:from-cyan-300 hover:to-sky-300"
        >
          Next
          <ChevronRight size={18} />
        </button>
      ) : (
        <button
          type="button"
          onClick={launchInterview}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-400 px-6 py-3 font-semibold text-black shadow-[0_0_24px_rgba(34,211,238,0.25)] transition hover:from-cyan-300 hover:to-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Preparing AI Interview..."
            : "Launch AI Interview"}
          <ChevronRight size={18} />
        </button>
      )}
    </div>

    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
>
  <div className="mb-6 flex items-center gap-4">
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
    <PreviewItem
      label="Interview Format"
      value="Adaptive AI conversation"
    />

    <PreviewItem
      label="Question Types"
      value="Technical, Behavioral, Situational"
    />

    <PreviewItem
      label="Difficulty"
      value="Dynamic based on your answers"
    />

    <PreviewItem
      label="Report"
      value="Recruiter summary, strengths, weaknesses, roadmap"
    />
  </div>
</motion.div>
  </div>

 
</div>


);
}

function InputField({
icon: Icon,
name,
placeholder,
value,
onChange,
}: {
icon: any;
name: string;
placeholder: string;
value: string | number;
onChange: (
e: React.ChangeEvent<
HTMLInputElement | HTMLSelectElement
>,
) => void;
}) {
return ( <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4 transition hover:border-cyan-400/30"> <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400"> <Icon size={16} className="text-cyan-300" />
{placeholder} </div>


  <input
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600"
  />
</div>


);
}

function SelectField({
label,
name,
value,
onChange,
options,
}: {
label: string;
name: string;
value: string;
onChange: (
e: React.ChangeEvent<
HTMLInputElement | HTMLSelectElement
>,
) => void;
options: string[];
}) {
return ( <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4"> <div className="mb-2 text-sm text-zinc-400">
{label} </div>


  <select
    name={name}
    value={value}
    onChange={onChange}
    className="w-full bg-transparent text-white outline-none"
  >
    {options.map((option) => (
      <option
        key={option}
        value={option}
        className="bg-[#0b1220]"
      >
        {option}
      </option>
    ))}
  </select>
</div>


);
}

function PreviewItem({
label,
value,
}: {
label: string;
value: string;
}) {
return ( <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4"> <div className="text-sm text-zinc-400">
{label} </div> <div className="mt-1 font-semibold text-white">
{value} </div> </div>
);
}

