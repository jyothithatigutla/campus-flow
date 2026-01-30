"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    MapPin,
    ChevronLeft,
    Users,
    BookOpen,
    QrCode
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const timetableData = [
    {
        day: "Monday", classes: [
            { time: "09:00 - 10:30", subject: "Operating Systems", room: "Hall B", section: "CS-A", color: "from-blue-500 to-indigo-600" },
            { time: "11:00 - 12:30", subject: "Data Structures", room: "Lab 2", section: "CS-B", color: "from-purple-500 to-pink-600" },
        ]
    },
    {
        day: "Tuesday", classes: [
            { time: "10:30 - 12:00", subject: "Network Security", room: "Hall A", section: "CS-A", color: "from-emerald-500 to-teal-600" },
            { time: "02:00 - 03:30", subject: "Operating Systems", room: "Hall B", section: "CS-C", color: "from-blue-500 to-indigo-600" },
        ]
    },
    {
        day: "Wednesday", classes: [
            { time: "09:00 - 10:30", subject: "Database Systems", room: "Hall C", section: "CS-B", color: "from-orange-500 to-red-600" },
            { time: "11:00 - 12:30", subject: "Data Structures", room: "Lab 2", section: "CS-A", color: "from-purple-500 to-pink-600" },
        ]
    },
    {
        day: "Thursday", classes: [
            { time: "10:30 - 12:00", subject: "Operating Systems", room: "Hall B", section: "CS-A", color: "from-blue-500 to-indigo-600" },
            { time: "01:30 - 03:00", subject: "Network Security", room: "Hall A", section: "CS-B", color: "from-emerald-500 to-teal-600" },
        ]
    },
    {
        day: "Friday", classes: [
            { time: "09:00 - 10:30", subject: "Database Systems", room: "Hall C", section: "CS-A", color: "from-orange-500 to-red-600" },
            { time: "11:00 - 12:30", subject: "Project Lab", room: "Lab 4", section: "CS-A", color: "from-violet-500 to-purple-600" },
        ]
    },
];

export default function FacultyTimetable() {
    const router = useRouter();

    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#4f46e5] hover:border-[#4f46e5] transition-all shadow-sm group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Academic Timetable</h1>
                        <p className="text-slate-400 font-medium tracking-tight">Your weekly lecture schedule and classroom locations</p>
                    </div>
                </div>

                {/* Timetable Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                    {timetableData.map((dayData, dayIdx) => (
                        <div key={dayData.day} className="space-y-6">
                            <div className="px-2 flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-[#4f46e5] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]" />
                                <h2 className="text-xl font-black text-slate-800 dark:text-white italic tracking-tight">{dayData.day}</h2>
                            </div>

                            <div className="space-y-4">
                                {dayData.classes.map((cls, clsIdx) => (
                                    <motion.div
                                        key={`${dayIdx}-${clsIdx}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (dayIdx * 0.1) + (clsIdx * 0.05) }}
                                    >
                                        <Card className="group relative overflow-hidden rounded-[28px] border-0 bg-white dark:bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 p-6 flex flex-col gap-4">
                                            {/* Colored Top Bar */}
                                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cls.color}`} />

                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <Badge className="bg-slate-50 dark:bg-slate-800 text-slate-400 border-none font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest leading-none">
                                                        {cls.time}
                                                    </Badge>
                                                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 group-hover:text-[#4f46e5] transition-colors">
                                                        <Clock className="w-4 h-4" />
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-tight mt-1">
                                                    {cls.subject}
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                                                    <MapPin className="w-3 h-3 text-[#4f46e5]" />
                                                    {cls.room}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                                                    <Users className="w-3 h-3 text-[#7c3aed]" />
                                                    {cls.section}
                                                </div>
                                            </div>

                                            {/* Action Overlay (Hover) */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5]/90 to-[#7c3aed]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3">
                                                <Button size="sm" className="bg-white text-[#4f46e5] hover:bg-white/90 font-black text-[9px] uppercase tracking-widest rounded-xl">
                                                    VIEW ATTENDANCE
                                                </Button>
                                                <Button size="icon" className="bg-white/20 hover:bg-white/30 text-white rounded-xl border border-white/30">
                                                    <QrCode className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
