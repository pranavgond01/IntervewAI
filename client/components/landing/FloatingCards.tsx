"use client";

import { motion } from "framer-motion";

const cards = [
{
title: "AI Interview",
value: "Live",
top: "12%",
left: "6%",
delay: 0,
},
{
title: "Confidence",
value: "92%",
top: "24%",
right: "8%",
delay: 0.3,
},
{
title: "ATS Score",
value: "91",
bottom: "18%",
left: "10%",
delay: 0.6,
},
{
title: "Hire Chance",
value: "87%",
bottom: "12%",
right: "10%",
delay: 0.9,
},
];

export default function FloatingCards() {
return ( <div className="pointer-events-none absolute inset-0 hidden md:block">
{cards.map((card) => (
<motion.div
key={card.title}
initial={{ opacity: 0, y: 20 }}
animate={{
opacity: 1,
y: [0, -12, 0],
}}
transition={{
opacity: { duration: 0.6, delay: card.delay },
y: {
duration: 4,
repeat: Infinity,
ease: "easeInOut",
delay: card.delay,
},
}}
className="absolute w-44 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl shadow-2xl"
style={{
top: card.top,
left: card.left,
right: card.right,
bottom: card.bottom,
}}
> <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
{card.title} </div> <div className="mt-2 text-2xl font-black text-cyan-300">
{card.value} </div>
</motion.div>
))} </div>
);
}
