"use client";

import { motion } from "framer-motion";

const testimonials = [
{
name: "Aarav Sharma",
role: "Frontend Engineer",
company: "Google",
quote:
"The AI follow-up questions felt surprisingly realistic. The recruiter report helped me identify weak areas before my onsite interview.",
},
{
name: "Priya Nair",
role: "SDE Intern",
company: "Amazon",
quote:
"I improved my communication score by 20 points in two weeks. The voice interview mode is incredibly useful for practicing under pressure.",
},
{
name: "Rohan Mehta",
role: "React Developer",
company: "Microsoft",
quote:
"InterviewAI made me feel interview-ready. The ATS analyzer and AI coach together were a game changer for my job search.",
},
];

export default function Testimonials() {
return ( <section className="mx-auto max-w-7xl px-6 py-24"> <div className="mb-12 text-center">
<motion.h2
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="text-4xl font-black md:text-5xl"
>
Loved by Candidates
</motion.h2>


    <motion.p
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mx-auto mt-4 max-w-3xl text-lg text-zinc-400"
    >
      Thousands of candidates use InterviewAI to prepare for technical interviews.
    </motion.p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    {testimonials.map((testimonial, index) => (
      <motion.div
        key={testimonial.name}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <div className="text-5xl text-cyan-300">"</div>

        <p className="mt-4 leading-7 text-zinc-300">{testimonial.quote}</p>

        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="font-bold">{testimonial.name}</div>
          <div className="text-sm text-zinc-400">
            {testimonial.role} • {testimonial.company}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>


);
}
