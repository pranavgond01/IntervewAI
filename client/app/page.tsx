"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, FileText, Mic } from "lucide-react";
import Background from "@/components/common/Background";
import Link from "next/link";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import CompaniesStrip from "@/components/landing/CompaniesStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import CursorGlow from "@/components/landing/CursorGlow";
import LiveInterviewSimulator from "@/components/landing/LiveInterviewSimulator";
import Particles from "@/components/landing/Particles";
import RevealSection from "@/components/landing/RevealSection";
import CinematicShowcase from "@/components/landing/CinematicShowcase";
import AIInterviewExperience from "@/components/landing/AIInterviewExperience";
import FloatingDashboard3D from "@/components/landing/FloatingDashboard3D";
import HologramRecruiter from "@/components/landing/HologramRecruiter";



export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
    
      <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
  
    >


    </motion.main>

    
      <Background />
      <CursorGlow />
      <Particles />

      <Navbar />

      <RevealSection><Hero /></RevealSection>
      <HologramRecruiter />
      <RevealSection><CompaniesStrip /></RevealSection>
      <RevealSection><InteractiveDemo /></RevealSection>
      <RevealSection><LiveInterviewSimulator /></RevealSection>
      <CinematicShowcase />
      <AIInterviewExperience />
      <FloatingDashboard3D />
      <RevealSection><HowItWorks /></RevealSection>
      <RevealSection><FeaturesSection /></RevealSection>
      <RevealSection><DashboardPreview /></RevealSection>
      <RevealSection><Testimonials /></RevealSection>
      <RevealSection><CTASection /></RevealSection>
      
      
      <Footer />
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400">
      <div className="mb-5 text-cyan-400">
        {icon}
      </div>

      <h2 className="mb-3 text-2xl font-bold">
        {title}
      </h2>

      <p className="text-zinc-400 leading-7">
        {desc}
      </p>
    </div>
  );
}

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition hover:border-cyan-400">
      <h2 className="text-4xl font-black text-cyan-400">
        {number}
      </h2>

      <p className="mt-2 text-zinc-400">
        {label}
      </p>
    </div>
  );
}