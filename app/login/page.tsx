"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, SignupSchema, type LoginInput, type SignupInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, User, Eye, EyeOff, ArrowLeft, Mail, ShieldCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { loginAction, signupAction, signInWithGoogle, logoutAction } from "./actions";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

import { useSearchParams } from "next/navigation";

function LoginForm() {
    const searchParams = useSearchParams();
    const [role, setRole] = useState("student");
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const roles = ["Student", "Faculty", "Admin"];

    // Handle URL messages (Success/Error)
    useEffect(() => {
        const message = searchParams.get("message");
        const error = searchParams.get("error");

        if (message) {
            toast.success(message, { duration: 5000 });
            setIsRegister(false); // Switch to login view on success
        }
        if (error) {
            toast.error(error, { duration: 5000 });
        }
    }, [searchParams]);

    // Check if user is already logged in
    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);
            setIsCheckingAuth(false);
        };
        checkUser();
    }, []);

    // Form Handling with Zod
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<any>({
        resolver: zodResolver(isRegister ? SignupSchema : LoginSchema),
        defaultValues: {
            role: "student",
        }
    });

    // Sync role with form
    useEffect(() => {
        setValue("role", role);
    }, [role, setValue]);

    const password = watch("password", "");

    const onFormSubmit = async (data: any) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value as string));

        try {
            if (isRegister) {
                await signupAction(formData);
            } else {
                await loginAction(formData);
            }
        } catch (err: any) {
            // In client components, a redirect() from a server action might verify as an error.
            // We need to check if it is a redirect "error" and ignore it (let it bubble/browser handle it)
            if (err.message && (err.message.includes("NEXT_REDIRECT") || err.digest?.includes("NEXT_REDIRECT"))) {
                return;
            }
            console.error("Login Error:", err);
            toast.error(err.message || "Authentication failed");
        }
    };

    const onError = (errors: any) => {
        console.log("Form Errors:", errors);
        const firstError = Object.values(errors)[0] as any;
        if (firstError) {
            toast.error(firstError.message || "Invalid form data");
        }
    };

    const handleLogout = async () => {
        await logoutAction();
        setCurrentUser(null);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center font-sans overflow-hidden relative text-slate-800 selection:bg-blue-600/30">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/login-bg.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* AITS Tirupati Logo */}
            <div className="absolute top-8 left-8 z-20 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full p-1 shadow-2xl border border-white/20 flex items-center justify-center transition-transform hover:scale-105">
                <img
                    src="/logo.png"
                    alt="Annamacharya Official Logo"
                    className="w-full h-full object-contain"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                className="w-full max-w-[460px] relative z-10 p-6 flex flex-col gap-6"
            >
                <a
                    href="/"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-all w-fit group"
                >
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-all shadow-sm">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Back to SmartCampus
                </a>

                <div className="relative bg-white/20 backdrop-blur-[32px] rounded-[50px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/30 p-8 md:p-12 overflow-hidden">
                    {isCheckingAuth ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
                        </div>
                    ) : currentUser ? (
                        // Already Logged In - Show Profile
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-3 text-center">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                    Already Logged In
                                </h2>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                                    Welcome Back!
                                </h1>
                            </div>

                            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black">
                                        {currentUser.email?.[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-slate-900">
                                            {currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0]}
                                        </p>
                                        <p className="text-xs text-slate-600 font-bold">{currentUser.email}</p>
                                        <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 bg-blue-900/10 rounded-full">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-900">
                                                {currentUser.user_metadata?.role || 'User'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    onClick={() => {
                                        const role = currentUser.user_metadata?.role || 'student';
                                        if (role === 'admin') window.location.href = '/faculty/admin/dashboard';
                                        else if (role === 'faculty' || role === 'principal') window.location.href = '/faculty/dashboard';
                                        else window.location.href = '/student/dashboard';
                                    }}
                                    className="w-full h-14 bg-[#0047AB] hover:bg-[#003087] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-900/20 transition-all"
                                >
                                    Go to Dashboard
                                </Button>

                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    className="w-full h-12 bg-white/50 hover:bg-white/70 border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // Not Logged In - Show Login Form
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-3 text-center">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                    Annamacharya Institute
                                </h2>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                                    AITS Tirupati
                                </h1>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/5 rounded-full border border-blue-900/10">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                                    <p className="text-[10px] text-blue-900 font-black uppercase tracking-widest">Prototype v1.0</p>
                                </div>
                            </div>

                            {/* Role Selector */}
                            <div className="p-1.5 bg-slate-900/5 backdrop-blur-xl rounded-2xl relative flex items-center border border-slate-900/10 shadow-sm">
                                {roles.map((r) => {
                                    const active = role === r.toLowerCase();
                                    return (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setRole(r.toLowerCase())}
                                            className={cn(
                                                "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all relative z-10",
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

                            <form onSubmit={handleSubmit(onFormSubmit, onError)} className="space-y-6">
                                <input type="hidden" {...register("role")} />

                                <div className="space-y-4">
                                    {isRegister && (
                                        <div className="space-y-2">
                                            <label htmlFor="fullName" className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    id="fullName"
                                                    {...register("fullName")}
                                                    className="w-full h-14 pl-14 pr-4 bg-white/30 backdrop-blur-md border border-slate-900/10 rounded-2xl focus:border-[#0047AB] focus:ring-4 focus:ring-blue-900/5 transition-all text-sm font-bold"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            {errors.fullName && <p className="text-[10px] text-rose-500 font-bold uppercase pl-1">{errors.fullName.message as string}</p>}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label htmlFor="identifier" className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Email / ID</label>
                                        <div className="relative">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                id="identifier"
                                                {...register("identifier")}
                                                className="w-full h-14 pl-14 pr-4 bg-white/30 backdrop-blur-md border border-slate-900/10 rounded-2xl focus:border-[#0047AB] focus:ring-4 focus:ring-blue-900/5 transition-all text-sm font-bold"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        {errors.identifier && <p className="text-[10px] text-rose-500 font-bold uppercase pl-1">{errors.identifier.message as string}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                id="password"
                                                {...register("password")}
                                                type={showPassword ? "text" : "password"}
                                                className="w-full h-14 pl-14 pr-14 bg-white/30 backdrop-blur-md border border-slate-900/10 rounded-2xl focus:border-[#0047AB] focus:ring-4 focus:ring-blue-900/5 transition-all text-sm font-bold"
                                                placeholder="••••••••"
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2">
                                                {showPassword ? <EyeOff className="w-5 h-5 text-slate-400" /> : <Eye className="w-5 h-5 text-slate-400" />}
                                            </button>
                                        </div>
                                        {isRegister && password.length > 0 && (
                                            <div className="px-1 space-y-1.5">
                                                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                                                    <span>Strength</span>
                                                    <span className={cn(password.length > 8 ? "text-emerald-500" : "text-amber-500")}>
                                                        {password.length > 8 ? "Strong" : "Weak"}
                                                    </span>
                                                </div>
                                                <div className="h-1 bg-slate-900/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(100, (password.length / 10) * 100)}%` }}
                                                        className={cn("h-full", password.length > 8 ? "bg-emerald-500" : "bg-amber-500")}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {isRegister && (
                                        <div className="space-y-2 animate-in slide-in-from-top-1 fade-in">
                                            <label htmlFor="confirmPassword" className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Confirm Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    id="confirmPassword"
                                                    {...register("confirmPassword")}
                                                    type="password"
                                                    className="w-full h-14 pl-14 pr-4 bg-white/30 backdrop-blur-md border border-slate-900/10 rounded-2xl focus:border-[#0047AB] focus:ring-4 focus:ring-blue-900/5 transition-all text-sm font-bold"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                            {errors.confirmPassword && <p className="text-[10px] text-rose-500 font-bold uppercase pl-1">{errors.confirmPassword.message as string}</p>}
                                        </div>
                                    )}

                                    {isRegister && role !== "student" && (
                                        <div className="space-y-2 animate-in slide-in-from-top-2">
                                            <label htmlFor="secretKey" className="text-[10px] font-black text-rose-500 uppercase tracking-widest pl-1 flex items-center gap-1.5">
                                                <ShieldCheck className="w-3 h-3" /> Secret Key Required
                                            </label>
                                            <input
                                                id="secretKey"
                                                {...register("secretKey")}
                                                type="password"
                                                className="w-full h-14 px-5 bg-rose-50/20 border border-rose-200 rounded-2xl focus:border-rose-500 transition-all text-sm font-bold placeholder:text-rose-300"
                                                placeholder="Admin key for Role Activation"
                                            />
                                        </div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 bg-[#1e293b] hover:bg-[#0f172a] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 border-none"
                                >
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegister ? "Create Account" : "Sign In")}
                                </Button>

                                <div className="flex justify-center pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsRegister(!isRegister)}
                                        className="text-[10px] font-bold text-[#0047AB] hover:underline uppercase tracking-wider"
                                    >
                                        {isRegister ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
