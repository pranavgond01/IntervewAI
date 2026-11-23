"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

import api from "@/lib/api";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

export default function LoginPage() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function login(e: React.FormEvent) {
e.preventDefault();
setLoading(true);
setError("");

 
try {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.accessToken);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  router.push("/dashboard");
} catch (err: any) {
  setError(
    err?.response?.data?.message || "Login failed. Please try again.",
  );
} finally {
  setLoading(false);
}
 

}

return ( <AuthLayout> <div className="mb-8"> <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
Welcome back </div>

 
    <h1 className="text-4xl font-black leading-tight">
      Sign in to <span className="text-cyan-300">InterviewAI</span>
    </h1>

    <p className="mt-3 text-zinc-400">
      Continue your AI interview preparation, resume analysis, and career
      roadmap.
    </p>
  </div>

  <form onSubmit={login} className="space-y-5">
    <AuthInput
      label="Email address"
      type="email"
      value={email}
      onChange={setEmail}
      icon={<Mail size={18} />}
    />

    <AuthInput
      label="Password"
      type="password"
      value={password}
      onChange={setPassword}
      icon={<Lock size={18} />}
    />

    <div className="flex items-center justify-between text-sm">
      <label className="flex items-center gap-2 text-zinc-400">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-white/10 bg-transparent text-cyan-400 focus:ring-cyan-400"
        />
        Remember me
      </label>

      <Link href="/forgot-password" className="text-cyan-300 hover:text-cyan-200">
        Forgot password?
      </Link>
    </div>

    {error && (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
        {error}
      </div>
    )}

    <AuthButton type="submit" loading={loading}>
      Sign In
    </AuthButton>
  </form>

  <div className="my-6 flex items-center gap-3">
    <div className="h-px flex-1 bg-white/10" />
    <span className="text-sm text-zinc-500">or continue with</span>
    <div className="h-px flex-1 bg-white/10" />
  </div>

  <div className="grid grid-cols-2 gap-3">
    <button
      type="button"
      className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm font-medium text-zinc-300 transition hover:border-cyan-400/30 hover:bg-white/5"
    >
      Google
    </button>

    <button
      type="button"
      className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm font-medium text-zinc-300 transition hover:border-cyan-400/30 hover:bg-white/5"
    >
      GitHub
    </button>
  </div>

  <p className="mt-8 text-center text-sm text-zinc-400">
    Don't have an account?{" "}
    <Link href="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">
      Create one
    </Link>
  </p>
</AuthLayout>
 

);
}
