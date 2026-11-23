"use client";

import { motion } from "framer-motion";

export default function Background() {
return ( <div className="pointer-events-none fixed inset-0 overflow-hidden">
<motion.div
animate={{
x: [0, 140, -100, 0],
y: [0, -70, 70, 0],
}}
transition={{
duration: 20,
repeat: Infinity,
ease: "easeInOut",
}}
className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-400/15 blur-[140px]"
/>


  <motion.div
    animate={{
      x: [0, -140, 120, 0],
      y: [0, 90, -60, 0],
    }}
    transition={{
      duration: 24,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[140px]"
  />

  <motion.div
    animate={{
      x: [0, 110, -80, 0],
      y: [0, -90, 60, 0],
    }}
    transition={{
      duration: 28,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute bottom-[-10%] left-[25%] h-[560px] w-[560px] rounded-full bg-purple-500/15 blur-[160px]"
  />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(5,8,22,0.4),#050816)]" />
</div>


);
}
