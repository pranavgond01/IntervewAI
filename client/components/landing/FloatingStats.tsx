"use client";

import { motion } from "framer-motion";

function Card({
title,
value,
delay,
}: {
title: string;
value: string;
delay: number;
}) {
return (
<motion.div
initial={{ opacity: 0, y: 18 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay }}
className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
> <div className="text-sm text-zinc-400">{title}</div> <div className="mt-2 text-3xl font-black text-cyan-300">{value}</div>
</motion.div>
);
}

export default function FloatingStats() {
return ( <div className="grid grid-cols-2 gap-4"> <Card title="AI Accuracy" value="95%" delay={0.1} /> <Card title="Mock Interviews" value="50K+" delay={0.2} /> <Card title="Hiring Prediction" value="87%" delay={0.3} /> <Card title="ATS Score" value="91" delay={0.4} /> </div>
);
}
