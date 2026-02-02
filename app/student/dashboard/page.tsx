"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkline } from "@/components/ui/sparkline";
import { useRouter } from "next/navigation";
import {
    Clock,
    MapPin,
    Zap,
    ChevronRight,
    BookOpen,
    Database,
    FileText,
    Calendar,
    Search,
    Trophy,
    ArrowUpRight,
    DollarSign,
    Users as UsersIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CampusWalletWidget } from "@/components/student/sidebar-widgets";
import { TimetableView } from "@/components/student/timetable-view";
import { AiAssistant } from "@/components/ai-assistant";
import { toast } from "sonner";
import { EventRegistrationDialog } from "@/components/student/event-registration-dialog";
import { ExamCard } from "@/components/student/exam-card";
import { registerForEvent } from "../actions";
import { useOptimistic, useTransition, forwardRef } from "react";
import { WalletBalanceDisplay } from "@/components/student/wallet-balance";
import { RecentGrades } from "@/components/student/recent-grades";



const ScheduleCard = ({ title, time, room, status }: any) => (
    <div className="flex justify-between items-center p-6 bg-white dark:bg-slate-900 rounded-[24px] border border-gray-50 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center gap-5">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-[#0047AB] dark:text-blue-400 transition-colors group-hover:bg-[#0047AB] group-hover:text-white">
                {title.includes("System") ? <BookOpen className="w-6 h-6" /> : <Database className="w-6 h-6" />}
            </div>
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-black text-[#1E293B] dark:text-white">{time}</span>
                    <span className="text-xs font-bold text-slate-400">AM</span>
                </div>
                <h4 className="font-black text-lg text-gray-800 dark:text-gray-100 tracking-tight mb-1">{title}</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-purple-500" /> {room}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className={cn(
                "w-2 h-2 rounded-full",
                status === 'PRESENT' ? 'bg-emerald-500' : 'bg-rose-500'
            )} />
            <span className={cn(
                "font-black text-[10px] tracking-widest uppercase",
                status === 'PRESENT' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            )}>
                {status}
            </span>
        </div>
    </div>
);

function RequestItem({ title, date, status }: any) {
    return (
        <Link href="/student/requests">
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all rounded-[24px] p-6 group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-black text-base text-[#1E293B] dark:text-white mb-0.5">{title}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{date}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Badge className={cn(
                        "text-[9px] font-black uppercase px-3 py-1 rounded-full border-none shadow-sm",
                        status === 'Approved' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                    )}>
                        {status}
                    </Badge>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#0047AB] transition-colors" />
                </div>
            </Card>
        </Link>
    );
}

