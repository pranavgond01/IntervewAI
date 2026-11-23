"use client";

import { motion } from "framer-motion";
import {
FaGoogle,
FaMicrosoft,
FaAmazon,
FaFacebook,
FaApple,
FaUber,
FaStripe,
FaAirbnb,
} from "react-icons/fa";

const companies = [
{ name: "Google", icon: FaGoogle },
{ name: "Microsoft", icon: FaMicrosoft },
{ name: "Amazon", icon: FaAmazon },
{ name: "Meta", icon: FaFacebook },
{ name: "Apple", icon: FaApple },
{ name: "Uber", icon: FaUber },
{ name: "Stripe", icon: FaStripe },
{ name: "Airbnb", icon: FaAirbnb },
];

export default function CompaniesStrip() {
return ( <section className="border-y border-white/10 bg-white/[0.03] py-10"> <div className="mx-auto max-w-7xl px-6"> <p className="mb-6 text-center text-sm uppercase tracking-[0.25em] text-zinc-500">
Inspired by interview processes at leading companies </p>


    <div className="overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex min-w-max items-center gap-8"
      >
        {[...companies, ...companies].map((company, index) => {
          const Icon = company.icon;
          return (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-zinc-300 transition hover:border-cyan-400/30 hover:bg-white/10 hover:text-white"
            >
              <Icon className="text-2xl text-cyan-300" />
              <span className="font-medium">{company.name}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  </div>
</section>


);
}
