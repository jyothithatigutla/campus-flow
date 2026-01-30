"use client";

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
    return (
        <Card className="p-8 bg-white dark:bg-slate-900 rounded-[40px] shadow-xl border-0 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biometric Data</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight">Weekly Attendance</h3>
                </div>
                <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest rounded-full">
                    +4.2% vs last week
                </Badge>
            </div>
            <div className="flex-1 w-full min-h-[300px] relative">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={attendanceData} barSize={20}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                dy={10}
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
            </div>
        </Card>
    );
}

export function PerformanceChart() {
    return (
        <Card className="p-8 bg-[#0F172A] text-white rounded-[40px] shadow-2xl border-0 flex flex-col h-full relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between mb-8">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Trends</p>
                    <h3 className="text-2xl font-black italic tracking-tight">Class Performance</h3>
                </div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">1M</div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">6M</div>
                </div>
            </div>
            <div className="flex-1 w-full min-h-[300px] relative z-10">
                <div className="absolute inset-0">
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
                                dy={10}
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
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        </Card>
    );
}

export function GradeDistributionChart() {
    return (
        <Card className="p-8 bg-white dark:bg-slate-900 rounded-[40px] shadow-xl border-0 flex flex-col h-full">
            <div className="mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Outcomes</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight">Grade Distribution</h3>
            </div>
            <div className="flex-1 w-full min-h-[250px] relative">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={gradeDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
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
                        <span className="text-3xl font-black text-slate-900 dark:text-white">124</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Students</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
                {gradeDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
