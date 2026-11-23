"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
Upload,
FileText,
ShieldCheck,
CheckCircle,
Sparkles,
Loader2,
} from "lucide-react";
import api from "@/lib/api";
import ResumeAnalysisLoading from "./ResumeAnalysisLoading";

export default function ResumeUploader() {
const inputRef = useRef<HTMLInputElement | null>(null);

const [dragging, setDragging] = useState(false);
const [uploading, setUploading] = useState(false);
const [progress, setProgress] = useState(0);
const [uploadedFile, setUploadedFile] = useState<File | null>(null);
const [success, setSuccess] = useState(false);
const [error, setError] = useState("");
const [showAnalysisScreen, setShowAnalysisScreen] = useState(false);

function openPicker() {
inputRef.current?.click();
}

async function handleFile(file: File) {
setError("");
setSuccess(false);
setUploadedFile(file);
setUploading(true);
setProgress(10);


const form = new FormData();
form.append("resume", file);

try {
  const timer = setInterval(() => {
    setProgress((p) => (p >= 90 ? p : p + 10));
  }, 180);

  await api.post("/resume/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  clearInterval(timer);
setProgress(100);
setSuccess(true);

setShowAnalysisScreen(true);

setTimeout(() => {
  setShowAnalysisScreen(false);

  // Redirect to the latest resume report
  window.location.href = "/resume/history";
}, 5000);

} catch (err: any) {
  setError(
    err?.response?.data?.message ||
      "Failed to upload resume. Please try again.",
  );
} finally {
  setUploading(false);
}


}

function onDrop(e: React.DragEvent) {
e.preventDefault();
setDragging(false);


const file = e.dataTransfer.files?.[0];
if (file) handleFile(file);


}

return ( <div className="space-y-6">
<motion.div
onDragOver={(e) => {
e.preventDefault();
setDragging(true);
}}
onDragLeave={() => setDragging(false)}
onDrop={onDrop}
onClick={openPicker}
animate={{
scale: dragging ? 1.01 : 1,
borderColor: dragging
? "rgba(34,211,238,0.8)"
: "rgba(34,211,238,0.3)",
boxShadow: dragging
? "0 0 40px rgba(34,211,238,0.18)"
: "0 0 0 rgba(0,0,0,0)",
}}
transition={{ duration: 0.2 }}
className="group relative cursor-pointer overflow-hidden rounded-[32px] border-2 border-dashed border-cyan-400/30 bg-gradient-to-br from-white/5 to-white/[0.03] p-10 text-center backdrop-blur-2xl"
> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />


    <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/30">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Upload className="h-11 w-11 text-cyan-300" />
      </motion.div>
    </div>

    <h3 className="mt-8 text-3xl font-black">
      {dragging ? "Drop your resume here" : "Upload Resume"}
    </h3>

    <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
      Drag & drop your resume here, or click to browse your files. We
      support PDF and DOCX resumes and generate AI recruiter insights in
      seconds.
    </p>

    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {[
        "PDF",
        "DOCX",
        "Max 10MB",
        "Encrypted Upload",
      ].map((badge) => (
        <span
          key={badge}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300"
        >
          {badge}
        </span>
      ))}
    </div>

    <input
      ref={inputRef}
      type="file"
      accept=".pdf,.doc,.docx"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
      }}
    />
  </motion.div>

  <AnimatePresence>
    {uploadedFile && (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className="rounded-3xl border border-white/10 bg-[#0b1220] p-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <FileText size={26} />
          </div>

          <div className="flex-1">
            <div className="font-semibold text-white">
              {uploadedFile.name}
            </div>

            <div className="text-sm text-zinc-400">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>

          {success ? (
            <CheckCircle className="text-green-400" />
          ) : uploading ? (
            <Loader2 className="animate-spin text-cyan-300" />
          ) : null}
        </div>

        {(uploading || success) && (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
              <span>
                {success ? "AI analysis completed" : "Uploading resume"}
              </span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-sm text-green-300">
            Resume uploaded successfully. Your AI ATS analysis and recruiter
            report are now being prepared.
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>

  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-2 flex items-center gap-2 text-cyan-300">
        <Sparkles size={18} />
        AI Recruiter Ready
      </div>

      <p className="text-sm leading-6 text-zinc-400">
        Your resume is analyzed against recruiter expectations, ATS filters,
        and interview-readiness benchmarks.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-2 flex items-center gap-2 text-cyan-300">
        <ShieldCheck size={18} />
        Secure Processing
      </div>

      <p className="text-sm leading-6 text-zinc-400">
        Files are processed securely and used only for your resume analysis,
        recruiter insights, and interview preparation.
      </p>
    </div>
  </div>
  {showAnalysisScreen && <ResumeAnalysisLoading />}
</div>


);
}
