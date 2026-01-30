"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, ArrowRight, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import LiquidMeshBackground from "@/components/landing/LiquidMeshBackground";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans overflow-x-hidden relative">

      <LiquidMeshBackground />

      {/* Clean Professional Navbar */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 py-6",
        scrolled ? "bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-4 shadow-sm" : "bg-transparent"
      )}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">CampusFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Academic', 'About', 'Security'].map((item) => (
              <Link key={item} href="#" className="text-xs font-bold text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <Link href="/login">
            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 font-bold text-xs uppercase tracking-widest h-11 transition-all">
              Login Portal
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-white/40 backdrop-blur-md text-blue-600 text-[10px] font-bold uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Next-Generation Infrastructure
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.85] relative"
            >
              <span className="relative z-10 opacity-90">Campus Management,</span> <br />
              <motion.span
                className="text-blue-600 inline-block relative opacity-90"
              >
                reimagined.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Experience the future of education with geofenced attendance, AI-driven insights, and synchronized workflows in one seamless, professional interface.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link href="/login">
                <Button size="lg" className="h-14 px-10 text-xs font-black uppercase tracking-widest rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all">
                  Get Started NOW <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-10 text-xs font-black uppercase tracking-widest rounded-full border-slate-200 bg-white/40 backdrop-blur-md shadow-sm hover:bg-white/60 transition-all">
                View Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-24 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white/20 backdrop-blur-2xl rounded-[64px] p-16 border border-white/40 shadow-2xl flex flex-col items-center gap-16 text-center">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.5em]">Global Impact</h2>

            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              <ImpactBubble value="350+" label="University Partners" color="blue" delay={0.1} />
              <ImpactBubble value="100,000+" label="Active Students" color="indigo" delay={0.2} />
              <ImpactBubble value="15+" label="Countries Reached" color="purple" delay={0.3} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 z-10 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-20 space-y-6">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em]">Core Technology</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">Synchronized Intelligence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
            <FeatureCard
              icon={<MapPin className="w-10 h-10 text-blue-500" />}
              title="Geofenced Attendance"
              description="Secure QR codes that work only when students are physically present in the classroom via GPS-validation."
              delay={0.1}
            />
            <FeatureCard
              icon={<MessageCircle className="w-10 h-10 text-indigo-500" />}
              title="Real-Time Notices"
              description="Synchronized announcements with read receipts. Never miss a critical academic update again."
              delay={0.2}
            />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-blue-600" />}
              title="Role-Based Security"
              description="Students, Faculty, and Admins get tailored views. Enterprise-grade security for your data."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto rounded-[64px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-20 text-center text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                Transform your campus <br /> ecosystem today.
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <Link href="/login">
                  <Button size="lg" className="h-16 px-14 text-xs font-bold uppercase tracking-widest rounded-full bg-white text-blue-600 hover:bg-slate-50 shadow-xl transition-all">
                    Enter Portal
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-16 px-14 text-xs font-bold uppercase tracking-widest rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] -ml-48 -mb-48" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200 z-10 relative bg-white/60 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight italic uppercase">CampusFlow</span>
          </div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest font-bold">© 2024 CampusFlow Systems. High-Performance Infrastructure.</p>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


function ImpactBubble({ value, label, color, delay }: { value: string, label: string, color: 'blue' | 'indigo' | 'purple', delay: number }) {
  const colors = {
    blue: "border-blue-100 bg-white/40 text-blue-600",
    indigo: "border-indigo-100 bg-white/40 text-indigo-600",
    purple: "border-purple-100 bg-white/40 text-purple-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, type: "spring", stiffness: 50 }}
      whileHover={{ y: -15, scale: 1.05 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-6"
    >
      <div className={cn(
        "w-36 h-36 md:w-48 md:h-48 rounded-full border shadow-2xl flex flex-col items-center justify-center backdrop-blur-md",
        colors[color]
      )}>
        <span className="text-3xl md:text-5xl font-bold tracking-tighter">{value}</span>
      </div>
      <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em]">{label}</p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <Card className="p-12 h-full border-white/60 bg-white/30 backdrop-blur-xl rounded-[48px] hover:shadow-2xl hover:border-blue-200 transition-all duration-500 group">
        <div className="mb-8 p-6 rounded-3xl bg-white/50 w-fit group-hover:bg-blue-50 transition-colors shadow-sm">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-base font-medium">
          {description}
        </p>
        <div className="mt-8 flex items-center gap-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-bold uppercase tracking-widest">Explore Intelligence</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </Card>
    </motion.div>
  );
}
