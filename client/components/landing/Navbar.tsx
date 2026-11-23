"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
return (
<motion.header
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="sticky top-3 z-50 mx-auto max-w-7xl px-4 pt-3"
> <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl"> <Link href="/" className="flex items-center gap-3"> <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30"> <span className="text-lg font-black text-cyan-300">AI</span> </div> <div> <div className="text-xl font-bold tracking-tight">
Interview<span className="text-cyan-400">AI</span> </div> <div className="text-xs text-zinc-400">
AI Career Platform </div> </div> </Link>


    <div className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
      <a href="#features" className="transition hover:text-white">
        Features
      </a>
      <a href="#demo" className="transition hover:text-white">
        Demo
      </a>
      <a href="#how" className="transition hover:text-white">
        How it Works
      </a>
      <a href="#about" className="transition hover:text-white">
        About
      </a>
    </div>

    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-cyan-400/40 hover:text-white"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20"
      >
        Register
      </Link>
    </div>
  </nav>
</motion.header>


);
}
