"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin, MessageCircle, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background relative">
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">CampusFlow</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="default" className="rounded-full px-6 font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v1.0 Now Live
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-tight">
            Campus Management, <br />
            <span className="text-gradient">reimagined.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the future of education with geofenced attendance, AI-powered assistance, and real-time workflows.
            Everything runs in sync.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full hover:bg-secondary/50">
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl">
          <FeatureCard
            icon={<MapPin className="w-8 h-8 text-purple-500" />}
            title="Geofenced Attendance"
            description="Secure QR codes that work only when students are physically present in the classroom."
            delay={0.2}
          />
          <FeatureCard
            icon={<MessageCircle className="w-8 h-8 text-green-500" />}
            title="Real-Time Notices"
            description="WhatsApp-style announcements with read receipts. Never miss a critical update again."
            delay={0.4}
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-purple-500" />}
            title="Role-Based Security"
            description="Students, Faculty, and Admins get tailored views. Middleware ensures authorized access only."
            delay={0.6}
          />
        </div>
      </main>

      <footer className="w-full border-t border-white/10 py-8 bg-background/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2024 CampusFlow. Built with Next.js & Supabase.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group">
        <div className="mb-4 p-3 rounded-2xl bg-background/50 w-fit group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 font-heading">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
