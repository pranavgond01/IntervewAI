"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import AuthPreview from "../auth/AuthPreview";

export default function AuthLayout({
children,
}: {
children: ReactNode;
}) {
return ( <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_45%)]" /> <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" /> <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" /> <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10"> <div className="grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
<motion.div
initial={{ opacity: 0, x: -24 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
className="mx-auto w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,211,238,0.08)]"
>
{children}
</motion.div>
<motion.div
initial={{ opacity: 0, x: 24 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}
className="hidden lg:block"
> <AuthPreview />
</motion.div> </div> </div> </main>
);
}
