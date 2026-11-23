"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
"Explain the difference between null and undefined in JavaScript.",
"How would you optimize a large React application?",
"Describe a project where you solved a difficult technical problem.",
];

export default function TypingDemo() {
const [text, setText] = useState("");
const [messageIndex, setMessageIndex] = useState(0);

useEffect(() => {
const message = messages[messageIndex];
let index = 0;


setText("");

const interval = setInterval(() => {
  index++;
  setText(message.slice(0, index));

  if (index === message.length) {
    clearInterval(interval);

    setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
  }
}, 35);

return () => clearInterval(interval);


}, [messageIndex]);

return (
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="mx-auto mt-10 max-w-3xl rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 backdrop-blur-xl"
> <div className="mb-3 flex items-center gap-3"> <div className="h-10 w-10 rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30 flex items-center justify-center"> <span className="font-black text-cyan-300">AI</span> </div> <div> <div className="font-semibold">Sarah AI</div> <div className="text-sm text-cyan-300">Typing a live interview question</div> </div> </div>


  <div className="min-h-[64px] text-lg text-zinc-200">
    {text}
    <span className="animate-pulse text-cyan-300">|</span>
  </div>
</motion.div>


);
}
