import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, MapPin, Search, Filter, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ExamList() {
    const exams = [
        { subject: "Data Structures", code: "CS-302", date: "Feb 10, 2026", day: "Tuesday", time: "10:00 AM", syllabus: "Modules 1-3", venue: "Exam Hall A", status: "confirmed" },
        { subject: "Operating Systems", code: "CS-304", date: "Feb 12, 2026", day: "Thursday", time: "10:00 AM", syllabus: "All Modules", venue: "Exam Hall B", status: "confirmed" },
        { subject: "Computer Networks", code: "CS-305", date: "Feb 15, 2026", day: "Sunday", time: "02:00 PM", syllabus: "Chapters 1-5", venue: "Lab 3", status: "pending" },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-[#1E293B] tracking-tight uppercase">Academic Roadmaps</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Final Examination Schedule • Internal Mode
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-purple-500 transition-colors cursor-pointer shadow-sm">
                        <Search className="w-5 h-5" />
                    </div>
                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-purple-500 transition-colors cursor-pointer shadow-sm">
                        <Filter className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative"
                    >
                        <Card className="border border-slate-200/60 bg-white shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden group">
                            {/* Technical Header */}
                            <div className={cn(
                                "h-1.5 w-full",
                                exam.status === 'confirmed' ? "bg-purple-600" : "bg-amber-500"
                            )} />

                            <CardContent className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <Badge variant="outline" className="border-purple-100 bg-purple-50/50 text-purple-600 text-[9px] font-black uppercase tracking-widest px-2">
                                            {exam.code}
                                        </Badge>
                                        <h3 className="font-black text-xl text-[#1E293B] uppercase tracking-tight">{exam.subject}</h3>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-center min-w-[54px] group-hover:bg-purple-50 group-hover:border-purple-100 transition-colors">
                                            <p className="text-[9px] font-black text-slate-400 uppercase">{exam.day.substring(0, 3)}</p>
                                            <p className="text-lg font-black text-slate-800">{exam.date.split(" ")[1]}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Internal Entry</p>
                                        <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                            <CalendarClock className="w-3.5 h-3.5 text-purple-500" /> {exam.time}
                                        </p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Precinct</p>
                                        <p className="text-xs font-bold text-slate-700 flex items-center justify-end gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-rose-500" /> {exam.venue}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <span>Preparation Progress</span>
                                        <span className="text-purple-600">65%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "65%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-purple-600"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <p className="text-[10px] font-bold text-slate-500">
                                            Syllabus: <span className="text-slate-800">{exam.syllabus}</span>
                                        </p>
                                        <div className="p-1.5 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer group-hover:translate-x-1 translate-y-0.5">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {/* Hackathon Add-on Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-1"
                >
                    <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-200 transition-all group h-full flex flex-col items-center justify-center p-8 space-y-4 cursor-pointer">
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-purple-500 group-hover:border-purple-200 transition-all">
                            <CalendarClock className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <h4 className="font-black text-slate-400 uppercase tracking-widest text-xs">Event Hub</h4>
                            <p className="text-[10px] font-bold text-slate-500">View Hackathons & Tech Fests</p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
