"use client";

import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from "recharts";
import {
    TrendingUp,
    Users,
    Calendar,
    Plus,
    Table,
    BarChart3,
    GraduationCap,
    Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Mock Data ---
const attendanceData = [
    { name: "Mon", attendance: 85 },
    { name: "Tue", attendance: 92 },
    { name: "Wed", attendance: 88 },
    { name: "Thu", attendance: 95 },
    { name: "Fri", attendance: 82 },
    { name: "Sat", attendance: 75 },
];

const performanceData = [
    { month: "Jan", score: 78 },
    { month: "Feb", score: 82 },
    { month: "Mar", score: 80 },
    { month: "Apr", score: 85 },
    { month: "May", score: 89 },
    { month: "Jun", score: 92 },
];

const gradeDistribution = [
    { name: "A Grade", value: 35, color: "#10b981" }, // Emerald 500
    { name: "B Grade", value: 45, color: "#3b82f6" }, // Blue 500
    { name: "C Grade", value: 15, color: "#f59e0b" }, // Amber 500
    { name: "Fail", value: 5, color: "#ef4444" },    // Red 500
];

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-100 dark:border-slate-800 p-3 rounded-xl shadow-xl">
                <p className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="font-black text-lg text-slate-900 dark:text-white">
                    {payload[0].value}%
                </p>
            </div>
        );
    }
    return null;
};

// --- Components ---

export function AttendanceChart() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="h-[400px] w-full bg-slate-50 dark:bg-slate-800/20 animate-pulse rounded-[32px]" />;

    return (
        <Card className="p-8 bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-[400px] group hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="flex-none mb-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Biometric Data</p>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight">Weekly Attendance</h3>
                </div>
            </div>
            <div className="flex-1 w-full min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceData} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                            padding={{ left: 10, right: 10 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', opacity: 0.5 }} />
                        <Bar
                            dataKey="attendance"
                            fill="#3b82f6"
                            radius={[10, 10, 0, 0]}
                            className="fill-blue-600 dark:fill-blue-500"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

export function PerformanceChart() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="h-[550px] w-full bg-indigo-950/20 animate-pulse rounded-[32px]" />;

    return (
        <Card className="p-10 bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white rounded-[40px] shadow-2xl border-0 flex flex-col h-[550px] relative overflow-hidden group">
            <div className="flex-none relative z-10 flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Academic Trends</p>
                    <h3 className="text-3xl font-black italic tracking-tight">Class Performance</h3>
                </div>
            </div>
            <div className="flex-1 w-full min-h-0 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        </Card>
    );
}

export function GradeDistributionChart() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="h-[550px] w-full bg-slate-50 dark:bg-slate-800/20 animate-pulse rounded-[32px]" />;

    return (
        <Card className="p-10 bg-white dark:bg-slate-900 rounded-[40px] shadow-xl border-0 flex flex-col h-[550px] overflow-hidden">
            <div className="flex-none mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Outcomes</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">Grade Distribution</h3>
            </div>
            {/* Rigid height for PieChart to ensure it renders reliably */}
            <div className="h-[320px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={gradeDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {gradeDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-5xl font-black text-slate-900 dark:text-white">124</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Students</span>
                </div>
            </div>
            <div className="flex-none grid grid-cols-2 gap-4 mt-10 relative z-10">
                {gradeDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-1 rounded-xl transition-colors cursor-default">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{item.name}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
