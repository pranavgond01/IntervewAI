"use client";

import { motion } from "framer-motion";

export default function Particles() {
return ( <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
{Array.from({ length: 25 }).map((_, i) => (
<motion.div
key={i}
className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/40"
initial={{
x: Math.random() * 1600,
y: Math.random() * 900,
opacity: 0.2 + Math.random() * 0.4,
}}
animate={{
y: [null, -40, 20, -30, 0],
opacity: [0.2, 0.7, 0.3, 0.6, 0.2],
}}
transition={{
duration: 6 + Math.random() * 6,
repeat: Infinity,
ease: "easeInOut",
delay: Math.random() * 2,
}}
/>
))} </div>
);
}
