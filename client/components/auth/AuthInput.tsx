"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type AuthInputProps = {
label: string;
type?: string;
value: string;
onChange: (value: string) => void;
icon?: React.ReactNode;
};

export default function AuthInput({
label,
type = "text",
value,
onChange,
icon,
}: AuthInputProps) {
const [focused, setFocused] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const isPassword = type === "password";

return ( <div className="relative">
<motion.div
animate={{
boxShadow: focused
? "0 0 0 1px rgba(34,211,238,0.35), 0 0 30px rgba(34,211,238,0.12)"
: "0 0 0 1px rgba(255,255,255,0.06)",
}}
transition={{ duration: 0.2 }}
className="rounded-2xl border border-white/10 bg-[#0b1220]/80 backdrop-blur-xl"
> <div className="flex items-center gap-3 px-4 py-3">
{icon && <div className="text-cyan-300">{icon}</div>}

 
      <div className="relative flex-1">
        <label
          className={`pointer-events-none absolute left-0 transition-all duration-200 ${
            focused || value
              ? "-top-2 text-xs text-cyan-300"
              : "top-2 text-sm text-zinc-500"
          }`}
        >
          {label}
        </label>

        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pt-5 pb-1 text-white placeholder-transparent outline-none"
          placeholder={label}
        />
      </div>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="text-zinc-400 transition hover:text-cyan-300"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      )}
    </div>
  </motion.div>
</div>
 

);
}
