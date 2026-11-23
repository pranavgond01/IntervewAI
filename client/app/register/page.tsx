"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
Mail,
Lock,
User,
Briefcase,
GraduationCap,
} from "lucide-react";

import api from "@/lib/api";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

export default function RegisterPage() {
const router = useRouter();

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [role, setRole] = useState("student");
const [experience, setExperience] = useState("Freshers");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function register(e: React.FormEvent) {
e.preventDefault();

 
if (password !== confirmPassword) {
  setError("Passwords do not match.");
  return;
}

setLoading(true);
setError("");

try {
const res = await api.post("/auth/register", {
firstName,
lastName,
email,
password,
role,
experience,
});

// Save authentication tokens
localStorage.setItem("token", res.data.accessToken);
localStorage.setItem("refreshToken", res.data.refreshToken);

// Save user info
localStorage.setItem(
"user",
JSON.stringify(res.data.user),
);

// Continue to onboarding
router.push("/onboarding");
} catch (err: any) {
setError(
err?.response?.data?.message ||
"Registration failed. Please try again.",
);
} finally {
setLoading(false);
}

 

}

return ( <AuthLayout> <div className="mb-8"> <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
Join InterviewAI </div>

 
    <h1 className="text-4xl font-black leading-tight">
      Create your <span className="text-cyan-300">AI Career Profile</span>
    </h1>

    <p className="mt-3 text-zinc-400">
      Unlock AI mock interviews, resume analysis, recruiter feedback, and a
      personalized career roadmap.
    </p>
  </div>

  <form onSubmit={register} className="space-y-5">
    <div className="grid grid-cols-2 gap-4">
      <AuthInput
        label="First name"
        value={firstName}
        onChange={setFirstName}
        icon={<User size={18} />}
      />

      <AuthInput
        label="Last name"
        value={lastName}
        onChange={setLastName}
        icon={<User size={18} />}
      />
    </div>

    <AuthInput
      label="Email address"
      type="email"
      value={email}
      onChange={setEmail}
      icon={<Mail size={18} />}
    />

    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl border border-white/10 bg-[#0b1220]/80 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
          <Briefcase size={16} className="text-cyan-300" />
          Role
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-transparent text-white outline-none"
        >
          <option value="student">Student</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="analyst">Analyst</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1220]/80 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
          <GraduationCap size={16} className="text-cyan-300" />
          Experience
        </div>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full bg-transparent text-white outline-none"
        >
          <option>Freshers</option>
          <option>0-1 Years</option>
          <option>1-3 Years</option>
          <option>3-5 Years</option>
          <option>5+ Years</option>
        </select>
      </div>
    </div>

    <AuthInput
      label="Password"
      type="password"
      value={password}
      onChange={setPassword}
      icon={<Lock size={18} />}
    />

    <AuthInput
      label="Confirm password"
      type="password"
      value={confirmPassword}
      onChange={setConfirmPassword}
      icon={<Lock size={18} />}
    />

    {error && (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
        {error}
      </div>
    )}

    <AuthButton type="submit" loading={loading}>
      Create Account
    </AuthButton>
  </form>

  <p className="mt-8 text-center text-sm text-zinc-400">
    Already have an account?{" "}
    <Link
      href="/login"
      className="font-semibold text-cyan-300 hover:text-cyan-200"
    >
      Sign in
    </Link>
  </p>
</AuthLayout>
 

);
}
