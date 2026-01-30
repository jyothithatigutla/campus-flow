"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2, Lock, User, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { loginAction, signupAction } from "./actions";

export default function LoginPage() {
    const [role, setRole] = useState("student");
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const roles = ["Student", "Faculty", "Admin"];

    return (
        <div className="min-h-screen w-full flex items-center justify-center font-sans overflow-hidden relative text-slate-800 selection:bg-blue-600/30">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/login-bg.png')",
                }}
            >
                {/* Zero blur, simple dark tint to ensure text contrast while showing the Dome */}
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* AITS Tirupati Logo - Official Crest (Top Left) */}
            <div className="absolute top-8 left-8 z-20 w-28 h-28 bg-white/10 backdrop-blur-md rounded-full p-1 shadow-2xl border border-white/20 flex items-center justify-center transition-transform hover:scale-105">
                <img
                    src="/logo.png"
                    alt="Annamacharya Official Logo"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Centered Login Card - Perfectly matching your vision */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                className="w-full max-w-[440px] relative z-10 p-6"
            >
                <div className="relative bg-white/20 backdrop-blur-[32px] rounded-[50px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/30 p-10 md:p-12 overflow-hidden">

                    <div className="relative z-10 space-y-8">
                        {/* Card Header - Branded for AITS Tirupati */}
                        <div className="space-y-3 text-center">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                Annamacharya Institute
                            </h2>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                                AITS Tirupati
                            </h1>
                            <p className="text-slate-600 text-sm font-bold tracking-wide mt-2">
                                {isRegister ? "Create your account" : "Please sign in to your portal"}
                            </p>
                        </div>

                        {/* Error Message Display */}
                        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get("error") && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-bold text-center animate-in fade-in slide-in-from-top-2">
                                {decodeURIComponent(new URLSearchParams(window.location.search).get("error") || "")}
                            </div>
                        )}

                        {/* Segmented Control Role Selector - Perfect Royal Blue branding */}
                        <div className="p-1.5 bg-slate-900/5 backdrop-blur-xl rounded-2xl relative flex items-center border border-slate-900/10 shadow-sm">
                            {roles.map((r) => {
                                const active = role === r.toLowerCase();
                                return (
                                    <button
                                        key={r}
                                        onClick={() => setRole(r.toLowerCase())}
                                        className={cn(
                                            "flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all relative z-10",
                                            active ? "text-white" : "text-slate-500 hover:text-slate-800"
                                        )}
                                    >
                                        {r}
                                        {active && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-[#0047AB] shadow-lg shadow-blue-900/40 rounded-xl -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <form action={isRegister ? signupAction : loginAction} className="space-y-6">

                            <input type="hidden" name="role" value={role} />

                            <div className="space-y-5">
                                {isRegister && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0047AB] transition-colors pointer-events-none">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <input
                                                    name="fullName"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="w-full h-14 pl-14 pr-4 bg-white/20 backdrop-blur-md border border-slate-900/10 rounded-2xl focus:outline-none focus:border-[#0047AB] focus:ring-4 focus:ring-blue-900/5 transition-all font-bold text-slate-900 placeholder:text-slate-400 text-sm shadow-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Secret Key for Faculty/Admin */}
                                        {role !== "student" && (
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest pl-1">Admin Secret Key</label>
                                                <div className="relative group">
                                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0047AB] transition-colors pointer-events-none">
                                                        <Lock className="w-5 h-5 text-rose-400" />
                                                    </div>
                                                    <input
                                                        name="secretKey"
                                                        type="password"
                                                        placeholder="Required for Faculty/Admin"
                                                        className="w-full h-14 pl-14 pr-4 bg-white/20 backdrop-blur-md border border-rose-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-bold text-slate-900 placeholder:text-slate-400 text-sm shadow-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">
                                        {role === "student" ? "Student ID / Email" : role === "faculty" ? "Employee ID / Email" : "Admin Username"}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0047AB] transition-colors pointer-events-none">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            name="identifier"
                                            type="email"
                                            placeholder={
                                                role === "student" ? "1234567890@student.edu" :
                                                    role === "faculty" ? "EMP123@college.edu" :
                                                        "admin@college.edu"
                                            }
                                            className="w-full h-14 pl-14 pr-4 bg-white/20 backdrop-blur-md border border-slate-900/10 rounded-2xl focus:outline-none focus:border-[#0047AB] focus:ring-4 focus:ring-blue-900/5 transition-all font-bold text-slate-900 placeholder:text-slate-400 text-sm shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Password</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0047AB] transition-colors pointer-events-none">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="w-full h-14 pl-14 pr-14 bg-white/20 backdrop-blur-md border border-slate-900/10 rounded-2xl focus:outline-none focus:border-[#0047AB] focus:ring-4 focus:ring-blue-900/5 transition-all font-bold text-slate-900 placeholder:text-slate-400 text-sm shadow-sm"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0047AB] transition-colors outline-none"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <LoginButton isRegister={isRegister} />

                            <div className="flex justify-between items-center pt-2 px-1">
                                <button
                                    type="button"
                                    onClick={() => setIsRegister(!isRegister)}
                                    className="text-[10px] font-bold text-[#0047AB] hover:text-[#003087] hover:underline transition-colors uppercase tracking-wider"
                                >
                                    {isRegister ? "Already have an account? Sign In" : "First-Time Activation / Request Access"}
                                </button>
                                <button type="button" className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">
                                    Forgot Password?
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function LoginButton({ isRegister }: { isRegister: boolean }) {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            type="submit"
            className="w-full h-14 bg-[#1e293b] hover:bg-[#0f172a] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border-none"
        >
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" /> {isRegister ? "Creating Account..." : "Signing In..."}
                </>
            ) : (
                isRegister ? "Create Account" : "Sign In"
            )}
        </Button>
    );
}
