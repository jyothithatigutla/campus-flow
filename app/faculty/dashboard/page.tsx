"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshingQRScanner } from "@/components/faculty/attendance-scanner";
import { AttendanceChart, PerformanceChart, GradeDistributionChart } from "@/components/faculty/dashboard-analytics";
import { AddClassDialog } from "@/components/faculty/add-class-dialog";
import { useRouter } from "next/navigation";
import {
    AlertCircle,
    ArrowUpRight,
    BarChart3,
    Bell,
    Calendar as LucideCalendar,
    Clock,
    FileText,
    GraduationCap,
    Inbox,
    MapPin,
    Plus,
    QrCode,
    Settings,
    ShieldCheck,
    Table,
    TrendingUp,
    UserCheck,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { CountUp } from "@/components/ui/count-up";

export default function UnifiedFacultyDashboard() {
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [isAddClassOpen, setIsAddClassOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const currentUser = {
        id: "USR-004",
        name: "Dr. S. Jumlesha",
        role: "Assistant Professor"
    };

    const [requests, setRequests] = useState([
        { id: 1, applicantId: "STU-001", name: "Anjali Gupta", type: "Leave Request", date: "Today", initials: "AG" },
        { id: 2, applicantId: "STU-005", name: "Rohan Das", type: "Internship NOC", date: "3h ago", initials: "RD" },
        { id: 3, applicantId: "STU-003", name: "Vikram Singh", type: "Course Approval", date: "Yesterday", initials: "VS" },
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleRequestAction = (id: number, action: 'Approve' | 'Reject') => {
        setRequests(requests.filter(req => req.id !== id));
        toast.success(`Request ${action}d`, {
            description: `Decision has been logged and the applicant notified.`,
        });
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="max-w-[1700px] mx-auto space-y-10 animate-pulse">
                    <div className="h-8 w-64 bg-slate-200 rounded-lg mb-8" />
                    <div className="grid grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-100 rounded-[28px]" />)}
                    </div>
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-8 h-[400px] bg-slate-100 rounded-[40px]" />
                        <div className="col-span-4 h-[400px] bg-slate-100 rounded-[40px]" />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans p-4">

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Side: 8 Columns */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Hero Row: My Classes & Attendance */}
                        <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
                            {/* My Classes Today - Premium Redesign */}
                            <Card className="md:col-span-4 bg-gradient-to-br from-[#4f46e5] via-[#7c3aed] to-[#2563eb] text-white rounded-[32px] p-8 relative overflow-hidden group shadow-[0_20px_50px_rgba(79,70,229,0.3)] border-0 flex flex-col justify-between h-[400px]">
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <Badge className="bg-white/20 text-white border-none font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">
                                                    Active Sessions
                                                </Badge>
                                                <h3 className="text-2xl font-black tracking-tight italic">Today's Schedule</h3>
                                            </div>
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                                <LucideCalendar className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Centered Massive Counter */}
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <div className="relative">
                                            <span className="text-[120px] font-black leading-none tracking-tighter drop-shadow-2xl">4</span>
                                            <div className="absolute -right-12 bottom-4 rotate-90">
                                                <span className="text-xs font-black tracking-[0.3em] uppercase opacity-60">Lectures</span>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold opacity-80 mt-2 tracking-wide text-center">
                                            You have <span className="underline decoration-2 underline-offset-4">4 key sessions</span> lined up for today.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <Button
                                            onClick={() => setIsAddClassOpen(true)}
                                            className="bg-white text-[#4f46e5] hover:bg-white/90 font-black text-[10px] uppercase tracking-widest rounded-xl h-12 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                                        >
                                            ADD NEW
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => router.push('/faculty/timetable')}
                                            className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-black text-[10px] uppercase tracking-widest rounded-xl h-12 backdrop-blur-md active:scale-95 transition-all"
                                        >
                                            SEE TABLE
                                        </Button>
                                    </div>
                                </div>

                                {/* Background Watermark Icon */}
                                <div className="absolute -right-8 bottom-0 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
                                    <Users className="w-64 h-64" />
                                </div>
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </Card>

                            {/* Attendance Chart */}
                            <div className="md:col-span-6 h-[400px]">
                                <AttendanceChart />
                            </div>
                        </div>

                        {/* Performance & Grades Row - Enlarged */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[550px]">
                            <PerformanceChart />
                            <GradeDistributionChart />
                        </div>

                        {/* Instant Attendance (QR Scanner) */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                <h3 className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Instant Attendance</h3>
                            </div>
                            <Card className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none relative overflow-hidden group">
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">QR Scanner</p>
                                            </div>
                                            <h4 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Scan Student QR</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold italic">Refreshing active session...</p>
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                                            <QrCode className="w-7 h-7" />
                                        </div>
                                    </div>
                                    <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                                                Open Scanner
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>Scan Student QR Code</DialogTitle>
                                                <DialogDescription>
                                                    Ask students to scan this QR code to mark their attendance.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <RefreshingQRScanner />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
                            </Card>
                        </div>

                        {/* Quick Links / Schedule */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-[#0047AB] rounded-full" />
                                <h3 className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Quick Links</h3>
                            </div>
                            <Card className="bg-slate-50/50 dark:bg-slate-800/50 border-0 rounded-[32px] p-6 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-2 mb-0.5">
                                            <span className="text-lg font-black italic text-slate-900 dark:text-white">10:30</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">AM</span>
                                        </div>
                                        <h4 className="text-xl font-black tracking-tight mb-0.5 text-slate-900 dark:text-white">Operating Systems</h4>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Hall B</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            <span>Section A</span>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="w-32 h-32 opacity-10 flex items-center justify-center group-hover:opacity-20 transition-opacity">
                                            <QrCode className="w-full h-full text-slate-900 dark:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Right Side: 4 Columns (Pending Hub) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-[#6366f1] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                            <h3 className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Pending Hub</h3>
                        </div>
                        <Card className="border-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none space-y-6 relative overflow-hidden">
                            <div className="space-y-1 relative z-10">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Awaiting Approval</p>
                                <h4 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Recent Requests</h4>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] -z-0" />

                            <div className="space-y-4">
                                <AnimatePresence initial={false} mode="popLayout">
                                    {requests.map(req => (
                                        <motion.div
                                            key={req.id}
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, x: 50 }}
                                            className="p-5 bg-white dark:bg-slate-800/40 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all group"
                                        >
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center font-black text-xs text-purple-600 shadow-sm">
                                                        {req.initials}
                                                    </div>
                                                    <div>
                                                        <h5 className="font-black tracking-tight text-slate-900 dark:text-white leading-none mb-1.5">{req.name}</h5>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.type} • {req.date}</p>
                                                    </div>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={() => handleRequestAction(req.id, 'Approve')}
                                                    className="h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10 active:scale-95 transition-all outline-none"
                                                >
                                                    APPROVE
                                                </button>
                                                <button
                                                    onClick={() => handleRequestAction(req.id, 'Reject')}
                                                    className="h-11 bg-slate-200 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl active:scale-95 transition-all outline-none"
                                                >
                                                    REJECT
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                <Link href="/faculty/requests" className="w-full block pt-6">
                                    <Button className="w-full bg-[#1E293B] hover:bg-blue-600 h-16 rounded-[24px] font-black text-[11px] uppercase tracking-widest text-white active:scale-95 transition-all flex items-center justify-center gap-3">
                                        BROWSE REQUESTS HUB <ArrowUpRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <AddClassDialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen} />
        </DashboardLayout>
    );
}

function MinimalStat({ label, value, icon: Icon, growth }: any) {
    return (
        <Card className="p-6 bg-white dark:bg-slate-900 rounded-[32px] shadow-xl border border-slate-50 dark:border-slate-800 hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <Icon className="w-5 h-5" />
                    </div>
                    {growth && (
                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-2.5 py-0.5 rounded-full">{growth}</Badge>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                    <h4 className="text-3xl font-black italic tracking-tighter transition-colors group-hover:text-blue-600">
                        <CountUp end={value} />
                    </h4>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-slate-50/50 rounded-bl-[60px] -z-0 group-hover:scale-110 transition-transform duration-700" />
        </Card>
    );
}

function ToolCard({ icon: Icon, label, href }: any) {
    const content = (
        <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[36px] border border-white/40 dark:border-slate-800 shadow-xl shadow-slate-200/10 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500 group w-full text-center cursor-pointer overflow-hidden relative">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700 rounded-[20px] group-hover:bg-[#1E293B] group-hover:text-white group-hover:shadow-lg transition-all">
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-[#1E293B] transition-colors">{label}</span>
        </div>
    );

    if (href) {
        return <Link href={href} className="w-full">{content}</Link>;
    }

    return <div className="w-full">{content}</div>;
}
