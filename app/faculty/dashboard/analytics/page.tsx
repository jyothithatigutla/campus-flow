"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    TrendingDown,
    Users,
    BookOpen,
    Award,
    Clock,
    ChevronLeft,
    BarChart3
} from "lucide-react";
import { useRouter } from "next/navigation";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function FacultyAnalyticsDashboard() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <DashboardLayout>
                <div className="max-w-[1700px] mx-auto py-8 space-y-8 animate-pulse">
                    <div className="h-12 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-40 bg-slate-100 dark:bg-slate-800/50 rounded-[32px]" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-80 bg-slate-100 dark:bg-slate-800/50 rounded-[40px]" />
                        <div className="h-80 bg-slate-100 dark:bg-slate-800/50 rounded-[40px]" />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    // Mock data for charts
    const attendanceData = [
        { month: "Sep", rate: 85 },
        { month: "Oct", rate: 88 },
        { month: "Nov", rate: 82 },
        { month: "Dec", rate: 87 },
        { month: "Jan", rate: 92 },
    ];

    const performanceData = [
        { subject: "OS", avg: 78 },
        { subject: "DS", avg: 85 },
        { subject: "ML", avg: 82 },
        { subject: "DBMS", avg: 88 },
        { subject: "CN", avg: 75 },
    ];

    const weeklyActivity = [
        { day: "Mon", classes: 4, attendance: 88 },
        { day: "Tue", classes: 3, attendance: 92 },
        { day: "Wed", classes: 5, attendance: 85 },
        { day: "Thu", classes: 4, attendance: 90 },
        { day: "Fri", classes: 3, attendance: 87 },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Analytics Dashboard</h1>
                        <p className="text-slate-400 font-medium tracking-tight">Comprehensive performance metrics and insights</p>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-[32px] p-8 shadow-xl">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Students</p>
                                <h3 className="text-5xl font-black tracking-tighter text-[#1E293B] dark:text-white mb-2">248</h3>
                                <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +12% this month
                                </Badge>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-[32px] p-8 shadow-xl">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Attendance</p>
                                <h3 className="text-5xl font-black tracking-tighter text-emerald-600 mb-2">92%</h3>
                                <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +5% from last month
                                </Badge>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-[32px] p-8 shadow-xl">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Courses</p>
                                <h3 className="text-5xl font-black tracking-tighter text-orange-600 mb-2">5</h3>
                                <Badge className="bg-orange-50 text-orange-600 border-none font-black text-[9px] px-3 py-1 rounded-full">
                                    <Clock className="w-3 h-3 mr-1" />
                                    18 hrs/week
                                </Badge>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-[32px] p-8 shadow-xl">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Class Average</p>
                                <h3 className="text-5xl font-black tracking-tighter text-purple-600 mb-2">82%</h3>
                                <Badge className="bg-purple-50 text-purple-600 border-none font-black text-[9px] px-3 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +3% improvement
                                </Badge>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Attendance Trend */}
                    <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                            <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                                <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                Attendance Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                                    <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: 'none',
                                            borderRadius: '16px',
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Subject Performance */}
                    <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                            <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <BarChart3 className="w-5 h-5 text-white" />
                                </div>
                                Subject Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="subject" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                                    <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: 'none',
                                            borderRadius: '16px',
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <Bar dataKey="avg" fill="#3b82f6" radius={[12, 12, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Weekly Activity */}
                <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                    <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                        <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            Weekly Activity Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weeklyActivity}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                                <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: 'none',
                                        borderRadius: '16px',
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                                <Bar dataKey="classes" fill="#8b5cf6" radius={[12, 12, 0, 0]} name="Classes Conducted" />
                                <Bar dataKey="attendance" fill="#10b981" radius={[12, 12, 0, 0]} name="Attendance %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
