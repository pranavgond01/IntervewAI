"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type AuthButtonProps = {
children: React.ReactNode;
loading?: boolean;
type?: "button" | "submit" | "reset";
onClick?: () => void;
};

export default function AuthButton({
children,
loading = false,
type = "button",
onClick,
}: AuthButtonProps) {
return (
<motion.button
type={type}
onClick={onClick}
whileHover={{ y: -2, scale: 1.01 }}
whileTap={{ scale: 0.98 }}
disabled={loading}
className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-4 font-semibold text-black shadow-[0_10px_40px_rgba(34,211,238,0.25)] transition disabled:cursor-not-allowed disabled:opacity-70"
> <span className="absolute inset-0 translate-x-[-120%] bg-white/20 transition-transform duration-500 group-hover:translate-x-[120%]" />

 
  <span className="relative flex items-center justify-center gap-2">
    {loading && <Loader2 className="h-5 w-5 animate-spin" />}
    {children}
  </span>
</motion.button>
 

);
}