export default function StudentDashboard() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState("Schedule");
    const [selectedLeaveType, setSelectedLeaveType] = useState("Medical Leave");
    const tabs = ["Leave Request", "Schedule", "Exams & Events"];
    const LEAVE_TYPES = ["Medical Leave", "Academic Leave", "Emergency Leave", "Personal Leave"];

    const handleTimetableLeave = (type: string, subject: string) => {
        setSelectedLeaveType(type);
        setActiveTab("Leave Request");
    };

    const handleSubmitLeave = () => {
        toast.success("Leave Application Submitted!", {
            description: `Your ${selectedLeaveType} has been sent to Professor James.`,
        });
        // Reset form simulation
    };

    const handleRegisterEvent = (title: string) => {
        toast.success("Registration Successful!", {
            description: `You are now registered for ${title}.`,
            icon: <Trophy className="w-4 h-4 text-emerald-500" />
        });
    };

    const upcomingExams = [
        {
            courseName: "Advanced Algorithms",
            courseCode: "CS-301",
            date: new Date("2026-03-15T10:00:00"),
            location: "Lecture Hall A",
            duration: "2h 30m"
        },
        {
            courseName: "Database Management",
            courseCode: "CS-302",
            date: new Date("2026-03-18T14:00:00"),
            location: "Lab Complex 2",
            duration: "3h 00m"
        },
        {
            courseName: "Computer Networks",
            courseCode: "CS-303",
            date: new Date("2026-03-21T09:00:00"),
            location: "Exam Hall 1",
            duration: "3h 00m"
        }
    ];

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 relative">
                {/* Background Image Overlay - Replaced with CSS Pattern to prevent CORB */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                        backgroundSize: '24px 24px',
                        maskImage: 'linear-gradient(to bottom, black, transparent 80%)'
                    }}
                />

                <div className="max-w-[1700px] mx-auto py-8 px-8 space-y-8 animate-in fade-in duration-700 font-sans relative z-10">

                    {/* Advanced Header */}
                    <div className="flex items-center justify-between gap-8">
                        <div className="flex-1 max-w-2xl relative shadow-sm rounded-full overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 group">
                            <label htmlFor="global-search" className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0047AB] transition-colors">
                                <Search className="w-4 h-4" />
                            </label>
                            <input
                                id="global-search"
                                name="global-search"
                                placeholder="Search for classes, faculty, or docs..."
                                className="w-full h-14 pl-14 pr-6 bg-transparent outline-none text-sm font-medium text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="h-14 px-8 rounded-full border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm font-black text-[10px] uppercase tracking-widest text-[#1E293B] dark:text-white flex items-center gap-3 hover:bg-[#0047AB] hover:text-white hover:border-[#0047AB] transition-all"
                            onClick={() => toast.info("Portal access is currently synchronized.")}
                        >
                            <Zap className="w-4 h-4 text-[#0047AB] group-hover:text-white transition-colors" /> Portal Access
                        </Button>
                    </div>

                    {/* Banner */}
                    {/* Removed Banner or kept? Assuming keep but maybe make it smaller if needed. Keeping for now. */}

                    <div className="space-y-8">
                        {/* Main Content (Full Width) */}
                        <div className="w-full space-y-8">

                            {/* Current Progress Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-[#0047AB] dark:text-blue-400" />
                                    <h3 className="text-2xl font-black text-[#1E293B] dark:text-white tracking-tight">Current Progress</h3>
                                </div>

                                {/* Stats Row - Refactored to CSS Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <Card
                                        className="border-0 shadow-sm bg-white dark:bg-slate-900 p-6 rounded-[24px] space-y-3 cursor-pointer hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
                                        onClick={() => router.push('/student/attendance')}
                                    >
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Attendance Trend</p>
                                        <div className="flex items-end justify-between">
                                            <h4 className="text-5xl font-black text-[#1E293B] dark:text-white tracking-tighter leading-none group-hover:text-[#0047AB] transition-colors">87%</h4>
                                            <div className="w-24 h-10">
                                                <Sparkline data={[40, 35, 55, 45, 75, 60, 87]} color="#0047AB" />
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">✓ Safe Zone</Badge>
                                    </Card>

                                    <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-900 to-[#1E293B] p-6 rounded-[24px] space-y-3 relative overflow-hidden group">
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-2">Campus Wallet</p>
                                            <WalletBalanceDisplay />
                                        </div>
                                    </Card>

                                    {/* New Recent Grades Widget */}
                                    <RecentGrades />
                                </div>

                                {/* Schedule Cards (Restored) */}
                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Today's Schedule</h4>
                                    </div>
                                    <ScheduleCard title="Data Structures" time="09:30" room="LH-101" status="PRESENT" />
                                    <ScheduleCard title="Operating Systems" time="11:00" room="Hall B" status="ABSENT" />
                                </div>
                            </div>

                            {/* Tabbed Navigation */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl w-fit">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={cn(
                                                "px-8 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all relative overflow-hidden",
                                                activeTab === tab
                                                    ? "bg-[#0047AB] text-white shadow-md shadow-blue-500/20"
                                                    : "text-slate-400 hover:text-[#0047AB] dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/10"
                                            )}
                                        >
                                            {activeTab === tab && (
                                                <motion.div
                                                    layoutId="activeTabGlow"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                                />
                                            )}
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {activeTab === "Leave Request" && (
                                        <motion.div
                                            key="requests"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-8"
                                        >
                                            {/* Recent Requests */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <RequestItem title="Medical Leave" date="20 Jan 2026" status="Approved" />
                                            </div>

                                            {/* Leave Application Form */}
                                            <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-[24px] p-8 border border-slate-100 dark:border-slate-800">
                                                <p className="text-[10px] font-black text-[#0047AB] dark:text-blue-400 uppercase tracking-widest mb-4">Formal Request</p>
                                                <h4 className="text-2xl font-black text-[#1E293B] dark:text-white mb-8">Leave Application</h4>

                                                <div className="space-y-6">
                                                    {/* Request Type */}
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Request Type</label>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                            {LEAVE_TYPES.map((type) => (
                                                                <button
                                                                    key={type}
                                                                    onClick={() => setSelectedLeaveType(type)}
                                                                    className={cn(
                                                                        "p-4 border-2 rounded-2xl text-sm font-black transition-all",
                                                                        selectedLeaveType === type
                                                                            ? "bg-blue-50 dark:bg-blue-900/20 border-[#0047AB] dark:border-blue-500 text-[#0047AB] dark:text-blue-400 shadow-md"
                                                                            : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-blue-200"
                                                                    )}
                                                                >
                                                                    {type}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Date Range */}
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="space-y-3">
                                                            <label htmlFor="start-date" className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                                                <Calendar className="w-3.5 h-3.5 text-[#0047AB] dark:text-blue-400" /> Start Date
                                                            </label>
                                                            <input
                                                                id="start-date"
                                                                name="start-date"
                                                                type="date"
                                                                className="w-full h-14 px-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 focus:border-[#0047AB] focus:outline-none transition-all"
                                                                placeholder="dd-mm-yyyy"
                                                            />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <label htmlFor="end-date" className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                                                <Calendar className="w-3.5 h-3.5 text-[#0047AB] dark:text-blue-400" /> End Date
                                                            </label>
                                                            <input
                                                                id="end-date"
                                                                name="end-date"
                                                                type="date"
                                                                className="w-full h-14 px-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 focus:border-[#0047AB] focus:outline-none transition-all"
                                                                placeholder="dd-mm-yyyy"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Reason */}
                                                    <div className="space-y-3">
                                                        <label htmlFor="leave-reason" className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Reason for Leave</label>
                                                        <textarea
                                                            id="leave-reason"
                                                            name="leave-reason"
                                                            rows={6}
                                                            className="w-full p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium text-slate-600 dark:text-slate-300 focus:border-[#0047AB] focus:outline-none transition-all resize-none"
                                                            placeholder="Please provide a detailed reason for your absence..."
                                                        />
                                                    </div>

                                                    {/* Submit Button */}
                                                    <div className="flex items-center gap-4 pt-4">
                                                        <Button className="flex-1 h-14 bg-[#1E293B] hover:bg-[#0047AB] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/10 active:scale-95 transition-all">
                                                            Submit Application
                                                        </Button>
                                                        <Button variant="outline" className="h-14 px-8 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "Schedule" && (
                                        <motion.div
                                            key="schedule"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <TimetableView onLeaveRequest={handleTimetableLeave} />
                                        </motion.div>
                                    )}

                                    {activeTab === "Exams & Events" && (
                                        <motion.div
                                            key="events"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-12"
                                        >
                                            {/* Upcoming Exams Section */}
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                        <Calendar className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-[#1E293B] dark:text-white">Upcoming Exams</h3>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prepare for your assessments</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {upcomingExams.map((exam, index) => (
                                                        <ExamCard
                                                            key={exam.courseCode}
                                                            {...exam}
                                                            index={index}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Events Section */}
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                                        <Trophy className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-[#1E293B] dark:text-white">Campus Events</h3>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Participate and Win</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <EventRegistrationDialog
                                                        eventTitle="InnoHack 2026 @ VIT Vellore"
                                                        trigger={
                                                            <RichEventCard
                                                                title="InnoHack 2026"
                                                                date="Jan 20-21, 2026"
                                                                prize="₹2 Lakhs"
                                                                tags={["AI/ML", "IoT", "HealthTech"]}
                                                                color="blue"
                                                            />
                                                        }
                                                    />
                                                    <EventRegistrationDialog
                                                        eventTitle="India AI Impact Summit 2026"
                                                        trigger={
                                                            <RichEventCard
                                                                title="India AI Impact Summit"
                                                                date="Feb 19-20, 2026"
                                                                prize="Delegate Access"
                                                                tags={["New Delhi", "Govt of India"]}
                                                                color="emerald"
                                                            />
                                                        }
                                                    />
                                                    <EventRegistrationDialog
                                                        eventTitle="eRaksha Hackathon 2026"
                                                        trigger={
                                                            <RichEventCard
                                                                title="eRaksha Cyber Challenge"
                                                                date="Jan 16-18, 2026"
                                                                prize="Grand Finale"
                                                                tags={["Cybersecurity", "IIT Delhi"]}
                                                                color="blue"
                                                            />
                                                        }
                                                    />
                                                    <EventRegistrationDialog
                                                        eventTitle="HackSecureX International"
                                                        trigger={
                                                            <RichEventCard
                                                                title="HackSecureX 2026"
                                                                date="Jan 16-17, 2026"
                                                                prize="$5,000 Pool"
                                                                tags={["Data Privacy", "Global"]}
                                                                color="emerald"
                                                            />
                                                        }
                                                    />
                                                </div>
                                                <div className="flex justify-center pt-4">
                                                    <Link href="/student/events">
                                                        <Button variant="outline" className="rounded-full px-8 py-6 font-black text-[10px] uppercase tracking-widest border-slate-200 dark:border-slate-700 text-slate-400 hover:text-[#0047AB] hover:border-[#0047AB] transition-all group">
                                                            View All 8+ Upcoming Events <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </DashboardLayout >
    );
}

const RichEventCard = forwardRef<HTMLDivElement, any>(({ title, date, prize, tags, color, eventId = "evt_001", studentId = "std_123", ...props }, ref) => {
    const bgClass = color === "blue" ? "from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20" : "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20";

    // Simplified: No internal click handler, let the parent DialogTrigger handle the click
    const isRegistered = false; // logic moved to Dialog or requires prop
    const isJoining = false;

    return (
        <Card
            ref={ref}
            className={cn("border-0 shadow-sm bg-gradient-to-br rounded-[32px] p-8 space-y-6 group hover:shadow-xl transition-all cursor-pointer relative", bgClass)}
            {...props}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <h3 className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight">{title}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        <Calendar className="w-3.5 h-3.5" />
                        {date}
                    </div>
                </div>
                {prize && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full shadow-sm">
                        <DollarSign className="w-3 h-3 text-amber-500" />
                        <span className="text-[10px] font-black text-[#1E293B] dark:text-white">{prize}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2">
                {tags.map((tag: any) => (
                    <Badge key={tag} className="bg-white/50 dark:bg-white/10 text-slate-600 dark:text-slate-300 border-none text-[8px] font-black uppercase px-2 py-0.5">{tag}</Badge>
                ))}
            </div>

            {/* Action Button - Visual only, the whole card is the trigger */}
            <div
                className={cn(
                    "w-full h-12 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
                    "bg-[#0047AB] group-hover:bg-[#003087] text-white shadow-blue-500/10 active:scale-95"
                )}
            >
                Register Now <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
        </Card>
    );
});
RichEventCard.displayName = "RichEventCard";

function EventCard({ title, category, desc, color = "blue" }: any) {
    const colorClass = color === "emerald" ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
    return (
        <Card className="p-8 bg-white dark:bg-slate-900 border-0 shadow-sm rounded-[32px] space-y-4 group hover:shadow-xl hover:shadow-purple-500/5 transition-all">
            <Badge className={cn("border-none text-[8px] font-black uppercase tracking-widest px-2.5 py-1", colorClass)}>{category}</Badge>
            <h4 className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight">{title}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{desc}</p>
        </Card>
    );
}
