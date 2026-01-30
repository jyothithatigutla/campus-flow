"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Calendar,
    FileText,
    GraduationCap,
    Trophy,
    Settings,
    LogOut,
    User,
    Bell,
    HelpCircle,
    CheckCircle2,
    ShieldCheck,
    BarChart3,
    BookOpen,
    Inbox
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/login/actions";

const studentNav = [
    { name: "Overview", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Attendance", href: "/student/attendance", icon: Calendar },
    { name: "Results", href: "/student/results", icon: GraduationCap },
    { name: "Notices", href: "/student/notices", icon: Bell },
    { name: "Letters", href: "/student/requests", icon: FileText },
    { name: "Events", href: "/student/events", icon: Trophy },
    { name: "Support", href: "/student/support", icon: HelpCircle },
    { name: "Settings", href: "/student/settings", icon: Settings },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const isStudent = pathname.startsWith("/student");
    const isAdmin = pathname.startsWith("/faculty/admin") || pathname.startsWith("/faculty/staff");

    const facultyNav = [
        { name: "Overview", href: "/faculty/dashboard", icon: LayoutDashboard },
        { name: "Dashboard", href: "/faculty/dashboard/analytics", icon: BarChart3 },
        { name: "Students", href: "/faculty/students", icon: User },
        { name: "Grading", href: "/faculty/grading", icon: BookOpen },
        { name: "Letters", href: "/faculty/letter-request", icon: Inbox },
        { name: "Support", href: "/faculty/support", icon: HelpCircle },
    ];

    const adminNav = [
        { name: "Admin Dashboard", href: "/faculty/admin/dashboard", icon: ShieldCheck },
        { name: "Staff Management", href: "/faculty/admin/staff", icon: GraduationCap },
        { name: "Requests Hub", href: "/faculty/admin/requests", icon: CheckCircle2 },
        { name: "System Updates", href: "/faculty/admin/updates", icon: Bell },
    ];

    const finalNav = isStudent ? studentNav : (isAdmin ? adminNav : facultyNav);

    // Add Administrative Tools link at the bottom for HODs who are in faculty view
    const showAdminLink = !isStudent && !isAdmin;

    return (
        <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-950 h-screen sticky top-0 border-r border-slate-100 dark:border-slate-900 transition-all duration-500 font-sans">
            {/* Logo Section */}
            <div className="p-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-black text-xl text-[#1E293B] dark:text-white tracking-tighter uppercase">CampusFlow</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1.5 py-6">
                {finalNav.map((item) => {
                    // Precision matching for overview, prefix matching for others
                    const isActive = item.href === "/faculty/dashboard" || item.href === "/student/dashboard"
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-6 py-3.5 text-sm font-bold transition-all rounded-xl group relative overflow-hidden",
                                isActive
                                    ? "bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white shadow-xl shadow-purple-600/30"
                                    : "text-slate-500 dark:text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/10"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="navGlow"
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 -z-10"
                                    initial={false}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon className="w-5 h-5 transition-colors" />
                            <span className="tracking-tight">{item.name}</span>
                            {isActive && (
                                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                            )}
                        </Link>
                    );
                })}



                {isAdmin && (
                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-900 px-4">
                        <Link
                            href="/faculty/dashboard"
                            className="flex items-center gap-3 px-6 py-3.5 text-xs font-black text-slate-400 hover:text-[#0047AB] hover:bg-blue-50 dark:hover:bg-blue-950/10 rounded-xl transition-all group uppercase tracking-widest"
                        >
                            <LogOut className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
                            Exit Admin Console
                        </Link>
                    </div>
                )}
            </nav>

            {/* Verified Status */}
            <div className="px-6 pb-2">
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 text-center">
                    <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-black text-[10px] tracking-widest uppercase mb-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Account
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">Google Login Authenticated</p>
                </div>
            </div>

            {/* Footer / Logout */}
            <div className="p-6 pt-2">
                <form action={logoutAction} className="w-full">
                    <button type="submit" className="flex items-center gap-3 px-6 py-3.5 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-all group w-full">
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="tracking-tight text-left">Logout</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
