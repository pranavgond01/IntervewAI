"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
const x = useMotionValue(-100);
const y = useMotionValue(-100);

const smoothX = useSpring(x, {
stiffness: 120,
damping: 20,
});

const smoothY = useSpring(y, {
stiffness: 120,
damping: 20,
});

useEffect(() => {
const move = (e: MouseEvent) => {
x.set(e.clientX - 200);
y.set(e.clientY - 200);
};


window.addEventListener("mousemove", move);

return () =>
  window.removeEventListener("mousemove", move);


}, [x, y]);

return (
<motion.div
style={{
left: smoothX,
top: smoothY,
}}
className="pointer-events-none fixed z-0 h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-[120px]"
/>
);
}
