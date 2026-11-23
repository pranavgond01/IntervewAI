"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";

export default function TiltCard({
children,
}: {
children: ReactNode;
}) {
const x = useMotionValue(0);
const y = useMotionValue(0);

const rotateX = useTransform(y, [-100, 100], [12, -12]);
const rotateY = useTransform(x, [-100, 100], [-12, 12]);

const springX = useSpring(rotateX, {
stiffness: 200,
damping: 20,
});

const springY = useSpring(rotateY, {
stiffness: 200,
damping: 20,
});

function handleMove(
e: React.MouseEvent<HTMLDivElement>,
) {
const rect =
e.currentTarget.getBoundingClientRect();


const px =
  e.clientX - rect.left - rect.width / 2;

const py =
  e.clientY - rect.top - rect.height / 2;

x.set(px);
y.set(py);


}

function handleLeave() {
x.set(0);
y.set(0);
}

return (
<motion.div
onMouseMove={handleMove}
onMouseLeave={handleLeave}
style={{
rotateX: springX,
rotateY: springY,
transformPerspective: 1200,
}}
whileHover={{ scale: 1.03 }}
className="transform-gpu"
>
{children}
</motion.div>
);
}
