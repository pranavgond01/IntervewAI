"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MagneticButton({
children,
}: {
children: ReactNode;
}) {
return (
<motion.div
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.98 }}
transition={{
type: "spring",
stiffness: 300,
damping: 15,
}}
className="inline-block"
>
{children}
</motion.div>
);
}
