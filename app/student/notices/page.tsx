"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle2, Clock, Eye } from "lucide-react";

export default function StudentNotices() {
    const notices = [
        { title: "Mid-term Schedule", date: "24 Jan 2026", category: "Academic", body: "The mid-term exam schedule for Sem 6 has been released. Please check the 'Exams' tab for your specific dates." },
        { title: "Network Maintenance", date: "22 Jan 2026", category: "System", body: "Campus Wi-Fi will be down for maintenance this Saturday from 10 PM to 12 AM." },
        { title: "New Course: AI Ethics", date: "20 Jan 2026", category: "Elective", body: "Enrollment for the new AI Ethics elective is now open. Seats are limited to 40 students." },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-100 font-heading">Campus Updates</h1>
                    </div>
                </div>

                <div className="space-y-6">
                    {notices.map((notice, i) => (
                        <Card key={i} className="border-0 shadow-lg shadow-purple-500/5 bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-purple-500/10 transition-all">
                            <div className="flex">
                                <div className="w-1.5 bg-purple-600 dark:bg-purple-500" />
                                <CardContent className="p-8 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors uppercase tracking-tight">{notice.title}</h3>
                                            <div className="flex items-center gap-3 text-xs text-purple-400 dark:text-purple-300/60 font-bold tracking-widest uppercase">
                                                <Clock className="w-3.5 h-3.5" /> {notice.date} • {notice.category}
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 dark:text-purple-400">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <p className="text-purple-900/80 dark:text-slate-300 leading-relaxed font-inter">
                                        {notice.body}
                                    </p>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
