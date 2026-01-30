"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

const MOCK_TOPICS: Record<string, string[]> = {
    "CS-301": ["Dynamic Programming", "Graph Algorithms", "NP-Completeness", "Approximation Algorithms"],
    "CS-302": ["Normalization", "SQL Optimization", "Transaction Management", "Concurrency Control"],
    "CS-303": ["OSI Model", "TCP/IP Protocol Suite", "Routing Algorithms", "Network Security"],
    "33A55101": ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Deep Learning"],
    "default": ["Unit 1: Introduction & Fundamentals", "Unit 2: Core Architectures", "Unit 3: Advanced Implementation", "Unit 4: Real-world Applications", "Unit 5: Future Trends"]
};

interface ExamCardProps {
    courseName: string;
    courseCode: string;
    date: Date;
    location: string;
    duration: string;
    index: number;
}

export function ExamCard({
    courseName,
    courseCode,
    date,
    location,
    duration,
    index,
}: ExamCardProps) {
    const daysLeft = Math.ceil(
        (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    const isUrgent = daysLeft <= 3;
    const topics = MOCK_TOPICS[courseCode] || MOCK_TOPICS["default"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300",
                "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
                "border-slate-200 dark:border-slate-800",
                "shadow-lg hover:shadow-xl dark:shadow-slate-900/50",
                isUrgent && "border-rose-200 dark:border-rose-900/50"
            )}
        >
            {/* Decorative gradient blob */}
            <div className={cn(
                "absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500",
                isUrgent
                    ? "bg-rose-500/10 group-hover:bg-rose-500/20"
                    : "bg-indigo-500/10 group-hover:bg-indigo-500/20"
            )} />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <span className={cn(
                                "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold mb-2",
                                "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            )}>
                                {courseCode}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                                {courseName}
                            </h3>
                        </div>
                        <div className={cn(
                            "flex flex-col items-center justify-center rounded-xl p-2 min-w-[60px]",
                            isUrgent
                                ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
                                : "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                        )}>
                            <span className="text-xl font-bold">{daysLeft}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider">Days</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                <Calendar className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-200">
                                    {format(date, "EEEE, MMMM do")}
                                </p>
                                <p className="text-xs text-slate-500">Date</p>
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                <Clock className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-200">
                                    {format(date, "h:mm a")} • {duration}
                                </p>
                                <p className="text-xs text-slate-500">Time & Duration</p>
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-slate-200">
                                    {location}
                                </p>
                                <p className="text-xs text-slate-500">Location</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className={cn(
                            "mt-6 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-300",
                            "hover:shadow-lg active:scale-95",
                            isUrgent
                                ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25"
                        )}>
                            View Topics
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md rounded-2xl bg-white dark:bg-slate-900 border-none shadow-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <div className="w-2 h-8 bg-purple-500 rounded-full" />
                                Syllabus Coverage
                            </DialogTitle>
                            <DialogDescription className="sr-only">
                                List of topics covered in the exam for {courseName}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20">
                                <h4 className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2 uppercase tracking-wider">
                                    {courseName} ({courseCode})
                                </h4>
                                <ul className="space-y-3">
                                    {topics.map((topic, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-xs text-center text-slate-400 font-medium">
                                Prepare well! Good luck with your exam.
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </motion.div>
    );
}
