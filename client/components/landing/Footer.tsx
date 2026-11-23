"use client";

import Link from "next/link";

export default function Footer() {
return ( <footer className="border-t border-white/10 bg-[#050816]"> <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between"> <div> <div className="text-2xl font-black">
Interview<span className="text-cyan-400">AI</span> </div> <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
AI-powered interview preparation platform with resume analysis,
adaptive interviews, recruiter reports, and career roadmaps. </p> </div>


    <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
      <Link href="/login" className="hover:text-white">
        Login
      </Link>
      <Link href="/register" className="hover:text-white">
        Register
      </Link>
      <a href="#features" className="hover:text-white">
        Features
      </a>
      <a href="#demo" className="hover:text-white">
        Demo
      </a>
    </div>
  </div>

  <div className="border-t border-white/10 py-5 text-center text-sm text-zinc-500">
    © {new Date().getFullYear()} InterviewAI. All rights reserved.
  </div>
</footer>


);
}
